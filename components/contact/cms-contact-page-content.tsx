"use client"

import { useEffect, useState } from "react"

import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo, ContactDetails } from "@/components/contact/contact-info"
import { ContactMap } from "@/components/contact/map"
import { Separator } from "@/components/ui/separator"
import { CmsContactData, CmsPage } from "@/lib/wordpress"

type ContactPageContent = ContactDetails & {
  heroTitle: string
  heroDescription: string
  legalTitle: string
  companyName: string
  director: string
  deputyDirector: string
  officeLabel: string
  officeAddress: string
  npwp: string
  nib: string
  kemenkumham: string
  notary: string
  formTitle: string
  formDescription: string
  mapTitle: string
  mapDescription: string
  mapEmbedUrl: string
}

const defaultContent: ContactPageContent = {
  heroTitle: "Kontak CV.Sigaproductions",
  heroDescription: "Butuh proposal, konsultasi, atau ingin berdiskusi proyek? Tim kami siap membantu Anda.",
  legalTitle: "LEGALITAS",
  companyName: "CV. SIGA PRODUCTION",
  director: "M. W. SENA SUBRATA",
  deputyDirector: "BERLIANDA OKTAVIANI Y.",
  officeLabel: "OUR OFFICE",
  officeAddress: "BANYUWANGI\nJL. KARIMUNJAWA NO.15 A\nLATENG, BANYUWANGI\nJAWA TIMUR\n68413",
  npwp: "66.078.407.5-627.000",
  nib: "9120312031076",
  kemenkumham: "AHU-0082481-AH.01.15",
  notary: "DIAN PERTIWI S.H., M.Kn.",
  sectionTitle: "Informasi Kontak",
  email: "Sigaproduction03@gmail.com",
  phone: "+62 819-3487-2954",
  whatsapp: "6281934872954",
  address: "Jl. Karimun Jawa No. 15 Lateng, Kec. Banyuwangi Kabpaten Banyuwangi, Jawa Timur 68413",
  hours: "Senin–Minggu, 10.00–23.00 WIB",
  emailButton: "Kirim Email",
  whatsappButton: "Chat WhatsApp",
  formTitle: "Kirim Pesan",
  formDescription: "Isi formulir di bawah ini. Kami akan segera membalas melalui email atau WhatsApp.",
  mapTitle: "Lokasi Kantor",
  mapDescription: "Kunjungi kami di alamat yang tertera pada peta berikut.",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d987.2620995697481!2d114.3766804!3d-8.1978794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1451edf736e05%3A0x5f862c984e83a149!2sStudio%203%20Banyuwangi!5e0!3m2!1sen!2sid!4v1759616877830!5m2!1sen!2sid",
}

const contactFieldMap: Record<keyof ContactPageContent, string> = {
  heroTitle: "siga_contact_hero_title",
  heroDescription: "siga_contact_hero_description",
  legalTitle: "siga_contact_legal_title",
  companyName: "siga_contact_company_name",
  director: "siga_contact_director",
  deputyDirector: "siga_contact_deputy_director",
  officeLabel: "siga_contact_office_label",
  officeAddress: "siga_contact_office_address",
  npwp: "siga_contact_npwp",
  nib: "siga_contact_nib",
  kemenkumham: "siga_contact_kemenkumham",
  notary: "siga_contact_notary",
  sectionTitle: "siga_contact_section_title",
  email: "siga_contact_email",
  phone: "siga_contact_phone",
  whatsapp: "siga_contact_whatsapp",
  address: "siga_contact_address",
  hours: "siga_contact_hours",
  emailButton: "siga_contact_email_button",
  whatsappButton: "siga_contact_whatsapp_button",
  formTitle: "siga_contact_form_title",
  formDescription: "siga_contact_form_description",
  mapTitle: "siga_contact_map_title",
  mapDescription: "siga_contact_map_description",
  mapEmbedUrl: "siga_contact_map_embed_url",
}

function mapContactPage(data: CmsContactData | undefined): ContactPageContent {
  if (!data) return defaultContent

  return Object.fromEntries(
    Object.entries(defaultContent).map(([field, fallback]) => [
      field,
      data[contactFieldMap[field as keyof ContactPageContent]] || fallback,
    ])
  ) as ContactPageContent
}

export default function CmsContactPageContent() {
  const [content, setContent] = useState(defaultContent)

  useEffect(() => {
    let active = true
    fetch("/api/wordpress/pages?slug=contact")
      .then((response) => {
        if (!response.ok) throw new Error("WordPress contact page unavailable")
        return response.json()
      })
      .then((page: CmsPage<CmsContactData>) => {
        if (active) setContent(mapContactPage(page.contact_data))
      })
      .catch((error: unknown) => {
        console.error("Could not load contact page content from WordPress:", error)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="min-h-dvh">
      <header className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-pretty">
            {content.heroTitle}
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty max-w-2xl">
            {content.heroDescription}
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 pt-10 md:pt-14">
        <div className="rounded-lg p-8" style={{ backgroundColor: "#7A1818" }}>
          <div className="pb-2" style={{ borderBottom: "4px solid #B22222", width: "fit-content" }}>
            <h2 className="text-2xl font-semibold text-white">{content.legalTitle}</h2>
          </div>

          <div className="mt-6 grid items-start gap-10 text-white md:grid-cols-2">
            <div className="space-y-4 border-r-4 border-[#B22222] pr-6 text-sm">
              <p><strong>{content.companyName}</strong></p>
              <p><strong>DIREKTUR:</strong><br />{content.director}</p>
              <p><strong>WAKIL DIREKTUR:</strong><br />{content.deputyDirector}</p>
              <p className="mt-6 font-semibold">{content.officeLabel}</p>
              <p className="whitespace-pre-line">{content.officeAddress}</p>
            </div>

            <div className="space-y-6 pl-6 text-sm">
              {[
                ["NPWP", content.npwp],
                ["NIB", content.nib],
                ["SK KEMENKUMHAM", content.kemenkumham],
                ["NOTARIS", content.notary],
              ].map(([label, value]) => (
                <div key={label} className="border-t-4 border-[#B22222] pt-4">
                  <p className="font-semibold">{label}</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-10 md:pb-14">
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ContactInfo details={content} />
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-lg border bg-card">
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold text-pretty">{content.formTitle}</h2>
                <p className="mt-2 text-muted-foreground">{content.formDescription}</p>
                <Separator className="my-6" />
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ContactMap
            title={content.mapTitle}
            description={content.mapDescription}
            embedUrl={content.mapEmbedUrl}
          />
        </div>
      </section>
    </main>
  )
}
