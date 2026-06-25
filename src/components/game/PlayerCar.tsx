import { forwardRef } from 'react';
import playerImg from '../../assets/cars/player.png';
import { CAR_HEIGHT_CSS, CAR_WIDTH_CSS } from '../../lib/gameConfig';

interface PlayerCarProps {
  damaged?: boolean;
  xPercent: number;
  lane: number;
}

export const PlayerCar = forwardRef<HTMLDivElement, PlayerCarProps>(function PlayerCar(
  { damaged, xPercent, lane },
  ref
) {
  return (
    <div
      ref={ref}
      data-player-lane={lane}
      className="absolute z-30 will-change-transform transition-[left] duration-200 ease-out"
      style={{
        width: CAR_WIDTH_CSS,
        height: CAR_HEIGHT_CSS,
        left: `${xPercent}%`,
        top: '90%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`relative h-full w-full transition-shadow duration-150 ${
          damaged ? 'animate-[flash_0.25s_ease-in-out_2]' : ''
        }`}
      >
        <div className="absolute bottom-[2%] left-1/2 h-[20%] w-[60%] -translate-x-1/2 rounded-full bg-baby-400/55 blur-md" />
        <img
          src={playerImg}
          alt=""
          className="absolute inset-0 h-full w-full rotate-180 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]"
          draggable={false}
        />
      </div>
    </div>
  );
});
