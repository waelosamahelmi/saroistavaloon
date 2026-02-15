import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact.jpg"
            alt="Ota yhteyttä"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-light mb-4 font-serif tracking-tight">
              Yhteystiedot
            </h1>
            <p className="text-lg opacity-90">
              Ota yhteyttä - vastaan viesteihin mahdollisimman pian
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Email */}
            <div className="bg-white rounded-3xl shadow-xl p-12 hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-stone-800 mb-4 font-serif">Sähköposti</h3>
              <a href="mailto:saroistavaloon@gmail.com" className="text-amber-700 hover:text-amber-800 break-all text-lg">
                saroistavaloon@gmail.com
              </a>
              <p className="text-sm text-stone-500 mt-2">Ensisijainen yhteydenottotapa</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-3xl shadow-xl p-12 hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.446-.52.149-.174.198-.298.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-stone-800 mb-4 font-serif">WhatsApp</h3>
              <a href="https://wa.me/3584576552868" className="text-green-600 hover:text-green-700 text-lg">
                045 765 528 682
              </a>
              <p className="text-sm text-stone-500 mt-2">Viestit suositeltavia</p>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-amber-50/50 rounded-3xl p-12 mb-8 border border-amber-200">
            <h3 className="text-xl font-medium text-stone-800 mb-4 font-serif">Huomioitavaa</h3>
            <ul className="space-y-3 text-stone-700 text-lg">
              <li className="flex items-start">
                <span className="text-amber-700 mr-3 text-xl">•</span>
                <span>Yhteydenotot ensisijaisesti sähköpostilla tai WhatsApp-viestillä</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-700 mr-3 text-xl">•</span>
                <span>En vastaa puheluihin reaaliaikaisesti</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-700 mr-3 text-xl">•</span>
                <span>Vastaan viesteihin 1-2 arkipäivän kuluessa</span>
              </li>
            </ul>
          </div>

          {/* Implementation Details */}
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <h3 className="text-2xl font-medium text-stone-800 mb-6 font-serif">Toteutus</h3>
            <div className="space-y-5 text-lg text-stone-700">
              <div>
                <p className="font-medium text-stone-900 mb-2">Tapaamiset:</p>
                <p>Etänä: Zoom, Teams</p>
              </div>
              <div>
                <p className="font-medium text-stone-900 mb-2">Yhteydenotto:</p>
                <p>Viestitse (WhatsApp tai sähköposti)</p>
              </div>
              <p className="text-stone-600 italic pt-4">
                Tarkempi rytmi sovitaan kartoituksen yhteydessä.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="/varaa-aika" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-700 to-amber-600 text-white px-12 py-5 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 font-medium">
              <span>Varaa aika</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
