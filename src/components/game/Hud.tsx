import { forwardRef } from 'react';
import { LIVES_START } from '../../lib/gameConfig';

interface HudRefs {
  progressFillRef: React.Ref<HTMLDivElement>;
  timerTextRef: React.Ref<HTMLSpanElement>;
  speedNeedleRef: React.Ref<HTMLDivElement>;
  speedValueRef: React.Ref<HTMLSpanElement>;
}

interface HudProps extends HudRefs {
  lives: number;
}

export const Hud = forwardRef<HTMLDivElement, HudProps>(function Hud(
  { progressFillRef, timerTextRef, speedNeedleRef, speedValueRef, lives },
  _ref
) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex flex-col gap-2 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
      <div className="flex items-center gap-3">
        <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-white/10 ring-1 ring-baby-300/30">
          <div
            ref={progressFillRef}
            className="h-full w-0 rounded-full bg-gradient-to-r from-baby-600 via-baby-400 to-white shadow-neon"
          />
        </div>
        <span
          ref={timerTextRef}
          className="font-display min-w-[2.6rem] text-right text-sm font-bold tabular-nums text-baby-200 text-neon sm:text-base"
        >
          15s
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {Array.from({ length: LIVES_START }, (_, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-all duration-300 sm:h-5 sm:w-5 ${
                i < lives ? 'scale-100 opacity-100' : 'scale-75 opacity-25'
              }`}
              fill={i < lives ? '#7dd3fc' : 'none'}
              stroke="#7dd3fc"
              strokeWidth={i < lives ? 0 : 1.5}
              style={i < lives ? { filter: 'drop-shadow(0 0 4px rgba(125,211,252,0.8))' } : undefined}
            >
              <path d="M12 21s-7.5-4.6-10-9.2C0.3 8.4 2 4.5 5.8 4c2-.3 3.8.7 6.2 3 2.4-2.3 4.2-3.3 6.2-3 3.8.5 5.5 4.4 3.8 7.8C19.5 16.4 12 21 12 21z" />
            </svg>
          ))}
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 ring-1 ring-baby-300/25 backdrop-blur-sm">
          <div className="relative h-4 w-4 sm:h-5 sm:w-5">
            <div
              ref={speedNeedleRef}
              className="absolute left-1/2 top-1/2 h-[2px] w-[40%] origin-left rounded-full bg-baby-300 shadow-[0_0_4px_rgba(125,211,252,0.9)]"
              style={{ transform: 'rotate(-90deg)' }}
            />
          </div>
          <span ref={speedValueRef} className="font-display text-[10px] font-bold text-baby-200 sm:text-xs">
            0
          </span>
          <span className="text-[9px] text-white/50 sm:text-[10px]">km/h</span>
        </div>
      </div>
    </div>
  );
});
