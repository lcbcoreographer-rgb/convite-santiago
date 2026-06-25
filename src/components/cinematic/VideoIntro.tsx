import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import videoSrc from '../../assets/video/santiago-arrival.mp4';
import posterSrc from '../../assets/video/poster.jpg';

interface VideoIntroProps {
  onEnded: () => void;
}

export function VideoIntro({ onEnded }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="h-full w-full object-contain"
        playsInline
        autoPlay
        controls={false}
        onEnded={onEnded}
      />
    </motion.div>
  );
}
