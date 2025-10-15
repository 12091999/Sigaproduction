"use client"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type ContactPayload = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  company?: string // honeypot
}

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onSubmit(formData: FormData) {
    setSuccess(null)
    setError(null)

    const payload: ContactPayload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
    }

    // validasi sederhana client-side
    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      setError("Mohon lengkapi semua bidang yang wajib diisi.")
      return
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.message || "Gagal mengirim pesan.")
        }
        setSuccess("Pesan Anda berhasil dikirim. Kami akan membalas segera!")
      } catch (e: any) {
        setError(e?.message || "Terjadi kesalahan saat mengirim pesan.")
      }
    })
  }

  return (
    <form action={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" aria-describedby="form-status">
      {/* Honeypot untuk anti-spam */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="space-y-2">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input id="name" name="name" placeholder="Nama Anda" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="nama@perusahaan.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">No. Telepon / WhatsApp</Label>
        <Input id="phone" name="phone" placeholder="+62 ..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subjek</Label>
        <Input id="subject" name="subject" placeholder="Judul pesan" required />
      </div>

      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Ceritakan kebutuhan Anda secara singkat..."
          className="min-h-[140px]"
          required
        />
      </div>

      <div className="md:col-span-2 flex items-center justify-between gap-3 pt-2">
        <p id="form-status" className="text-sm text-muted-foreground" aria-live="polite" role="status">
          {isPending ? "Mengirim..." : success ? success : error ? error : "Kami menghargai privasi Anda."}
        </p>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <span className="size-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              Mengirim...
            </span>
          ) : (
            "Kirim Pesan"
          )}
        </Button>
      </div>
    </form>
  )
}
