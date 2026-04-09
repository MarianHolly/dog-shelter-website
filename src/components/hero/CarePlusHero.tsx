import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Heart, Users, Award } from 'lucide-react';

interface CarePlusHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  heroImage: string;
  heroImageAlt?: string;
  badge?: string;
}

export default function CarePlusHero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  heroImage,
  heroImageAlt = 'Psík čakajúci na nový domov',
  badge,
}: CarePlusHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const entrance = (delay: number, x = 0, y = 0) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, x, y },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay },
  });

  return (
    <section className="relative bg-background overflow-hidden min-h-svh lg:min-h-0 flex flex-col lg:block">
      {/* Mobile: hero image as full-screen background */}
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Desktop: decorative background blobs */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl container-spacing relative flex-1 flex flex-col justify-center lg:block">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-8 md:py-24 lg:py-32">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-5 lg:space-y-8"
            {...entrance(0, -30)}
          >
            {/* Badge */}
            {badge && (
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                {...entrance(0.1, 0, 20)}
              >
                <Heart className="h-4 w-4" />
                {badge}
              </motion.div>
            )}

            {/* Subtitle */}
            <motion.p
              className="text-sm font-semibold uppercase tracking-wider text-primary"
              {...entrance(0.2, 0, 20)}
            >
              {subtitle}
            </motion.p>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground"
              {...entrance(0.3, 0, 30)}
            >
              {title}
            </motion.h1>

            {/* Description — capped to 3 lines on mobile */}
            <motion.p
              className="text-lg md:text-xl leading-relaxed text-muted-foreground line-clamp-3 lg:line-clamp-none"
              {...entrance(0.4, 0, 20)}
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              {...entrance(0.5, 0, 20)}
            >
              <a
                href={primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              >
                {primaryCta.text}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-background px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:border-primary hover:bg-primary/5"
              >
                {secondaryCta.text}
              </a>
            </motion.div>

            {/* Stats — hidden on mobile (repeated in Kto sme section) */}
            <motion.div
              className="hidden md:flex flex-wrap gap-8 pt-8 border-t border-border"
              {...entrance(0.6, 0, 20)}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Zachránených psov</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1000+</p>
                  <p className="text-sm text-muted-foreground">Šťastných rodín</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 text-foreground">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">15+</p>
                  <p className="text-sm text-muted-foreground">Rokov skúseností</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image: desktop only (mobile uses bg image) */}
          <motion.div
            className="relative hidden lg:block"
            {...entrance(0.3, 30)}
          >
            {/* Decorative background card */}
            <div className="absolute -inset-4 bg-linear-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-3xl blur-2xl" />

            {/* Main image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />

              {/* Decorative overlay pattern */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl shadow-xl p-6 max-w-xs hidden lg:block"
              {...entrance(0.8, 0, 20)}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground">
                  <Heart className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Adopcia zdarma</p>
                  <p className="text-sm text-muted-foreground">Pre všetkých psov</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
