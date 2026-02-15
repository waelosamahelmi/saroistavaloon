'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { materialsApi } from '@/lib/materialsApi';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/omat-materiaalit';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Salasanat eivät täsmää');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Salasanan tulee olla vähintään 6 merkkiä');
      setLoading(false);
      return;
    }

    try {
      const result = await materialsApi.register(email, password, name);
      
      if (result.success) {
        // Store token and user info
        localStorage.setItem('userToken', result.token);
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', result.user.name);
        
        // Redirect
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.message || 'Rekisteröityminen epäonnistui');
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
            Luo tili
          </h1>
          <p className="text-stone-600">
            Aloita matkasi kohti valoa
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                Nimi
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Matti Virtanen"
              />
            </div>

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
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Vähintään 6 merkkiä"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700 mb-2">
                Vahvista salasana
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Kirjoita salasana uudelleen"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white py-4 rounded-full font-medium transition-all hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? 'Luodaan tiliä...' : 'Luo tili'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-stone-500">
            Rekisteröitymällä hyväksyt palvelun{' '}
            <Link href="/tietosuoja" className="text-amber-700 hover:text-amber-800">
              tietosuojakäytännön
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-stone-600 text-sm">
              Onko sinulla jo tili?{' '}
              <Link 
                href={`/auth/login${redirect !== '/omat-materiaalit' ? `?redirect=${redirect}` : ''}`}
                className="text-amber-700 hover:text-amber-800 font-medium"
              >
                Kirjaudu sisään
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
