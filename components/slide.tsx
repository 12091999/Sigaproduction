type SlideProps = {
  src: string
  alt: string
  priority?: boolean
}

export function Slide({ src, alt, priority }: SlideProps) {
  return (
   <section className="aspect-[16/9] object-cover">
  <img
    src={src || "/placeholder.svg"}
    alt={alt}
    className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
  />
</section>

  )
}
