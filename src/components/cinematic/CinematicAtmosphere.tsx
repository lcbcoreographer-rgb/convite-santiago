import { useMemo } from 'react';

export function CinematicAtmosphere() {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, id) => ({
        id,
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 3,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 6,
        opacity: 0.25 + Math.random() * 0.45,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-1/4 top-[-20%] h-[70%] w-[60%] rotate-[18deg]">
        <div
          className="h-full w-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(125,211,252,0.5) 0%, rgba(125,211,252,0) 70%)',
            animation: 'light-sweep 9s ease-in-out infinite',
          }}
        />
      </div>
      <div className="absolute right-[-30%] top-[-10%] h-[80%] w-[55%] rotate-[-22deg]">
        <div
          className="h-full w-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(56,189,248,0.45) 0%, rgba(56,189,248,0) 70%)',
            animation: 'light-sweep 11s ease-in-out infinite reverse',
          }}
        />
      </div>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-baby-200"
          style={{
            left: `${p.left}%`,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: '0 0 6px rgba(125,211,252,0.8)',
            animation: `drift-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
