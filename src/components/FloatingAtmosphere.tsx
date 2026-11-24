import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FloatingAtmosphereProps {
  intensity?: 'soft' | 'celebration';
}

export const FloatingAtmosphere: React.FC<FloatingAtmosphereProps> = ({
  intensity = 'soft',
}) => {
  const hearts = useMemo(() => {
    const count = intensity === 'celebration' ? 18 : 11;
    const palette = ['#FF4F9A', '#FF416C', '#9B5DE5', '#C9A0FF', '#FFB6D9', '#FFC6A8'];
    return Array.from({ length: count }, (_, idx) => ({
      id: idx,
      left: `${4 + ((idx * 17) % 90)}%`,
      delay: `${(idx * 0.72) % 6}s`,
      duration: `${5.8 + (idx % 4) * 1.3}s`,
      size: 14 + (idx % 3) * 7,
      color: palette[idx % palette.length],
      opacity: intensity === 'celebration' ? 0.55 : 0.4,
    }));
  }, [intensity]);

  const stars = useMemo(
    () => [
      { id: 1, top: '9%', left: '8%', size: 18, delay: '0s', color: '#FF4F9A' },
      { id: 2, top: '14%', right: '10%', size: 20, delay: '0.6s', color: '#9B5DE5' },
      { id: 3, top: '28%', left: '16%', size: 14, delay: '1.3s', color: '#FFF0A8' },
      { id: 4, top: '36%', right: '14%', size: 17, delay: '0.3s', color: '#A7D8FF' },
      { id: 5, top: '52%', left: '6%', size: 16, delay: '1.7s', color: '#FF416C' },
      { id: 6, top: '60%', right: '7%', size: 18, delay: '0.9s', color: '#C9A0FF' },
      { id: 7, top: '75%', left: '13%', size: 19, delay: '1.1s', color: '#FFC6A8' },
      { id: 8, top: '84%', right: '15%', size: 15, delay: '2.0s', color: '#FF4F9A' },
    ],
    []
  );

  const particles = useMemo(
    () => [
      { id: 1, top: '18%', left: '28%', size: 7, color: '#FFF0A8', delay: '0.2s' },
      { id: 2, top: '24%', right: '26%', size: 8, color: '#A7D8FF', delay: '1.1s' },
      { id: 3, top: '48%', left: '22%', size: 6, color: '#FFB6D9', delay: '0.8s' },
      { id: 4, top: '65%', right: '22%', size: 8, color: '#C9A0FF', delay: '1.5s' },
      { id: 5, top: '82%', left: '36%', size: 7, color: '#FFC6A8', delay: '0.4s' },
      { id: 6, top: '42%', right: '32%', size: 6, color: '#FFF0A8', delay: '1.9s' },
    ],
    []
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Subtle rainbow-like pastel prism glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[125vw] max-w-[1100px] h-[340px] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            'linear-gradient(90deg, #FFB6D9 0%, #FFC6A8 22%, #FFF0A8 44%, #A7D8FF 68%, #C9A0FF 86%, #FF4F9A 100%)',
        }}
      />

      {/* Soft glowing pastel colour orbs & clouds */}
      <div className="animate-orb-drift absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#FFB6D9]/60 blur-3xl" />
      <div
        className="animate-orb-drift absolute top-1/5 -right-24 h-96 w-96 rounded-full bg-[#C9A0FF]/55 blur-3xl"
        style={{ animationDelay: '2.5s' }}
      />
      <div
        className="animate-orb-drift absolute top-1/2 -left-16 h-72 w-72 rounded-full bg-[#A7D8FF]/55 blur-3xl"
        style={{ animationDelay: '5s' }}
      />
      <div
        className="animate-orb-drift absolute bottom-8 right-1/5 h-80 w-80 rounded-full bg-[#FFC6A8]/55 blur-3xl"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="animate-orb-drift absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-[#FFF0A8]/50 blur-3xl"
        style={{ animationDelay: '3.8s' }}
      />

      {/* Floating hearts in vibrant shades of pink, cherry red, lavender & peach */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="animate-float-heart absolute bottom-0"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            className="drop-shadow-[0_2px_6px_rgba(255,79,154,0.35)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Tiny sparkling stars */}
      {stars.map((sp) => (
        <div
          key={sp.id}
          className="animate-sparkle absolute"
          style={{
            top: sp.top,
            left: sp.left,
            right: sp.right,
            animationDelay: sp.delay,
          }}
        >
          <svg
            width={sp.size}
            height={sp.size}
            viewBox="0 0 24 24"
            fill={sp.color}
            className="drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          >
            <path d="M12 1L14.6 9.4L23 12L14.6 14.6L12 23L9.4 14.6L1 12L9.4 9.4L12 1Z" />
          </svg>
        </div>
      ))}

      {/* Soft light particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="animate-float-slow absolute rounded-full blur-[1px]"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.color}`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

interface ConfettiBurstProps {
  triggerKey: number;
  count?: number;
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  triggerKey,
  count = 34,
}) => {
  const pieces = useMemo(() => {
    const colors = [
      '#FF4F9A',
      '#FF416C',
      '#9B5DE5',
      '#C9A0FF',
      '#FFB6D9',
      '#FFC6A8',
      '#A7D8FF',
      '#FFF0A8',
    ];
    return Array.from({ length: count }, (_, idx) => {
      const angle = (idx / count) * Math.PI * 2;
      const distance = 75 + ((idx * 41) % 145);
      return {
        id: idx,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 45,
        rotate: (idx * 65) % 360,
        color: colors[idx % colors.length],
        isHeart: idx % 3 === 0,
        isStar: idx % 3 === 1,
        size: 8 + (idx % 4) * 2.5,
      };
    });
  }, [count, triggerKey]);

  if (triggerKey === 0) return null;

  return (
    <div
      key={triggerKey}
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 20, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x * 1.45,
            y: p.y * 1.45 + 95,
            scale: [0, 1.25, 0.9],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: 1.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute"
        >
          {p.isHeart ? (
            <svg width={p.size + 4} height={p.size + 4} viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : p.isStar ? (
            <svg width={p.size + 3} height={p.size + 3} viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 1L14.6 9.4L23 12L14.6 14.6L12 23L9.4 14.6L1 12L9.4 9.4L12 1Z" />
            </svg>
          ) : (
            <span
              className="block rounded-sm"
              style={{
                width: p.size,
                height: p.size * 0.65,
                backgroundColor: p.color,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
