import CmsImagePageSection from "@/components/cms-image-page-section"

export function ServicesSection() {
  return (
    <CmsImagePageSection
      slug="offered-services"
      id="services"
      label="Our Offered Services"
      fallbackSrc="/images/siga-services.jpeg"
      fallbackAlt="Our Offered Services - SIGA PRO slide"
      priority
    />
  )
}

export default ServicesSection
