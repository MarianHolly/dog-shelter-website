import { useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Testimonial {
  id: string
  data: {
    name: string
    dogName: string
    testimonial: string
    date: Date
    image?: string
    location?: string
    rating: number
  }
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [autoplay] = useState(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-500" : "text-muted-foreground/30"}>
        ★
      </span>
    ))
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplay]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-3">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-2 md:pl-3 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="h-full">
                <div className="rounded-lg bg-card p-5 shadow-minimal-hover transition-all duration-300 hover:shadow-minimal-lg h-full flex flex-col">
                  {/* Stars - Compact */}
                  <div className="flex gap-0.5 mb-3 text-base">
                    {renderStars(testimonial.data.rating)}
                  </div>

                  {/* Testimonial text - Compact */}
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4 flex-grow italic line-clamp-4">
                    "{testimonial.data.testimonial}"
                  </p>

                  {/* Image and info - Compact */}
                  <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                    {testimonial.data.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.data.image}
                          alt={`${testimonial.data.dogName} s rodinou`}
                          className="w-12 h-12 rounded-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="font-semibold text-foreground text-sm truncate">
                        {testimonial.data.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {testimonial.data.dogName}
                      </div>
                      {testimonial.data.location && (
                        <div className="text-xs text-muted-foreground mt-0.5 truncate">
                          📍 {testimonial.data.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" aria-label="Predchádzajúci príbeh" />
        <CarouselNext className="hidden md:flex" aria-label="Ďalší príbeh" />
      </Carousel>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.slice(0, Math.min(testimonials.length, 5)).map((_, index) => (
          <div
            key={index}
            className="h-2 w-2 rounded-full bg-muted-foreground/30"
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}
