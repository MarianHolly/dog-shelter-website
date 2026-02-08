import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import * as LucideIcons from 'lucide-react';

interface ServiceCardProps {
  iconName: string;
  title: string;
  description: string;
  link?: {
    href: string;
    text: string;
  };
  delay?: number;
}

export default function ServiceCard({
  iconName,
  title,
  description,
  link,
  delay = 0,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

  return (
    <motion.div
      ref={ref}
      className="group relative p-8 md:p-10 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Icon */}
      <motion.div
        className="mb-6 text-primary"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
      >
        <IconComponent className="h-12 w-12" />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>

      {/* Link */}
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
        >
          {link.text}
          <LucideIcons.ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      )}

      {/* Decorative Element on Hover */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
