export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-light text-stone-800 mb-4 font-serif tracking-tight">
              Asiakasrajaus ja vastuuvapaus
            </h1>
            <p className="text-lg text-stone-600">
              Tärkeää tietoa palveluista ja rajauksista
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-500 rounded-full mt-6"></div>
          </div>

          {/* Online Courses */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 hover:shadow-xl transition-shadow animate-scale-in">
            <h2 className="text-2xl font-medium text-stone-800 mb-6 font-serif">Verkkokurssit</h2>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p>
                Säröistä valoon -verkkokurssit ja digitaaliset sisällöt ovat avoimia itseopiskeltavia materiaaleja ja ne ovat saatavilla kaikille.
              </p>
              <p>
                Kurssit eivät sisällä yksilöllistä ohjausta, henkilökohtaista palautetta tai vuorovaikutteista valmennusta.
              </p>
              <p className="font-medium text-stone-800 bg-amber-50/50 p-4 rounded-lg border border-amber-200">
                Verkkokurssit eivät ole terapiaa, hoitoa tai kuntoutusta, eivätkä ne muodosta asiakas- tai hoitosuhdetta.
              </p>
            </div>
          </div>

          {/* Individual Coaching */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-medium text-stone-800 mb-6 font-serif">Yksilöohjaus ja valmennus</h2>
            <div className="space-y-5 text-stone-700 leading-relaxed">
              <p className="text-lg">
                Roolien selkeän erottelun ja esteellisyyden välttämiseksi Säröistä valoon -yksilövalmennusta ei tarjota henkilöille, jotka ovat <strong className="text-stone-900 font-semibold">Päijät-Hämeen hyvinvointialueen sosiaali-, mielenterveys- tai päihdepalvelujen asiakkuudessa</strong>.
              </p>
              <p className="text-lg">
                Säröistä valoon -toiminta ei tarjoa hoitoa, terapiaa eikä henkilökohtaista neuvontaa näissä tilanteissa, eikä se ole osa sosiaali- tai terveydenhuollon palveluja.
              </p>
              <div className="bg-stone-50/50 rounded-xl p-6 border border-stone-200 mt-6">
                <p className="font-medium text-stone-800">
                  Yksilöohjausta tai valmennusta ei tarjota myöskään tilanteissa, joissa voisi syntyä <strong className="text-stone-900 font-semibold">esteellisyys, kaksoisrooli tai eturistiriita</strong> tekijän virkatyöhön nähden.
                </p>
              </div>
            </div>
          </div>

          {/* General Limitations */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-medium text-stone-800 mb-6 font-serif">Yleinen rajaus</h2>
            <div className="space-y-4 text-stone-700 leading-relaxed">
              <p className="text-lg">
                Säröistä valoon -toiminta on tekijän <strong className="text-stone-900 font-semibold">itsenäistä sivutoimista toimintaa</strong>, eikä se liity hänen virkatyöhönsä Päijät-Hämeen hyvinvointialueella.
              </p>
              <p>
                Sisällöt <strong className="text-stone-900 font-semibold">eivät korvaa</strong> terveydenhuollon, sosiaalipalvelujen tai muun ammatillisen avun palveluja.
              </p>
            </div>
          </div>

          {/* Crisis Support */}
          <div className="bg-red-50/80 border-2 border-red-200 rounded-2xl p-8 mb-8 animate-slide-up">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-medium text-red-900 mb-3 font-serif">
                  Akuutti kriisitilanne
                </h3>
                <p className="text-red-800 text-lg mb-4">
                  Akuutissa kriisitilanteessa kehotamme hakeutumaan oman alueen ammatillisen avun piiriin.
                </p>
                <div className="grid md:grid-cols-2 gap-3 bg-white/50 rounded-xl p-6">
                  <div>
                    <p className="font-medium text-red-900 mb-1">Hätänumero</p>
                    <p className="text-2xl font-bold text-red-700">112</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-900 mb-1">Kriisipuhelin</p>
                    <p className="text-lg text-red-700">09 2525 0111</p>
                    <p className="text-sm text-red-600">(24/7)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What Services Are */}
          <div className="bg-gradient-to-br from-amber-50/50 to-stone-50/50 rounded-2xl p-8 md:p-10 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-medium text-stone-800 mb-6 font-serif">Mitä valmennus on</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-stone-700 leading-relaxed">Ammatillista ohjausta ja tukea elämän eri tilanteisiin</span>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                  <span className="text-stone-700 leading-relaxed">Keskustelua, reflektiota ja itseymmärryksen tukemista</span>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </span>
                  <span className="text-stone-700 leading-relaxed">Turvallinen tila pysähtyä ja jäsentää ajatuksia</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-stone-700 leading-relaxed"><strong className="text-stone-900 font-semibold">Ei psykoterapiaa tai lääketieteellistä hoitoa</strong></span>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-stone-700 leading-relaxed"><strong className="text-stone-900 font-semibold">Ei Kela-tukea</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12 text-stone-600 animate-fade-in">
            <p className="text-lg">
              Jos sinulla on kysymyksiä palveluista tai rajauksista, ota yhteys:
            </p>
            <a href="/yhteystiedot" className="inline-flex items-center gap-2 mt-4 text-amber-700 hover:text-amber-800 font-medium transition-colors group">
              <span>Ota yhteys</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
