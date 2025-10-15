import type { Metadata } from "next"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactMap } from "@/components/contact/map"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Kontak | CV.Sigaproductions",
  description: "Hubungi CV.Sigaproductions untuk penawaran, kolaborasi, dan informasi layanan produksi.",
}

export default function ContactPage() {
  return (
    <main className="min-h-dvh">
      <header className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-pretty">
            Kontak CV.Sigaproductions
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty max-w-2xl">
            Butuh proposal, konsultasi, atau ingin berdiskusi proyek? Tim kami siap membantu Anda.
          </p>
        </div>
      </header>

        <section className="container mx-auto px-4 pt-10 md:pt-14">
        <div
            className="rounded-lg p-8"
            style={{ backgroundColor: "#7A1818" }}
  >
            {/* Garis bawah judul LEGALITAS */}
            <div className="pb-2" style={{ borderBottom: "#B22222",width:"fit-content", }}>
            <h2 className="text-2xl font-semibold text-white">
                LEGALITAS
            </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 text-white mt-6 items-start">
            
            {/* Kolom Kiri dengan garis kanan */}
            <div
                className="space-y-4 text-sm pr-6"
                style={{ borderRight: "4px solid #B22222" }}
            >
                <p><strong>CV. SIGA PRODUCTION</strong></p>
                <p>
                <strong>DIREKTUR:</strong><br />
                M. W. SENA SUBRATA
                </p>
                <p>
                <strong>WAKIL DIREKTUR:</strong><br />
                BERLIANDA OKTAVIANI Y.
                </p>
                <p className="mt-6 font-semibold">OUR OFFICE</p>
                <p>
                BANYUWANGI<br />
                JL. KARIMUNJAWA NO.15 A<br />
                LATENG, BANYUWANGI<br />
                JAWA TIMUR<br />
                68413
                </p>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6 text-sm pl-6">
                <div className="border-t-4 pt-4" style={{ borderColor: "#B22222" }}>
                <p className="font-semibold">NPWP</p>
                <p>66.078.407.5-627.000</p>
                </div>
                <div className="border-t-4 pt-4" style={{ borderColor: "#B22222" }}>
                <p className="font-semibold">NIB</p>
                <p>9120312031076</p>
                </div>
                <div className="border-t-4 pt-4" style={{ borderColor: "#B22222" }}>
                <p className="font-semibold">SK KEMENKUMHAM</p>
                <p>AHU-0082481-AH.01.15</p>
                </div>
                <div className="border-t-4 pt-4" style={{ borderColor: "#B22222" }}>
                <p className="font-semibold">NOTARIS</p>
                <p>DIAN PERTIWI S.H., M.Kn.</p>
                </div>
            </div>

            </div>
        </div>
        </section>



      {/* === FORM & KONTAK === */}
      <section className="container mx-auto px-4 pb-10 md:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-lg border bg-card">
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold text-pretty">
                  Kirim Pesan
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Isi formulir di bawah ini. Kami akan segera membalas melalui email atau WhatsApp.
                </p>
                <Separator className="my-6" />
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ContactMap />
        </div>
      </section>
    </main>
  )
}
