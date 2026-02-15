'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { bookingApi } from '@/lib/bookingApi';

interface Service {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  price: number;
  status: 'active' | 'inactive';
  created_at: number;
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('bookingAdminToken');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    loadServices(token);
  }, [router]);

  const loadServices = async (token: string) => {
    try {
      const data = await bookingApi.getAdminServices(token);
      setServices(data.services);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load services:', err);
      localStorage.removeItem('bookingAdminToken');
      router.push('/admin/login');
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const durationMinutes = parseInt(formData.get('duration') as string);
    const price = parseFloat(formData.get('price') as string);

    const adminToken = localStorage.getItem('bookingAdminToken');
    if (!adminToken) return;

    try {
      await bookingApi.createService(title, description, durationMinutes, price, adminToken);
      alert('✅ Palvelu luotu!');
      (e.target as HTMLFormElement).reset();
      
      await loadServices(adminToken);
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (serviceId: string, title: string) => {
    if (!confirm(`Haluatko varmasti poistaa palvelun "${title}"?\n\nTätä ei voi perua!`)) {
      return;
    }

    const adminToken = localStorage.getItem('bookingAdminToken');
    if (!adminToken) return;

    try {
      await bookingApi.deleteService(serviceId, adminToken);
      alert('✅ Palvelu poistettu');
      
      await loadServices(adminToken);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-2 font-serif">
                Palveluiden hallinta
              </h1>
              <p className="text-stone-400">
                Luo, muokkaa ja poista palveluita
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

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/admin/materials"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Materiaalit
            </Link>
            <Link
              href="/admin/orders"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Tilaukset
            </Link>
            <Link
              href="/admin/varaukset"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Varaukset
            </Link>
            <Link
              href="/admin/palvelut"
              className="text-amber-400 border-b-2 border-amber-400 pb-2 font-medium"
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create Form */}
          <div className="bg-stone-800 rounded-3xl p-8 shadow-2xl border border-stone-700">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              ➕ Luo uusi palvelu
            </h2>

            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Palvelun nimi
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Esim: Yksilövalmennustunti"
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Kuvaus
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Palvelun kuvaus..."
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Kesto (minuuttia)
                </label>
                <input
                  type="number"
                  name="duration"
                  required
                  min="15"
                  step="15"
                  placeholder="60"
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <p className="text-xs text-stone-500 mt-2">
                  15 minuutin välein (esim: 30, 45, 60, 90)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Hinta (€)
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  min="0"
                  required
                  placeholder="80"
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-700 text-white py-4 rounded-full font-medium transition-all hover:scale-105 disabled:hover:scale-100"
              >
                {creating ? '⏳ Luodaan...' : '➕ Luo palvelu'}
              </button>
            </form>
          </div>

          {/* Services List */}
          <div className="bg-stone-800 rounded-3xl p-8 shadow-2xl border border-stone-700">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              📋 Palvelut ({services.length})
            </h2>

            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {services.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-stone-500 italic">
                    Ei vielä palveluita. Luo ensimmäinen palvelu yllä olevalla lomakkeella.
                  </p>
                </div>
              ) : (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-stone-900 rounded-2xl p-5 border border-stone-700 hover:border-stone-600 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-1">
                          {service.title}
                        </h3>
                        {service.description && (
                          <p className="text-sm text-stone-400 mb-3 line-clamp-2">
                            {service.description}
                          </p>
                        )}
                      </div>
                      <span className={`ml-4 flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                        service.status === 'active'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {service.status === 'active' ? 'Aktiivinen' : 'Ei aktiivinen'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-stone-400">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{service.duration_minutes} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-amber-400 font-medium">{service.price}€</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleDelete(service.id, service.title)}
                        className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
                      >
                        Poista
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
