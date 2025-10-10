import { Card, CardContent, CardHeader } from "@/components/ui/card"

const quotes = [
  {
    quote: "Waktu rilis kami turun drastis, kualitas tetap terjaga. Kolaborasi jadi jauh lebih mudah.",
    author: "Product Lead, Fintech",
  },
  {
    quote: "Tooling yang matang dan dokumentasi yang jelas—membuat tim baru cepat beradaptasi.",
    author: "Engineering Manager, SaaS",
  },
  {
    quote: "Performa aplikasi meningkat signifikan dan SEO melonjak. Solusi yang solid.",
    author: "Head of Marketing, E‑commerce",
  },
]

export function Testimonials() {
  return (
    <section aria-labelledby="testimoni" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <h2 id="testimoni" className="text-2xl font-semibold md:text-3xl">
            Apa kata mereka
          </h2>
          <p className="mt-2 text-muted-foreground">Beberapa cuplikan dari para pelanggan dan mitra kami.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Card key={i}>
              <CardHeader>
                <p className="text-pretty text-lg leading-relaxed">“{q.quote}”</p>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">— {q.author}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
