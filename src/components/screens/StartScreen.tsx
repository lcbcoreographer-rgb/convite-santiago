import { motion } from 'framer-motion';
import { RoadBackground } from '../game/RoadBackground';
import { StartingLights } from '../ui/StartingLights';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="absolute inset-0">
        <RoadBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 flex max-w-md flex-col items-center gap-5"
      >
        <span className="font-display rounded-full border border-baby-300/40 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.35em] text-baby-200">
          Santiago • 1 ano
        </span>

        <h1 className="font-display text-3xl font-black uppercase leading-tight text-white text-neon sm:text-5xl">
          Prepare-se para
          <br />a largada
        </h1>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          Complete a corrida para desbloquear o convite do Santiago.
        </p>

        <StartingLights running={false} />

        <motion.button
          type="button"
          onClick={onStart}
          whileTap={{ scale: 0.94 }}
          className="font-display mt-2 rounded-full bg-baby-500 px-9 py-4 text-base font-black uppercase tracking-wider text-black shadow-neon-lg transition hover:bg-baby-400 sm:text-lg"
        >
          Iniciar corrida
        </motion.button>
      </motion.div>
    </div>
  );
}
