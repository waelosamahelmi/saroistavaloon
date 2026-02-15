export default function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-50/30 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-4">
            Palvelut & Hinnat
          </h1>
          <p className="text-lg text-slate-600">
            Valitse sinulle sopiva valmennusmuoto
          </p>
        </div>

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Individual Coaching */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-medium text-slate-800 mb-2">
                  Yksilöllinen valmennus (etänä)
                </h2>
                <p className="text-slate-600">
                  Rauhallista ja ammatillista tukea vuorovaikutukseen, itseymmärrykseen ja elämän erilaisiin tilanteisiin.
                </p>
              </div>
            </div>
            <p className="text-slate-700 mb-6">
              Valmennus etenee sinun tahdissasi ja keskittyy siihen, mikä on sinulle juuri nyt merkityksellistä.
            </p>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">45 min etäohjaus</p>
                <p className="text-2xl font-semibold text-slate-800">49 €</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">60 min etäohjaus</p>
                <p className="text-2xl font-semibold text-slate-800">65 €</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-1">3 kerran paketti</p>
                <p className="text-2xl font-semibold text-slate-800">180 €</p>
                <p className="text-xs text-slate-500 mt-1">60 € / kerta</p>
              </div>
              <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4">
                <p className="text-sm text-blue-600 mb-1">5 kerran paketti</p>
                <p className="text-2xl font-semibold text-blue-800">300 €</p>
                <p className="text-xs text-blue-600 mt-1">60 € / kerta</p>
              </div>
            </div>

            <a href="/varaa-aika?service=yksilovalmennus" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
              Varaa aika
            </a>
          </div>

          {/* 14-day Program */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-medium text-slate-800 mb-2">
              14 päivän etä valmennusjakso
            </h2>
            <p className="text-slate-700 mb-4">
              Selkeä ja rajattu valmennusjakso, jossa saat tukea arkeen, pohdintaan ja muutoksen alkuun.
            </p>
            <p className="text-slate-600 mb-6">
              Jakso tarjoaa tilaa pysähtymiselle, sanoittamiselle ja uusien näkökulmien löytämiselle.
            </p>
            <p className="text-slate-600 mb-6">
              Hinnan jälkeen selitys valmennuksesta:
            </p>
            <div className="space-y-3 text-slate-700 mb-6 text-sm">
              <p>• Jakso sisältää viestiohjausta</p>
              <p>• Mahdollisia puheluita</p>
              <p>• Alkuvaiheen kartoituksen</p>
            </div>
            <p className="text-slate-500 italic text-sm mb-6">
              Valmennus ei sisällä videovälitteisiä tai tapaamisia kuvia.
            </p>
            
            <div className="inline-block border border-slate-200 rounded-lg p-4 mb-6">
              <p className="text-2xl font-semibold text-slate-800">129 €</p>
            </div>

            <div className="block">
              <a href="/varaa-aika?service=14paivaa" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
                Varaa jakso
              </a>
            </div>
          </div>

          {/* Short Support Sessions */}
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-medium text-slate-800 mb-2">
              Lyhyet tukijaksot
            </h2>
            <p className="text-slate-700 mb-4">
              Kevyempiä valmennushetkiä yksittäisiin tilanteisiin, kysymyksiin tai päätöksenteon tueksi.
            </p>
            <p className="text-slate-600 mb-6">
              Sopii silloin, kun et tarvitse pitkää prosessia, vaan tilaa ajatella ja tulla kuulluksi.
            </p>
            
            <div className="inline-block border border-slate-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-slate-600 mb-1">45 min etäohjaus</p>
              <p className="text-2xl font-semibold text-slate-800">59 €</p>
            </div>
          </div>

        </div>

        {/* Initial Assessment */}
        <div className="max-w-4xl mx-auto mt-12 bg-blue-50/50 rounded-2xl p-8">
          <h3 className="text-xl font-medium text-slate-800 mb-4">
            Alkukartoitus ennen valmennusta
          </h3>
          <div className="space-y-3 text-slate-700">
            <p>
              Ennen valmennuksen alkamista teemme aina lyhyen alkukartoituksen.
            </p>
            <p>
              Kartoituksessa käymme yhdessä läpi tilanteesi ja toiveesi, ja arvioimme, millainen työskentely olisi sinulle sopivaa.
            </p>
            <p className="font-medium text-slate-800">Alkukartoitus toteutetaan:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>puhelimitse</li>
              <li>viestitse</li>
              <li>tai näiden yhdistelmänä</li>
            </ul>
            <p className="text-sm text-slate-600 italic">
              Toteutustapa valitaan asiakkaan toiveiden mukaan.
            </p>
          </div>
        </div>

        {/* Important Notes */}
        <div className="max-w-4xl mx-auto mt-8 bg-slate-100 rounded-xl p-6">
          <h4 className="font-medium text-slate-800 mb-3">Huomioitavaa</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Valmennus perustuu keskusteluun, reflektioon ja ammatilliseen ohjaukseen</li>
            <li>• Työskentely tukee itseymmärrystä ja elämän eri tilanteiden jäsentymistä rauhallisessa ja turvallisessa ilmapiirissä</li>
            <li>• <strong>Valmennus ei korvaa psykoterapiaa tai lääketieteellistä hoitoa</strong></li>
            <li>• Palveluun ei saa Kela-tukea</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
