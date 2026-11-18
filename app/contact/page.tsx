import type { Metadata } from "next"

import CmsContactPageContent from "@/components/contact/cms-contact-page-content"

export const metadata: Metadata = {
  title: "Kontak | CV.Sigaproductions",
  description: "Hubungi CV.Sigaproductions untuk penawaran, kolaborasi, dan informasi layanan produksi.",
}

export default function ContactPage() {
  return <CmsContactPageContent />
}
