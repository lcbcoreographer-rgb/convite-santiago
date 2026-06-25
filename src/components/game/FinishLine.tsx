import { forwardRef } from 'react';

export const FinishLine = forwardRef<HTMLDivElement>(function FinishLine(_props, ref) {
  return (
    <div
      ref={ref}
      className="absolute z-20 opacity-0"
      style={{ top: '15%', left: '50%', width: '0%', height: '8px' }}
    >
      <div className="relative h-full w-full -translate-y-1/2">
        <div
          className="absolute inset-0 rounded-sm shadow-[0_0_18px_rgba(125,211,252,0.8)]"
          style={{
            backgroundImage:
              'conic-gradient(#0a0a0a 90deg, #f5f5f5 90deg 180deg, #0a0a0a 180deg 270deg, #f5f5f5 270deg)',
            backgroundSize: '14px 14px',
          }}
        />
        <div className="absolute -left-2 -top-10 h-12 w-2 rounded-t-sm bg-baby-300 shadow-[0_0_14px_rgba(125,211,252,0.9)] sm:-top-14 sm:h-16" />
        <div className="absolute -right-2 -top-10 h-12 w-2 rounded-t-sm bg-baby-300 shadow-[0_0_14px_rgba(125,211,252,0.9)] sm:-top-14 sm:h-16" />
        <span className="font-display absolute left-1/2 top-[-2.6rem] -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-widest text-baby-200 text-neon sm:top-[-3.4rem] sm:text-base">
          CHEGADA
        </span>
      </div>
    </div>
  );
});
