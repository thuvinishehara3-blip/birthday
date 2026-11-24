import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Delete, Heart, Lock, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { CartoonCoupleScene, CharacterMood } from './CartoonCharacters';

interface PasswordScreenProps {
  onUnlock: () => void;
}

const SECRET_CODE = '20260116';

const DOT_COLORS = [
  'from-[#FF4F9A] to-[#FF416C]',
  'from-[#C9A0FF] to-[#9B5DE5]',
  'from-[#FFC6A8] to-[#FF4F9A]',
  'from-[#A7D8FF] to-[#9B5DE5]',
  'from-[#FF416C] to-[#C9A0FF]',
  'from-[#9B5DE5] to-[#FF4F9A]',
  'from-[#FFB6D9] to-[#FF416C]',
  'from-[#FF4F9A] to-[#9B5DE5]',
];

export const PasswordScreen: React.FC<PasswordScreenProps> = ({ onUnlock }) => {
  const [digits, setDigits] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const mood: CharacterMood = isUnlocked
    ? 'celebrate'
    : errorMsg
    ? 'oops'
    : digits.length > 0
    ? 'curious'
    : 'happy';

  const handleDigit = useCallback(
    (num: string) => {
      if (isUnlocked || digits.length >= 8) return;
      if (errorMsg) setErrorMsg('');

      const next = digits + num;
      setDigits(next);

      if (next.length === 8) {
        if (next === SECRET_CODE) {
          setIsUnlocked(true);
          setTimeout(() => {
            onUnlock();
          }, 850);
        } else {
          setIsShaking(true);
          setErrorMsg('Sweet try! Hint: Our Anniversary Date (YYYYMMDD)');
          setTimeout(() => {
            setIsShaking(false);
            setDigits('');
          }, 680);
        }
      }
    },
    [digits, errorMsg, isUnlocked, onUnlock]
  );

  const handleBackspace = useCallback(() => {
    if (isUnlocked || digits.length === 0) return;
    if (errorMsg) setErrorMsg('');
    setDigits((prev) => prev.slice(0, -1));
  }, [digits.length, errorMsg, isUnlocked]);

  const handleClear = useCallback(() => {
    if (isUnlocked) return;
    setErrorMsg('');
    setDigits('');
  }, [isUnlocked]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleDigit, handleBackspace, handleClear]);

  const keypadRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-6 sm:py-10"
    >
      <div className="w-full max-w-md lg:max-w-4xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Left / Top Cute Cartoon Scene & Title */}
        <div className="lg:col-span-5 flex flex-col items-center text-center mb-5 lg:mb-0">
          <div className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_14px_40px_rgba(155,93,229,0.16)] px-5 py-4 mb-4">
            <CartoonCoupleScene mood={mood} showCake={false} />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#9B5DE5] flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#FF4F9A]" aria-hidden="true" />
              <span>Private Invitation · For Sudu Nona</span>
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] text-balance leading-tight drop-shadow-[0_2px_12px_rgba(255,79,154,0.2)]">
              A Secret Birthday Surprise
            </h1>
            <p className="text-sm text-[#5e2a4b] max-w-xs mx-auto leading-relaxed">
              Enter our 8-digit special date to unlock your colourful birthday wonderland.
            </p>
          </div>
        </div>

        {/* Right / Bottom Touch Keypad Card with Rainbow Pastel Glowing Border */}
        <div className="lg:col-span-7 w-full max-w-sm mx-auto">
          <div className="p-[2px] rounded-[26px] bg-gradient-to-br from-[#FF4F9A] via-[#C9A0FF] via-[#A7D8FF] to-[#FFC6A8] shadow-[0_22px_55px_rgba(255,79,154,0.22)]">
            <div className="rounded-3xl bg-white/88 backdrop-blur-xl p-5 sm:p-7">
              {/* Hint Display */}
              <div className="text-center mb-4">
                <span className="text-xs font-semibold text-[#9B5DE5] inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF4F9A]" aria-hidden="true" />
                  <span>Password Hint</span>
                </span>
                <p className="text-sm font-bold text-[#36132b] mt-0.5">
                  Our Anniversary Date
                </p>
              </div>

              {/* 8 Animated Multi-Colour Password Dots */}
              <div
                className={`flex items-center justify-center gap-2 sm:gap-2.5 py-3 px-2 rounded-2xl bg-gradient-to-r from-[#FFB6D9]/25 via-[#C9A0FF]/20 to-[#A7D8FF]/25 border border-[#FFB6D9]/60 ${
                  isShaking ? 'animate-gentle-shake border-[#FF416C]' : ''
                }`}
                aria-label={`Entered ${digits.length} of 8 digits`}
              >
                {Array.from({ length: 8 }, (_, idx) => {
                  const filled = idx < digits.length;
                  return (
                    <motion.div
                      key={idx}
                      animate={{
                        scale: isUnlocked
                          ? [1, 1.32, 1]
                          : filled
                          ? [0.75, 1.2, 1]
                          : 1,
                      }}
                      transition={{ duration: 0.22 }}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-[#FF416C] to-[#9B5DE5] text-white shadow-md shadow-[#FF4F9A]/40'
                          : filled
                          ? `bg-gradient-to-br ${DOT_COLORS[idx]} text-white shadow-sm`
                          : 'bg-white/95 border border-[#C9A0FF]/60'
                      }`}
                    >
                      {filled ? (
                        <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A0FF]" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Feedback Banner */}
              <div className="min-h-[28px] mt-2.5 mb-2 flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  {isUnlocked ? (
                    <motion.p
                      key="unlocked"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-bold text-[#FF416C] flex items-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#FF416C] text-[#FF416C]" aria-hidden="true" />
                      <span>Welcome, Sudu Nona! Opening your surprises...</span>
                    </motion.p>
                  ) : errorMsg ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-semibold text-[#FF416C] flex items-center gap-1.5"
                      role="alert"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errorMsg}</span>
                    </motion.p>
                  ) : (
                    <motion.p
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-medium text-[#7e3b68] tabular-nums"
                    >
                      {digits.length}/8 digits entered
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile-First Touch Numeric Keypad */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-2">
                {keypadRows.flat().map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleDigit(num)}
                    disabled={isUnlocked}
                    className="h-14 sm:h-15 rounded-2xl bg-gradient-to-br from-white via-[#fff3f8] to-[#f4eaff] hover:from-[#FFB6D9]/35 hover:to-[#C9A0FF]/35 active:scale-95 border border-[#FFB6D9]/80 shadow-[0_4px_14px_rgba(155,93,229,0.1)] text-xl font-bold text-[#36132b] tabular-nums transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F9A] cursor-pointer select-none"
                    aria-label={`Digit ${num}`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isUnlocked || digits.length === 0}
                  className="h-14 sm:h-15 rounded-2xl bg-gradient-to-r from-[#C9A0FF] to-[#9B5DE5] hover:brightness-105 active:scale-95 disabled:opacity-45 text-white text-xs font-bold shadow-md shadow-[#9B5DE5]/25 flex items-center justify-center gap-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B5DE5] cursor-pointer select-none"
                  aria-label="Clear passcode"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Clear</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDigit('0')}
                  disabled={isUnlocked}
                  className="h-14 sm:h-15 rounded-2xl bg-gradient-to-br from-white via-[#fff3f8] to-[#eaf6ff] hover:from-[#FFB6D9]/35 hover:to-[#A7D8FF]/35 active:scale-95 border border-[#C9A0FF]/80 shadow-[0_4px_14px_rgba(155,93,229,0.1)] text-xl font-bold text-[#36132b] tabular-nums transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F9A] cursor-pointer select-none"
                  aria-label="Digit 0"
                >
                  0
                </button>

                <button
                  type="button"
                  onClick={handleBackspace}
                  disabled={isUnlocked || digits.length === 0}
                  className="h-14 sm:h-15 rounded-2xl bg-gradient-to-r from-[#FF4F9A] to-[#FF416C] hover:brightness-105 active:scale-95 disabled:opacity-45 text-white text-xs font-bold shadow-md shadow-[#FF416C]/25 flex items-center justify-center gap-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF416C] cursor-pointer select-none"
                  aria-label="Delete last digit"
                >
                  <Delete className="w-4 h-4" aria-hidden="true" />
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
