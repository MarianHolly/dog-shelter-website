import { useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Dog {
  id: string;
  data: {
    name: string;
    breed: string;
    age: string;
    gender: string;
    image: string;
    description: string;
    size?: string;
    urgent: boolean;
    goodWithKids?: boolean;
    goodWithDogs?: boolean;
    energyLevel?: string;
  };
}

interface FeaturedDogsCarouselProps {
  dogs: Dog[];
}

export default function FeaturedDogsCarousel({ dogs }: FeaturedDogsCarouselProps) {
  const [autoplay] = useState(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[autoplay]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {dogs.map((dog) => (
            <CarouselItem key={dog.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
              <a href={`/psici/${dog.id}`} className="group block">
                <div className="rounded-lg overflow-hidden bg-card shadow-minimal-hover transition-all duration-300 hover:shadow-minimal-lg relative h-full">
                  {dog.data.urgent && (
                    <div className="absolute top-3 right-3 z-10 bg-destructive text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                      ⚡ URGENTNÉ
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={dog.data.image}
                      alt={dog.data.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6 flex flex-col h-full">
                    {/* Name and Breed */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold tracking-tight mb-1">{dog.data.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{dog.data.breed}</p>
                    </div>

                    {/* CTA Link - aligned to right, pushed to bottom */}
                    <div className="mt-auto flex justify-end">
                      <div className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Viac informácií
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
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
          <div key={index} className="h-2 w-2 rounded-full bg-muted-foreground/30" />
        ))}
      </div>
    </div>
  );
}
