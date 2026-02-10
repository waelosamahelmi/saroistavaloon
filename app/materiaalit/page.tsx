import Link from "next/link";
import Image from "next/image";

export default function MaterialsPage() {
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
                  <li>vuorovaikutukseen ja omiin rajoihin</li>
                  <li>parisuhteeseen ja läheisiin ihmissuhteisiin</li>
                  <li>itsemyötätuntoon</li>
                  <li>hermoston rauhoittamiseen</li>
                </ul>

                <p className="pt-6 text-base text-stone-600 italic">
                  Materiaalit löytyvät tältä sivulta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OSIO 2 – TYÖSKENTELYTAPA */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/coach-mervi.jpg"
                alt="Mervi"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/5"></div>
            </div>

            {/* Text */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-8 leading-tight font-serif">
                  Lempeä ja luonnollinen työskentelytapa
                </h2>
                <div className="w-20 h-0.5 bg-amber-700/50 rounded-full mb-8"></div>
              </div>

              <div className="space-y-6 text-xl text-stone-700 leading-relaxed">
                <p>
                  Työskentelyni pohjautuu lempeään ja kuuntelevaan lähestymistapaan. Asioita ei tarvitse korjata väkisin.
                </p>
                <p>
                  Niille annetaan tilaa tulla nähdyiksi ja sanoitetuiksi.
                </p>
                <p className="text-stone-600 italic pt-4">
                  <strong className="text-stone-800">Säröistä valoon</strong> kuvaa tapaani tukea itsensä kehittymistä: matkaa keskeneräisyydestä kohti selkeyttä, ymmärrystä ja omannäköistä suuntaa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OSIO 3 – MATERIAALIT */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-stone-800 font-serif">
              Materiaalit
            </h2>
            <div className="w-24 h-0.5 bg-amber-700/50 rounded-full mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Hermoston rauhoittaminen */}
            <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition-shadow border border-stone-100">
              <div className="w-16 h-16 bg-amber-100/50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364-12 7.636z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-stone-800 mb-4 font-serif">
                Hermoston rauhoittaminen
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Hermoston rauhoittamiseen liittyviä PDF- ja videomateriaaleja
              </p>
              <p className="text-sm text-stone-500 italic">
                Materiaalit ovat käytettävissä itsenäisesti, omaan tahtiin
              </p>
            </div>

            {/* Itsemyötätunto */}
            <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition-shadow border border-stone-100">
              <div className="w-16 h-16 bg-amber-100/50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-stone-800 mb-4 font-serif">
                Itsemyötätunto
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Itsemyötätuntoon liittyviä PDF- ja videomateriaaleja
              </p>
              <p className="text-sm text-stone-500 italic">
                Materiaalit on rakennettu käytettäväksi itsenäisesti, ilman suorittamista
              </p>
            </div>

            {/* Parisuhde ja ihmissuhteet */}
            <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition-shadow border border-stone-100">
              <div className="w-16 h-16 bg-amber-100/50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364-12 7.636z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-stone-800 mb-4 font-serif">
                Parisuhde ja ihmissuhteet
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Vuorovaikutukseen ja omiin rajoihin liittyviä materiaaleja
              </p>
              <p className="text-sm text-stone-500 italic">
                Materiaalit tukevat läheisten ihmissuhteiden jäsentämistä
              </p>
            </div>
          </div>

          {/* Lisää materiaaleja -ilmoitus */}
          <div className="mt-16 text-center">
            <p className="text-lg text-stone-600 italic">
              Lisää materiaaleja julkaistaan vaiheittain
            </p>
          </div>
        </div>
      </section>

      {/* Etävalmennus - erillinen osio */}
      <section className="container mx-auto px-4 py-24 bg-gradient-to-b from-transparent to-amber-50/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-stone-800 font-serif">
              Etävalmennus
            </h2>
            <div className="w-20 h-0.5 bg-amber-700/50 rounded-full mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-100">
              <h3 className="text-xl font-medium text-stone-800 mb-4 font-serif">
                Henkilökohtainen etäohjaus
              </h3>
              <p className="text-lg text-stone-600 mb-6">
                60 min etäohjaus
              </p>
              <p className="text-3xl font-light text-amber-700 mb-6">75 €</p>
              <Link href="/varaa" className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-900 text-white px-8 py-3 rounded-full transition-colors font-medium">
                <span>Varaa aika</span>
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-100">
              <h3 className="text-xl font-medium text-stone-800 mb-4 font-serif">
                Paketit
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-stone-700">3 kertaa</span>
                  <span className="text-2xl font-light text-amber-700">225 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-700">5 kertaa</span>
                  <span className="text-2xl font-light text-amber-700">375 €</span>
                </div>
              </div>
              <Link href="/varaa" className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-900 text-white px-8 py-3 rounded-full transition-colors font-medium">
                <span>Valitse paketti</span>
              </Link>
            </div>
          </div>
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
