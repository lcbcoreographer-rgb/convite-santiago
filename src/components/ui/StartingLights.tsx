import { useEffect, useState } from 'react';

interface StartingLightsProps {
  running: boolean;
  onComplete?: () => void;
}

const RED_MS = 1100;

export function StartingLights({ running, onComplete }: StartingLightsProps) {
  const [stage, setStage] = useState<'idle' | 'red' | 'green'>('idle');

  useEffect(() => {
    if (!running) {
      setStage('idle');
      return;
    }

    setStage('red');
    const timer = setTimeout(() => {
      setStage('green');
      onComplete?.();
    }, RED_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return (
    <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-black/30 px-4 py-3 ring-1 ring-white/10">
      <span
        className={`h-5 w-5 rounded-full ring-1 ring-white/25 transition-all duration-200 sm:h-7 sm:w-7 ${
          stage === 'red'
            ? 'bg-red-500 shadow-[0_0_18px_5px_rgba(239,68,68,0.85)]'
            : 'bg-white/10 ' + (stage === 'idle' ? 'animate-pulse' : '')
        }`}
      />
      <span
        className={`h-5 w-5 rounded-full ring-1 ring-white/25 transition-all duration-200 sm:h-7 sm:w-7 ${
          stage === 'green'
            ? 'bg-green-500 shadow-[0_0_18px_5px_rgba(34,197,94,0.85)]'
            : 'bg-white/10'
        }`}
      />
    </div>
  );
}
