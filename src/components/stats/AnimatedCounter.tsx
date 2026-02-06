import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: React.ReactNode;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  label,
  icon,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const displayValue = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (displayValue.current) {
        displayValue.current.textContent = Math.floor(latest).toLocaleString('sk-SK');
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {icon && (
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
        >
          {icon}
        </motion.div>
      )}
      <div>
        <div className="mb-2 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          <span ref={displayValue}>0</span>
          {suffix && (
            <span className="text-3xl font-bold text-muted-foreground md:text-4xl">
              {suffix}
            </span>
          )}
        </div>
        <p className="text-base font-medium text-muted-foreground md:text-lg">{label}</p>
      </div>
    </motion.div>
  );
}
