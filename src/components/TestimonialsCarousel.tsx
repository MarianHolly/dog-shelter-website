import { useState, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Testimonial {
  id: string;
  data: {
    name: string;
    dogName: string;
    testimonial: string;
    date: Date;
    image?: string;
    location?: string;
    rating: number;
  };
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [autoplay] = useState(Autoplay({ delay: 6000, stopOnInteraction: true }));
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-muted-foreground/30'}>
        ★
      </span>
    ));
  };

  const toggleExpand = (id: string, element: HTMLElement | null) => {
    setExpandedId(expandedId === id ? null : id);

    // Scroll the expanded card into view
    if (expandedId !== id && element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }, 100);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[autoplay]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-3">
          {testimonials.map((testimonial) => {
            const isExpanded = expandedId === testimonial.id;
            const cardRef = useRef<HTMLDivElement>(null);

            return (
              <CarouselItem
                key={testimonial.id}
                ref={cardRef}
                className={`pl-2 md:pl-3 transition-all duration-500 ${
                  isExpanded
                    ? 'md:basis-2/3 lg:basis-1/2 xl:basis-2/5'
                    : 'md:basis-1/2 lg:basis-1/3 xl:basis-1/4'
                }`}
              >
                <div className="h-80 m-2">
                  <div
                    className={`rounded-lg bg-card p-6 shadow-minimal-hover hover:shadow-minimal-lg h-full flex flex-col cursor-pointer ${
                      isExpanded ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => toggleExpand(testimonial.id, cardRef.current)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleExpand(testimonial.id, cardRef.current);
                      }
                    }}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Zbaliť' : 'Rozbaliť'} recenziu od ${testimonial.data.name}`}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4 text-lg">
                      {renderStars(testimonial.data.rating)}
                    </div>

                    {/* Testimonial text - Improved readability, NO italics */}
                    <p
                      className={`text-base text-foreground leading-relaxed mb-4 flex-grow ${
                        isExpanded ? '' : 'line-clamp-4'
                      }`}
                    >
                      "{testimonial.data.testimonial}"
                    </p>

                    {/* Image and info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                      {testimonial.data.image && (
                        <div className="shrink-0">
                          <img
                            src={testimonial.data.image}
                            alt={`${testimonial.data.dogName} s rodinou`}
                            className="w-14 h-14 rounded-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-grow min-w-0">
                        <div className="font-semibold text-foreground text-base">
                          {testimonial.data.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Adoptovali: {testimonial.data.dogName}
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
            );
          })}
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
  );
}
