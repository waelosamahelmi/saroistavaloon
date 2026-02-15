'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { materialsApi } from '@/lib/materialsApi';

export default function AdminMaterialsPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Load existing materials
    materialsApi.getAdminMaterials(token)
      .then(data => {
        setMaterials(data.materials);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load materials:', err);
        // Token might be invalid
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      });
  }, [router]);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setProgress('Ladataan tiedostoa...');

    const formData = new FormData(e.currentTarget);
    const adminToken = localStorage.getItem('adminToken');

    if (!adminToken) {
      alert('Kirjaudu ensin admin-tilille');
      setUploading(false);
      return;
    }

    try {
      setProgress('Käsitellään materiaalia... (tämä voi kestää 15-30 sekuntia)');
      const result = await materialsApi.uploadMaterial(formData, adminToken);
      
      if (result.success) {
        alert('✅ Materiaali ladattu onnistuneesti!\n\nEsikatselu ja pikkukuva generoitiin automaattisesti.');
        (e.target as HTMLFormElement).reset();
        
        // Reload materials list
        const data = await materialsApi.getAdminMaterials(adminToken);
        setMaterials(data.materials);
      }
    } catch (error: any) {
      alert('❌ Lataus epäonnistui: ' + error.message);
    } finally {
      setUploading(false);
      setProgress('');
    }
  };

  const handleDelete = async (materialId: string, title: string) => {
    if (!confirm(`Haluatko varmasti poistaa materiaalin "${title}"?\n\nTätä ei voi perua!`)) {
      return;
    }

    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) return;

    try {
      await materialsApi.deleteMaterial(materialId, adminToken);
      alert('✅ Materiaali poistettu');
      
      // Reload materials list
      const data = await materialsApi.getAdminMaterials(adminToken);
      setMaterials(data.materials);
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
                Materiaalien hallinta
              </h1>
              <p className="text-stone-400">
                Lataa, hallitse ja poista materiaaleja
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
              className="text-amber-400 border-b-2 border-amber-400 pb-2 font-medium"
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
              href="/admin/palvelut"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Palvelut
            </Link>
            <Link
              href="/admin/saatavuus"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Saatavuus
            </Link>
            <Link
              href="/admin/varaukset"
              className="text-stone-400 hover:text-white pb-2 transition-colors"
            >
              Varaukset
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="bg-stone-800 rounded-3xl p-8 shadow-2xl border border-stone-700">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              ⬆️ Lataa uusi materiaali
            </h2>

            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Tiedosto (Video tai PDF)
                </label>
                <input
                  type="file"
                  name="file"
                  accept="video/mp4,video/quicktime,application/pdf"
                  required
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 file:cursor-pointer"
                />
                <p className="text-xs text-stone-500 mt-2">
                  Max 500MB. MP4, MOV tai PDF. Esikatselu luodaan automaattisesti.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Otsikko
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Esim: Hermoston rauhoittaminen"
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
                  required
                  placeholder="Materiaalin kuvaus..."
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Kategoria
                </label>
                <select
                  name="category"
                  required
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="hermosto">Hermoston rauhoittaminen</option>
                  <option value="itsemyötätunto">Itsemyötätunto</option>
                  <option value="parisuhde">Parisuhde ja ihmissuhteet</option>
                </select>
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
                  placeholder="25"
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {progress && (
                <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4 text-amber-200 text-sm">
                  {progress}
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-700 text-white py-4 rounded-full font-medium transition-all hover:scale-105 disabled:hover:scale-100"
              >
                {uploading ? '⏳ Ladataan ja käsitellään...' : '⬆️ Lataa materiaali'}
              </button>
            </form>
          </div>

          {/* Materials List */}
          <div className="bg-stone-800 rounded-3xl p-8 shadow-2xl border border-stone-700">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">
              📚 Materiaalit ({materials.length})
            </h2>

            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {materials.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-stone-500 italic">
                    Ei vielä materiaaleja. Lataa ensimmäinen materiaali yllä olevalla lomakkeella.
                  </p>
                </div>
              ) : (
                materials.map((material) => (
                  <div
                    key={material.id}
                    className="bg-stone-900 rounded-2xl p-4 border border-stone-700 hover:border-stone-600 transition-colors"
                  >
                    <div className="flex gap-4">
                      {material.thumbnail_url && (
                        <img
                          src={`http://69.62.126.13:4000/${material.thumbnail_url}`}
                          alt={material.title}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-lg font-medium text-white truncate">
                            {material.title}
                          </h3>
                          <span className="flex-shrink-0 px-3 py-1 bg-amber-900/30 text-amber-400 rounded-full text-xs font-medium">
                            {material.type === 'video' ? '🎬 Video' : '📄 PDF'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-stone-400 mb-2 line-clamp-2">
                          {material.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-stone-500">
                            <span>{material.price}€</span>
                            <span>•</span>
                            <span className="capitalize">{material.category}</span>
                            <span>•</span>
                            <span className={material.status === 'active' ? 'text-green-400' : 'text-red-400'}>
                              {material.status === 'active' ? 'Aktiivinen' : 'Ei aktiivinen'}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => handleDelete(material.id, material.title)}
                            className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
                          >
                            Poista
                          </button>
                        </div>
                      </div>
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
