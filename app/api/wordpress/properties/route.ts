import { NextRequest, NextResponse } from "next/server"

const wordpressApiUrl =
  process.env.WORDPRESS_API_URL || "http://localhost:8080/wp-json/wp/v2"

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")
  const url = new URL(`${wordpressApiUrl}/siga_property`)
  url.searchParams.set("per_page", "100")
  url.searchParams.set("orderby", "id")
  url.searchParams.set("order", "asc")
  url.searchParams.set("_embed", "wp:featuredmedia")
  if (slug) url.searchParams.set("slug", slug)

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "WordPress rental properties could not be loaded" },
        { status: response.status }
      )
    }

    const posts: Array<Record<string, unknown>> = await response.json()
    const properties = posts.map((post) => {
      const embedded = post._embedded as
        | Record<string, Array<{ source_url?: string; alt_text?: string }>>
        | undefined
      return {
        ...post,
        featured_media_url:
          embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        featured_media_alt:
          embedded?.["wp:featuredmedia"]?.[0]?.alt_text || null,
      }
    })

    if (slug) {
      if (!properties.length) {
        return NextResponse.json(
          { error: "WordPress rental property not found" },
          { status: 404 }
        )
      }
      return NextResponse.json(properties[0])
    }

    return NextResponse.json(properties)
  } catch {
    return NextResponse.json(
      { error: "WordPress CMS is unavailable" },
      { status: 502 }
    )
  }
}
