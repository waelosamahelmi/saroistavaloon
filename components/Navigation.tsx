'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-light text-slate-800 font-serif">
            Säröistä Valoon
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Etusivu
            </Link>
            <Link href="/materiaalit" className="text-slate-600 hover:text-slate-900 transition-colors">
              Materiaalit
            </Link>
            <Link href="/varaa-aika" className="text-slate-600 hover:text-slate-900 transition-colors">
              Varaa aika
            </Link>
            <Link href="/omat-varaukset" className="text-slate-600 hover:text-slate-900 transition-colors">
              Omat varaukset
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <Link href="/" className="block py-2 text-slate-600 hover:text-slate-900">
              Etusivu
            </Link>
            <Link href="/materiaalit" className="block py-2 text-slate-600 hover:text-slate-900">
              Materiaalit
            </Link>
            <Link href="/varaa-aika" className="block py-2 text-slate-600 hover:text-slate-900">
              Varaa aika
            </Link>
            <Link href="/omat-varaukset" className="block py-2 text-slate-600 hover:text-slate-900">
              Omat varaukset
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
