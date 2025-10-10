import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section id="kontak" aria-labelledby="aksi" className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-xl border bg-secondary p-8 md:p-12">
          <div className="grid items-center gap-6 md:grid-cols-[1.3fr,1fr]">
            <div>
              <h2 id="aksi" className="text-2xl font-semibold md:text-3xl">
                Siap wujudkan proyek atau event Anda?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Dari merchandise hingga konser, kami siap membantu dari konsep sampai eksekusi.
              </p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <Button asChild>
                <Link href="mailto:info@sigaproduction.co.id">Kirim Email</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#unit-bisnis">Lihat Layanan</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
