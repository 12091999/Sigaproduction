import { NextRequest, NextResponse } from "next/server"

const wordpressApiUrl =
  process.env.WORDPRESS_API_URL || "http://localhost:8080/wp-json/wp/v2"

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")
  if (!slug) {
    return NextResponse.json(
      { error: "A WordPress page slug is required" },
      { status: 400 }
    )
  }

  const url = new URL(`${wordpressApiUrl}/pages`)
  url.searchParams.set("slug", slug)
  url.searchParams.set("_embed", "wp:featuredmedia")

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "WordPress page could not be loaded" },
        { status: response.status }
      )
    }

    const pages: Array<Record<string, unknown>> = await response.json()
    if (!pages.length) {
      return NextResponse.json(
        { error: "WordPress page not found" },
        { status: 404 }
      )
    }

    const page = pages[0]
    const embedded = page._embedded as
      | Record<string, Array<{ source_url?: string; alt_text?: string }>>
      | undefined
    const featuredMedia = embedded?.["wp:featuredmedia"]?.[0]

    return NextResponse.json({
      ...page,
      featured_media_url: featuredMedia?.source_url || null,
      featured_media_alt: featuredMedia?.alt_text || null,
      navigation_data: page.siga_navigation_data || {},
      contact_data: page.siga_contact_data || {},
      footer_data: page.siga_footer_data || {},
    })
  } catch {
    return NextResponse.json(
      { error: "WordPress CMS is unavailable" },
      { status: 502 }
    )
  }
}
