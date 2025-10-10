import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const items = [
  { value: "120+", label: "Proyek terselesaikan" },
  { value: "75+", label: "Event musik ditangani" },
  { value: "40+", label: "Rilisan & video diproduksi" },
  { value: "98%", label: "Kepuasan klien" },
]

export function Stats() {
  return (
    <section aria-labelledby="statistik" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 id="statistik" className="sr-only">
          Statistik singkat
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {items.map((it) => (
            <Card key={it.label} className="bg-card">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold text-primary">{it.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{it.label}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
