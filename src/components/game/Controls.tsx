interface ControlsProps {
  onLeft: () => void;
  onRight: () => void;
}

export function Controls({ onLeft, onRight }: ControlsProps) {
  const baseClass =
    'pointer-events-auto flex h-14 w-14 select-none items-center justify-center rounded-full bg-black/55 text-2xl text-baby-200 ring-2 ring-baby-300/40 backdrop-blur-md transition active:scale-90 active:bg-baby-500/30 sm:h-16 sm:w-16';

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex items-center justify-between px-4 sm:px-8">
      <button type="button" aria-label="Mover para esquerda" className={baseClass} onClick={onLeft}>
        ◀
      </button>
      <button type="button" aria-label="Mover para direita" className={baseClass} onClick={onRight}>
        ▶
      </button>
    </div>
  );
}
