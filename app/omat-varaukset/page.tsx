'use client';

import { useEffect, useState } from 'react';
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
  service_title: string;
  service_description: string;
  price: number;
  duration_minutes: number;
}

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const name = localStorage.getItem('userName') || 'Käyttäjä';
    
    if (!token) {
      router.push('/auth/login?redirect=/omat-varaukset');
      return;
    }

    setUserName(name);

    bookingApi.getMyBookings(token)
      .then(data => {
        setBookings(data.bookings);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load bookings:', err);
        localStorage.removeItem('userToken');
        router.push('/auth/login?redirect=/omat-varaukset');
      });
  }, [router]);

  const handleCancel = async (bookingId: string, serviceTitle: string) => {
    if (!confirm(`Haluatko varmasti peruuttaa varauksen?\n\n${serviceTitle}`)) {
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) return;

    try {
      await bookingApi.cancelBooking(bookingId, token);
      alert('✅ Varaus peruttu');
      
      // Reload bookings
      const data = await bookingApi.getMyBookings(token);
      setBookings(data.bookings);
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          <p className="mt-4 text-stone-600">Ladataan varauksia...</p>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => 
    b.status !== 'cancelled' && b.start_time > Date.now()
  ).sort((a, b) => a.start_time - b.start_time);

  const pastBookings = bookings.filter(b => 
    b.status !== 'cancelled' && b.start_time <= Date.now()
  ).sort((a, b) => b.start_time - a.start_time);

  const cancelledBookings = bookings.filter(b => 
    b.status === 'cancelled'
  ).sort((a, b) => b.start_time - a.start_time);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-stone-800 mb-2 font-serif">
                Omat varaukseni
              </h1>
              <p className="text-stone-600">
                Tervetuloa, {userName}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-stone-600 hover:text-stone-800 text-sm inline-flex items-center gap-2 transition-colors"
            >
              Kirjaudu ulos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          <Link
            href="/varaa-aika"
            className="inline-block bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-full transition-colors"
          >
            + Varaa uusi aika
          </Link>
        </div>

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-stone-800 mb-6 font-serif">
              📅 Tulevat varaukset ({upcomingBookings.length})
            </h2>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-medium text-stone-800">
                          {booking.service_title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status === 'confirmed' && '✓ Vahvistettu'}
                          {booking.status === 'pending' && '⏳ Odottaa maksua'}
                        </span>
                      </div>
                      
                      <p className="text-stone-600 text-sm mb-4">
                        {booking.service_description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-stone-700">
                            {new Date(booking.start_time).toLocaleDateString('fi-FI', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-stone-700">
                            {new Date(booking.start_time).toLocaleTimeString('fi-FI', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            {' - '}
                            {new Date(booking.end_time).toLocaleTimeString('fi-FI', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            {' '}({booking.duration_minutes} min)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-stone-700 font-medium">
                            {booking.price}€
                          </span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 p-3 bg-stone-50 rounded-lg">
                          <p className="text-xs text-stone-500 mb-1">Lisätiedot:</p>
                          <p className="text-sm text-stone-700">{booking.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 md:w-48">
                      {booking.status === 'pending' && !booking.payment_link && (
                        <div className="text-sm text-stone-600 p-3 bg-yellow-50 rounded-lg">
                          Saat maksulinkin sähköpostitse 24h sisällä
                        </div>
                      )}
                      
                      {booking.payment_link && booking.status === 'pending' && (
                        <a
                          href={booking.payment_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
                        >
                          💳 Maksa nyt
                        </a>
                      )}

                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancel(booking.id, booking.service_title)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                        >
                          Peruuta varaus
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-stone-800 mb-6 font-serif">
              ✓ Menneet varaukset ({pastBookings.length})
            </h2>
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl p-6 shadow-lg opacity-75"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-stone-800 mb-1">
                        {booking.service_title}
                      </h3>
                      <p className="text-sm text-stone-600">
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
                    <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs">
                      Päättynyt
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-light text-stone-800 mb-3">
              Ei varauksia
            </h3>
            <p className="text-stone-600 mb-6">
              Et ole vielä varannut yhtään aikaa
            </p>
            <Link
              href="/varaa-aika"
              className="inline-block bg-stone-800 hover:bg-stone-900 text-white px-8 py-3 rounded-full transition-colors"
            >
              Varaa ensimmäinen aika
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
