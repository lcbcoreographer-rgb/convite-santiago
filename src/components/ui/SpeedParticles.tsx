import { useMemo } from 'react';

interface SpeedParticlesProps {
  count?: number;
  active: boolean;
}

export function SpeedParticles({ count = 16, active }: SpeedParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 0.5 + Math.random() * 0.5,
        width: 1 + Math.random() * 1.5,
        height: 14 + Math.random() * 30,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    [count]
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-full bg-baby-200"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            opacity: p.opacity,
            animation: `speed-line ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
