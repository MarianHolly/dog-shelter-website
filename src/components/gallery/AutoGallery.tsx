import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface AutoGalleryProps {
  images: GalleryImage[];
  interval?: number; // in milliseconds
}

export default function AutoGallery({ images, interval = 4000 }: AutoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [goToNext, interval, isPaused]);

  // Pause on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Image Display */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => {
            goToPrevious();
            handleUserInteraction();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background/80 hover:bg-background transition-all hover:scale-110 shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>

        <button
          onClick={() => {
            goToNext();
            handleUserInteraction();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background/80 hover:bg-background transition-all hover:scale-110 shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute bottom-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-background/80 hover:bg-background transition-all hover:scale-110 shadow-lg"
          aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
        >
          {isPaused ? (
            <Play className="h-5 w-5 text-foreground" />
          ) : (
            <Pause className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index);
              handleUserInteraction();
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-primary'
                : 'w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
