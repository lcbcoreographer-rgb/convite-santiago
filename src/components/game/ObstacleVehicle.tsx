import { forwardRef } from 'react';
import type { VehicleType } from '../../lib/types';
import { CAR_HEIGHT_CSS, CAR_WIDTH_CSS } from '../../lib/gameConfig';
import { Vehicle } from './Vehicle';

interface ObstacleVehicleProps {
  type: VehicleType;
  lane: number;
}

export const ObstacleVehicle = forwardRef<HTMLDivElement, ObstacleVehicleProps>(
  function ObstacleVehicle({ type, lane }, ref) {
    return (
      <div
        ref={ref}
        data-obstacle-lane={lane}
        className="absolute z-20 will-change-transform"
        style={{
          width: CAR_WIDTH_CSS,
          height: CAR_HEIGHT_CSS,
          left: '50%',
          top: '0%',
        }}
      >
        <Vehicle type={type} />
      </div>
    );
  }
);
