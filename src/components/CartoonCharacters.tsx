import React from 'react';

export type CharacterMood = 'happy' | 'curious' | 'oops' | 'celebrate';

interface CharacterProps {
  mood?: CharacterMood;
  className?: string;
}

/**
 * Consistent cute cartoon boy character with vibrant lavender, electric purple,
 * baby blue, and cherry-pink details.
 */
export const CartoonBoy: React.FC<CharacterProps> = ({
  mood = 'happy',
  className = 'w-28 h-32',
}) => {
  return (
    <svg
      viewBox="0 0 140 160"
      className={`animate-char-bounce select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cute cartoon boy character"
    >
      <defs>
        <linearGradient id="boySweater" x1="44" y1="88" x2="96" y2="134" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9B5DE5" />
          <stop offset="55%" stopColor="#C9A0FF" />
          <stop offset="100%" stopColor="#A7D8FF" />
        </linearGradient>
      </defs>

      {/* Soft lavender-blue shadow */}
      <ellipse cx="70" cy="150" rx="34" ry="6" fill="#C9A0FF" opacity="0.55" />

      {/* Waving left arm */}
      <g className={mood === 'oops' ? '' : 'animate-char-wave'}>
        <path
          d="M36 96 C20 84, 16 68, 22 60"
          stroke="#e8b89a"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <circle cx="22" cy="59" r="6.5" fill="#f3c7aa" />
      </g>

      {/* Right arm */}
      <path
        d="M104 98 C116 104, 118 115, 110 120"
        stroke="#e8b89a"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="109" cy="120" r="6" fill="#f3c7aa" />

      {/* Body / Multi-colour lavender & baby-blue sweater */}
      <rect x="44" y="88" width="52" height="46" rx="22" fill="url(#boySweater)" />
      {/* Collar accent */}
      <path d="M56 89 Q70 98 84 89" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      {/* Hot pink & peach heart crest */}
      <path
        d="M70 110 C67.5 105.5, 61 106, 61 111.5 C61 116, 70 121, 70 121 C70 121, 79 116, 79 111.5 C79 106, 72.5 105.5, 70 110 Z"
        fill="#FF4F9A"
      />

      {/* Legs & Shoes */}
      <rect x="52" y="130" width="12" height="17" rx="6" fill="#5b21b6" />
      <rect x="76" y="130" width="12" height="17" rx="6" fill="#5b21b6" />
      <ellipse cx="58" cy="147" rx="8.5" ry="4.5" fill="#A7D8FF" />
      <ellipse cx="82" cy="147" rx="8.5" ry="4.5" fill="#A7D8FF" />

      {/* Neck */}
      <rect x="63" y="80" width="14" height="12" rx="6" fill="#e8b89a" />

      {/* Ears */}
      <circle cx="35" cy="58" r="7" fill="#f3c7aa" />
      <circle cx="105" cy="58" r="7" fill="#f3c7aa" />

      {/* Head */}
      <rect x="36" y="26" width="68" height="62" rx="30" fill="#f6cfb5" />

      {/* Fluffy dark hair */}
      <path
        d="M34 52 C32 30, 48 16, 70 16 C92 16, 108 30, 106 52 C100 39, 90 36, 82 38 C76 31, 63 31, 56 39 C47 36, 39 42, 34 52 Z"
        fill="#291d28"
      />
      <path
        d="M66 17 C69 9, 78 10, 75 18"
        stroke="#291d28"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Rosy blushing cheeks */}
      <ellipse cx="49" cy="64" rx="7.5" ry="4.2" fill="#FF4F9A" opacity="0.52" />
      <ellipse cx="91" cy="64" rx="7.5" ry="4.2" fill="#FF4F9A" opacity="0.52" />

      {/* Eyes */}
      <g className="animate-eye-blink">
        {mood === 'celebrate' ? (
          <>
            <path d="M51 56 Q56 50 61 56" stroke="#291d28" strokeWidth="3" strokeLinecap="round" />
            <path d="M79 56 Q84 50 89 56" stroke="#291d28" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="56" cy="55" r="4.6" fill="#291d28" />
            <circle cx="84" cy="55" r="4.6" fill="#291d28" />
            <circle cx="57.6" cy="53.3" r="1.7" fill="#ffffff" />
            <circle cx="85.6" cy="53.3" r="1.7" fill="#ffffff" />
          </>
        )}
      </g>

      {/* Eyebrows */}
      {mood === 'oops' ? (
        <>
          <path d="M49 46 Q56 49 61 46" stroke="#291d28" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M79 46 Q84 49 91 46" stroke="#291d28" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M50 46 Q56 43 62 46" stroke="#291d28" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M78 46 Q84 43 90 46" stroke="#291d28" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}

      {/* Mouth expression */}
      {mood === 'oops' ? (
        <circle cx="70" cy="69" r="3.4" fill="#FF416C" />
      ) : mood === 'curious' ? (
        <path d="M64 68 Q70 72 76 68" stroke="#FF416C" strokeWidth="2.6" strokeLinecap="round" />
      ) : (
        <path
          d="M62 66 Q70 75 78 66"
          stroke="#FF416C"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="#FFB6D9"
        />
      )}

      {/* Floating cherry-red heart & yellow star */}
      <path
        d="M116 28 C114 23, 106 24, 106 30 C106 35, 116 40, 116 40 C116 40, 126 35, 126 30 C126 24, 118 23, 116 28 Z"
        fill="#FF416C"
      />
      <path d="M22 28 L24 33 L29 35 L24 37 L22 42 L20 37 L15 35 L20 33 Z" fill="#FFF0A8" />
    </svg>
  );
};

/**
 * Consistent cute cartoon girl character (Sudu Nona inspired) with hot pink,
 * cherry red, cotton candy pink, and soft yellow birthday crown.
 */
export const CartoonGirl: React.FC<CharacterProps> = ({
  mood = 'happy',
  className = 'w-28 h-32',
}) => {
  return (
    <svg
      viewBox="0 0 140 160"
      className={`animate-char-bounce-delayed select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cute cartoon girl character"
    >
      <defs>
        <linearGradient id="girlDress" x1="42" y1="88" x2="98" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF4F9A" />
          <stop offset="50%" stopColor="#FF416C" />
          <stop offset="100%" stopColor="#C9A0FF" />
        </linearGradient>
      </defs>

      {/* Soft pink shadow */}
      <ellipse cx="70" cy="150" rx="34" ry="6" fill="#FFB6D9" opacity="0.65" />

      {/* Back flowing hair */}
      <path
        d="M32 54 C24 80, 26 112, 38 122 L102 122 C114 112, 116 80, 108 54 C104 28, 88 18, 70 18 C52 18, 36 28, 32 54 Z"
        fill="#291d28"
      />

      {/* Left arm */}
      <path
        d="M42 98 C30 105, 28 115, 34 120"
        stroke="#f3c7aa"
        strokeWidth="9.5"
        strokeLinecap="round"
      />
      <circle cx="34" cy="120" r="5.5" fill="#f6cfb5" />

      {/* Right waving arm */}
      <g className={mood === 'oops' ? '' : 'animate-char-wave'}>
        <path
          d="M98 96 C115 86, 120 70, 115 60"
          stroke="#f3c7aa"
          strokeWidth="9.5"
          strokeLinecap="round"
        />
        <circle cx="115" cy="59" r="6" fill="#f6cfb5" />
      </g>

      {/* Vibrant multi-colour party dress */}
      <path
        d="M48 88 L92 88 L104 134 C82 140, 58 140, 36 134 Z"
        fill="url(#girlDress)"
      />
      <path
        d="M48 88 C58 96, 82 96, 92 88 L96 106 C80 112, 60 112, 44 106 Z"
        fill="#FF4F9A"
      />
      {/* Soft yellow & white waist bow */}
      <circle cx="70" cy="102" r="4.2" fill="#FFF0A8" />
      <path d="M61 98.5 L70 102 L61 105.5 Z" fill="#FFFFFF" />
      <path d="M79 98.5 L70 102 L79 105.5 Z" fill="#FFFFFF" />

      {/* Legs & Rose shoes */}
      <rect x="54" y="134" width="10" height="14" rx="5" fill="#f3c7aa" />
      <rect x="76" y="134" width="10" height="14" rx="5" fill="#f3c7aa" />
      <ellipse cx="59" cy="148" rx="8" ry="4" fill="#FF416C" />
      <ellipse cx="81" cy="148" rx="8" ry="4" fill="#FF416C" />

      {/* Ears with pearl earrings */}
      <circle cx="36" cy="58" r="6.5" fill="#f6cfb5" />
      <circle cx="104" cy="58" r="6.5" fill="#f6cfb5" />
      <circle cx="35" cy="64" r="2.5" fill="#FFF0A8" />
      <circle cx="105" cy="64" r="2.5" fill="#FFF0A8" />

      {/* Head */}
      <rect x="37" y="27" width="66" height="60" rx="29" fill="#fad6be" />

      {/* Front hair bangs */}
      <path
        d="M36 52 C38 30, 52 20, 70 20 C88 20, 102 30, 104 52 C94 37, 80 33, 70 36 C58 33, 44 38, 36 52 Z"
        fill="#291d28"
      />

      {/* Glowing Birthday Crown */}
      <path
        d="M82 27 L87 16 L93 23 L100 16 L102 27 Z"
        fill="#FFF0A8"
        stroke="#FF4F9A"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="93" cy="23" r="2.3" fill="#FF416C" />

      {/* Rosy blushing cheeks */}
      <ellipse cx="49" cy="64" rx="7.5" ry="4.2" fill="#FF4F9A" opacity="0.52" />
      <ellipse cx="91" cy="64" rx="7.5" ry="4.2" fill="#FF4F9A" opacity="0.52" />

      {/* Eyes */}
      <g className="animate-eye-blink">
        {mood === 'celebrate' ? (
          <>
            <path d="M51 56 Q56 50 61 56" stroke="#291d28" strokeWidth="3" strokeLinecap="round" />
            <path d="M79 56 Q84 50 89 56" stroke="#291d28" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="56" cy="55" r="4.6" fill="#291d28" />
            <circle cx="84" cy="55" r="4.6" fill="#291d28" />
            <circle cx="57.6" cy="53.3" r="1.7" fill="#ffffff" />
            <circle cx="85.6" cy="53.3" r="1.7" fill="#ffffff" />
            <path d="M51 52 L48 50" stroke="#291d28" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M89 52 L92 50" stroke="#291d28" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Mouth */}
      {mood === 'oops' ? (
        <path d="M65 69 Q70 65 75 69" stroke="#FF416C" strokeWidth="2.4" strokeLinecap="round" />
      ) : mood === 'curious' ? (
        <path d="M64 68 Q70 72 76 68" stroke="#FF416C" strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <path
          d="M62 66 Q70 75 78 66"
          stroke="#FF416C"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="#FFB6D9"
        />
      )}

      {/* Floating lavender star */}
      <path d="M24 22 L26 27 L31 29 L26 31 L24 36 L22 31 L17 29 L22 27 Z" fill="#C9A0FF" />
    </svg>
  );
};

/**
 * Cute fluffy kitty mascot holding a colourful peach-pink-lavender birthday cupcake.
 */
export const CuteKittyMascot: React.FC<{ className?: string }> = ({
  className = 'w-20 h-20',
}) => (
  <svg
    viewBox="0 0 110 110"
    className={`animate-float-slow select-none ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Cute birthday kitty mascot"
  >
    {/* Ears */}
    <path d="M26 42 L20 18 L44 30 Z" fill="#ffffff" stroke="#C9A0FF" strokeWidth="2" />
    <path d="M84 42 L90 18 L66 30 Z" fill="#ffffff" stroke="#C9A0FF" strokeWidth="2" />
    <path d="M28 38 L24 24 L40 31 Z" fill="#FFB6D9" />
    <path d="M82 38 L86 24 L70 31 Z" fill="#A7D8FF" />

    {/* Lavender neck bow */}
    <circle cx="55" cy="70" r="3.5" fill="#FF4F9A" />
    <path d="M46 66 L55 70 L46 74 Z" fill="#C9A0FF" />
    <path d="M64 66 L55 70 L64 74 Z" fill="#C9A0FF" />

    {/* Body */}
    <rect x="28" y="64" width="54" height="36" rx="18" fill="#ffffff" stroke="#FFB6D9" strokeWidth="2" />
    {/* Head */}
    <ellipse cx="55" cy="50" rx="31" ry="25" fill="#ffffff" stroke="#C9A0FF" strokeWidth="2" />

    {/* Cheeks */}
    <ellipse cx="36" cy="55" rx="5.5" ry="3.2" fill="#FF4F9A" opacity="0.55" />
    <ellipse cx="74" cy="55" rx="5.5" ry="3.2" fill="#FF4F9A" opacity="0.55" />

    {/* Eyes */}
    <g className="animate-eye-blink">
      <circle cx="43" cy="48" r="3.8" fill="#36132b" />
      <circle cx="67" cy="48" r="3.8" fill="#36132b" />
      <circle cx="44.2" cy="46.8" r="1.4" fill="#ffffff" />
      <circle cx="68.2" cy="46.8" r="1.4" fill="#ffffff" />
    </g>

    {/* Nose & smile */}
    <ellipse cx="55" cy="53" rx="2.6" ry="1.8" fill="#FF416C" />
    <path d="M51 56 Q55 59 59 56" stroke="#9B5DE5" strokeWidth="1.8" strokeLinecap="round" />

    {/* Colourful birthday cupcake held in paws */}
    <path d="M46 80 L64 80 L61 93 L49 93 Z" fill="#FFC6A8" />
    <path d="M44 80 C44 71, 66 71, 66 80 Z" fill="#FFB6D9" />
    <rect x="54" y="67" width="2.5" height="6" rx="1" fill="#9B5DE5" />
    <path
      d="M55.2 60 C57.4 63, 57.4 66.5, 55.2 67.2 C53 66.5, 53 63, 55.2 60 Z"
      fill="#FFF0A8"
      stroke="#FF4F9A"
      strokeWidth="0.6"
      className="animate-candle-flame"
    />
  </svg>
);

/**
 * Combined romantic couple scene with colourful floating hearts and kitty mascot.
 */
export const CartoonCoupleScene: React.FC<{
  mood?: CharacterMood;
  showCake?: boolean;
}> = ({ mood = 'happy', showCake = true }) => {
  return (
    <div className="relative flex items-end justify-center gap-1 sm:gap-3 py-2">
      {/* Multi-colour floating hearts above */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 animate-float-slow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#C9A0FF">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF416C" className="drop-shadow-[0_4px_10px_rgba(255,65,108,0.4)]">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF4F9A">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <CartoonBoy mood={mood} className="w-24 h-28 sm:w-32 sm:h-36" />

      {showCake && (
        <div className="mb-1 -mx-2 z-10">
          <CuteKittyMascot className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
      )}

      <CartoonGirl mood={mood} className="w-24 h-28 sm:w-32 sm:h-36" />
    </div>
  );
};
