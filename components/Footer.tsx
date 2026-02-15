export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Säröistä Valoon</h3>
            <p className="text-slate-400">
              Tukea ja valmennusta kohti valoisampaa tulevaisuutta
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Linkit</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="/" className="hover:text-white transition-colors">Etusivu</a></li>
              <li><a href="/materiaalit" className="hover:text-white transition-colors">Materiaalit</a></li>
              <li><a href="/varaa-aika" className="hover:text-white transition-colors">Varaa aika</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Yhteystiedot</h4>
            <p className="text-slate-400">
              Sähköposti: info@saroistavaloon.fi
            </p>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Säröistä Valoon. Kaikki oikeudet pidätetään.</p>
        </div>
      </div>
    </footer>
  );
}
