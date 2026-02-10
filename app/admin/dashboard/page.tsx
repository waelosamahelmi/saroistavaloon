/**
 * Admin Dashboard - Complete Version
 * Bookings, Payments, Materials, Statistics
 */

"use client";

import { useState, useEffect } from 'react';
import { db } from '@/data/database.js';
import { Booking } from '@/data/types.js';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  todayRevenue: number;
  monthRevenue: number;
}

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'payments' | 'materials'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    todayRevenue: 0,
    monthRevenue: 0,
  });

  const [loading, setLoading] = useState(false);

  // Load data on mount
  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [bookingsData, paymentsData, materialsData] = await Promise.all([
          db.getAll(),
          fetch('/api/payments').then(r => r.json()),
          fetch('/api/materials').then(r => r.json()),
        ]);

        setBookings(bookingsData);
        setPayments(paymentsData);
        setMaterials(materialsData);

        // Calculate stats
        const today = new Date();
        const todayRevenue = payments
          .filter(p => p.status === 'paid' && new Date(p.createdAt).toDateString() === today.toDateString())
          .reduce((sum, p) => sum + p.amount, 0);

        const totalBookings = bookings.length;
        const pendingBookings = bookings.filter(b => b.status === 'pending').length;
        const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

        setStats({
          totalBookings,
          pendingBookings,
          confirmedBookings,
          todayRevenue,
        });
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleBookingStatus = async (id: string, status: Booking['status'], paymentMethod?: 'stripe' | 'holvi' | 'cash') => {
    try {
      // If marking as confirmed, update payment status
      if (status === 'confirmed' && paymentMethod) {
        await db.updateBookingStatus(id, { 
          status: 'confirmed',
          paymentStatus: paymentMethod === 'cash' ? 'paid' : 'pending',
          updatedAt: new Date().toISOString(),
        });
      } else {
        await db.updateBookingStatus(id, { 
          status,
          updatedAt: new Date().toISOString(),
        });
      }
      
      // Refresh bookings
      const updatedBookings = await db.getAll();
      setBookings(updatedBookings);

      // Recalculate stats
      const newStats = { ...stats };
      if (status === 'confirmed') {
        newStats.confirmedBookings += 1;
      }
      if (status === 'cancelled') {
        newStats.totalBookings -= 1;
      }
      setStats(newStats);
    } catch (error) {
      console.error('Error updating booking:', error);
      alert(`Virhe: ${error.message}`);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Haluatko varmasti poistaa tämän varauksen?')) return;

    try {
      await db.deleteBooking(id);
      
      const updatedBookings = await db.getAll();
      setBookings(updatedBookings);

      // Update stats
      setStats(prev => ({
        ...prev,
        totalBookings: prev.totalBookings - 1,
        pendingBookings: prev.pendingBookings - 1,
      }));
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert(`Virhe: ${error.message}`);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm('Haluatko varmasti poistaa tämän materiaalin?')) return;

    try {
      await db.deleteMaterial(id);
      
      const updatedMaterials = await db.getMaterials();
      setMaterials(updatedMaterials);
    } catch (error) {
      console.error('Error deleting material:', error);
      alert(`Virhe: ${error.message}`);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-light text-slate-800 mb-4">
              Hallintapaneeli
            </h1>
            <p className="text-slate-600">
              Yleiskatsaus, varaukset, maksut ja materiaalit
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Varaukset</h3>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-slate-800">{stats.totalBookings}</div>
                <p className="text-sm text-slate-600">Yhteensä</p>
              </div>
              <div className="text-2xl font-bold text-green-600">{stats.pendingBookings}</div>
                <p className="text-sm text-slate-600">Odottavat</p>
              </div>
              <div className="text-2xl font-bold text-blue-600">{stats.confirmedBookings}</div>
              <p className="text-sm text-slate-600">Vahvistetut</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Tulo tänään</h3>
              <div className="text-3xl font-bold text-green-600">{stats.todayRevenue.toFixed(2)} €</h3>
              <p className="text-sm text-slate-600">Tänään</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-slate-800 mb-4">Kuukaus-tulo</h3>
              <div className="text-2xl font-bold text-slate-800">{stats.monthRevenue.toFixed(0)} €</div>
              <p className="text-sm text-slate-600">Tämän kuukauden</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Varaukset
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'payments'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Maksut
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'materials'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Materiaalit
            </button>
          </div>

          {/* Bookings Table */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Muokkaa</th>
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
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center gap-2 ${
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          } rounded-full px-3 py-1 text-xs font-medium`}>
                            {booking.status === 'pending' && '⏳'}
                            {booking.status === 'confirmed' && '✅'}
                            {booking.status === 'cancelled' && '❌'}
                          </span>
                          <span className="text-slate-600">
                            {booking.status === 'pending' ? 'Odottaa' : booking.status === 'confirmed' ? 'Vahvistetty' : 'Peruttu'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{booking.message || '-'}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => booking.status === 'pending' && handleBookingStatus(booking.id, 'confirmed', 'cash')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium"
                          >
                            Vahvista
                          </button>
                          <button
                            onClick={() => booking.status === 'confirmed' && handleDeleteBooking(booking.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium"
                          >
                            Poista
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payments Table */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Summa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tapa</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tila</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Maksuaika</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lasku</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Muokkaa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-slate-200">
                        <td className="px-6 py-4 text-sm text-slate-700">{payment.id.substring(3)}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{payment.amount.toFixed(2)} €</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 text-sm font-medium ${
                            payment.method === 'stripe' ? 'text-purple-600' : 
                            payment.method === 'holvi' ? 'text-blue-600' : 'text-green-600'
                          }`}>
                            {payment.method === 'stripe' && '💳'}
                            {payment.method === 'holvi' && '📄'}
                            {payment.method === 'cash' && '💵'}
                            {payment.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <span className={`inline-flex items-center gap-2 text-xs font-medium rounded-full px-2 py-1 ${
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            payment.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {payment.status === 'pending' && '⏳'}
                            {payment.status === 'processing' && '⏳'}
                            {payment.status === 'paid' && '✅'}
                            {payment.status === 'failed' && '❌'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{new Date(payment.createdAt).toLocaleString('fi-FI')}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              // Mark as paid
                              if (payment.status === 'pending') {
                                alert('Merkitse maksetuksi adminpaneelin kautta');
                              }
                            }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {payment.invoiceId ? `Lataa lasku (${payment.invoiceId})` : '-'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Materials Grid */}
          {activeTab === 'materials' && (
            <div className="grid md:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div key={material.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">{material.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-2 text-sm font-medium ${
                      material.type === 'pdf' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {material.type === 'pdf' && '📄 PDF'}
                      {material.type === 'video' && '🎥 Video'}
                      {material.type}
                    </span>
                    <span className="text-2xl font-bold text-slate-800">{material.price.toFixed(2)} €</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>{material.description}</p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Osta linkki
                    </button>
                    <button
                      onClick={() => handleDeleteMaterial(material.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      Poista
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}
