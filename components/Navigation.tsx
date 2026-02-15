"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-stone-100/95 backdrop-blur-md shadow-lg border-b border-stone-200" 
        : "bg-amber-50/95 backdrop-blur-sm border-b border-amber-100"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo - extra small */}
          <Link 
            href="/" 
            className="hover:opacity-90 transition-opacity"
          >
            <Image
              src="/images/logo.webp"
              alt="Säröistä Valoon"
              width={80}
              height={22}
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-stone-700 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-50"
            >
              Etusivu
            </Link>
            <Link 
              href="/palvelut" 
              className="px-4 py-2 text-stone-700 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-50"
            >
              Palvelut
            </Link>
            <Link 
              href="/materiaalit" 
              className="px-4 py-2 text-stone-700 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-50"
            >
              Materiaalit
            </Link>
            <Link 
              href="/yhteystiedot" 
              className="px-4 py-2 text-stone-700 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-50"
            >
              Yhteystiedot
            </Link>
            <Link 
              href="/varaa-aika" 
              className="ml-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white px-6 py-3 rounded-full hover:from-amber-800 hover:to-amber-700 transition-all shadow-md hover:shadow-lg hover:scale-105 font-medium"
            >
              Varaa aika
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-amber-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-stone-200 animate-slide-up">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="px-4 py-3 text-stone-700 hover:text-amber-700 hover:bg-amber-50 transition-colors rounded-lg" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Etusivu
              </Link>
              <Link 
                href="/palvelut" 
                className="px-4 py-3 text-stone-700 hover:text-amber-700 hover:bg-amber-50 transition-colors rounded-lg" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Palvelut
              </Link>
              <Link 
                href="/materiaalit" 
                className="px-4 py-3 text-stone-700 hover:text-amber-700 hover:bg-amber-50 transition-colors rounded-lg" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Materiaalit
              </Link>
              <Link 
                href="/yhteystiedot" 
                className="px-4 py-3 text-stone-700 hover:text-amber-700 hover:bg-amber-50 transition-colors rounded-lg" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Yhteystiedot
              </Link>
              <Link 
                href="/varaa-aika" 
                className="mx-4 mt-4 bg-gradient-to-r from-amber-700 to-amber-600 text-white px-6 py-3 rounded-full hover:from-amber-800 hover:to-amber-700 transition-all text-center font-medium shadow-md" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Varaa aika
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
