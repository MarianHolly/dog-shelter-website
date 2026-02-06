import { useState, useEffect } from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Dog {
  id: string
  data: {
    name: string
    breed: string
    age: string
    gender: string
    image: string
    description: string
    size?: string
    urgent: boolean
    goodWithKids?: boolean
    goodWithDogs?: boolean
    energyLevel?: string
  }
}

interface FeaturedDogsCarouselProps {
  dogs: Dog[]
}

export default function FeaturedDogsCarousel({ dogs }: FeaturedDogsCarouselProps) {
  const [autoplay] = useState(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

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
          {dogs.map((dog) => (
            <CarouselItem key={dog.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <a
                href={`/psici/${dog.id}`}
                className="group block"
              >
                <div className="rounded-lg overflow-hidden bg-card shadow-minimal-hover transition-all duration-300 hover:shadow-minimal-lg relative h-full">
                  {dog.data.urgent && (
                    <div className="absolute top-3 right-3 z-10 bg-destructive text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                      ⚡ URGENTNÉ
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative overflow-hidden h-72 md:h-80">
                    <img
                      src={dog.data.image}
                      alt={dog.data.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-5 space-y-3">
                    {/* Name and Age */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-2xl font-bold tracking-tight">{dog.data.name}</h3>
                      <span className="text-lg text-muted-foreground font-medium">{dog.data.age}</span>
                    </div>

                    {/* Breed */}
                    <p className="text-sm text-muted-foreground">{dog.data.breed}</p>

                    {/* Info row */}
                    <div className="flex items-center gap-4 pt-1 pb-2 text-muted-foreground">
                      <div className="flex items-center gap-1.5" title={dog.data.gender}>
                        <span className="text-xl">
                          {dog.data.gender === 'Pes' ? '♂' : '♀'}
                        </span>
                      </div>

                      {dog.data.size && (
                        <div className="flex items-center gap-1" title={dog.data.size}>
                          <span className={`text-sm ${dog.data.size === 'Malý' ? 'text-primary' : 'text-muted-foreground/30'}`}>🐕</span>
                          <span className={`text-base ${dog.data.size === 'Stredný' ? 'text-primary' : 'text-muted-foreground/30'}`}>🐕</span>
                          <span className={`text-xl ${dog.data.size === 'Veľký' ? 'text-primary' : 'text-muted-foreground/30'}`}>🐕</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                      {dog.data.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {dog.data.goodWithKids && (
                        <span className="px-2.5 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full font-medium">
                          👶 S deťmi
                        </span>
                      )}
                      {dog.data.energyLevel === 'Nízka' && (
                        <span className="px-2.5 py-1 bg-accent/20 text-accent-foreground text-xs rounded-full font-medium">
                          😌 Pokojný
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-full py-2.5 text-center rounded-md bg-primary/10 text-primary font-semibold text-sm group-hover:bg-primary/20 transition-colors">
                        Viac informácií →
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Dots indicator for mobile */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {dogs.map((_, index) => (
          <div
            key={index}
            className="h-2 w-2 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    </div>
  )
}
