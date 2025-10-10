import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-red border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="text-xs font-bold text-red-900">LOGO</div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-black-900">CV.Sigaproduction</h3>
                <p className="text-sm text-black-600">Studio Tiga Banyuwangi</p>
              </div>
            </div>
            <p className="text-sm text-black-600 leading-relaxed">
              Studio Tiga Banyuwangi adalah tempat dan wadah bagi pemusik local banyuwangi
              dan mencetak karya-karya musik yang berkualitas.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white-600 hover:text-blue-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white-600 hover:text-blue-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white-600 hover:text-blue-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white-600 hover:text-blue-900 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Link Cepat Section */}
          <div>
            <h3 className="font-bold text-lg text-white-900 mb-4">Link Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Tentang Studio 3
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Rent & Sales
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Galeri
                </Link>
              </li>
            </ul>
          </div>
          {/* Kontak Section */}
          <div>
            <h3 className="font-bold text-lg text-white-900 mb-4">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white-600">
                  Jl. Karimun Jawa No. 15 Lateng, Kec. Banyuwangi Kabpaten Banyuwangi, Jawa Timur 68413
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-blue-900 flex-shrink-0" />
                <span className="text-sm text-white-600">0819-3487-2954</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-900 flex-shrink-0" />
                <span className="text-sm text-white-600">Sigaproduction03@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mb-8">
          <h3 className="font-bold text-lg text-white-900 mb-4">Lokasi Kami</h3>
          <div className="w-full h-[400px] rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d987.2620995697481!2d114.3766804!3d-8.1978794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1451edf736e05%3A0x5f862c984e83a149!2sStudio%203%20Banyuwangi!5e0!3m2!1sen!2sid!4v1759616877830!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="STUDIO TIGA Banyuwangi Location"
            />
          </div>
        </div>

        {/* Copyright Section */}
      </div>
    </footer>
  )
}
