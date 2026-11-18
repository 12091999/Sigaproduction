"use client"

import { useEffect, useState } from "react"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { stripHtml } from "@/lib/wordpress"

const defaultFooter = {
  title: "CV.Sigaproduction",
  subtitle: "Studio Tiga Banyuwangi",
  description:
    "Studio Tiga Banyuwangi adalah tempat dan wadah bagi pemusik local banyuwangi dan mencetak karya-karya musik yang berkualitas.",
  logo: "/images/SP.jpg",
  address:
    "Jl. Karimun Jawa No. 15 Lateng, Kec. Banyuwangi Kabpaten Banyuwangi, Jawa Timur 68413",
  phone: "0819-3487-2954",
  email: "Sigaproduction03@gmail.com",
  facebook: "#",
  twitter: "#",
  instagram: "#",
  youtube: "#",
  homeUrl: "#",
  aboutUrl: "/about",
  servicesUrl: "/services",
  rentUrl: "#",
  galleryUrl: "https://www.instagram.com/sigaproduction/",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d987.2620995697481!2d114.3766804!3d-8.1978794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1451edf736e05%3A0x5f862c984e83a149!2sStudio%203%20Banyuwangi!5e0!3m2!1sen!2sid!4v1759616877830!5m2!1sen!2sid",
}

type CmsFooterData = {
  title: { rendered: string }
  content: { rendered: string }
  featured_media_url: string | null
  footer_data?: Record<string, string>
}

export default function Footer() {
  const [footer, setFooter] = useState(defaultFooter)

  useEffect(() => {
    fetch("/api/wordpress/pages?slug=site-footer")
      .then((response) => {
        if (!response.ok) throw new Error("WordPress footer content unavailable")
        return response.json()
      })
      .then((page: CmsFooterData) => {
        const data = page.footer_data || {}
        setFooter({
          title: stripHtml(page.title.rendered) || defaultFooter.title,
          subtitle: data.siga_footer_subtitle || defaultFooter.subtitle,
          description: stripHtml(page.content.rendered) || defaultFooter.description,
          logo: page.featured_media_url || defaultFooter.logo,
          address: data.siga_footer_address || defaultFooter.address,
          phone: data.siga_footer_phone || defaultFooter.phone,
          email: data.siga_footer_email || defaultFooter.email,
          facebook: data.siga_footer_facebook || defaultFooter.facebook,
          twitter: data.siga_footer_twitter || defaultFooter.twitter,
          instagram: data.siga_footer_instagram || defaultFooter.instagram,
          youtube: data.siga_footer_youtube || defaultFooter.youtube,
          homeUrl: data.siga_footer_home_url || defaultFooter.homeUrl,
          aboutUrl: data.siga_footer_about_url || defaultFooter.aboutUrl,
          servicesUrl: data.siga_footer_services_url || defaultFooter.servicesUrl,
          rentUrl: data.siga_footer_rent_url || defaultFooter.rentUrl,
          galleryUrl: data.siga_footer_gallery_url || defaultFooter.galleryUrl,
          mapEmbedUrl: data.siga_footer_map_embed_url || defaultFooter.mapEmbedUrl,
        })
      })
      .catch((error: unknown) => {
        console.error("Could not load footer content from WordPress:", error)
      })
  }, [])

  return (
    <footer className="bg-red border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                    src={footer.logo}
                    alt="Logo Sigaproduction"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                    />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-black-900">{footer.title}</h3>
                <p className="text-sm text-black-600">{footer.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-black-600 leading-relaxed">
              {footer.description}
            </p>
            <div className="flex gap-4">
              <Link href={footer.facebook} className="text-white-600 hover:text-blue-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href={footer.twitter} className="text-white-600 hover:text-blue-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href={footer.instagram} className="text-white-600 hover:text-blue-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href={footer.youtube} className="text-white-600 hover:text-blue-900 transition-colors">
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
                  href={footer.homeUrl}
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Beranda
                </Link>
              </li>
              <li>
                <Link
                  href={footer.aboutUrl}
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Tentang Studio 3
                </Link>
              </li>
              <li>
                <Link
                  href={footer.servicesUrl}
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Service
                </Link>
              </li>
              <li>
                <Link
                  href={footer.rentUrl}
                  className="text-white-600 hover:text-blue-900 transition-colors text-sm flex items-center gap-2"
                >
                  <span className="text-white-400">›</span> Rent & Sales
                </Link>
              </li>
              <li>
                <Link
                    href={footer.galleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  {footer.address}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-blue-900 flex-shrink-0" />
                <span className="text-sm text-white-600">{footer.phone}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-900 flex-shrink-0" />
                <span className="text-sm text-white-600">{footer.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mb-8">
          <h3 className="font-bold text-lg text-white-900 mb-4">Lokasi Kami</h3>
          <div className="w-full h-[400px] rounded-lg overflow-hidden border">
            <iframe
              src={footer.mapEmbedUrl}
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
