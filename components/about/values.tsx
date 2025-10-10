import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const values = [
  {
    title: "Kreativitas",
    desc: "Ide orisinal yang diwujudkan ke karya musik, visual, dan pengalaman panggung.",
  },
  {
    title: "Profesionalisme",
    desc: "Tepat waktu, transparan, dan detail-oriented dari pra‑produksi hingga eksekusi.",
  },
  {
    title: "Kolaborasi",
    desc: "Berkolaborasi erat dengan klien, artis, dan mitra untuk hasil terbaik.",
  },
]

export function Values() {
  return (
    <section aria-labelledby="nilai" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <h2 id="nilai" className="text-2xl font-semibold md:text-3xl">
            Nilai yang kami pegang
          </h2>
          <p className="mt-2 text-muted-foreground">
            Prinsip yang menuntun kami dalam membangun dan bekerja setiap hari.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title}>
              <CardHeader>
                <CardTitle>{v.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{v.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
