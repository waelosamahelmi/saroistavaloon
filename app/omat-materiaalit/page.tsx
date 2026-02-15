'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { materialsApi } from '@/lib/materialsApi';

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf';
  thumbnail_url: string;
  full_url: string;
  duration?: number;
  unlocked_at: string;
}

interface Order {
  id: string;
  status: 'pending' | 'paid' | 'cancelled';
  paid_at?: string;
  created_at: string;
  title: string;
  price: number;
  thumbnail_url: string;
}

const API_BASE = process.env.NEXT_PUBLIC_MATERIALS_API_URL || 'http://69.62.126.13:4000';

export default function MyMaterialsPage() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState<'materials' | 'orders'>('materials');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const name = localStorage.getItem('userName') || 'Käyttäjä';
    
    if (!token) {
      router.push('/auth/login?redirect=/omat-materiaalit');
      return;
    }

    setUserName(name);

    // Load both materials and orders
    Promise.all([
      materialsApi.getMyMaterials(token),
      materialsApi.getMyOrders(token)
    ])
      .then(([materialsData, ordersData]) => {
        setMaterials(materialsData.materials);
        setOrders(ordersData.orders);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        // Token might be invalid
        localStorage.removeItem('userToken');
        router.push('/auth/login?redirect=/omat-materiaalit');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    router.push('/materiaalit');
  };

  const handleDownload = (materialId: string, title: string) => {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    const downloadUrl = materialsApi.getDownloadUrl(materialId, token);
    
    // Create temporary link to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          <p className="mt-4 text-stone-600">Ladataan materiaaleja...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-stone-800 mb-2 font-serif">
                Tervetuloa, {userName}
              </h1>
              <p className="text-stone-600">
                Täällä näet ostamasi materiaalit ja tilauksesi
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
            href="/materiaalit"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Selaa lisää materiaaleja
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-4 px-6 font-medium transition-all ${
              activeTab === 'materials'
                ? 'text-amber-700 border-b-2 border-amber-700'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Materiaalit ({materials.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-6 font-medium transition-all ${
              activeTab === 'orders'
                ? 'text-amber-700 border-b-2 border-amber-700'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Tilaukset ({orders.length})
          </button>
        </div>

        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div>
            {materials.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-light text-stone-800 mb-3">
                  Et ole vielä ostanut materiaaleja
                </h3>
                <p className="text-stone-600 mb-6">
                  Selaa saatavilla olevia materiaaleja ja aloita matkasi kohti valoa
                </p>
                <Link
                  href="/materiaalit"
                  className="inline-block bg-stone-800 hover:bg-stone-900 text-white px-8 py-3 rounded-full transition-colors"
                >
                  Selaa materiaaleja
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                  >
                    {material.thumbnail_url && (
                      <div className="relative h-48 bg-stone-100">
                        <img
                          src={`${API_BASE}/${material.thumbnail_url}`}
                          alt={material.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          ✓ Ostettu
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-stone-800 mb-2 font-serif">
                        {material.title}
                      </h3>
                      <p className="text-sm text-stone-600 mb-4 line-clamp-2">
                        {material.description}
                      </p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownload(material.id, material.title)}
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Lataa
                        </button>
                        <Link
                          href={`${API_BASE}/${material.full_url}`}
                          target="_blank"
                          className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Avaa
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-2xl font-light text-stone-800 mb-3">
                  Ei tilauksia
                </h3>
                <p className="text-stone-600">
                  Et ole vielä tehnyt yhtään tilausta
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-6 shadow-lg flex items-center gap-6"
                  >
                    {order.thumbnail_url && (
                      <img
                        src={`${API_BASE}/${order.thumbnail_url}`}
                        alt={order.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-stone-800 mb-1">
                        {order.title}
                      </h3>
                      <p className="text-stone-600 text-sm mb-2">
                        Tilattu: {new Date(order.created_at).toLocaleDateString('fi-FI')}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-medium text-stone-800">
                          {order.price}€
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status === 'paid' && '✓ Maksettu'}
                          {order.status === 'pending' && '⏳ Odottaa maksua'}
                          {order.status === 'cancelled' && '✗ Peruttu'}
                        </span>
                      </div>
                    </div>

                    {order.status === 'pending' && (
                      <div className="text-sm text-stone-600 text-right">
                        <p className="mb-1">Saat maksulinkin</p>
                        <p className="font-medium">sähköpostitse 24h sisällä</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
