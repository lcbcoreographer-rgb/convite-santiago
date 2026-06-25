import { motion } from 'framer-motion';
import posterSrc from '../../assets/video/poster.jpg';
import { CinematicAtmosphere } from './CinematicAtmosphere';
import { FlyingText } from './FlyingText';

const WHATSAPP_NUMBER = '5541984944501';
const RSVP_MESSAGE = 'Olá! Completei a corrida e confirmo minha presença na festa do Santiago.';
const ADDRESS = 'Av. Prefeito Roque Vernalha, 2473';
const NEIGHBORHOOD = 'Vila Guarani';

const HEADLINE = '🏁 Você foi convidado para a primeira volta do nosso pequeno piloto!';

const PARAGRAPHS = [
  'Há exatamente um ano, o Santiago deu a largada na corrida mais importante de todas: a corrida da vida. Agora, chegou a hora de comemorar sua primeira volta nessa incrível pista, cheia de descobertas, sorrisos e momentos inesquecíveis.',
  'E para tornar esse momento ainda mais especial, queremos você na torcida dessa grande corrida.',
  'Prepare seu espírito de piloto, acelere os motores e venha celebrar conosco o 1º aniversário do Santiago!',
];

const CLOSING =
  'Sua presença fará parte dessa grande chegada. Esperamos você na linha de chegada da primeira volta do nosso pequeno campeão.';

const rsvpUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(RSVP_MESSAGE)}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Morena Flor Eventos, ${ADDRESS}, ${NEIGHBORHOOD}`
)}`;

const EASE = [0.16, 1, 0.3, 1] as const;

const fromTop = {
  hidden: { opacity: 0, y: -70, rotateX: -45, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' },
};
const fromLeft = {
  hidden: { opacity: 0, x: -90, rotateY: 45, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' },
};
const fromRight = {
  hidden: { opacity: 0, x: 90, rotateY: -45, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' },
};
const fromDepth = {
  hidden: { opacity: 0, scale: 0.55, z: -260, filter: 'blur(10px)' },
  visible: { opacity: 1, scale: 1, z: 0, filter: 'blur(0px)' },
};

interface InviteRevealProps {
  onReplay: () => void;
}

export function InviteReveal({ onReplay }: InviteRevealProps) {
  return (
    <motion.div
      className="relative h-full w-full overflow-y-auto bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0">
        <img src={posterSrc} alt="Santiago" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/75 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-baby-600/20 via-transparent to-transparent" />
      </div>

      <CinematicAtmosphere />

      <div
        className="relative z-10 mx-auto flex min-h-full max-w-md flex-col px-5 pb-12 pt-[34vh] text-center sm:px-8"
        style={{ perspective: 1200 }}
      >
        <FlyingText
          text={HEADLINE}
          className="font-display block text-xl font-black leading-snug text-white text-neon sm:text-3xl"
        />

        <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-black/40 px-4 py-4 text-left ring-1 ring-white/10 backdrop-blur-sm sm:px-6">
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 + i * 0.25, ease: EASE }}
              className="text-sm leading-relaxed text-white/85 sm:text-base"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-4">
          <motion.div
            variants={fromTop}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 2, ease: EASE }}
          >
            <span className="font-display text-lg font-black text-white text-neon sm:text-2xl">
              🏎️ Santiago — 1 Ano
            </span>
          </motion.div>

          <div className="flex justify-center gap-8">
            <motion.div
              variants={fromLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 2.15, ease: EASE }}
              className="flex flex-col items-center"
            >
              <span className="text-lg sm:text-xl">📅</span>
              <span className="font-display text-sm font-bold text-white sm:text-base">
                27 de julho de 2026
              </span>
            </motion.div>
            <motion.div
              variants={fromRight}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 2.15, ease: EASE }}
              className="flex flex-col items-center"
            >
              <span className="text-lg sm:text-xl">🕢</span>
              <span className="font-display text-sm font-bold text-white sm:text-base">19h30</span>
            </motion.div>
          </div>

          <motion.div
            variants={fromDepth}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, delay: 2.3, ease: EASE }}
            className="mx-auto max-w-sm rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-baby-300/25 backdrop-blur-sm"
          >
            <p className="font-display text-base font-bold text-white sm:text-lg">📍 Morena Flor Eventos</p>
            <p className="mt-1 text-xs text-white/70 sm:text-sm">
              {ADDRESS}
              <br />
              {NEIGHBORHOOD}
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.6, ease: EASE }}
          className="mt-7 text-sm italic leading-relaxed text-white/75 sm:text-base"
        >
          {CLOSING}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.85, ease: EASE }}
          className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3"
        >
          <a
            href={rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display w-full rounded-full bg-baby-500 px-6 py-4 text-sm font-black uppercase tracking-wider text-black shadow-neon-lg transition active:scale-95 sm:text-base"
          >
            Confirmar presença
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display w-full rounded-full border border-baby-300/40 px-6 py-3 text-sm font-bold uppercase tracking-wider text-baby-200 transition active:scale-95"
          >
            Ver localização
          </a>
          <button
            type="button"
            onClick={onReplay}
            className="font-display w-full rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white/70 transition active:scale-95"
          >
            Jogar novamente
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
