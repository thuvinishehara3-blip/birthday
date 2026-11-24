import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, Wind, Sparkles, Heart } from 'lucide-react';
import { CartoonCoupleScene } from './CartoonCharacters';
import { ConfettiBurst } from './FloatingAtmosphere';

interface GiftCakeModalProps {
  onClose: () => void;
}

export const GiftCakeModal: React.FC<GiftCakeModalProps> = ({ onClose }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const handleToggleCandles = () => {
    if (candlesLit) {
      setCandlesLit(false);
      setWishMade(true);
      setBurstKey((prev) => prev + 1);
    } else {
      setCandlesLit(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#36132b]/55 backdrop-blur-md p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cake-modal-title"
    >
      <ConfettiBurst triggerKey={burstKey} count={40} />

      <div className="w-full sm:max-w-2xl p-[2px] rounded-t-[26px] sm:rounded-[26px] bg-gradient-to-br from-[#FFB6D9] via-[#C9A0FF] via-[#FFC6A8] to-[#FFF0A8] shadow-[0_24px_70px_rgba(255,79,154,0.32)]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-gradient-to-br from-[#fff5fa] via-[#ffffff] to-[#f5ecff] p-6 sm:p-8"
        >
          {/* Colourful Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-gradient-to-br from-[#FF4F9A] to-[#9B5DE5] text-white shadow-md shadow-[#FF4F9A]/30 hover:brightness-110 active:scale-95 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F9A] cursor-pointer z-20"
            aria-label="Close cake surprise"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center pr-8 sm:pr-0">
            <p className="text-xs font-bold tracking-wider uppercase text-[#9B5DE5]">
              Gift 01 · Sweet Celebration
            </p>
            <h2
              id="cake-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] mt-1 text-balance"
            >
              Make a wish, birthday girl!
            </h2>
          </div>

          {/* Colourful Magical Environment Surrounding the Elegant White Cake */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-5 py-4 px-2 rounded-3xl bg-gradient-to-br from-[#FFB6D9]/35 via-[#C9A0FF]/30 via-[#A7D8FF]/25 to-[#FFF0A8]/35 border border-white/90 shadow-inner flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Vibrant Pink, Purple & Peach Glowing Orbs Behind the White Cake */}
            <div
              className="absolute -top-8 left-1/4 w-44 h-44 rounded-full bg-[#FF4F9A]/35 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-8 right-1/4 w-48 h-48 rounded-full bg-[#9B5DE5]/35 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-[#FFF0A8]/45 blur-2xl"
              aria-hidden="true"
            />

            {/* Floating Golden Sparkles, Confetti Dots & Multi-Shade Hearts */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <span className="animate-sparkle absolute top-4 left-8 text-[#FFF0A8] drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]">
                <Sparkles className="w-5 h-5" />
              </span>
              <span
                className="animate-sparkle absolute top-6 right-10 text-[#FF4F9A]"
                style={{ animationDelay: '0.7s' }}
              >
                <Sparkles className="w-5 h-5" />
              </span>
              <span
                className="animate-sparkle absolute bottom-6 left-10 text-[#9B5DE5]"
                style={{ animationDelay: '1.2s' }}
              >
                <Sparkles className="w-4 h-4" />
              </span>
              <span
                className="animate-float-slow absolute bottom-12 left-6 text-[#FF416C]"
              >
                <Heart className="w-4 h-4 fill-current" />
              </span>
              <span
                className="animate-float-slow absolute top-16 left-5 text-[#C9A0FF]"
                style={{ animationDelay: '0.6s' }}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
              </span>
              <span
                className="animate-float-slow absolute bottom-14 right-7 text-[#FF4F9A]"
                style={{ animationDelay: '1.1s' }}
              >
                <Heart className="w-4 h-4 fill-current" />
              </span>
              <span
                className="animate-float-slow absolute top-20 right-6 text-[#A7D8FF]"
                style={{ animationDelay: '1.5s' }}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
              </span>

              {/* Colourful confetti flecks */}
              <span className="absolute top-10 left-1/4 w-2 h-2 rounded-full bg-[#FF4F9A]" />
              <span className="absolute top-12 right-1/4 w-2.5 h-1.5 rounded-sm bg-[#FFF0A8] rotate-45" />
              <span className="absolute bottom-8 left-1/3 w-2 h-2 rounded-full bg-[#A7D8FF]" />
              <span className="absolute bottom-10 right-1/3 w-2.5 h-1.5 rounded-sm bg-[#C9A0FF] -rotate-12" />
            </div>

            <svg
              viewBox="0 0 330 300"
              className="relative w-full max-w-[300px] sm:max-w-[335px] h-auto drop-shadow-[0_18px_36px_rgba(155,93,229,0.22)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Elegant white birthday cake with white roses, pearls, soft pink details, pink and lavender blossoms, and glowing candles"
            >
              <defs>
                <linearGradient id="cakePlateRich" x1="40" y1="252" x2="290" y2="278" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFB6D9" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#C9A0FF" />
                </linearGradient>
                <linearGradient id="whiteFrostingBottom" x1="65" y1="168" x2="265" y2="250" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="72%" stopColor="#FFFBFD" />
                  <stop offset="100%" stopColor="#FFF0F7" />
                </linearGradient>
                <linearGradient id="whiteFrostingTop" x1="95" y1="100" x2="235" y2="168" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="75%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FDF4FF" />
                </linearGradient>
                <radialGradient id="flameGlowRich" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF0A8" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFC6A8" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#FF4F9A" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Pedestal Cake Stand */}
              <ellipse cx="165" cy="278" rx="76" ry="10" fill="#C9A0FF" opacity="0.55" />
              <path d="M142 258 L188 258 L198 276 L132 276 Z" fill="#FFFFFF" stroke="#FFB6D9" strokeWidth="1.8" />
              <ellipse cx="165" cy="252" rx="122" ry="17" fill="url(#cakePlateRich)" stroke="#FFFFFF" strokeWidth="2.2" />

              {/* Decorative Pink & Lavender Blossoms on the Plate Rim */}
              {[
                { x: 64, y: 248, petal: '#FFB6D9', center: '#FFF0A8' },
                { x: 86, y: 256, petal: '#C9A0FF', center: '#FFFFFF' },
                { x: 244, y: 256, petal: '#C9A0FF', center: '#FFF0A8' },
                { x: 266, y: 248, petal: '#FF4F9A', center: '#FFF0A8' },
              ].map((fl, idx) => (
                <g key={`plate-fl-${idx}`} transform={`translate(${fl.x}, ${fl.y})`}>
                  <circle cx="-4" cy="0" r="4" fill={fl.petal} />
                  <circle cx="4" cy="0" r="4" fill={fl.petal} />
                  <circle cx="0" cy="-4" r="4" fill={fl.petal} />
                  <circle cx="0" cy="4" r="4" fill={fl.petal} />
                  <circle cx="0" cy="0" r="2.6" fill={fl.center} />
                </g>
              ))}

              {/* Bottom Cake Tier — Crisp White Frosting */}
              <rect
                x="65"
                y="168"
                width="200"
                height="82"
                rx="18"
                fill="url(#whiteFrostingBottom)"
                stroke="#FFE4F0"
                strokeWidth="2"
              />
              {/* Soft Pink Ribbon Trim at Base */}
              <path
                d="M65 232 C65 245, 265 245, 265 232 L265 241 C265 254, 65 254, 65 241 Z"
                fill="#FFB6D9"
              />
              {/* Scalloped White Buttercream Piping */}
              <path
                d="M67 174 Q79 188 91 174 Q103 188 115 174 Q127 188 139 174 Q151 188 163 174 Q175 188 187 174 Q199 188 211 174 Q223 188 235 174 Q247 188 263 174"
                fill="#FFFFFF"
                stroke="#FFB6D9"
                strokeWidth="1.6"
              />

              {/* Lustrous Pearl Decorations along Bottom Tier */}
              {[79, 97, 115, 133, 151, 169, 187, 205, 223, 241, 253].map((cx, i) => (
                <g key={`p1-${i}`}>
                  <circle cx={cx} cy="228" r="4.2" fill="#FFFFFF" stroke="#FFB6D9" strokeWidth="1.1" />
                  <circle cx={cx - 1.2} cy="226.8" r="1.2" fill="#FFF0A8" opacity="0.65" />
                </g>
              ))}

              {/* Top Cake Tier — Crisp White Frosting */}
              <rect
                x="97"
                y="102"
                width="136"
                height="68"
                rx="16"
                fill="url(#whiteFrostingTop)"
                stroke="#F3E8FF"
                strokeWidth="1.8"
              />
              {/* Soft Pink Delicate Drip Frosting */}
              <path
                d="M97 108 C97 98, 233 98, 233 108 L233 118 C225 124, 220 113, 212 119 C204 128, 198 112, 189 120 C180 130, 172 114, 164 122 C155 132, 147 114, 139 121 C129 129, 122 113, 113 119 C106 124, 101 116, 97 118 Z"
                fill="#FFE4F0"
                opacity="0.9"
              />
              {/* Top Tier White Surface */}
              <ellipse cx="165" cy="102" rx="68" ry="12" fill="#FFFFFF" stroke="#FFB6D9" strokeWidth="1.5" />

              {/* Small Pearl Trim at Top Tier Seam */}
              {[107, 121, 135, 149, 163, 177, 191, 205, 219].map((cx, i) => (
                <circle
                  key={`p2-${i}`}
                  cx={cx}
                  cy="168"
                  r="3.4"
                  fill="#FFFFFF"
                  stroke="#C9A0FF"
                  strokeWidth="1"
                />
              ))}

              {/* White Roses with Pink & Lavender Leaves */}
              {[
                { x: 89, y: 170, s: 1 },
                { x: 165, y: 173, s: 1.14 },
                { x: 239, y: 170, s: 1 },
                { x: 123, y: 106, s: 0.85 },
                { x: 207, y: 106, s: 0.85 },
              ].map((rose, idx) => (
                <g
                  key={`rose-${idx}`}
                  transform={`translate(${rose.x}, ${rose.y}) scale(${rose.s})`}
                >
                  <ellipse cx="-11" cy="3" rx="7" ry="3.5" transform="rotate(-25 -11 3)" fill="#C9A0FF" opacity="0.7" />
                  <ellipse cx="11" cy="3" rx="7" ry="3.5" transform="rotate(25 11 3)" fill="#FFB6D9" opacity="0.85" />
                  <circle cx="0" cy="0" r="10.8" fill="#FFFFFF" stroke="#FFB6D9" strokeWidth="1.3" />
                  <path
                    d="M-6 -2 C-6 -7, 6 -7, 6 -2 C7 4, -7 4, -6 -2 Z"
                    fill="#FFF7FA"
                    stroke="#FFB6D9"
                    strokeWidth="1"
                  />
                  <path
                    d="M-3 0 C-3 -3.5, 3 -3.5, 3 0 C3 3, -2 3.5, -1.5 0.5"
                    stroke="#FF4F9A"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              ))}

              {/* Soft Pink Heart Crest on Front of Cake */}
              <path
                d="M165 198 C162 192, 152 192, 152 199 C152 206, 165 215, 165 215 C165 215, 178 206, 178 199 C178 192, 168 192, 165 198 Z"
                fill="#FFB6D9"
                stroke="#FF4F9A"
                strokeWidth="1.3"
              />
              <text
                x="165"
                y="206.5"
                textAnchor="middle"
                fill="#36132b"
                fontSize="8.8"
                fontWeight="700"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                29
              </text>

              {/* Romantic Pastel Candles with Warm Golden Glow */}
              {[
                { x: 133, y: 60, h: 36, color: '#FFB6D9', stripe: '#FF4F9A' },
                { x: 154, y: 52, h: 42, color: '#C9A0FF', stripe: '#9B5DE5' },
                { x: 176, y: 52, h: 42, color: '#FFC6A8', stripe: '#FF416C' },
                { x: 197, y: 60, h: 36, color: '#A7D8FF', stripe: '#9B5DE5' },
              ].map((candle, i) => (
                <g key={`candle-${i}`}>
                  <rect
                    x={candle.x - 4.5}
                    y={candle.y}
                    width="9"
                    height={candle.h}
                    rx="3"
                    fill={candle.color}
                    stroke="#FFFFFF"
                    strokeWidth="1.1"
                  />
                  <path
                    d={`M${candle.x - 4} ${candle.y + 10} L${candle.x + 4} ${candle.y + 6} M${candle.x - 4} ${candle.y + 22} L${candle.x + 4} ${candle.y + 18}`}
                    stroke={candle.stripe}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <line
                    x1={candle.x}
                    y1={candle.y - 5}
                    x2={candle.x}
                    y2={candle.y}
                    stroke="#36132b"
                    strokeWidth="1.4"
                  />

                  {candlesLit ? (
                    <g className="animate-candle-flame">
                      <circle cx={candle.x} cy={candle.y - 12} r="17" fill="url(#flameGlowRich)" />
                      <path
                        d={`M${candle.x} ${candle.y - 22} C${candle.x + 5.8} ${candle.y - 14}, ${candle.x + 4.8} ${candle.y - 6}, ${candle.x} ${candle.y - 5.5} C${candle.x - 4.8} ${candle.y - 6}, ${candle.x - 5.8} ${candle.y - 14}, ${candle.x} ${candle.y - 22} Z`}
                        fill="#FF4F9A"
                      />
                      <path
                        d={`M${candle.x} ${candle.y - 17} C${candle.x + 3} ${candle.y - 12}, ${candle.x + 2.5} ${candle.y - 7.5}, ${candle.x} ${candle.y - 7} C${candle.x - 2.5} ${candle.y - 7.5}, ${candle.x - 3} ${candle.y - 12}, ${candle.x} ${candle.y - 17} Z`}
                        fill="#FFF0A8"
                      />
                    </g>
                  ) : (
                    <motion.path
                      initial={{ opacity: 0.85, y: 0 }}
                      animate={{ opacity: 0, y: -14 }}
                      transition={{ duration: 1.1 }}
                      d={`M${candle.x} ${candle.y - 6} Q${candle.x + 4} ${candle.y - 14} ${candle.x - 2} ${candle.y - 22}`}
                      stroke="#C9A0FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )}
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Interactive Candle Wish Action */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleToggleCandles}
              className="min-h-[48px] px-7 py-3 rounded-2xl bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] hover:brightness-110 active:scale-[0.98] text-white text-sm font-bold shadow-[0_10px_28px_rgba(255,79,154,0.35)] inline-flex items-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F9A]"
            >
              {candlesLit ? (
                <>
                  <Wind className="w-4 h-4" aria-hidden="true" />
                  <span>Blow Out Candles &amp; Make a Wish</span>
                  <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4" aria-hidden="true" />
                  <span>Relight Birthday Candles</span>
                  <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                </>
              )}
            </button>

            <AnimatePresence>
              {wishMade && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-bold text-[#FF416C] text-center"
                >
                  May every single wish you whispered today bloom into reality!
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Sweet 29th Birthday Wish Card */}
          <div className="mt-6 p-[1.5px] rounded-2xl bg-gradient-to-r from-[#FFB6D9] via-[#C9A0FF] to-[#FFC6A8]">
            <div className="rounded-2xl bg-white/95 p-5 text-center space-y-2.5">
              <p className="text-xs font-bold tracking-wider uppercase text-[#9B5DE5]">
                Happy 29th Birthday, Sudu Nona
              </p>
              <p className="text-sm sm:text-base text-[#36132b] leading-relaxed">
                As you step into your 29th year, may your days glow as softly and
                brightly as your smile. Thank you for filling every ordinary moment
                with warmth, grace, and laughter. Here is to celebrating you today
                and loving you in every chapter ahead.
              </p>
              <div className="pt-1 flex justify-center scale-75 origin-top -mb-8">
                <CartoonCoupleScene mood={wishMade ? 'celebrate' : 'happy'} showCake={false} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
