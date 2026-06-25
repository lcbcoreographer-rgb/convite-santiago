import { useCallback, useEffect, useRef, useState } from 'react';
import { RoadBackground } from './RoadBackground';
import { PlayerCar } from './PlayerCar';
import { ObstacleVehicle } from './ObstacleVehicle';
import { FinishLine } from './FinishLine';
import { Hud } from './Hud';
import { Controls } from './Controls';
import { SpeedParticles } from '../ui/SpeedParticles';
import { StartingLights } from '../ui/StartingLights';
import type { ObstacleEntity, VehicleType } from '../../lib/types';
import {
  COLLISION_T,
  FINISH_APPROACH_MS,
  LANES,
  LIVES_START,
  OBSTACLE_TRAVEL_MS,
  PLAYER_LANE_T,
  RACE_DURATION_MS,
  REMOVE_T,
  SPAWN_INTERVAL_BASE_MS,
  SPAWN_INTERVAL_MIN_MS,
  STOP_SPAWN_AT_MS,
  depthEase,
  depthScale,
  depthY,
  laneAreaEdges,
  laneCenterX,
} from '../../lib/gameConfig';

type Phase = 'countdown' | 'running' | 'finishing' | 'gameover';

const FREEZE_MS = 500;

const VEHICLE_TYPES: VehicleType[] = ['sedan', 'sedan', 'truck', 'police'];
const TYPE_SCALE: Record<VehicleType, number> = { sedan: 1, police: 1, truck: 1.1 };

interface RaceGameProps {
  onFinish: () => void;
}

export function RaceGame({ onFinish }: RaceGameProps) {
  const [phase, setPhase] = useState<Phase>('countdown');
  const [lane, setLane] = useState(Math.floor(LANES / 2) - 1);
  const [lives, setLives] = useState(LIVES_START);
  const [obstacles, setObstacles] = useState<ObstacleEntity[]>([]);
  const [damaged, setDamaged] = useState(false);
  const [shake, setShake] = useState(false);
  const [goFlash, setGoFlash] = useState(false);

  const playerCarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const timerTextRef = useRef<HTMLSpanElement>(null);
  const speedNeedleRef = useRef<HTMLDivElement>(null);
  const speedValueRef = useRef<HTMLSpanElement>(null);
  const roadSvgRef = useRef<SVGSVGElement>(null);
  const finishLineRef = useRef<HTMLDivElement>(null);
  const obstacleRefs = useRef(new Map<number, HTMLDivElement>());

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const finishTimeRef = useRef<number | null>(null);
  const lastSpawnRef = useRef(0);
  const nextIdRef = useRef(0);
  const laneRef = useRef(lane);
  const livesRef = useRef(lives);
  const phaseRef = useRef<Phase>(phase);
  const dashOffsetRef = useRef(0);

  laneRef.current = lane;
  livesRef.current = lives;
  phaseRef.current = phase;

  const moveLane = useCallback((delta: number) => {
    if (phaseRef.current !== 'running') return;
    setLane((l) => Math.min(LANES - 1, Math.max(0, l + delta)));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') moveLane(-1);
      if (e.code === 'ArrowRight' || e.code === 'KeyD') moveLane(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [moveLane]);

  const triggerCollision = useCallback((id: number) => {
    setObstacles((list) => list.map((o) => (o.id === id ? { ...o, hit: true } : o)));
    setDamaged(true);
    setShake(true);
    setTimeout(() => setDamaged(false), 260);
    setTimeout(() => setShake(false), 260);
    setTimeout(() => {
      setObstacles((list) => list.filter((o) => o.id !== id));
    }, 150);

    setLives((l) => {
      const next = l - 1;
      if (next <= 0) {
        phaseRef.current = 'gameover';
        setPhase('gameover');
      }
      return Math.max(0, next);
    });
  }, []);

  const spawnWave = useCallback((now: number) => {
    const waveSize = Math.random() < 0.78 ? 1 : 2;
    const lanesPool = Array.from({ length: LANES }, (_, i) => i);
    const chosen: number[] = [];
    for (let i = 0; i < Math.min(waveSize, LANES - 1); i++) {
      const idx = Math.floor(Math.random() * lanesPool.length);
      chosen.push(lanesPool.splice(idx, 1)[0]);
    }
    chosen.forEach((laneIdx) => {
      const id = nextIdRef.current++;
      const type = VEHICLE_TYPES[Math.floor(Math.random() * VEHICLE_TYPES.length)];
      setObstacles((list) => [
        ...list,
        { id, lane: laneIdx, type, spawnedAt: now, hit: false, passed: false },
      ]);
    });
  }, []);

  const resetGame = useCallback(() => {
    setObstacles([]);
    obstacleRefs.current.clear();
    setLives(LIVES_START);
    setLane(Math.floor(LANES / 2) - 1);
    startTimeRef.current = null;
    finishTimeRef.current = null;
    lastSpawnRef.current = 0;
    setPhase('countdown');
  }, []);

  useEffect(() => {
    if (phase !== 'running' && phase !== 'finishing') return;

    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(1, elapsed / RACE_DURATION_MS);

      if (progressFillRef.current) progressFillRef.current.style.width = `${progress * 100}%`;
      const remainingSec = Math.max(0, Math.ceil((RACE_DURATION_MS - elapsed) / 1000));
      if (timerTextRef.current) timerTextRef.current.textContent = `${remainingSec}s`;

      const speed = 48 + progress * 152 + Math.sin(now / 180) * 3;
      if (speedValueRef.current) speedValueRef.current.textContent = `${Math.round(speed)}`;
      if (speedNeedleRef.current) {
        const angle = -90 + (speed / 220) * 180;
        speedNeedleRef.current.style.transform = `rotate(${angle}deg)`;
      }

      dashOffsetRef.current -= 0.8 + progress * 2.2;
      const lines = roadSvgRef.current?.querySelectorAll<SVGLineElement>('[data-lane-line]');
      lines?.forEach((line) => {
        if (line.getAttribute('stroke-dasharray')) {
          line.style.strokeDashoffset = `${dashOffsetRef.current}`;
        }
      });

      if (phaseRef.current === 'running') {
        if (elapsed < STOP_SPAWN_AT_MS) {
          const interval = Math.max(
            SPAWN_INTERVAL_MIN_MS,
            SPAWN_INTERVAL_BASE_MS - progress * 250
          );
          if (elapsed - lastSpawnRef.current >= interval) {
            lastSpawnRef.current = elapsed;
            spawnWave(now);
          }
        }

        obstacles.forEach((obs) => {
          if (obs.hit) return;
          const t = (now - obs.spawnedAt) / OBSTACLE_TRAVEL_MS;
          const eased = depthEase(t);
          const el = obstacleRefs.current.get(obs.id);
          if (el) {
            const x = laneCenterX(eased, obs.lane);
            const y = depthY(eased);
            const scale = depthScale(eased) * TYPE_SCALE[obs.type];
            el.style.left = `${x}%`;
            el.style.top = `${y}%`;
            el.style.transform = `translate(-50%, -50%) scale(${scale})`;
            el.style.opacity = '1';
          }

          if (!obs.passed && t >= COLLISION_T) {
            if (obs.lane === laneRef.current) {
              triggerCollision(obs.id);
            } else {
              obs.passed = true;
            }
          }
          if (t >= REMOVE_T) {
            obs.passed = true;
            setObstacles((list) => list.filter((o) => o.id !== obs.id));
          }
        });

        if (elapsed >= RACE_DURATION_MS - FINISH_APPROACH_MS) {
          const ft = Math.min(
            1,
            (elapsed - (RACE_DURATION_MS - FINISH_APPROACH_MS)) / FINISH_APPROACH_MS
          );
          const eased = depthEase(ft);
          if (finishLineRef.current) {
            const y = depthY(eased);
            const { left, right } = laneAreaEdges(eased);
            const heightPx = 5 + eased * 13;
            finishLineRef.current.style.top = `${y}%`;
            finishLineRef.current.style.left = `${left}%`;
            finishLineRef.current.style.width = `${right - left}%`;
            finishLineRef.current.style.height = `${heightPx}px`;
            finishLineRef.current.style.opacity = '1';
          }
        }

        if (elapsed >= RACE_DURATION_MS) {
          phaseRef.current = 'finishing';
          setPhase('finishing');
          finishTimeRef.current = now;
        }
      } else if (phaseRef.current === 'finishing' && finishTimeRef.current !== null) {
        if (now - finishTimeRef.current >= FREEZE_MS) {
          onFinish();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, obstacles, spawnWave, triggerCollision, onFinish]);

  const playerX = laneCenterX(depthEase(PLAYER_LANE_T), lane);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-track-black ${shake ? 'animate-[shake_0.25s_ease-in-out]' : ''}`}
    >
      <RoadBackground ref={roadSvgRef} />
      <SpeedParticles active={phase === 'running'} />

      {obstacles.map((obs) => (
        <ObstacleVehicle
          key={obs.id}
          type={obs.type}
          lane={obs.lane}
          ref={(el) => {
            if (el) obstacleRefs.current.set(obs.id, el);
            else obstacleRefs.current.delete(obs.id);
          }}
        />
      ))}

      <FinishLine ref={finishLineRef} />
      <PlayerCar ref={playerCarRef} damaged={damaged} xPercent={playerX} lane={lane} />

      <div
        className={`transition-opacity duration-300 ${phase === 'finishing' ? 'opacity-0' : 'opacity-100'}`}
      >
        <Hud
          progressFillRef={progressFillRef}
          timerTextRef={timerTextRef}
          speedNeedleRef={speedNeedleRef}
          speedValueRef={speedValueRef}
          lives={lives}
        />
      </div>

      {phase === 'running' && <Controls onLeft={() => moveLane(-1)} onRight={() => moveLane(1)} />}

      {phase === 'countdown' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/60 px-4 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-baby-200">
            Prepare-se
          </p>
          <StartingLights
            running
            onComplete={() => {
              startTimeRef.current = null;
              phaseRef.current = 'running';
              setPhase('running');
              setGoFlash(true);
              setTimeout(() => setGoFlash(false), 650);
            }}
          />
        </div>
      )}

      {goFlash && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
          <span className="font-display animate-[flash_0.5s_ease-in-out_1] text-4xl font-black tracking-widest text-white text-neon sm:text-6xl">
            VAI!
          </span>
        </div>
      )}

      {phase === 'gameover' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-black/75 px-4 text-center backdrop-blur-sm">
          <p className="font-display text-2xl font-black text-white text-neon sm:text-4xl">
            VOCÊ BATEU!
          </p>
          <p className="max-w-xs text-sm text-white/70 sm:text-base">
            Sem vidas restantes. Mas todo bom piloto tenta de novo.
          </p>
          <button
            type="button"
            onClick={resetGame}
            className="rounded-full bg-baby-500 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-black shadow-neon-lg transition active:scale-95 sm:text-base"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}
