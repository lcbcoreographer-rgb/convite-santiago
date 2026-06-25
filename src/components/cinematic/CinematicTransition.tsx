import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface CinematicTransitionProps {
  onComplete: () => void;
}

export function CinematicTransition({ onComplete }: CinematicTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 950);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[60] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, transparent 35%, rgba(173,224,255,0.65) 50%, transparent 65%)',
        }}
        initial={{ x: '-120%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 0.85, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-x-0 top-0 bg-black"
        initial={{ height: '0%' }}
        animate={{ height: ['0%', '12%', '0%'] }}
        transition={{ duration: 0.95, times: [0, 0.4, 1], ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-black"
        initial={{ height: '0%' }}
        animate={{ height: ['0%', '12%', '0%'] }}
        transition={{ duration: 0.95, times: [0, 0.4, 1], ease: 'easeInOut' }}
      />
    </div>
  );
}
