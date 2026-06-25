import { useState } from 'react';

interface MusicControlProps {
  isPlaying: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (v: number) => void;
}

export function MusicControl({ isPlaying, volume, onToggle, onVolumeChange }: MusicControlProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-auto fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 ring-1 ring-baby-300/30 backdrop-blur-md">
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="h-1 w-20 accent-baby-400 sm:w-28"
            aria-label="Volume"
          />
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-baby-200 ring-1 ring-baby-300/30 backdrop-blur-md transition hover:bg-black/90"
          aria-label="Ajustar volume"
        >
          🔊
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-baby-200 ring-1 ring-baby-300/30 backdrop-blur-md transition hover:bg-black/90"
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  );
}
