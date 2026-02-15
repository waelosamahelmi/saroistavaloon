'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { materialsApi } from '@/lib/materialsApi';

interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'video' | 'pdf';
  price: number;
  thumbnail_url: string;
  preview_url: string;
  duration?: number;
}

const API_BASE = process.env.NEXT_PUBLIC_MATERIALS_API_URL || 'http://69.62.126.13:4000';

export default function MaterialPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    if (params.id) {
      materialsApi.getMaterial(params.id as string)
        .then(data => {
          setMaterial(data.material);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load material:', err);
          setError('Materiaalia ei löytynyt');
          setLoading(false);
        });
    }
  }, [params.id]);

  const handleOrder = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    
    if (!token) {
      // Redirect to login with return URL
      router.push(`/auth/login?redirect=/materiaalit/${params.id}`);
      return;
    }

    setOrdering(true);

    try {
      const result = await materialsApi.createOrder(params.id as string, token);
      
      if (result.success) {
        alert('✅ Tilaus luotu!\n\nSaat maksulinkin sähköpostitse 24 tunnin sisällä.');
        router.push('/omat-materiaalit');
      }
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    } finally {
      setOrdering(false);
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'hermosto': return 'Hermoston rauhoittaminen';
      case 'itsemyötätunto': return 'Itsemyötätunto';
      case 'parisuhde': return 'Parisuhde ja ihmissuhteet';
      default: return category;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          <p className="mt-4 text-stone-600">Ladataan...</p>
        </div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-light text-stone-800 mb-4">
            Materiaalia ei löytynyt
          </h1>
          <Link 
            href="/materiaalit"
            className="inline-block bg-stone-800 hover:bg-stone-900 text-white px-8 py-3 rounded-full transition-colors"
          >
            Takaisin materiaaleihin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/materiaalit"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Takaisin materiaaleihin
        </Link>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
              {getCategoryName(material.category)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-light text-stone-800 mb-6 font-serif">
            {material.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-stone-700 leading-relaxed mb-12 max-w-3xl">
            {material.description}
          </p>

          {/* Preview section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
            {/* Video Preview */}
            {material.type === 'video' && (
              <div className="relative bg-black">
                <video 
                  controls 
                  className="w-full"
                  poster={`${API_BASE}/${material.thumbnail_url}`}
                >
                  <source src={`${API_BASE}/${material.preview_url}`} type="video/mp4" />
                  Selaimesi ei tue videoita.
                </video>
                
                {/* Preview watermark */}
                <div className="absolute top-4 left-4 bg-amber-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  📺 Esikatselu (20 sekuntia)
                </div>

                {material.duration && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                    Koko video: {formatDuration(material.duration)}
                  </div>
                )}
              </div>
            )}

            {/* PDF Preview */}
            {material.type === 'pdf' && (
              <div className="relative">
                <iframe
                  src={`${API_BASE}/${material.preview_url}`}
                  className="w-full h-[700px] border-0"
                  title="PDF Preview"
                />
                
                {/* Preview watermark */}
                <div className="absolute top-4 left-4 bg-amber-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  📄 Esikatselu (1. sivu)
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="p-10 border-t border-stone-200 bg-gradient-to-b from-white to-stone-50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-sm uppercase tracking-wider text-stone-500 mb-2">
                    Hinta
                  </p>
                  <p className="text-5xl font-light text-amber-700 mb-2">
                    {material.price}€
                  </p>
                  <p className="text-sm text-stone-500">
                    Sisältää ALV 24%
                  </p>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={ordering}
                  className="bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white px-12 py-5 rounded-full text-lg font-medium transition-all hover:scale-105 disabled:hover:scale-100 shadow-lg"
                >
                  {ordering ? 'Luodaan tilausta...' : 'Tilaa koko materiaali'}
                </button>
              </div>
            </div>
          </div>

          {/* What you get */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-medium text-stone-800 mb-6 font-serif">
                📦 Mitä saat
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-stone-700">
                    Koko {material.type === 'video' ? 'video' : 'työkirja'} (täysi versio)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-stone-700">
                    Rajaton pääsy materiaaliin
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-stone-700">
                    Lataus omalle laitteelle
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-stone-700">
                    Turvallinen maksu Holvin kautta
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-2xl p-8 shadow-lg border border-amber-100">
              <h3 className="text-2xl font-medium text-stone-800 mb-6 font-serif">
                💡 Näin se toimii
              </h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    1
                  </span>
                  <span className="text-stone-700 pt-0.5">
                    Klikkaa "Tilaa koko materiaali"
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    2
                  </span>
                  <span className="text-stone-700 pt-0.5">
                    Luo tili tai kirjaudu sisään
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    3
                  </span>
                  <span className="text-stone-700 pt-0.5">
                    Saat maksulinkin sähköpostitse 24h sisällä
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    4
                  </span>
                  <span className="text-stone-700 pt-0.5">
                    Maksa turvallisesti Holvin kautta
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    5
                  </span>
                  <span className="text-stone-700 pt-0.5">
                    Materiaali avautuu automaattisesti tilillesi
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl p-10 shadow-lg">
            <h3 className="text-3xl font-light text-stone-800 mb-8 font-serif">
              Usein kysytyt kysymykset
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-stone-800 mb-2">
                  Milloin saan materiaalin käyttööni?
                </h4>
                <p className="text-stone-600">
                  Saat maksulinkin sähköpostitse 24 tunnin sisällä tilauksesta. Kun maksu on suoritettu, materiaali avautuu välittömästi.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-stone-800 mb-2">
                  Voiko materiaalin ladata omalle koneelle?
                </h4>
                <p className="text-stone-600">
                  Kyllä! Oston jälkeen voit ladata materiaalin omalle laitteellesi ja käyttää sitä offline-tilassa.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-stone-800 mb-2">
                  Miten maksu toimii?
                </h4>
                <p className="text-stone-600">
                  Maksu tapahtuu turvallisesti Holvin kautta. Voit maksaa pankki- tai luottokortilla, MobilePaylla tai verkkopankkitunnuksilla.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-stone-800 mb-2">
                  Voinko jakaa materiaalin muiden kanssa?
                </h4>
                <p className="text-stone-600">
                  Materiaalit on tarkoitettu henkilökohtaiseen käyttöön. Jakaminen tai levittäminen eteenpäin on kielletty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
