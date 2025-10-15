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
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-pretty">Kontak CV.Sigaproductions</h1>
          <p className="mt-3 text-muted-foreground text-pretty max-w-2xl">
            Butuh proposal, konsultasi, atau ingin berdiskusi proyek? Tim kami siap membantu Anda.
          </p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-lg border bg-card">
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold text-pretty">Kirim Pesan</h2>
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
