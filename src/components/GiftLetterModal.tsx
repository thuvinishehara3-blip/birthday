import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, MailOpen, Sparkles } from 'lucide-react';
import { CartoonCoupleScene } from './CartoonCharacters';
import { ConfettiBurst } from './FloatingAtmosphere';

interface GiftLetterModalProps {
  onClose: () => void;
}

const PROMISES = [
  {
    num: '01',
    title: 'Always Your Safe Place',
    text: 'Through every busy week and quiet evening, I promise to listen, hold your hand, and keep cheering for every dream you chase.',
    gradient: 'from-[#FFB6D9] to-[#FFC6A8]',
    numColor: 'text-[#FF416C]',
  },
  {
    num: '02',
    title: 'More Laughter & Little Adventures',
    text: 'In your 29th year, let us collect spontaneous coffee dates, golden sunset walks, and memories as bright as your smile.',
    gradient: 'from-[#C9A0FF] to-[#A7D8FF]',
    numColor: 'text-[#9B5DE5]',
  },
  {
    num: '03',
    title: 'Endless Love & Gratitude',
    text: 'Thank you for being my Sudu Nona — kind, brilliant, and wonderfully you. Every day beside you feels like a gift.',
    gradient: 'from-[#FF4F9A] to-[#C9A0FF]',
    numColor: 'text-[#FF4F9A]',
  },
];

export const GiftLetterModal: React.FC<GiftLetterModalProps> = ({ onClose }) => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [loveCount, setLoveCount] = useState(0);

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    setBurstKey((prev) => prev + 1);
  };

  const handleSendLove = () => {
    setLoveCount((c) => c + 1);
    setBurstKey((prev) => prev + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#36132b]/55 backdrop-blur-md p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="letter-modal-title"
    >
      <ConfettiBurst triggerKey={burstKey} count={32} />

      <div className="w-full sm:max-w-2xl p-[2px] rounded-t-[26px] sm:rounded-[26px] bg-gradient-to-br from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] shadow-[0_24px_70px_rgba(255,65,108,0.3)]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-gradient-to-br from-[#fff3f8] via-[#ffffff] to-[#f4ecff] p-6 sm:p-8"
        >
          {/* Colourful Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-gradient-to-br from-[#FF416C] to-[#9B5DE5] text-white shadow-md shadow-[#FF416C]/30 hover:brightness-110 active:scale-95 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF416C] cursor-pointer z-20"
            aria-label="Close love letter"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center pr-8 sm:pr-0">
            <p className="text-xs font-bold tracking-wider uppercase text-[#FF416C]">
              Gift 03 · From My Heart to Yours
            </p>
            <h2
              id="letter-modal-title"
              className="font-display italic text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] mt-1 text-balance"
            >
              A Love Letter for Your 29th Birthday
            </h2>
          </div>

          <AnimatePresence mode="wait">
            {!envelopeOpened ? (
              <motion.div
                key="sealed-envelope"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                className="my-8 flex flex-col items-center text-center relative"
              >
                {/* Soft golden & lavender sparkles around the envelope */}
                <span className="animate-sparkle absolute top-0 left-12 text-[#FFF0A8] drop-shadow-[0_0_6px_rgba(255,215,0,0.85)]" aria-hidden="true">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="animate-sparkle absolute bottom-16 right-12 text-[#C9A0FF]" style={{ animationDelay: '0.7s' }} aria-hidden="true">
                  <Sparkles className="w-5 h-5" />
                </span>

                {/* Illustrated Lavender Envelope with Cherry-Red Heart Seal */}
                <button
                  type="button"
                  onClick={handleOpenEnvelope}
                  className="group relative w-full max-w-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF416C] rounded-3xl"
                  aria-label="Break cherry-red wax heart seal and read birthday letter"
                >
                  <svg
                    viewBox="0 0 280 195"
                    className="w-full h-auto drop-shadow-[0_18px_36px_rgba(155,93,229,0.26)] group-hover:-translate-y-1.5 transition-transform duration-200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="envBody" x1="14" y1="22" x2="266" y2="174" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#F5EAFF" />
                        <stop offset="50%" stopColor="#FFEBF4" />
                        <stop offset="100%" stopColor="#E9D5FF" />
                      </linearGradient>
                      <linearGradient id="envFlap" x1="14" y1="22" x2="266" y2="115" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#F3E8FF" />
                      </linearGradient>
                    </defs>

                    <rect
                      x="14"
                      y="22"
                      width="252"
                      height="154"
                      rx="20"
                      fill="url(#envBody)"
                      stroke="#C9A0FF"
                      strokeWidth="2.5"
                    />
                    {/* Pink inner paper peek */}
                    <rect
                      x="24"
                      y="28"
                      width="232"
                      height="32"
                      rx="10"
                      fill="#FFB6D9"
                      opacity="0.55"
                    />
                    {/* Lavender bottom fold */}
                    <path
                      d="M16 170 L140 94 L264 170"
                      fill="#E9D5FF"
                      stroke="#C9A0FF"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    {/* Envelope top flap */}
                    <path
                      d="M16 28 L140 112 L264 28"
                      fill="url(#envFlap)"
                      stroke="#FF4F9A"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    {/* Soft golden corner stars */}
                    <path d="M40 140 L42 145 L47 147 L42 149 L40 154 L38 149 L33 147 L38 145 Z" fill="#FFF0A8" />
                    <path d="M240 140 L242 145 L247 147 L242 149 L240 154 L238 149 L233 147 L238 145 Z" fill="#FFF0A8" />

                    {/* Cherry-Red Wax Heart Seal */}
                    <circle cx="140" cy="108" r="24" fill="#FF416C" />
                    <circle cx="140" cy="108" r="19" stroke="#FFF0A8" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path
                      d="M140 103 C137 98, 130 99, 130 105 C130 111, 140 118, 140 118 C140 118, 150 111, 150 105 C150 99, 143 98, 140 103 Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </button>

                <p className="mt-4 text-sm text-[#5e2a4b]">
                  Sealed with love for <strong className="text-[#FF416C]">Sudu Nona</strong>
                </p>

                <button
                  type="button"
                  onClick={handleOpenEnvelope}
                  className="mt-4 min-h-[48px] px-7 py-3 rounded-2xl bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] hover:brightness-110 active:scale-[0.98] text-white text-sm font-bold shadow-[0_10px_28px_rgba(255,65,108,0.35)] inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MailOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Open Love Letter</span>
                  <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 space-y-6"
              >
                {/* Romantic Letter Paper with Pink Edges & Soft Golden Sparkles */}
                <div className="p-[2px] rounded-2xl bg-gradient-to-br from-[#FFB6D9] via-[#FF4F9A] to-[#C9A0FF] shadow-[0_14px_34px_rgba(255,79,154,0.16)]">
                  <div className="relative rounded-[14px] bg-gradient-to-b from-[#fffafd] to-[#fff5fb] p-5 sm:p-7 space-y-4 overflow-hidden">
                    <span className="animate-sparkle absolute top-4 right-4 text-[#FFF0A8] drop-shadow-[0_0_5px_rgba(255,79,154,0.5)]" aria-hidden="true">
                      <Sparkles className="w-5 h-5" />
                    </span>

                    <p className="font-display italic text-xl font-semibold text-[#FF416C]">
                      My Dearest Sudu Nona,
                    </p>
                    <p className="text-sm sm:text-base text-[#36132b] leading-relaxed">
                      Happy 29th Birthday to the most wonderful girl in my world! Looking
                      back at how far we have come — from our graduation smiles to every
                      quiet moment in between — my heart feels endlessly thankful for you.
                    </p>
                    <p className="text-sm sm:text-base text-[#36132b] leading-relaxed">
                      You bring gentleness, warmth, and quiet magic into everything you do.
                      On your special day, I hope you feel just how deeply you are loved,
                      cherished, and celebrated today and always.
                    </p>
                    <p className="font-display italic text-lg font-semibold text-[#9B5DE5] pt-1">
                      Forever yours, with all my heart.
                    </p>
                  </div>
                </div>

                {/* Three Birthday Promises with Colourful Borders */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#9B5DE5] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF4F9A]" aria-hidden="true" />
                    <span>Three Wishes &amp; Promises for Year 29</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PROMISES.map((item) => (
                      <div
                        key={item.num}
                        className={`p-[1.5px] rounded-2xl bg-gradient-to-br ${item.gradient}`}
                      >
                        <div className="h-full rounded-[14px] bg-white/95 p-4 space-y-1.5">
                          <span className={`text-xs font-bold tabular-nums ${item.numColor}`}>
                            {item.num}
                          </span>
                          <h4 className="font-display text-base font-bold text-[#36132b]">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#5e2a4b] leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cartoon Couple Celebrating + Interactive Heart Shower */}
                <div className="pt-2 flex flex-col items-center">
                  <CartoonCoupleScene mood="celebrate" showCake />
                  <button
                    type="button"
                    onClick={handleSendLove}
                    className="mt-3 min-h-[48px] px-7 py-3 rounded-2xl bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] hover:brightness-110 active:scale-[0.98] text-white text-sm font-bold shadow-[0_10px_28px_rgba(255,79,154,0.35)] inline-flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>
                      Send Extra Birthday Love
                      {loveCount > 0 ? ` (${loveCount})` : ''}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
