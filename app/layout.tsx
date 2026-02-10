import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Säröistä Valoon - Valmennus ja tuki elämän eri vaiheisiin",
  description: "Rauhallista ja ammatillista valmennusta vuorovaikutukseen, itseymmärrykseen ja elämän eri tilanteisiin. Etävalmennus omaan tahtiin.",
  keywords: "valmennus, coaching, itseymmärrys, vuorovaikutus, etävalmennus, ratkaisukeskeinen terapia, taideterapia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className={`scroll-smooth ${playfair.variable} ${inter.variable}`}>
      <body className={`${inter.className} antialiased bg-stone-50`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
