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

                  <div className="p-6 space-y-4">
                    {/* Name and Breed */}
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-1">{dog.data.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{dog.data.breed}</p>
                    </div>

                    {/* Key Details - Animal Cove Style */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">Vek:</span>
                        <span className="text-muted-foreground">{dog.data.age}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">Pohlavie:</span>
                        <span className="text-muted-foreground">{dog.data.gender}</span>
                      </div>
                      {dog.data.size && (
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-foreground">Veľkosť:</span>
                          <span className="text-muted-foreground">{dog.data.size}</span>
                        </div>
                      )}
                    </div>

                    {/* Health Status Icons - Animal Cove Style */}
                    <div className="pt-2 pb-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Zdravotný stav</p>
                      <div className="grid grid-cols-3 gap-3">
                        {/* Vaccinated */}
                        <div className="flex flex-col items-center gap-1.5" title="Očkovaný">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-muted-foreground text-center">Očkovaný</span>
                        </div>

                        {/* Microchipped */}
                        <div className="flex flex-col items-center gap-1.5" title="Začipovaný">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-muted-foreground text-center">Čip</span>
                        </div>

                        {/* De-Sexed */}
                        <div className="flex flex-col items-center gap-1.5" title="Kastrovaný">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-muted-foreground text-center">Kastrovaný</span>
                        </div>
                      </div>
                    </div>

                    {/* Personality Badges */}
                    {(dog.data.goodWithKids || dog.data.energyLevel) && (
                      <div className="flex flex-wrap gap-2 pt-1">
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
                    )}

                    {/* CTA Link */}
                    <div className="pt-2">
                      <div className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Viac informácií
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
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
