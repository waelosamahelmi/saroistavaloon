'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    materialsApi.getMaterials()
      .then(data => {
        setMaterials(data.materials);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load materials:', err);
        setError('Materiaalien lataus epäonnistui');
        setLoading(false);
      });
  }, []);

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'hermosto': return 'Hermoston rauhoittaminen';
      case 'itsemyotanto': return 'Itsemyötätunto - Sisäinen suhde itseesi';
      case 'vuorovaikutus': return 'Vuorovaikutus & omat rajat';
      case 'parisuhde': return 'Parisuhde & läheiset ihmissuhteet';
      default: return category;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20">
      {/* OSIO 1 – ALOITUS */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/materiaalit-hero.jpg"
            alt="Varjohahmot suolla"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-100/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-stone-800">
            <h1 className="text-5xl md:text-7xl font-light mb-10 leading-tight font-serif">
              Itseopiskeltavat materiaalit
            </h1>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-2xl md:text-3xl font-light text-stone-800 leading-relaxed">
                Säröistä valoon -valmennuksen rinnalla on saatavilla itseopiskeltavia PDF-materiaaleja ja minikursseja.
              </p>

              <p className="text-xl text-stone-700 leading-relaxed">
                Materiaalit on tarkoitettu sinulle, joka haluat pysähtyä, jäsentää ajatuksiasi ja edetä omaan tahtiisi.
              </p>

              <div className="w-24 h-0.5 bg-amber-700/50 mx-auto my-8"></div>

              <div className="text-left max-w-2xl mx-auto space-y-4 text-lg text-stone-700">
                <p className="font-medium text-stone-900">Teemat liittyvät erityisesti:</p>
                <ul className="space-y-2 ml-8 list-disc">
                  <li>Hermoston rauhoittaminen</li>
                  <li>Itsemyötätunto - Sisäinen suhde itseesi</li>
                  <li>Vuorovaikutus & omat rajat</li>
                  <li>Parisuhde & läheiset ihmissuhteet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OSIO 2 – MATERIAALIT */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-stone-800 font-serif">
              Saatavilla olevat materiaalit
            </h2>
            <div className="w-24 h-0.5 bg-amber-700/50 rounded-full mx-auto mt-8"></div>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
              <p className="mt-4 text-stone-600">Ladataan materiaaleja...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {!loading && !error && materials.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-stone-600 italic">
                Materiaaleja julkaistaan pian. Seuraa päivityksiä!
              </p>
            </div>
          )}

          {!loading && !error && materials.length > 0 && (
            <div className="grid md:grid-cols-3 gap-10">
              {materials.map((material) => (
                <div 
                  key={material.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  {material.thumbnail_url && (
                    <div className="relative h-48 w-full bg-stone-100">
                      <img
                        src={`${API_BASE}/${material.thumbnail_url}`}
                        alt={material.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Type badge */}
                      <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {material.type === 'video' ? '🎬 Video' : '📄 PDF'}
                      </div>
                      {/* Duration badge for videos */}
                      {material.type === 'video' && material.duration && (
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                          {formatDuration(material.duration)}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-8">
                    {/* Category */}
                    <p className="text-xs uppercase tracking-wider text-amber-700 font-medium mb-2">
                      {getCategoryName(material.category)}
                    </p>

                    {/* Title */}
                    <h3 className="text-2xl font-medium text-stone-800 mb-4 font-serif">
                      {material.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-stone-600 leading-relaxed mb-6 line-clamp-3">
                      {material.description}
                    </p>

                    {/* Price & CTA */}
                    <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                      <div>
                        <p className="text-3xl font-light text-amber-700">
                          {material.price}€
                        </p>
                        <p className="text-xs text-stone-500">sis. ALV 24%</p>
                      </div>

                      <Link
                        href={`/materiaalit/${material.id}`}
                        className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-full transition-colors text-sm font-medium"
                      >
                        Katso esikatselu
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-stone-900 to-stone-950 text-stone-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <Link href="/" className="hover:opacity-90 transition-opacity inline-block">
                <Image
                  src="/images/logo.webp"
                  alt="Säröistä Valoon"
                  width={100}
                  height={30}
                  className="object-contain mb-4"
                />
              </Link>
              <p className="text-stone-400 leading-relaxed">
                Säröistä Valoon tarjoaa itseopiskeltavia digitaalisia materiaaleja.
              </p>
              <div className="w-16 h-0.5 bg-amber-700/50 rounded-full"></div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 text-lg">Linkit</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Etusivu
                  </Link>
                </li>
                <li>
                  <Link href="/materiaalit" className="text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Materiaalit
                  </Link>
                </li>
                <li>
                  <Link href="/yhteystiedot" className="text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Yhteystiedot
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 text-lg">Yhteystiedot</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="mailto:saroistavaloon@gmail.com"
                    className="text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-3 group"
                  >
                    <svg className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">saroistavaloon@gmail.com</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://wa.me/3584576552868"
                    className="text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-3 group"
                  >
                    <svg className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.446-.52.149-.174.198-.298.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>045 765 528 68</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-500 text-sm">
              &copy; {new Date().getFullYear()} Säröistä Valoon. Kaikki oikeudet pidätetään.
            </p>
            <p className="text-stone-600 text-sm">
              Made with <span className="text-amber-600">♥</span> by <Link href="https://helmies.fi" target="_blank" className="text-amber-600 hover:text-amber-500 transition-colors">Helmies</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
