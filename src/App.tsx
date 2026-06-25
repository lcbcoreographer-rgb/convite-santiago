import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StartScreen } from './components/screens/StartScreen';
import { CinematicScreen } from './components/screens/CinematicScreen';
import { RaceGame } from './components/game/RaceGame';
import { MusicControl } from './components/ui/MusicControl';
import { useAudio } from './hooks/useAudio';
import type { GameState } from './lib/types';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const audio = useAudio();

  const handleStart = useCallback(() => {
    audio.play();
    setGameState('racing');
  }, [audio]);

  const handleFinish = useCallback(() => {
    audio.pause();
    setGameState('cinematic');
  }, [audio]);

  const handleReplay = useCallback(() => setGameState('start'), []);

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StartScreen onStart={handleStart} />
          </motion.div>
        )}

        {gameState === 'racing' && (
          <motion.div
            key="racing"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RaceGame onFinish={handleFinish} />
          </motion.div>
        )}

        {gameState === 'cinematic' && (
          <motion.div
            key="cinematic"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CinematicScreen onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>

      {gameState === 'start' && (
        <MusicControl
          isPlaying={audio.isPlaying}
          volume={audio.volume}
          onToggle={audio.toggle}
          onVolumeChange={audio.setVolume}
        />
      )}
    </div>
  );
}

export default App;
