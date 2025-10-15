import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}) as any)
    const { name, email, phone, subject, message, company } = body || {}

    // Honeypot check
    if (company) {
      return NextResponse.json({ ok: false, message: "Spam terdeteksi." }, { status: 400 })
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, message: "Bidang wajib masih kosong." }, { status: 400 })
    }

    // Di sini Anda bisa mengirim email via provider pilihan (SendGrid, Resend, dll.)
    // atau menyimpan ke database. Untuk demo, kita hanya log ke server.
    console.log("[Contact] Incoming message:", {
      name,
      email,
      phone,
      subject,
      message,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false, message: "Terjadi kesalahan pada server." }, { status: 500 })
  }
}
