import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const members = [
  { name: "Alya Putri", role: "CEO", initials: "AP" },
  { name: "Bima Pratama", role: "CTO", initials: "BP" },
  { name: "Citra Lestari", role: "Head of Design", initials: "CL" },
  { name: "Dafa Nugraha", role: "Lead Engineer", initials: "DN" },
  { name: "Eka Ramadhan", role: "PM", initials: "ER" },
  { name: "Fina Maharani", role: "Developer Advocate", initials: "FM" },
]

export function Team() {
  return (
    <section aria-labelledby="tim" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <h2 id="tim" className="text-2xl font-semibold md:text-3xl">
            Tim inti
          </h2>
          <p className="mt-2 text-muted-foreground">
            Wajah-wajah di balik produk—berorientasi pada pengguna dan hasil.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {members.map((m) => (
            <Card key={m.name}>
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/portrait-avatar.png" alt={`Foto ${m.name}`} />
                  <AvatarFallback>{m.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{m.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Fokus pada kolaborasi, kualitas, dan dampak nyata bagi pengguna.
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
