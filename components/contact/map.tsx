type ContactMapProps = {
  title: string
  description: string
  embedUrl: string
}

export function ContactMap({ title, description, embedUrl }: ContactMapProps) {
  return (
    <div className="rounded-lg overflow-clip border bg-card">
      <div className="p-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="aspect-[16/9] w-full">
        <iframe
          title="Peta Lokasi CV.Sigaproductions"
          src={embedUrl}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
