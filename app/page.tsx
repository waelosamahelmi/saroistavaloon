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
            <Link href="/varaa-aika" className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-900 text-white px-8 py-3 rounded-full transition-colors font-medium">
              <span>Varaa aika</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
