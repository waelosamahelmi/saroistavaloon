import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
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
              Rauhallista ja ammatillista valmennusta elämän eri vaiheisiin.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-500 rounded-full"></div>
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
                <Link href="/palvelut" className="text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Palvelut
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
              <li>
                <Link href="/vastuuvapaus" className="text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Vastuuvapaus
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
                  href="https://wa.me/358765528682" 
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

        <div className="border-t border-stone-800 pt-8">
          <p className="text-stone-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Säröistä Valoon. Kaikki oikeudet pidätetään.
          </p>
        </div>
      </div>
    </footer>
  );
}
