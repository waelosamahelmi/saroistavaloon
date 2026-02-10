import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20">
      {/* Hero Section */}
      <section className="relative min-h-[700px] md:min-h-[800px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-nature.jpg"
            alt="Säröistä Valoon - Rauhallinen tunnelma"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-stone-800">
            <h1 className="text-7xl md:text-9xl font-light mb-8 leading-tight font-serif tracking-tight">
              Säröistä Valoon
            </h1>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-2xl md:text-3xl font-light text-stone-800 leading-relaxed">
                Itseopiskeltavia digitaalisia materiaaleja ja etävalmennusta
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                Pysähdy. Ole läsnä. Etene omaan tahtiisi.
              </p>
            </div>

            <div className="w-32 h-0.5 bg-amber-700/50 mx-auto my-10"></div>

            <div className="mt-8">
              <Link href="/materiaalit" className="group inline-flex items-center gap-4 bg-stone-800 hover:bg-stone-900 text-white px-14 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl font-medium">
                <span className="text-xl md:text-2xl">Materiaalit</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light text-stone-800 mb-8 font-serif">
            Mitä tarjoan
          </h2>
          <div className="w-24 h-0.5 bg-amber-700/50 rounded-full mx-auto mb-12"></div>

          <div className="max-w-3xl mx-auto space-y-4 text-lg text-stone-600 leading-relaxed">
            <p>
              PDF-materiaaleja ja minikursseja hermoston rauhoittamiseen, tunteiden säätelyyn ja itseymmärrykseen.
            </p>
            <p>
              Materiaalit on tarkoitettu sinulle, joka haluat pysähtyä, jäsentää ajatuksiasi ja edetä omaan tahtiisi.
            </p>
            <p>
              Tarjoan myös etävalmennusta yksilölliseen työskentelyyn – luotettavaa tukea, kun kaipaat ohjausta matkallasi.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/coach-mervi.jpg"
                alt="Mervi"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/5"></div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="inline-block px-4 py-2 bg-amber-100/50 text-amber-900 rounded-full text-sm font-medium mb-4">
                  Mervi
                </div>
                <h2 className="text-5xl md:text-6xl font-light text-stone-800 mb-8 leading-tight font-serif">
                  Lempeä ja kuunteleva lähestymistapa
                </h2>
                <div className="w-24 h-0.5 bg-amber-700/50 rounded-full mb-8"></div>
              </div>

              <div className="space-y-5 text-xl text-stone-700 leading-relaxed">
                <p>
                  Työskentelyni pohjautuu lempeään ja kuuntelevaan lähestymistapaan. Uskon, että kaikkea ei tarvitse korjata tai muuttaa väkisin – usein riittää, että asioille annetaan tilaa tulla nähdyiksi ja sanoitetuiksi.
                </p>
                <p>
                  <strong className="text-stone-900 font-semibold">Säröistä valoon</strong> kuvaa tapaani tukea itsensä kehittymistä: matkaa keskeneräisyydestä kohti selkeyttä, ymmärrystä ja omannäköistä suuntaa.
                </p>
                <p>
                  Olen ratkaisukeskeinen lyhytterapeutti sekä NLP Practitioner -opiskelija. Taustani sosiaali- ja terveysalalla tuo työhöni inhimillistä ymmärrystä, selkeyttä ja vastuullista rajaamista.
                </p>
                <p>
                  Tarjoan itseopiskeltavia materiaaleja sekä etäohjausta, jotka tukevat itsetuntemusta, pysähtymistä ja omien voimavarojen vahvistamista – rauhassa, omaan tahtiin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Etävalmennus - lyhyt osio */}
      <section className="container mx-auto px-4 py-24 bg-gradient-to-b from-transparent to-amber-50/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-stone-800 font-serif">
              Etävalmennus
            </h2>
            <div className="w-20 h-0.5 bg-amber-700/50 rounded-full mx-auto mt-6"></div>
            <p className="text-lg text-stone-600 mt-6">
              Lisäksi tarjoan etävalmennusta yksilölliseen työskentelyyn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-100">
              <h3 className="text-lg font-medium text-stone-800 mb-2 font-serif">
                Henkilökohtainen
              </h3>
              <p className="text-base text-stone-600 mb-4">
                60 min etäohjaus
              </p>
              <p className="text-2xl font-light text-amber-700">75 €</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-100">
              <h3 className="text-lg font-medium text-stone-800 mb-2 font-serif">
                3 kertaa
              </h3>
              <p className="text-base text-stone-600 mb-4">
                Henkilökohtainen tuki
              </p>
              <p className="text-2xl font-light text-amber-700">225 €</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-stone-100">
              <h3 className="text-lg font-medium text-stone-800 mb-2 font-serif">
                5 kertaa
              </h3>
              <p className="text-base text-stone-600 mb-4">
                Kattava paketti
              </p>
              <p className="text-2xl font-light text-amber-700">375 €</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/varaa" className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-900 text-white px-8 py-3 rounded-full transition-colors font-medium">
              <span>Varaa aika</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-stone-900 to-stone-950 text-stone-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
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

            {/* Quick Links */}
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

            {/* Contact */}
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
                    <span>045 765 528 682</span>
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
