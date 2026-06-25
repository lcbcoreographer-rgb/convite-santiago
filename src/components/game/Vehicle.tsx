import type { VehicleType } from '../../lib/types';
import policeImg from '../../assets/cars/police.png';
import truckImg from '../../assets/cars/truck.png';
import sedanImg from '../../assets/cars/sedan.png';

const IMAGE_BY_TYPE: Record<VehicleType, string> = {
  police: policeImg,
  truck: truckImg,
  sedan: sedanImg,
};

const ROTATION_BY_TYPE: Record<VehicleType, number> = {
  police: 90,
  truck: -90,
  sedan: 90,
};

interface VehicleProps {
  type: VehicleType;
}

export function Vehicle({ type }: VehicleProps) {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute left-1/2 top-1/2 h-[94%] w-[178%]"
        style={{ transform: `translate(-50%, -50%) rotate(${ROTATION_BY_TYPE[type]}deg)` }}
      >
        <img
          src={IMAGE_BY_TYPE[type]}
          alt=""
          className="h-full w-full object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.55)]"
          draggable={false}
        />
      </div>
    </div>
  );
}
