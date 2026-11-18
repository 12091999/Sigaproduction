import CmsPropertyDetail from "@/components/cms-property-detail"

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <CmsPropertyDetail slug={slug} />
}
