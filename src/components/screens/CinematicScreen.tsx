import { useState } from 'react';
import posterSrc from '../../assets/video/poster.jpg';
import { VideoIntro } from '../cinematic/VideoIntro';
import { CinematicTransition } from '../cinematic/CinematicTransition';
import { InviteReveal } from '../cinematic/InviteReveal';

type SubPhase = 'video' | 'transition' | 'reveal';

interface CinematicScreenProps {
  onReplay: () => void;
}

export function CinematicScreen({ onReplay }: CinematicScreenProps) {
  const [subPhase, setSubPhase] = useState<SubPhase>('video');

  if (subPhase === 'video') {
    return <VideoIntro onEnded={() => setSubPhase('transition')} />;
  }

  if (subPhase === 'transition') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-black">
        <img src={posterSrc} alt="" className="h-full w-full object-cover" />
        <CinematicTransition onComplete={() => setSubPhase('reveal')} />
      </div>
    );
  }

  return <InviteReveal onReplay={onReplay} />;
}
