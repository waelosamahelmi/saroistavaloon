/**
 * Payment Status Tracker
 * Monitors payment status and updates booking status
 */

"use client";

import { useState, useEffect } from 'react';
import { db } from '@/data/database.js';
import { Booking } from '@/data/types.js';

interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: 'stripe' | 'holvi' | 'cash';
  status: 'pending' | 'processing' | 'paid' | 'failed';
  invoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

export default function PaymentStatus({ paymentId }: { paymentId: string }) {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function fetchPaymentStatus() {
      if (!paymentId) return;

      setLoading(true);
      try {
        // In production, this would fetch from payments API
        // For now, mock payment data
        const mockPayment: Payment = {
          id: paymentId,
          bookingId: 'bk_' + paymentId.substring(3),
          amount: 75,
          currency: 'eur',
          method: 'stripe',
          status: 'paid',
          invoiceId: 'inv_' + paymentId.substring(3),
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setPayment(mockPayment);

        // Fetch associated booking
        const bookings = await db.getAll();
        const booking = bookings.find(b => b.id === payment.bookingId);
        setBooking(booking);
      } catch (error) {
        console.error('Error fetching payment:', error);
      } finally {
        setLoading(false);
      }
    }

    const fetchPaymentStatus();

    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 flex items-center justify-center p-8">
          <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
          <p className="mt-4 text-slate-600">Ladataan maksun tilaa...</p>
        </div>
      );
    }

    if (!payment) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
                Maksun tila
              </h1>

              <div className="space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-center">
                  <div className={`px-6 py-3 rounded-full text-center ${
                    payment.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : payment.status === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : payment.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {payment.status === 'paid' && '✅ Maksettu'}
                    {payment.status === 'processing' && '⏳ Käsitellään'}
                    {payment.status === 'failed' && '❌ Epäonnistui'}
                    {!payment.status && '⏳ Odottaa maksua'}
                  </div>
                </div>

                {/* Amount */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <p className="text-sm text-slate-600 mb-2">Maksettu summa</p>
                  <p className="text-4xl font-bold text-slate-800">
                    {payment.amount.toFixed(2)} €
                  </p>
                  <p className="text-xs text-slate-500">
                    {payment.method === 'stripe' && 'Stripe-korttimaksu'}
                    {payment.method === 'holvi' && 'Holvi-lasku'}
                    {payment.method === 'cash' && 'Käteismaksu'}
                  </p>
                </div>

                {/* Payment Details */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">
                    Maksun tiedot
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Maksutapa:</span>
                      <span className="font-medium">{payment.method === 'stripe' ? 'Korttimaksu' : payment.method === 'holvi' ? 'Lasku' : 'Käteinen'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Summa:</span>
                      <span className="font-medium">{payment.amount.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maksuaika:</span>
                      <span className="font-medium">{new Date(payment.createdAt).toLocaleString('fi-FI')}</span>
                    </div>
                    {payment.invoiceId && (
                      <div className="flex justify-between">
                        <span>Laskun numero:</span>
                        <span className="font-medium">{payment.invoiceId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Details */}
                {booking && (
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-slate-800 mb-4">
                      Varaus
                    </h3>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Palvelu:</span>
                        <span className="font-medium">{booking.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Päivämäärä:</span>
                        <span className="font-medium">{booking.preferredDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kellonaika:</span>
                        <span className="font-medium">{booking.preferredTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Asiakas:</span>
                        <span className="font-medium">{booking.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Viesti:</span>
                        <span className="font-medium">{booking.message || 'Ei viestiä'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <a href="/" className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-lg transition-colors text-center">
                    Etusivu
                  </a>
                  {payment.status === 'paid' && payment.invoiceId && (
                    <a href={`/lasku/${payment.invoiceId}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors text-center">
                      Lataa lasku
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
}
