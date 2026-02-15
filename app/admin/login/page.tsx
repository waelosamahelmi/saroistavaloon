'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { materialsApi } from '@/lib/materialsApi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await materialsApi.adminLogin(password);
      
      if (result.success) {
        // Store admin token
        localStorage.setItem('adminToken', result.token);
        
        // Redirect to materials management
        router.push('/admin/materials');
      }
    } catch (err: any) {
      setError(err.message || 'Väärä salasana');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-4xl font-light text-white mb-3 font-serif">
            Admin-kirjautuminen
          </h1>
          <p className="text-stone-400">
            Materiaalien hallintapaneeli
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-stone-800 rounded-3xl shadow-2xl p-10 border border-stone-700">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-300 mb-2">
                Admin-salasana
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white placeholder-stone-500"
                placeholder="••••••••"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-600 text-white py-4 rounded-full font-medium transition-all hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-stone-500">
            Vain ylläpitäjille
          </div>
        </div>
      </div>
    </div>
  );
}
