import { NextRequest, NextResponse } from "next/server"

const wordpressApiUrl =
  process.env.WORDPRESS_API_URL || "http://localhost:8080/wp-json/wp/v2"

export async function GET(request: NextRequest) {
  const perPage = request.nextUrl.searchParams.get("per_page") || "10"
  const search = request.nextUrl.searchParams.get("search")

  const url = new URL(`${wordpressApiUrl}/siga_product`)
  url.searchParams.set("per_page", perPage)
  url.searchParams.set("orderby", "id")
  url.searchParams.set("order", "asc")
  url.searchParams.set("_embed", "wp:featuredmedia")
  if (search) url.searchParams.set("search", search)

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "WordPress posts could not be loaded" },
        { status: response.status }
      )
    }

    const posts: Array<Record<string, unknown>> = await response.json()
    const mappedPosts = posts.map((post) => {
      const embedded = post._embedded as
        | Record<string, Array<{ source_url?: string }>>
        | undefined
      const featuredMedia = embedded?.["wp:featuredmedia"]?.[0]
      const productMeta = post.siga_product_data as
        | Record<string, unknown>
        | undefined
      return {
        ...post,
        featured_media_url: featuredMedia?.source_url || null,
        meta: productMeta || {},
      }
    })

    return NextResponse.json(mappedPosts)
  } catch {
    return NextResponse.json(
      { error: "WordPress CMS is unavailable" },
      { status: 502 }
    )
  }
}
