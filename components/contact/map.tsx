export function ContactMap() {
  return (
    <div className="rounded-lg overflow-clip border bg-card">
      <div className="p-4">
        <h3 className="text-lg font-medium">Lokasi Kantor</h3>
        <p className="text-sm text-muted-foreground">Kunjungi kami di alamat yang tertera pada peta berikut.</p>
      </div>
      <div className="aspect-[16/9] w-full">
        <iframe
          title="Peta Lokasi CV.Sigaproductions"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d987.2620995697481!2d114.3766804!3d-8.1978794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1451edf736e05%3A0x5f862c984e83a149!2sStudio%203%20Banyuwangi!5e0!3m2!1sen!2sid!4v1759616877830!5m2!1sen!2sid"
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
