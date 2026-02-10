/**
 * Holvi Invoice Form
 * Creates PDF invoices for customers
 */

"use client";

import { useState } from 'react';

interface HolviInvoiceProps {
  bookingId: string;
  amount: number;
  serviceName: string;
}

export default function HolviInvoiceForm({ bookingId, amount, serviceName }: HolviInvoiceProps) {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [yTunnus, setYTunnus] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      // In production, call Holvi API
      const response = await fetch('/api/holvi-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          invoiceData: {
            email,
            companyName,
            companyAddress,
            yTunnus,
            bankAccount,
          },
        }),
      });

      if (response.ok) {
        alert(`Lasku lähetetty osoitteeseen: ${email}`);
        setEmail('');
        setCompanyName('');
        setCompanyAddress('');
        setYTunnus('');
        setBankAccount('');
      } else {
        alert('Virhe laskun lähetyksessä');
      }
    } catch (error) {
      alert(`Virhe: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-blue-50/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              Holvi-lasku
            </h2>
            <p className="text-stone-600">
              {serviceName} - {amount} €
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-medium text-stone-800 mb-6">
              Laskun tiedot
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                  Sähköposti *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-stone-700 mb-2">
                  Yrityksen nimi
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Yritys Oy"
                />
              </div>

              <div>
                <label htmlFor="companyAddress" className="block text-sm font-medium text-stone-700 mb-2">
                  Yrityksen osoite
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Katuosoite 123, PL 12345"
                />
              </div>

              <div>
                <label htmlFor="yTunnus" className="block text-sm font-medium text-stone-700 mb-2">
                  Y-tunnus
                </label>
                <input
                  type="text"
                  id="yTunnus"
                  value={yTunnus}
                  onChange={(e) => setYTunnus(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="12345678-9"
                />
              </div>

              <div>
                <label htmlFor="bankAccount" className="block text-sm font-medium text-stone-700 mb-2">
                  Pankkitili
                </label>
                <input
                  type="text"
                  id="bankAccount"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="FI12 3456789"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full transition-colors font-medium"
              >
                {sending ? 'Lähetetään...' : 'Lähetä lasku'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
