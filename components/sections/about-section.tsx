import CmsImagePageSection from "@/components/cms-image-page-section"

export function AboutSection() {
  return (
    <CmsImagePageSection
      slug="company-profile"
      id="about"
      label="About the Company"
      fallbackSrc="/images/siga-about.png"
      fallbackAlt="About the Company - SIGA PRO slide"
    />
  )
}

export default AboutSection
