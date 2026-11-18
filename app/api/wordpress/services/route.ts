import { NextRequest, NextResponse } from "next/server"

const wordpressApiUrl =
  process.env.WORDPRESS_API_URL || "http://localhost:8080/wp-json/wp/v2"
const serviceGroups = new Set([
  "sigma",
  "areatiga",
  "merch",
  "sigaproeo",
  "studiomusic",
])

export async function GET(request: NextRequest) {
  const group = request.nextUrl.searchParams.get("group")
  if (!group || !serviceGroups.has(group)) {
    return NextResponse.json(
      { error: "A valid service group is required" },
      { status: 400 }
    )
  }

  const url = new URL(`${wordpressApiUrl}/siga_service`)
  url.searchParams.set("per_page", "100")
  url.searchParams.set("orderby", "id")
  url.searchParams.set("order", "asc")
  url.searchParams.set("_embed", "wp:featuredmedia")

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "WordPress services could not be loaded" },
        { status: response.status }
      )
    }

    const services: Array<Record<string, unknown>> = await response.json()
    const mappedServices = services
      .map((service) => {
        const embedded = service._embedded as
          | Record<string, Array<{ source_url?: string }>>
          | undefined
        const featuredMedia = embedded?.["wp:featuredmedia"]?.[0]
        const serviceData = service.siga_service_data as
          | Record<string, unknown>
          | undefined
        return {
          ...service,
          featured_media_url: featuredMedia?.source_url || null,
          service_data: serviceData || {},
        }
      })
      .filter((service) => service.service_data.siga_group === group)

    return NextResponse.json(mappedServices)
  } catch {
    return NextResponse.json(
      { error: "WordPress CMS is unavailable" },
      { status: 502 }
    )
  }
}
