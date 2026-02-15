'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { materialsApi } from '@/lib/materialsApi';

interface Order {
  id: string;
  status: 'pending' | 'paid' | 'cancelled';
  payment_link?: string;
  paid_at?: string;
  created_at: string;
  email: string;
  name: string;
  material_title: string;
  price: number;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    loadOrders(token);
  }, [router]);

  const loadOrders = async (token: string) => {
    try {
      const data = await materialsApi.getAdminOrders(token);
      setOrders(data.orders);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load orders:', err);
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    }
  };

  const handleAddPaymentLink = async (orderId: string) => {
    if (!paymentLink.trim()) {
      alert('Syötä maksulinkki ensin!');
      return;
    }

    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) return;

    try {
      await materialsApi.addPaymentLink(orderId, paymentLink.trim(), adminToken);
      alert('✅ Maksulinkki lisätty!\n\nMuista lähettää linkki asiakkaalle sähköpostitse.');
      
      // Reload orders
      await loadOrders(adminToken);
      
      // Reset form
      setEditingOrderId(null);
      setPaymentLink('');
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    }
  };

  const handleMarkAsPaid = async (orderId: string, customerName: string) => {
    if (!confirm(`Merkitse tilaus maksetuksi?\n\nAsiakas: ${customerName}\n\nMateriaali avataan automaattisesti asiakkaalle.`)) {
      return;
    }

    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) return;

    try {
      await materialsApi.markAsPaid(orderId, adminToken);
      alert('✅ Tilaus merkitty maksetuksi!\n\nMateriaali on nyt asiakkaan käytössä.');
      
      // Reload orders
      await loadOrders(adminToken);
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
          <p className="mt-4 text-stone-400">Ladataan tilauksia...</p>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const paidOrders = orders.filter(o => o.status === 'paid');

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-white mb-2 font-serif">
                Tilausten hallinta
              </h1>
              <p className="text-stone-400">
                Lisää maksulinkkejä ja merkitse tilaukset maksetuiksi
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
              href="/admin/materials"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Materiaalit
            </Link>
            <Link
              href="/admin/orders"
              className="text-amber-400 border-b-2 border-amber-400 pb-2 font-medium"
            >
              Tilaukset
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700">
            <p className="text-stone-400 text-sm mb-2">Kaikki tilaukset</p>
            <p className="text-4xl font-light text-white">{orders.length}</p>
          </div>
          <div className="bg-amber-900/20 rounded-2xl p-6 border border-amber-700">
            <p className="text-amber-400 text-sm mb-2">Odottaa maksua</p>
            <p className="text-4xl font-light text-amber-300">{pendingOrders.length}</p>
          </div>
          <div className="bg-green-900/20 rounded-2xl p-6 border border-green-700">
            <p className="text-green-400 text-sm mb-2">Maksettu</p>
            <p className="text-4xl font-light text-green-300">{paidOrders.length}</p>
          </div>
        </div>

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              ⏳ Odottaa maksua ({pendingOrders.length})
            </h2>
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-800 rounded-2xl p-6 border border-amber-700 shadow-lg"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-medium text-white mb-1">
                            {order.material_title}
                          </h3>
                          <p className="text-stone-400 text-sm">
                            Tilattu: {new Date(order.created_at).toLocaleString('fi-FI')}
                          </p>
                        </div>
                        <span className="text-2xl font-light text-amber-400">
                          {order.price}€
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-stone-500 mb-1">Asiakas</p>
                          <p className="text-white font-medium">{order.name}</p>
                        </div>
                        <div>
                          <p className="text-stone-500 mb-1">Sähköposti</p>
                          <p className="text-white font-medium">{order.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-96 space-y-3">
                      {editingOrderId === order.id ? (
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
                              onClick={() => handleAddPaymentLink(order.id)}
                              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Tallenna linkki
                            </button>
                            <button
                              onClick={() => {
                                setEditingOrderId(null);
                                setPaymentLink('');
                              }}
                              className="px-4 bg-stone-700 hover:bg-stone-600 text-white py-2 rounded-lg text-sm transition-colors"
                            >
                              Peruuta
                            </button>
                          </div>
                        </>
                      ) : order.payment_link ? (
                        <>
                          <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 text-xs">
                            <p className="text-green-400 font-medium mb-1">✓ Maksulinkki lisätty</p>
                            <a 
                              href={order.payment_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-300 hover:underline break-all"
                            >
                              {order.payment_link}
                            </a>
                          </div>
                          <button
                            onClick={() => handleMarkAsPaid(order.id, order.name)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                          >
                            ✓ Merkitse maksetuksi
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditingOrderId(order.id)}
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

        {/* Paid Orders */}
        {paidOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              ✓ Maksetut tilaukset ({paidOrders.length})
            </h2>
            <div className="space-y-4">
              {paidOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-800 rounded-2xl p-6 border border-green-700/50"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-medium text-white">
                          {order.material_title}
                        </h3>
                        <span className="text-xl font-light text-green-400">
                          {order.price}€
                        </span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-stone-500">Asiakas</p>
                          <p className="text-white">{order.name}</p>
                        </div>
                        <div>
                          <p className="text-stone-500">Maksettu</p>
                          <p className="text-white">
                            {order.paid_at ? new Date(order.paid_at).toLocaleDateString('fi-FI') : '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-stone-500">Sähköposti</p>
                          <p className="text-white">{order.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-900/30 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                        ✓ Materiaali avattu
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="bg-stone-800 rounded-3xl p-16 text-center border border-stone-700">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-light text-white mb-3">
              Ei tilauksia
            </h3>
            <p className="text-stone-400">
              Tilaukset näkyvät täällä kun asiakkaat tilaavat materiaaleja
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
