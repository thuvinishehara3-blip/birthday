import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Eye, RotateCcw, Heart, Maximize2 } from 'lucide-react';
import { ConfettiBurst } from './FloatingAtmosphere';

interface MemoryPhoto {
  id: number;
  src: string;
  alt: string;
  title: string;
  caption: string;
  theme: {
    borderGradient: string;
    cardBg: string;
    titleColor: string;
    btnGradient: string;
    foilStops: [string, string, string];
    foilTextColor: string;
    heartColor: string;
  };
}

/**
 * Exact 4 uploaded photographs in the exact requested order — untouched:
 * 1. The couple together at their graduation ceremony
 * 2. Her individual portrait holding flowers
 * 3. The couple standing together outdoors in their graduation gowns
 * 4. The couple walking together on a red carpet
 */
const MEMORIES: MemoryPhoto[] = [
  {
    id: 1,
    src: `${import.meta.env.BASE_URL}assets/aistudio/WhatsApp_Image_2026-11-20_at_00.39.42_71b0a04d.jpeg`,
    alt: 'The couple together at their graduation ceremony holding red convocation scrolls',
    title: '01 · Together at Our Graduation',
    caption:
      'Standing side by side at our convocation ceremony, holding our scrolls and sharing one of our proudest milestones.',
    theme: {
      borderGradient: 'from-[#FF4F9A] via-[#FFB6D9] to-[#A7D8FF]',
      cardBg: 'from-[#fff6fa] to-[#f2f9ff]',
      titleColor: 'text-[#FF416C]',
      btnGradient: 'from-[#FF4F9A] to-[#9B5DE5]',
      foilStops: ['#FFB6D9', '#C9A0FF', '#A7D8FF'],
      foilTextColor: '#36132b',
      heartColor: 'text-[#FF4F9A]',
    },
  },
  {
    id: 2,
    src: `${import.meta.env.BASE_URL}assets/aistudio/WhatsApp_Image_2026-11-20_at_00.39.43__1__37dfdcee.jpeg`,
    alt: 'Sudu Nona holding a bouquet of flowers in her white saree and graduation gown',
    title: '02 · You & Your Flowers',
    caption:
      'So radiant in white with flowers in your arms — a portrait I could admire forever.',
    theme: {
      borderGradient: 'from-[#C9A0FF] via-[#9B5DE5] to-[#FFF0A8]',
      cardBg: 'from-[#f9f4ff] to-[#fffbeb]',
      titleColor: 'text-[#9B5DE5]',
      btnGradient: 'from-[#9B5DE5] to-[#FF4F9A]',
      foilStops: ['#C9A0FF', '#FFB6D9', '#FFF0A8'],
      foilTextColor: '#36132b',
      heartColor: 'text-[#9B5DE5]',
    },
  },
  {
    id: 3,
    src: `${import.meta.env.BASE_URL}assets/aistudio/WhatsApp_Image_2026-11-20_at_00.39.43_676c2d59.jpeg`,
    alt: 'The couple standing together outdoors in their graduation gowns',
    title: '03 · Outdoors in Our Gowns',
    caption:
      'Beneath the green trees, hand in hand, celebrating hard work turned into forever memories.',
    theme: {
      borderGradient: 'from-[#FFC6A8] via-[#FF416C] to-[#FFB6D9]',
      cardBg: 'from-[#fff6f2] to-[#fff2f8]',
      titleColor: 'text-[#FF416C]',
      btnGradient: 'from-[#FF416C] to-[#FF4F9A]',
      foilStops: ['#FFC6A8', '#FFB6D9', '#C9A0FF'],
      foilTextColor: '#36132b',
      heartColor: 'text-[#FF416C]',
    },
  },
  {
    id: 4,
    src: `${import.meta.env.BASE_URL}assets/aistudio/WhatsApp_Image_2026-11-20_at_00.39.44_7ef964c3.jpeg`,
    alt: 'The couple walking together holding hands on a red carpet',
    title: '04 · Walking the Red Carpet',
    caption:
      'Hand in hand on the red carpet — walking forward together with smiles that say everything.',
    theme: {
      borderGradient: 'from-[#A7D8FF] via-[#C9A0FF] to-[#FF4F9A]',
      cardBg: 'from-[#f2f9ff] to-[#fff2f9]',
      titleColor: 'text-[#9B5DE5]',
      btnGradient: 'from-[#9B5DE5] via-[#FF4F9A] to-[#FF416C]',
      foilStops: ['#A7D8FF', '#C9A0FF', '#FFB6D9'],
      foilTextColor: '#36132b',
      heartColor: 'text-[#FF4F9A]',
    },
  },
];

interface ScratchMemoryCardProps {
  memory: MemoryPhoto;
  isRevealed: boolean;
  onReveal: (id: number) => void;
  onZoom: (memory: MemoryPhoto) => void;
}

const ScratchMemoryCard: React.FC<ScratchMemoryCardProps> = ({
  memory,
  isRevealed,
  onReveal,
  onZoom,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const scratchCheckCounterRef = useRef(0);
  const [imgError, setImgError] = useState(false);

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Rich lavender, cotton-candy pink & pastel shimmer gradient cover
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, memory.theme.foilStops[0]);
    grad.addColorStop(0.5, memory.theme.foilStops[1]);
    grad.addColorStop(1, memory.theme.foilStops[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Iridescent diagonal shimmer bands
    ctx.fillStyle = 'rgba(255, 255, 255, 0.34)';
    for (let i = -height; i < width + height; i += 24) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 11, 0);
      ctx.lineTo(i - height + 11, height);
      ctx.lineTo(i - height, height);
      ctx.closePath();
      ctx.fill();
    }

    // Soft glowing center circle badge for readable prompt
    ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.beginPath();
    ctx.roundRect(width / 2 - 92, height / 2 - 36, 184, 72, 20);
    ctx.fill();

    // Prompt text
    ctx.fillStyle = memory.theme.foilTextColor;
    ctx.textAlign = 'center';
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Scratch Me Gently', width / 2, height / 2 - 4);
    ctx.fillStyle = '#9B5DE5';
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Memory 0${memory.id} of 04`, width / 2, height / 2 + 19);

    ctx.restore();
  }, [memory.id, memory.theme.foilStops, memory.theme.foilTextColor]);

  useEffect(() => {
    if (!isRevealed) {
      paintFoil();
    }
  }, [isRevealed, paintFoil]);

  const checkScratchProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    const imageData = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    const step = 32;
    let sampled = 0;

    for (let i = 3; i < imageData.length; i += 4 * step) {
      sampled++;
      if (imageData[i] < 128) {
        cleared++;
      }
    }

    if (sampled > 0 && cleared / sampled >= 0.42) {
      onReveal(memory.id);
    }
  }, [isRevealed, memory.id, onReveal]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const radius = Math.max(24, rect.width * 0.085) * (canvas.width / rect.width);
    const brush = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius);
    brush.addColorStop(0, 'rgba(0,0,0,1)');
    brush.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = brush;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    scratchCheckCounterRef.current += 1;
    if (scratchCheckCounterRef.current % 6 === 0) {
      checkScratchProgress();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    checkScratchProgress();
  };

  return (
    <motion.div
      animate={isRevealed ? { y: [0, -4, 0] } : { y: 0 }}
      transition={
        isRevealed
          ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
      className={`p-[2.5px] rounded-[26px] bg-gradient-to-br ${memory.theme.borderGradient} shadow-[0_14px_38px_rgba(155,93,229,0.18)] flex flex-col`}
    >
      <div
        className={`rounded-3xl bg-gradient-to-b ${memory.theme.cardBg} overflow-hidden flex-1 flex flex-col`}
      >
        {/* Photo + Premium Frame + Scratch Canvas */}
        <div className="p-2.5 pb-0">
          <div
            ref={containerRef}
            className="relative aspect-[4/5] w-full rounded-2xl bg-[#fff0f7] overflow-hidden border-2 border-white shadow-inner"
          >
            {!imgError ? (
              <img
                src={memory.src}
                alt={memory.alt}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top select-none"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFB6D9]/40 to-[#C9A0FF]/40 text-[#36132b]">
                <Heart className="w-8 h-8 mb-2 text-[#FF4F9A]" />
                <p className="text-sm font-semibold">{memory.title}</p>
              </div>
            )}

            {/* Cute Heart & Sparkle Frame Ornaments */}
            <div
              className="pointer-events-none absolute top-2.5 left-2.5 z-20 w-7 h-7 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm"
              aria-hidden="true"
            >
              <Heart className={`w-3.5 h-3.5 fill-current ${memory.theme.heartColor}`} />
            </div>
            <div
              className="pointer-events-none absolute top-2.5 right-2.5 z-20 animate-sparkle text-[#FFF0A8] drop-shadow-[0_0_5px_rgba(255,79,154,0.6)]"
              aria-hidden="true"
            >
              <Sparkles className="w-4 h-4" />
            </div>

            {/* Scratchable Foil Layer */}
            <AnimatePresence>
              {!isRevealed && (
                <motion.canvas
                  ref={canvasRef}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45 } }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{ touchAction: 'none' }}
                  className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                  aria-label={`Scratch off foil to reveal ${memory.title}`}
                />
              )}
            </AnimatePresence>

            {/* Zoom Trigger Once Revealed */}
            {isRevealed && !imgError && (
              <button
                type="button"
                onClick={() => onZoom(memory)}
                className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-gradient-to-r from-[#FF4F9A] to-[#9B5DE5] text-white flex items-center justify-center shadow-lg shadow-[#FF4F9A]/35 hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer z-20"
                aria-label={`View full photo: ${memory.title}`}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Caption & Colourful Gradient Reveal Control */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
          <div>
            <h3 className={`font-display text-lg font-bold ${memory.theme.titleColor}`}>
              {memory.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#4a1e3a] mt-1 leading-relaxed">
              {isRevealed
                ? memory.caption
                : 'Rub gently across the shimmer card above to uncover this memory.'}
            </p>
          </div>

          {!isRevealed && (
            <button
              type="button"
              onClick={() => onReveal(memory.id)}
              className={`min-h-[44px] w-full rounded-xl bg-gradient-to-r ${memory.theme.btnGradient} hover:brightness-105 active:scale-[0.98] text-white text-xs font-bold shadow-md shadow-[#FF4F9A]/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F9A]`}
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>Tap to Reveal Photo</span>
              <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface GiftMemoriesModalProps {
  onClose: () => void;
}

export const GiftMemoriesModal: React.FC<GiftMemoriesModalProps> = ({
  onClose,
}) => {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [burstKey, setBurstKey] = useState(0);
  const [zoomedMemory, setZoomedMemory] = useState<MemoryPhoto | null>(null);

  const handleReveal = useCallback((id: number) => {
    setRevealedIds((prev) => {
      if (prev.includes(id)) return prev;
      setBurstKey((k) => k + 1);
      return [...prev, id];
    });
  }, []);

  const handleResetAll = () => {
    setRevealedIds([]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#36132b]/55 backdrop-blur-md p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="memories-modal-title"
    >
      <ConfettiBurst triggerKey={burstKey} count={28} />

      <div className="w-full sm:max-w-4xl p-[2px] rounded-t-[26px] sm:rounded-[26px] bg-gradient-to-br from-[#C9A0FF] via-[#FF4F9A] to-[#FFC6A8] shadow-[0_24px_70px_rgba(155,93,229,0.35)]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-gradient-to-br from-[#fff5fa] via-[#ffffff] to-[#f4ecff] p-5 sm:p-8"
        >
          {/* Colourful Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="sticky top-0 float-right w-11 h-11 rounded-full bg-gradient-to-br from-[#FF4F9A] to-[#9B5DE5] text-white shadow-md shadow-[#FF4F9A]/30 hover:brightness-110 active:scale-95 flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F9A] cursor-pointer z-30"
            aria-label="Close memories gallery"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pr-12">
            <p className="text-xs font-bold tracking-wider uppercase text-[#9B5DE5] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4F9A]" aria-hidden="true" />
              <span>Gift 02 · Scratch Me</span>
            </p>
            <h2
              id="memories-modal-title"
              className="font-display text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF416C] via-[#FF4F9A] to-[#9B5DE5] mt-1 text-balance"
            >
              Our Special Memories
            </h2>
            <p className="text-sm text-[#5e2a4b] mt-1.5 max-w-xl leading-relaxed">
              Use your finger to scratch off each shimmering card and uncover four
              cherished moments from our journey together.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-bold text-[#9B5DE5] tabular-nums">
              <span>{revealedIds.length} of 4 memories uncovered</span>
              {revealedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF4F9A] to-[#9B5DE5] text-white shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer min-h-[36px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Scratch Again</span>
                </button>
              )}
            </div>
          </div>

          {/* 4 Scratch Cards in Exact Order */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MEMORIES.map((memory) => (
              <ScratchMemoryCard
                key={memory.id}
                memory={memory}
                isRevealed={revealedIds.includes(memory.id)}
                onReveal={handleReveal}
                onZoom={setZoomedMemory}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Photo Lightbox */}
      <AnimatePresence>
        {zoomedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedMemory(null)}
            className="fixed inset-0 z-[60] bg-[#2a0c22]/88 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setZoomedMemory(null)}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-gradient-to-r from-[#FF4F9A] to-[#9B5DE5] text-white shadow-lg flex items-center justify-center cursor-pointer"
              aria-label="Close full photo view"
            >
              <X className="w-5 h-5" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`p-[3px] rounded-2xl bg-gradient-to-br ${zoomedMemory.theme.borderGradient} shadow-2xl`}
            >
              <img
                src={zoomedMemory.src}
                alt={zoomedMemory.alt}
                referrerPolicy="no-referrer"
                className="max-h-[75dvh] max-w-full rounded-[14px] object-contain bg-black"
              />
            </div>
            <div className="mt-4 text-center max-w-md text-white">
              <p className="font-display text-lg font-bold">{zoomedMemory.title}</p>
              <p className="text-xs sm:text-sm text-white/85 mt-1">{zoomedMemory.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
