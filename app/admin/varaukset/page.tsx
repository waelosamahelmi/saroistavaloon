'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { bookingApi } from '@/lib/bookingApi';

interface Booking {
  id: string;
  start_time: number;
  end_time: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_link?: string;
  paid_at?: number;
  notes?: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  service_title: string;
  price: number;
  created_at: number;
}

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    loadBookings(token);
  }, [router]);

  const loadBookings = async (token: string) => {
    try {
      const data = await bookingApi.getAdminBookings(token);
      setBookings(data.bookings);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load bookings:', err);
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
  };

  const handleAddPaymentLink = async (bookingId: string) => {
    if (!paymentLink.trim()) {
      alert('Syötä maksulinkki ensin!');
      return;
    }

    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) return;

    try {
      await bookingApi.addPaymentLink(bookingId, paymentLink.trim(), adminToken);
      alert('✅ Maksulinkki lisätty!\n\nMuista lähettää linkki asiakkaalle sähköpostitse.');
      
      await loadBookings(adminToken);
      setEditingBookingId(null);
      setPaymentLink('');
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    }
  };

  const handleMarkAsPaid = async (bookingId: string, customerName: string) => {
    if (!confirm(`Merkitse varaus vahvistetuksi?\n\nAsiakas: ${customerName}\n\nVaraus vahvistetaan automaattisesti.`)) {
      return;
    }

    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) return;

    try {
      await bookingApi.markAsPaid(bookingId, adminToken);
      alert('✅ Varaus vahvistettu!');
      
      await loadBookings(adminToken);
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-stone-400">Ladataan varauksia...</p>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => 
    b.status !== 'cancelled' && b.start_time > Date.now()
  ).sort((a, b) => a.start_time - b.start_time);

  const pendingPayment = upcomingBookings.filter(b => b.status === 'pending');
  const confirmed = upcomingBookings.filter(b => b.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-2 font-serif">
                Varausten hallinta
              </h1>
              <p className="text-stone-400">
                Lisää maksulinkkejä ja vahvista varauksia
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-stone-400 hover:text-white text-sm inline-flex items-center gap-2 transition-colors"
            >
              Kirjaudu ulos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          <div className="flex gap-4">
            <Link
              href="/admin/varaukset"
              className="text-amber-400 border-b-2 border-amber-400 pb-2 font-medium"
            >
              Varaukset
            </Link>
            <Link
              href="/admin/palvelut"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Palvelut
            </Link>
            <Link
              href="/admin/saatavuus"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Saatavuus
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700">
            <p className="text-stone-400 text-sm mb-2">Kaikki tulevat</p>
            <p className="text-4xl font-light text-white">{upcomingBookings.length}</p>
          </div>
          <div className="bg-amber-900/20 rounded-2xl p-6 border border-amber-700">
            <p className="text-amber-400 text-sm mb-2">Odottaa maksua</p>
            <p className="text-4xl font-light text-amber-300">{pendingPayment.length}</p>
          </div>
          <div className="bg-green-900/20 rounded-2xl p-6 border border-green-700">
            <p className="text-green-400 text-sm mb-2">Vahvistettu</p>
            <p className="text-4xl font-light text-green-300">{confirmed.length}</p>
          </div>
        </div>

        {/* Pending Bookings */}
        {pendingPayment.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              ⏳ Odottaa maksua ({pendingPayment.length})
            </h2>
            <div className="space-y-4">
              {pendingPayment.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-stone-800 rounded-2xl p-6 border border-amber-700 shadow-lg"
                >
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Booking Info */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-white mb-1">
                            {booking.service_title}
                          </h3>
                          <p className="text-stone-400 text-sm">
                            {new Date(booking.start_time).toLocaleDateString('fi-FI', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                            {' • '}
                            {new Date(booking.start_time).toLocaleTimeString('fi-FI', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span className="text-2xl font-light text-amber-400">
                          {booking.price}€
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-stone-500">Asiakas</p>
                          <p className="text-white font-medium">{booking.customer_name}</p>
                        </div>
                        <div>
                          <p className="text-stone-500">Sähköposti</p>
                          <p className="text-white font-medium">{booking.customer_email}</p>
                        </div>
                        {booking.customer_phone && (
                          <div>
                            <p className="text-stone-500">Puhelin</p>
                            <p className="text-white font-medium">{booking.customer_phone}</p>
                          </div>
                        )}
                        {booking.notes && (
                          <div>
                            <p className="text-stone-500">Lisätiedot</p>
                            <p className="text-stone-300 text-sm">{booking.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      {editingBookingId === booking.id ? (
                        <>
                          <input
                            type="url"
                            value={paymentLink}
                            onChange={(e) => setPaymentLink(e.target.value)}
                            placeholder="https://holvi.com/shop/xxx/payment/yyy"
                            className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white text-sm placeholder-stone-600 focus:ring-2 focus:ring-amber-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddPaymentLink(booking.id)}
                              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Tallenna linkki
                            </button>
                            <button
                              onClick={() => {
                                setEditingBookingId(null);
                                setPaymentLink('');
                              }}
                              className="px-4 bg-stone-700 hover:bg-stone-600 text-white py-2 rounded-lg text-sm transition-colors"
                            >
                              Peruuta
                            </button>
                          </div>
                        </>
                      ) : booking.payment_link ? (
                        <>
                          <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 text-xs">
                            <p className="text-green-400 font-medium mb-1">✓ Maksulinkki lisätty</p>
                            <a 
                              href={booking.payment_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-300 hover:underline break-all"
                            >
                              {booking.payment_link}
                            </a>
                          </div>
                          <button
                            onClick={() => handleMarkAsPaid(booking.id, booking.customer_name)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                          >
                            ✓ Merkitse vahvistetuksi
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditingBookingId(booking.id)}
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                          + Lisää maksulinkki
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmed Bookings */}
        {confirmed.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              ✓ Vahvistetut varaukset ({confirmed.length})
            </h2>
            <div className="space-y-4">
              {confirmed.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-stone-800 rounded-2xl p-6 border border-green-700/50"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-medium text-white">
                          {booking.service_title}
                        </h3>
                        <span className="text-xl font-light text-green-400">
                          {booking.price}€
                        </span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-stone-500">Aika</p>
                          <p className="text-white">
                            {new Date(booking.start_time).toLocaleDateString('fi-FI')}
                            {' '}
                            {new Date(booking.start_time).toLocaleTimeString('fi-FI', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-stone-500">Asiakas</p>
                          <p className="text-white">{booking.customer_name}</p>
                        </div>
                        <div>
                          <p className="text-stone-500">Sähköposti</p>
                          <p className="text-white">{booking.customer_email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-900/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                        ✓ Vahvistettu
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-stone-800 rounded-3xl p-16 text-center border border-stone-700">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-light text-white mb-3">
              Ei varauksia
            </h3>
            <p className="text-stone-400">
              Varaukset näkyvät täällä kun asiakkaat varaavat aikoja
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
