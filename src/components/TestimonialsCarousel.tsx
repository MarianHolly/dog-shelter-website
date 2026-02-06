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
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplay]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full">
                <div className="rounded-lg bg-card p-6 md:p-8 shadow-minimal-hover transition-all duration-300 hover:shadow-minimal-lg h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4 text-lg">
                    {renderStars(testimonial.data.rating)}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-foreground/90 leading-relaxed mb-6 flex-grow italic">
                    "{testimonial.data.testimonial}"
                  </p>

                  {/* Image and info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                    {testimonial.data.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.data.image}
                          alt={`${testimonial.data.dogName} s rodinou`}
                          className="w-16 h-16 rounded-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="font-semibold text-foreground">
                        {testimonial.data.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Adoptoval/a {testimonial.data.dogName}
                      </div>
                      {testimonial.data.location && (
                        <div className="text-xs text-muted-foreground mt-1">
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
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.slice(0, Math.min(testimonials.length, 5)).map((_, index) => (
          <div
            key={index}
            className="h-2 w-2 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    </div>
  )
}
