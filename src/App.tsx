/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Music, Sparkles, VolumeX } from 'lucide-react';
import { FloatingAtmosphere, ConfettiBurst } from './components/FloatingAtmosphere';
import { PasswordScreen } from './components/PasswordScreen';
import { CartoonCoupleScene } from './components/CartoonCharacters';
import { GiftBoxCard, GiftBoxItem } from './components/GiftBoxCard';
import { GiftCakeModal } from './components/GiftCakeModal';
import { GiftMemoriesModal } from './components/GiftMemoriesModal';
import { GiftLetterModal } from './components/GiftLetterModal';
import { birthdayMusic } from './utils/birthdayMusic';

const GIFT_BOXES: GiftBoxItem[] = [
  {
    id: 'cake',
    numberLabel: 'Gift 01 · Sweet Surprise',
    title: 'White Birthday Cake',
    subtitle:
      'A delicate white rose & pearl birthday cake with glowing candles waiting for your 29th birthday wish.',
    actionLabel: 'Unwrap Cake',
    theme: {
      borderGradient: 'from-[#FF4F9A] via-[#FFB6D9] to-[#FFF0A8]',
      cardTint: 'from-[#fff8fb]/95 via-[#ffffff]/92 to-[#fff6ea]/95',
      buttonGradient: 'from-[#FF4F9A] via-[#FFC6A8] to-[#FF4F9A]',
      buttonShadow: 'shadow-[0_10px_24px_rgba(255,79,154,0.3)]',
      accentText: 'text-[#FF4F9A]',
      boxMain: '#FFB6D9',
      boxAccent: '#FFC6A8',
      lidMain: '#FFF0A8',
      ribbon: '#FF4F9A',
      bowSecondary: '#FFC6A8',
      glow: '#FFC6A8',
      sparkleColor: '#FF4F9A',
    },
  },
  {
    id: 'memories',
    numberLabel: 'Gift 02 · Scratch Me',
    title: 'Our Special Memories',
    subtitle:
      'Four shimmering scratch-off photo cards holding our favorite graduation and red-carpet moments.',
    actionLabel: 'Scratch & Reveal',
    theme: {
      borderGradient: 'from-[#C9A0FF] via-[#9B5DE5] to-[#FF4F9A]',
      cardTint: 'from-[#faf5ff]/95 via-[#ffffff]/92 to-[#fff3fa]/95',
      buttonGradient: 'from-[#9B5DE5] via-[#C9A0FF] to-[#FF4F9A]',
      buttonShadow: 'shadow-[0_10px_24px_rgba(155,93,229,0.3)]',
      accentText: 'text-[#9B5DE5]',
      boxMain: '#C9A0FF',
      boxAccent: '#A7D8FF',
      lidMain: '#FFB6D9',
      ribbon: '#9B5DE5',
      bowSecondary: '#FF4F9A',
      glow: '#C9A0FF',
      sparkleColor: '#9B5DE5',
    },
  },
  {
    id: 'letter',
    numberLabel: 'Gift 03 · Love Letter',
    title: 'Heartfelt Wishes',
    subtitle:
      'A wax-sealed birthday letter filled with love, gratitude, and three promises for your 29th year.',
    actionLabel: 'Open Letter',
    theme: {
      borderGradient: 'from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5]',
      cardTint: 'from-[#fff2f6]/95 via-[#ffffff]/92 to-[#f7f0ff]/95',
      buttonGradient: 'from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5]',
      buttonShadow: 'shadow-[0_10px_24px_rgba(255,65,108,0.3)]',
      accentText: 'text-[#FF416C]',
      boxMain: '#FF416C',
      boxAccent: '#FFB6D9',
      lidMain: '#FF4F9A',
      ribbon: '#9B5DE5',
      bowSecondary: '#FFF0A8',
      glow: '#FFB6D9',
      sparkleColor: '#FF416C',
    },
  },
];

const MultiColourBunting: React.FC = () => (
  <svg
    viewBox="0 0 640 76"
    className="w-full max-w-2xl mx-auto h-auto select-none pointer-events-none drop-shadow-[0_4px_10px_rgba(255,79,154,0.18)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Glowing string */}
    <path
      d="M10 10 Q320 48 630 10"
      stroke="#FF4F9A"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Vibrant multi-colour flags */}
    {[
      { x: 56, y: 17, rot: 8, fill: '#FFB6D9' },
      { x: 122, y: 23, rot: 6, fill: '#C9A0FF' },
      { x: 188, y: 27, rot: 4, fill: '#FFC6A8' },
      { x: 254, y: 30, rot: 2, fill: '#A7D8FF' },
      { x: 320, y: 31, rot: 0, fill: '#FF416C' },
      { x: 386, y: 30, rot: -2, fill: '#FFF0A8' },
      { x: 452, y: 27, rot: -4, fill: '#FF4F9A' },
      { x: 518, y: 23, rot: -6, fill: '#9B5DE5' },
      { x: 584, y: 17, rot: -8, fill: '#FFB6D9' },
    ].map((flag, i) => (
      <g
        key={i}
        transform={`translate(${flag.x}, ${flag.y}) rotate(${flag.rot})`}
      >
        <path
          d="M-20 0 L20 0 L0 36 Z"
          fill={flag.fill}
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {flag.fill === '#FF416C' && (
          <path
            d="M0 10 C-2 7, -6 7, -6 11 C-6 15, 0 19, 0 19 C0 19, 6 15, 6 11 C6 7, 2 7, 0 10 Z"
            fill="#FFFFFF"
          />
        )}
      </g>
    ))}
  </svg>
);

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeGift, setActiveGift] = useState<GiftBoxItem['id'] | null>(null);
  const [openedGifts, setOpenedGifts] = useState<GiftBoxItem['id'][]>([]);
  const [confettiKey, setConfettiKey] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setConfettiKey((k) => k + 1);
    const started = birthdayMusic.start();
    if (started) {
      setMusicPlaying(true);
    }
  };

  const handleToggleMusic = () => {
    if (musicPlaying) {
      birthdayMusic.stop();
      setMusicPlaying(false);
    } else {
      const started = birthdayMusic.start();
      setMusicPlaying(started);
    }
  };

  const handleOpenGift = (id: GiftBoxItem['id']) => {
    setActiveGift(id);
    setOpenedGifts((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleCelebrate = () => {
    setConfettiKey((k) => k + 1);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeGift) {
        setActiveGift(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeGift]);

  useEffect(() => {
    return () => {
      birthdayMusic.stop();
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full bg-wonderland-gradient text-[#36132b] overflow-x-hidden">
      <FloatingAtmosphere intensity={isUnlocked ? 'celebration' : 'soft'} />
      <ConfettiBurst triggerKey={confettiKey} count={36} />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <PasswordScreen key="password-screen" onUnlock={handleUnlock} />
        ) : (
          <motion.div
            key="birthday-experience"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col min-h-[100dvh]"
          >
            {/* Compact Glass Top Bar (Single-row 3-zone contract) */}
            <header className="sticky top-0 z-30 h-14 bg-white/75 backdrop-blur-xl border-b border-[#FFB6D9]/70 px-4 sm:px-8 flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(255,79,154,0.08)]">
              <a
                href="#welcome"
                className="font-display text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] whitespace-nowrap shrink-0"
              >
                Sudu Nona
              </a>

              <nav
                className="hidden sm:flex items-center gap-6 text-sm font-semibold text-[#5e2a4b]"
                aria-label="Birthday sections"
              >
                <a
                  href="#welcome"
                  className="hover:text-[#FF4F9A] transition-colors whitespace-nowrap shrink-0"
                >
                  Welcome
                </a>
                <a
                  href="#gifts"
                  className="hover:text-[#9B5DE5] transition-colors whitespace-nowrap shrink-0"
                >
                  Three Gifts
                </a>
                <a
                  href="#wishes"
                  className="hover:text-[#FF416C] transition-colors whitespace-nowrap shrink-0"
                >
                  Birthday Wish
                </a>
              </nav>

              <div className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={handleCelebrate}
                  className="min-h-[38px] px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] text-white text-xs font-bold shadow-md shadow-[#FF4F9A]/30 hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Celebrate</span>
                  <Heart className="w-3 h-3 fill-current" aria-hidden="true" />
                </button>
              </div>
            </header>

            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 pb-16">
              {/* Spectacular Main Birthday Hero Section */}
              <section
                id="welcome"
                className="pt-4 sm:pt-7 pb-10 sm:pb-14 text-center flex flex-col items-center"
              >
                <MultiColourBunting />

                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="mt-2 sm:mt-4 max-w-3xl mx-auto space-y-3 relative"
                >
                  {/* Decorative twinkling stars framing the hero title */}
                  <span
                    className="animate-sparkle hidden sm:inline-block absolute -left-8 top-4 text-[#FFF0A8] drop-shadow-[0_0_8px_rgba(255,79,154,0.6)]"
                    aria-hidden="true"
                  >
                    <Sparkles className="w-6 h-6" />
                  </span>
                  <span
                    className="animate-sparkle hidden sm:inline-block absolute -right-8 top-6 text-[#9B5DE5]"
                    style={{ animationDelay: '0.8s' }}
                    aria-hidden="true"
                  >
                    <Sparkles className="w-6 h-6" />
                  </span>

                  <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#9B5DE5]">
                    Celebrating Your 29th Birthday
                  </p>

                  {/* Exact Primary Attraction Heading */}
                  <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] via-[#9B5DE5] to-[#FF4F9A] leading-[1.06] text-balance drop-shadow-[0_6px_24px_rgba(255,79,154,0.3)]">
                    HAPPY BIRTHDAY
                    <br />
                    SUDU NONA!
                  </h1>

                  {/* Lovely Subtitle */}
                  <p className="font-display italic text-xl sm:text-2xl text-[#5e2a4b]">
                    A Special Day Just For You
                  </p>
                </motion.div>

                {/* Premium Glass-Effect Panel with Colourful Border & Cartoon Scene */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.22 }}
                  className="mt-6 sm:mt-8 w-full max-w-lg p-[2px] rounded-[28px] bg-gradient-to-r from-[#FF4F9A] via-[#C9A0FF] via-[#A7D8FF] to-[#FFC6A8] shadow-[0_18px_50px_rgba(155,93,229,0.2)]"
                >
                  <div className="rounded-[26px] bg-white/78 backdrop-blur-xl px-5 py-5 flex flex-col items-center">
                    <CartoonCoupleScene mood="celebrate" showCake />
                    <p className="text-xs sm:text-sm font-medium text-[#5e2a4b] mt-1">
                      Tap any of your three colourful gifts below to unwrap your surprises
                    </p>

                    {/* Background Music Control */}
                    <button
                      type="button"
                      onClick={handleToggleMusic}
                      className="mt-3.5 min-h-[44px] px-5 py-2 rounded-2xl bg-gradient-to-r from-[#C9A0FF] via-[#FF4F9A] to-[#FF416C] hover:brightness-110 active:scale-[0.98] text-white text-xs font-bold shadow-[0_6px_18px_rgba(155,93,229,0.28)] inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      {musicPlaying ? (
                        <>
                          <VolumeX className="w-4 h-4" aria-hidden="true" />
                          <span>Pause Birthday Music</span>
                          <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                        </>
                      ) : (
                        <>
                          <Music className="w-4 h-4" aria-hidden="true" />
                          <span>Play Birthday Music</span>
                          <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </section>

              {/* Three Interactive Colourful Gift Boxes Section */}
              <section id="gifts" className="pt-2 pb-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#FF416C]">
                      Your Birthday Surprises
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#36132b] mt-1">
                      Three Interactive Gift Boxes
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#9B5DE5] tabular-nums">
                    {openedGifts.length} of 3 gifts unwrapped
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {GIFT_BOXES.map((gift) => (
                    <GiftBoxCard
                      key={gift.id}
                      gift={gift}
                      isOpened={openedGifts.includes(gift.id)}
                      onOpen={handleOpenGift}
                    />
                  ))}
                </div>
              </section>

              {/* Vibrant Closing Wishes Banner */}
              <section id="wishes" className="pt-4">
                <div className="p-[2px] rounded-[28px] bg-gradient-to-r from-[#FFB6D9] via-[#C9A0FF] via-[#A7D8FF] to-[#FFC6A8] shadow-[0_18px_45px_rgba(255,79,154,0.16)]">
                  <div className="rounded-[26px] bg-gradient-to-br from-[#fff5fa]/95 via-[#ffffff]/92 to-[#f4ecff]/95 backdrop-blur-xl p-6 sm:p-9 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF416C] to-[#9B5DE5] text-white shadow-md shadow-[#FF4F9A]/30 mb-3">
                      <Heart className="w-6 h-6 fill-current" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] text-balance">
                      {openedGifts.length === 3
                        ? 'Every Surprise Unwrapped, Infinite Love Ahead'
                        : 'Made With Love for Your 29th Birthday'}
                    </h2>
                    <p className="text-sm sm:text-base text-[#4a1e3a] max-w-2xl mx-auto mt-2.5 leading-relaxed">
                      May your 29th year bring gentle mornings, proud achievements,
                      and countless reasons to smile. No matter where life takes us,
                      you will always be my favorite person to celebrate.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleCelebrate}
                        className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] hover:brightness-110 active:scale-[0.98] text-white text-sm font-bold shadow-[0_10px_28px_rgba(255,79,154,0.34)] inline-flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>Shower With Hearts &amp; Confetti</span>
                        <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          birthdayMusic.stop();
                          setMusicPlaying(false);
                          setIsUnlocked(false);
                          setActiveGift(null);
                        }}
                        className="min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#C9A0FF] to-[#FF4F9A] hover:brightness-110 active:scale-[0.98] text-white text-sm font-bold shadow-[0_8px_22px_rgba(155,93,229,0.28)] inline-flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Lock className="w-4 h-4" aria-hidden="true" />
                        <span>Replay Secret Entry</span>
                        <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            <footer className="border-t border-[#FFB6D9]/60 bg-white/50 backdrop-blur-sm py-5 px-4 text-center text-xs font-semibold text-[#7e3b68]">
              <span>Crafted for Sudu Nona</span>
              <span className="mx-2 text-[#FF4F9A]" aria-hidden="true">&middot;</span>
              <span>Happy 29th Birthday</span>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Gift Modals */}
      <AnimatePresence>
        {activeGift === 'cake' && (
          <GiftCakeModal onClose={() => setActiveGift(null)} />
        )}
        {activeGift === 'memories' && (
          <GiftMemoriesModal onClose={() => setActiveGift(null)} />
        )}
        {activeGift === 'letter' && (
          <GiftLetterModal onClose={() => setActiveGift(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
