'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { materialsApi } from '@/lib/materialsApi';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/omat-materiaalit';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await materialsApi.login(email, password);
      
      if (result.success) {
        // Store token and user info
        localStorage.setItem('userToken', result.token);
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', result.user.name);
        
        // Redirect
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.message || 'Kirjautuminen epäonnistui');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-stone-800 mb-3 font-serif">
            Kirjaudu sisään
          </h1>
          <p className="text-stone-600">
            Pääset käsiksi ostemiisi materiaaleihin
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                Sähköpostiosoite
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="matti@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                Salasana
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white py-4 rounded-full font-medium transition-all hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-stone-600 text-sm">
              Eikö sinulla ole vielä tiliä?{' '}
              <Link 
                href={`/auth/register${redirect !== '/omat-materiaalit' ? `?redirect=${redirect}` : ''}`}
                className="text-amber-700 hover:text-amber-800 font-medium"
              >
                Luo tili
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/materiaalit"
            className="text-stone-600 hover:text-stone-800 text-sm inline-flex items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Takaisin materiaaleihin
          </Link>
        </div>
      </div>
    </div>
  );
}
