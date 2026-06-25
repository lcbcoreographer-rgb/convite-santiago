export type GameState = 'start' | 'racing' | 'cinematic';

export type VehicleType = 'police' | 'truck' | 'sedan';

export interface ObstacleEntity {
  id: number;
  lane: number;
  type: VehicleType;
  spawnedAt: number;
  hit: boolean;
  passed: boolean;
}
