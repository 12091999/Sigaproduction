const events = [
  {
    year: "2018",
    title: "Berdiri",
    desc: "CV.Sigaproduction hadir untuk menjembatani karya dan pengalaman panggung.",
  },
  {
    year: "2019",
    title: "Fondasi",
    desc: "Memulai sebagai tim kecil yang fokus pada tooling dan pengalaman developernya.",
  },
  {
    year: "2020",
    title: "Studio 3 Musik",
    desc: "Memperluas layanan ke rekaman, produksi, mixing & mastering.",
  },
  {
    year: "2021",
    title: "Skala",
    desc: "Mengadopsi praktik CI/CD modern, melayani klien lintas industri.",
  },
  {
    year: "2022",
    title: "Studio Tiga Movie & Art",
    desc: "Menambah produksi film pendek, video klip, dan konten visual.",
  },
  {
    year: "2023",
    title: "Ekspansi",
    desc: "Menambah solusi observability dan kinerja end‑to‑end.",
  },
  {
    year: "2024",
    title: "Event Organize",
    desc: "Menangani konser, peluncuran, tur, dan event musik end‑to‑end.",
  },
  {
    year: "2025",
    title: "Kini",
    desc: "Platform komprehensif untuk membangun, menguji, dan meluncurkan aplikasi web.",
  },
]

export function Timeline() {
  return (
    <section aria-labelledby="sejarah" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-8 max-w-2xl">
          <h2 id="sejarah" className="text-2xl font-semibold md:text-3xl">
            Perjalanan kami
          </h2>
          <p className="mt-2 text-muted-foreground">Tonggak penting yang membentuk produk dan budaya kami.</p>
        </div>

        <ol className="relative space-y-8 border-l pl-6">
          {events.map((e) => (
            <li key={e.year}>
              <div className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-primary" />
              <p className="text-sm text-muted-foreground">{e.year}</p>
              <h3 className="text-lg font-medium">{e.title}</h3>
              <p className="text-muted-foreground">{e.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
