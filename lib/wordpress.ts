export type CmsProduct = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  featured_media_url?: string | null
  meta?: {
    siga_price?: number | string
    siga_rating?: number | string
    siga_badge?: string
    siga_category?: string
    siga_shopee_url?: string
  }
}

export type Product = {
  id: number
  slug: string
  name: string
  category: string
  price: number
  rating: number
  image: string
  badge: string | null
  description: string
  shopee: string
}

export type CmsService = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  featured_media_url?: string | null
  service_data?: {
    siga_group?: string
    siga_price?: number | string | null
    siga_price_unit?: string
    siga_rating?: number | string | null
    siga_action_label?: string
    siga_action_url?: string
  }
}

export type Service = {
  id: number
  name: string
  description: string
  image: string
  price: number | null
  priceUnit: string
  rating: number | null
  actionLabel: string
  actionUrl: string
}

export type CmsServiceGroup = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  featured_media_url?: string | null
  featured_media_alt?: string | null
  siga_service_group_data?: {
    siga_page_title?: string
    siga_route_url?: string
    siga_hero_title?: string
    siga_hero_description?: string
    siga_hero_cta_one_label?: string
    siga_hero_cta_one_url?: string
    siga_hero_cta_two_label?: string
    siga_hero_cta_two_url?: string
    siga_hero_cta_three_label?: string
    siga_hero_cta_three_url?: string
  }
}

export type ServiceGroup = {
  id: number
  slug: string
  title: string
  description: string
  pageTitle: string
  pageDescription: string
  routeUrl?: string
  heroTitle?: string
  heroDescription?: string
  heroImage?: string | null
  heroImageAlt?: string
  ctas?: Array<{ label: string; url: string }>
}

export type CmsProperty = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  featured_media_url?: string | null
  featured_media_alt?: string | null
  siga_property_data?: {
    siga_price?: number | string
    siga_price_type?: string
    siga_type?: string
    siga_category?: string
    siga_location?: string
    siga_address?: string
    siga_featured?: boolean
  }
}

export type Property = {
  id: number
  slug: string
  title: string
  description: string
  location: string
  address: string
  price: number
  priceType: string
  type: string
  category: string
  images: string[]
  featured: boolean
}

export type CmsPage<T> = {
  title: { rendered: string }
  featured_media_url: string | null
  featured_media_alt: string | null
  navigation_data?: T
  contact_data?: T
}

export type CmsNavigationData = {
  siga_nav_brand_name?: string
  siga_nav_logo_alt?: string
  siga_nav_home_label?: string
  siga_nav_home_url?: string
  siga_nav_products_label?: string
  siga_nav_products_url?: string
  siga_nav_services_label?: string
  siga_nav_services_dropdown_label?: string
  siga_nav_rent_label?: string
  siga_nav_rent_url?: string
  siga_nav_about_label?: string
  siga_nav_about_url?: string
  siga_nav_contact_label?: string
  siga_nav_contact_url?: string
  siga_nav_account_label?: string
  siga_nav_account_url?: string
  siga_nav_signin_label?: string
  siga_nav_signin_url?: string
}

export type CmsContactData = {
  [key: string]: string | undefined
}

export type SiteNavigation = {
  brandName: string
  logoAlt: string
  logoUrl: string
  homeLabel: string
  homeUrl: string
  productsLabel: string
  productsUrl: string
  servicesLabel: string
  servicesDropdownLabel: string
  rentLabel: string
  rentUrl: string
  aboutLabel: string
  aboutUrl: string
  contactLabel: string
  contactUrl: string
  accountLabel: string
  accountUrl: string
  signinLabel: string
  signinUrl: string
}

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;|&#038;/g, "&")
    .replace(/&#8217;/g, "’")
    .trim()
}

export function mapCmsProduct(post: CmsProduct): Product {
  return {
    id: post.id,
    slug: post.slug,
    name: stripHtml(post.title.rendered),
    category: post.meta?.siga_category || "Product",
    price: Number(post.meta?.siga_price || 0),
    rating: Number(post.meta?.siga_rating || 0),
    image: post.featured_media_url || "/placeholder.svg",
    badge: post.meta?.siga_badge || null,
    description: stripHtml(post.content.rendered || post.excerpt.rendered),
    shopee: post.meta?.siga_shopee_url || "https://shopee.co.id/",
  }
}

export function mapCmsService(post: CmsService): Service {
  const data = post.service_data
  const price = data?.siga_price
  const rating = data?.siga_rating

  return {
    id: post.id,
    name: stripHtml(post.title.rendered),
    description: stripHtml(post.content.rendered || post.excerpt.rendered),
    image: post.featured_media_url || "/placeholder.svg",
    price: price === null || price === undefined || price === "" ? null : Number(price),
    priceUnit: data?.siga_price_unit || "",
    rating: rating === null || rating === undefined || rating === "" ? null : Number(rating),
    actionLabel: data?.siga_action_label || "View details",
    actionUrl: data?.siga_action_url || "#",
  }
}

export function mapCmsServiceGroup(post: CmsServiceGroup): ServiceGroup {
  const data = post.siga_service_group_data
  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered || post.content.rendered),
    pageTitle: stripHtml(data?.siga_page_title || post.title.rendered),
    pageDescription: stripHtml(post.content.rendered || post.excerpt.rendered),
    routeUrl: data?.siga_route_url || `/services/${post.slug}`,
    heroTitle: stripHtml(data?.siga_hero_title || post.title.rendered),
    heroDescription: stripHtml(
      data?.siga_hero_description || post.content.rendered || post.excerpt.rendered
    ),
    heroImage: post.featured_media_url || null,
    heroImageAlt: post.featured_media_alt || stripHtml(post.title.rendered),
    ctas: [
      {
        label: data?.siga_hero_cta_one_label || "Shop Sigamerch Products",
        url: data?.siga_hero_cta_one_url || "/products",
      },
      {
        label: data?.siga_hero_cta_two_label || "Book a Sigaproduction",
        url: data?.siga_hero_cta_two_url || "/contact",
      },
      {
        label: data?.siga_hero_cta_three_label || "Find Your Offer",
        url: data?.siga_hero_cta_three_url || "/services",
      },
    ],
  }
}

export function mapCmsProperty(post: CmsProperty): Property {
  const data = post.siga_property_data

  return {
    id: post.id,
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.content.rendered || post.excerpt.rendered),
    location: data?.siga_location || "",
    address: data?.siga_address || "",
    price: Number(data?.siga_price || 0),
    priceType: data?.siga_price_type || "day",
    type: data?.siga_type || "Rent",
    category: data?.siga_category || "",
    images: post.featured_media_url ? [post.featured_media_url] : ["/placeholder.svg"],
    featured: Boolean(data?.siga_featured),
  }
}

export function mapCmsNavigation(
  page: CmsPage<CmsNavigationData>,
  fallback: SiteNavigation
): SiteNavigation {
  const data = page.navigation_data || {}

  return {
    brandName: data.siga_nav_brand_name || fallback.brandName,
    logoAlt: data.siga_nav_logo_alt || page.featured_media_alt || fallback.logoAlt,
    logoUrl: page.featured_media_url || fallback.logoUrl,
    homeLabel: data.siga_nav_home_label || fallback.homeLabel,
    homeUrl: data.siga_nav_home_url || fallback.homeUrl,
    productsLabel: data.siga_nav_products_label || fallback.productsLabel,
    productsUrl: data.siga_nav_products_url || fallback.productsUrl,
    servicesLabel: data.siga_nav_services_label || fallback.servicesLabel,
    servicesDropdownLabel:
      data.siga_nav_services_dropdown_label || fallback.servicesDropdownLabel,
    rentLabel: data.siga_nav_rent_label || fallback.rentLabel,
    rentUrl: data.siga_nav_rent_url || fallback.rentUrl,
    aboutLabel: data.siga_nav_about_label || fallback.aboutLabel,
    aboutUrl: data.siga_nav_about_url || fallback.aboutUrl,
    contactLabel: data.siga_nav_contact_label || fallback.contactLabel,
    contactUrl: data.siga_nav_contact_url || fallback.contactUrl,
    accountLabel: data.siga_nav_account_label || fallback.accountLabel,
    accountUrl: data.siga_nav_account_url || fallback.accountUrl,
    signinLabel: data.siga_nav_signin_label || fallback.signinLabel,
    signinUrl: data.siga_nav_signin_url || fallback.signinUrl,
  }
}
