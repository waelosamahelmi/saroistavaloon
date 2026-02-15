/**
 * Admin Panel - Enhanced Version
 * Bookings, Payments, and Materials Management
 */

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "@/data/database.js";
import { Booking } from "@/data/types.js";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'payments' | 'materials'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load bookings on mount
  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        const allBookings = await db.getAll();
        setBookings(allBookings);
        setLoading(false);
      } catch (error) {
        console.error('Error loading bookings:', error);
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Haluatko varmasti poistaa tämän varauksen?')) return;

    try {
      await db.deleteBooking(id);
      
      const updatedBookings = await db.getAll();
      setBookings(updatedBookings);
      
      alert('Varaus poistettu');
    } catch (error) {
      alert(`Virhe poistettaessa: ${error}`);
    }
  };

  const handleConfirmPayment = async (id: string) => {
    if (!confirm('Merkitse maksetuksi ja vahvista varaus?')) return;

    try {
      await db.confirmBooking(id, 'holvi');
      
      const updatedBookings = await db.getAll();
      setBookings(updatedBookings);
      
      alert('Varaus vahvistettu ja merkitty maksetuksi!');
    } catch (error) {
      alert(`Virhe: ${error}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-slate-800">
            Hallintapaneeli
          </h1>
          <div className="flex justify-between items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 transition-colors">
              ← Etusivulle
            </Link>
            <p className="text-sm text-slate-500">
              Kirjautunut hallintaan
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Varaukset</h3>
            <p className="text-4xl font-bold text-blue-600">{bookings.length}</p>
            <p className="text-sm text-slate-500">Yhteensä</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Tänään</h3>
            <p className="text-4xl font-bold text-green-600">{bookings.filter(b => b.status === 'confirmed').length}</p>
            <p className="text-sm text-slate-500">Vahvistetut</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Odottavat</h3>
            <p className="text-4xl font-bold text-yellow-600">{bookings.filter(b => b.status === 'pending').length}</p>
            <p className="text-sm text-slate-500">Odottaa maksua</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Tulot</h3>
            <p className="text-4xl font-bold text-slate-800">
              {bookings.filter(b => b.status === 'confirmed')
                .reduce((sum, b) => sum + (b.service === '60min' ? 75 : b.service === '45min' ? 59 : b.service === 'paketti3' ? 225 : b.service === 'paketti5' ? 375 : b.service === '14paivaa' ? 129 : 0), 0)
              } €
            </p>
            <p className="text-sm text-slate-500">Vahvistetut varaukset</p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light text-slate-800">Varaukset</h2>
            <Link
              href="/admin/dashboard"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Siirry täydelliseen hallintapaneeliin →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nimi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sähköposti</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Palvelu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Päivämäärä</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Kellonaika</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tila</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Toiminnot</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-700">{booking.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{booking.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{booking.service}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{booking.preferredDate}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{booking.preferredTime}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1 ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {booking.status === 'pending' && '⏳'}
                        {booking.status === 'confirmed' && '✅'}
                        {booking.status === 'cancelled' && '❌'}
                        <span className="ml-2">
                          {booking.status === 'pending' ? 'Odottaa' : booking.status === 'confirmed' ? 'Vahvistettu' : 'Peruttu'}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleConfirmPayment(booking.id)}
                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                          >
                            Vahvista
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Poista
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}
