/**
 * Stripe Checkout Component
 * Handles Stripe card payments for bookings
 */

"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  serviceName: string;
}

export default function StripeCheckout({ bookingId, amount, serviceName }: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // In production, call your API to create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, paymentMethod: 'stripe' }),
      });

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success?booking=${bookingId}`,
        },
      });

      if (error) {
        console.error('Stripe error:', error);
        alert(`Maksu epäonnistui: ${error.message}`);
      } else {
        alert(`Maksu onnistui! Booking ${bookingId}`);
      }

      // Update booking status
      await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, paymentMethod: 'stripe', paymentIntentId: paymentIntent.id }),
      });
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Virhe maksussa: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Maksu - {serviceName}
        </h2>
        <p className="text-center text-slate-600 mb-6">
          <span className="text-3xl font-bold text-blue-600">{amount} €</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {clientSecret && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nimi kortilla
                </label>
                <CardElement className="border border-slate-200 rounded-lg p-4" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  CVV korttunnus
                </label>
                <CardElement
                  options={{
                    style: { base: 'compact' },
                  }}
                  className="border border-slate-200 rounded-lg p-4"
                />
              </div>
            </div>
          )}

          {processing && (
            <div className="text-center py-4">
              <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
              <p className="mt-4 text-slate-600">Käsitellään maksua...</p>
            </div>
          )}
        </form>

        <p className="text-sm text-slate-500 text-center mt-6">
          🔒 Turvallinen Stripe-maksu
        </p>
      </div>
    </div>
  );
}
