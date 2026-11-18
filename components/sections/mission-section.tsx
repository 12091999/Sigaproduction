import CmsImagePageSection from "@/components/cms-image-page-section"

export function MissionSection() {
  return (
    <CmsImagePageSection
      slug="mission-vision"
      id="mission"
      label="Our Mission and Vision"
      fallbackSrc="/images/siga-mission.jpeg"
      fallbackAlt="Our Mission and Vision - SIGA PRO slide"
    />
  )
}

export default MissionSection
