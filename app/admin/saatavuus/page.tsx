'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { bookingApi } from '@/lib/bookingApi';

interface Availability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: number;
  created_at: number;
}

const DAYS = [
  { value: 0, label: 'Sunnuntai' },
  { value: 1, label: 'Maanantai' },
  { value: 2, label: 'Tiistai' },
  { value: 3, label: 'Keskiviikko' },
  { value: 4, label: 'Torstai' },
  { value: 5, label: 'Perjantai' },
  { value: 6, label: 'Lauantai' }
];

export default function AdminAvailabilityPage() {
  const router = useRouter();
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('bookingAdminToken');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    loadAvailability(token);
  }, [router]);

  const loadAvailability = async (token: string) => {
    try {
      const data = await bookingApi.getAdminAvailability(token);
      setAvailability(data.availability);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load availability:', err);
      localStorage.removeItem('bookingAdminToken');
      router.push('/admin/login');
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);

    const formData = new FormData(e.currentTarget);
    const dayOfWeek = parseInt(formData.get('day') as string);
    const startTime = formData.get('start_time') as string;
    const endTime = formData.get('end_time') as string;

    const adminToken = localStorage.getItem('bookingAdminToken');
    if (!adminToken) return;

    try {
      await bookingApi.createAvailability(dayOfWeek, startTime, endTime, adminToken);
      alert('✅ Saatavuusaika lisätty!');
      (e.target as HTMLFormElement).reset();
      
      await loadAvailability(adminToken);
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (availId: string, day: number, time: string) => {
    const dayName = DAYS.find(d => d.value === day)?.label || 'Tuntematon';
    
    if (!confirm(`Haluatko varmasti poistaa saatavuusajan?\n\n${dayName} ${time}\n\nTätä ei voi perua!`)) {
      return;
    }

    const adminToken = localStorage.getItem('bookingAdminToken');
    if (!adminToken) return;

    try {
      await bookingApi.deleteAvailability(availId, adminToken);
      alert('✅ Saatavuusaika poistettu');
      
      await loadAvailability(adminToken);
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bookingAdminToken');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-stone-400">Ladataan...</p>
        </div>
      </div>
    );
  }

  // Group availability by day
  const byDay = DAYS.map(day => ({
    ...day,
    slots: availability.filter(a => a.day_of_week === day.value).sort((a, b) => 
      a.start_time.localeCompare(b.start_time)
    )
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-2 font-serif">
                Saatavuuden hallinta
              </h1>
              <p className="text-stone-400">
                Aseta viikoittaiset vastaanotto-ajat
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
              className="text-stone-400 hover:text-white pb-2 transition-colors"
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
              className="text-amber-400 border-b-2 border-amber-400 pb-2 font-medium"
            >
              Saatavuus
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Form */}
          <div className="bg-stone-800 rounded-3xl p-8 shadow-2xl border border-stone-700">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              ➕ Lisää saatavuusaika
            </h2>

            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Viikonpäivä
                </label>
                <select
                  name="day"
                  required
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {DAYS.map(day => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Alkamisaika
                </label>
                <input
                  type="time"
                  name="start_time"
                  required
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Päättymisaika
                </label>
                <input
                  type="time"
                  name="end_time"
                  required
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 text-sm text-amber-200">
                <p className="font-medium mb-2">💡 Vinkki:</p>
                <p>
                  Varausajat jaetaan automaattisesti 30 minuutin välein palvelun keston mukaan.
                  Esim: 09:00-12:00 luo ajat 09:00, 09:30, 10:00, 10:30, 11:00, 11:30.
                </p>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-700 text-white py-4 rounded-full font-medium transition-all hover:scale-105 disabled:hover:scale-100"
              >
                {creating ? '⏳ Lisätään...' : '➕ Lisää aika'}
              </button>
            </form>
          </div>

          {/* Availability Calendar */}
          <div className="bg-stone-800 rounded-3xl p-8 shadow-2xl border border-stone-700">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              📅 Viikoittainen saatavuus
            </h2>

            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {byDay.map(day => (
                <div key={day.value} className="border-l-4 border-amber-600 pl-4">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {day.label}
                  </h3>
                  
                  {day.slots.length === 0 ? (
                    <p className="text-sm text-stone-500 italic">
                      Ei saatavuusaikoja
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {day.slots.map(slot => (
                        <div
                          key={slot.id}
                          className="bg-stone-900 rounded-lg p-3 flex items-center justify-between border border-stone-700"
                        >
                          <span className="text-white font-medium">
                            {slot.start_time} - {slot.end_time}
                          </span>
                          <button
                            onClick={() => handleDelete(slot.id, day.value, `${slot.start_time} - ${slot.end_time}`)}
                            className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
                          >
                            Poista
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {availability.length === 0 && (
              <div className="text-center py-12">
                <p className="text-stone-500 italic">
                  Ei vielä saatavuusaikoja. Lisää ensimmäinen aika yllä olevalla lomakkeella.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
