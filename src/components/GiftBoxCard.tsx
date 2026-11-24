import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, CheckCircle2, Sparkles, Heart } from 'lucide-react';

export interface GiftBoxItem {
  id: 'cake' | 'memories' | 'letter';
  numberLabel: string;
  title: string;
  subtitle: string;
  actionLabel: string;
  theme: {
    borderGradient: string;
    cardTint: string;
    buttonGradient: string;
    buttonShadow: string;
    accentText: string;
    boxMain: string;
    boxAccent: string;
    lidMain: string;
    ribbon: string;
    bowSecondary: string;
    glow: string;
    sparkleColor: string;
  };
}

interface GiftBoxCardProps {
  gift: GiftBoxItem;
  isOpened: boolean;
  onOpen: (id: GiftBoxItem['id']) => void;
}

export const GiftBoxCard: React.FC<GiftBoxCardProps> = ({
  gift,
  isOpened,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen(gift.id);
      setIsOpening(false);
    }, 440);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`p-[2px] rounded-[26px] bg-gradient-to-br ${gift.theme.borderGradient} shadow-[0_18px_45px_rgba(155,93,229,0.16)] hover:shadow-[0_24px_56px_rgba(255,79,154,0.26)] transition-shadow duration-200 flex`}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`group relative w-full text-left rounded-3xl bg-gradient-to-b ${gift.theme.cardTint} backdrop-blur-xl p-6 sm:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F9A] cursor-pointer flex flex-col justify-between overflow-hidden`}
      >
        {/* Top quiet unboxed metadata */}
        <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-3">
          <span className={gift.theme.accentText}>{gift.numberLabel}</span>
          <span className="flex items-center gap-1 text-[#5e2a4b]">
            {isOpened ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9B5DE5]" aria-hidden="true" />
                <span className="text-[#9B5DE5]">Opened</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#FF4F9A]" aria-hidden="true" />
                <span className="text-[#FF416C]">Ready</span>
              </>
            )}
          </span>
        </div>

        {/* Colourful Animated SVG Gift Box Illustration */}
        <div className="relative flex items-center justify-center py-3">
          <div
            className="absolute w-36 h-36 rounded-full blur-2xl opacity-75 transition-opacity group-hover:opacity-100"
            style={{ backgroundColor: gift.theme.glow }}
            aria-hidden="true"
          />

          <motion.svg
            viewBox="0 0 185 180"
            className="relative w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_12px_20px_rgba(155,93,229,0.18)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={
              isOpening
                ? { scale: [1, 1.1, 0.96, 1.05], rotate: [0, -4, 4, 0] }
                : { y: [0, -5, 0] }
            }
            transition={
              isOpening
                ? { duration: 0.42 }
                : { duration: 3.3, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* Soft shadow */}
            <ellipse cx="92" cy="162" rx="54" ry="9" fill={gift.theme.boxAccent} opacity="0.55" />

            {/* Gift Box Body */}
            <rect
              x="36"
              y="74"
              width="112"
              height="80"
              rx="14"
              fill={gift.theme.boxMain}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            {/* Decorative diagonal pastel stripe highlight */}
            <path
              d="M36 116 L76 74 H98 L36 138 Z"
              fill={gift.theme.boxAccent}
              opacity="0.35"
            />
            <path
              d="M148 114 L108 154 H88 L148 92 Z"
              fill={gift.theme.boxAccent}
              opacity="0.28"
            />

            {/* Horizontal & Vertical Ribbons */}
            <rect x="36" y="106" width="112" height="15" fill={gift.theme.bowSecondary} opacity="0.78" />
            <rect x="82" y="74" width="20" height="80" fill={gift.theme.ribbon} />
            <rect x="86" y="74" width="4" height="80" fill="#FFFFFF" opacity="0.45" />

            {/* Animated Lid + Satin Bow */}
            <motion.g
              animate={
                isOpening
                  ? { y: -28, rotate: -11, opacity: 0.95 }
                  : isOpened
                  ? { y: -7, rotate: -3 }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: '92px', originY: '62px' }}
            >
              {/* Lid */}
              <rect
                x="28"
                y="54"
                width="128"
                height="25"
                rx="10"
                fill={gift.theme.lidMain}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <rect x="82" y="54" width="20" height="25" fill={gift.theme.ribbon} />

              {/* Outer Bow Loops */}
              <path
                d="M92 54 C68 54, 46 34, 57 21 C67 10, 88 32, 92 49 Z"
                fill={gift.theme.ribbon}
              />
              <path
                d="M92 54 C116 54, 138 34, 127 21 C117 10, 96 32, 92 49 Z"
                fill={gift.theme.ribbon}
              />
              {/* Inner Secondary Ribbon Loops */}
              <path
                d="M86 48 C71 42, 62 30, 67 25"
                stroke={gift.theme.bowSecondary}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M98 48 C113 42, 122 30, 117 25"
                stroke={gift.theme.bowSecondary}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Center Knot */}
              <circle cx="92" cy="51" r="10" fill={gift.theme.ribbon} stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="90" cy="48.5" r="3" fill="#FFFFFF" opacity="0.6" />
            </motion.g>

            {/* Animated Sparkles & Floating Heart */}
            <path
              d="M40 24 L43 32 L51 35 L43 38 L40 46 L37 38 L29 35 L37 32 Z"
              fill={gift.theme.sparkleColor}
              className="animate-sparkle"
            />
            <path
              d="M146 28 L148.5 34.5 L155 37 L148.5 39.5 L146 46 L143.5 39.5 L137 37 L143.5 34.5 Z"
              fill="#FFF0A8"
              className="animate-sparkle"
            />
            <path
              d="M150 90 C148 86, 142 86, 142 91 C142 95, 150 100, 150 100 C150 100, 158 95, 158 91 C158 86, 152 86, 150 90 Z"
              fill={gift.theme.ribbon}
              opacity="0.85"
            />
          </motion.svg>
        </div>

        {/* Title & Description */}
        <div className="mt-2 space-y-2">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#36132b]">
            {gift.title}
          </h3>
          <p className="text-sm text-[#5e2a4b] leading-relaxed">
            {gift.subtitle}
          </p>
        </div>

        {/* Colourful Gradient CTA Button with Heart Icon */}
        <div className="mt-5">
          <span
            className={`w-full min-h-[46px] px-4 py-2.5 rounded-2xl bg-gradient-to-r ${gift.theme.buttonGradient} text-white text-sm font-bold ${gift.theme.buttonShadow} inline-flex items-center justify-center gap-2 group-hover:brightness-105 transition-all`}
          >
            <Gift className="w-4 h-4" aria-hidden="true" />
            <span>{isOpened ? 'Open Again' : gift.actionLabel}</span>
            <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
          </span>
        </div>
      </button>
    </motion.div>
  );
};
