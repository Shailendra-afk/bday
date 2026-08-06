import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  X,
  Play,
  Crown,
  RotateCcw,
  Feather,
  Maximize2
} from 'lucide-react';

// --- BUTTERFLY COLOR PALETTES & GRADIENTS ---
const BUTTERFLY_STYLES = {
  golden: {
    name: 'The Golden Secret',
    primary: '#F59E0B',
    secondary: '#FDE047',
    glow: 'rgba(245, 158, 11, 0.9)',
    wingGrad: 'url(#grad-golden)',
    bgBadge: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  rose: {
    name: 'Rose Romance',
    primary: '#EC4899',
    secondary: '#F472B6',
    glow: 'rgba(236, 72, 153, 0.7)',
    wingGrad: 'url(#grad-rose)',
    bgBadge: 'bg-pink-100 text-pink-900 border-pink-300'
  },
  emerald: {
    name: 'Emerald Serenity',
    primary: '#10B981',
    secondary: '#6EE7B7',
    glow: 'rgba(16, 185, 129, 0.7)',
    wingGrad: 'url(#grad-emerald)',
    bgBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  amber: {
    name: 'Amber Sunset',
    primary: '#F97316',
    secondary: '#FDBA74',
    glow: 'rgba(249, 115, 22, 0.7)',
    wingGrad: 'url(#grad-amber)',
    bgBadge: 'bg-orange-100 text-orange-900 border-orange-300'
  },
  twilight: {
    name: 'Twilight Lavender',
    primary: '#A855F7',
    secondary: '#D8B4FE',
    glow: 'rgba(168, 85, 247, 0.7)',
    wingGrad: 'url(#grad-twilight)',
    bgBadge: 'bg-purple-100 text-purple-900 border-purple-300'
  },
  sapphire: {
    name: 'Sapphire Midnight',
    primary: '#3B82F6',
    secondary: '#93C5FD',
    glow: 'rgba(59, 130, 246, 0.7)',
    wingGrad: 'url(#grad-sapphire)',
    bgBadge: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  fuchsia: {
    name: 'Vivid Fuchsia',
    primary: '#D946EF',
    secondary: '#F0ABFC',
    glow: 'rgba(217, 70, 239, 0.7)',
    wingGrad: 'url(#grad-fuchsia)',
    bgBadge: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300'
  },
  coral: {
    name: 'Coral Peach',
    primary: '#FB7185',
    secondary: '#FECDD3',
    glow: 'rgba(251, 113, 133, 0.7)',
    wingGrad: 'url(#grad-coral)',
    bgBadge: 'bg-rose-100 text-rose-900 border-rose-300'
  }
};

// --- MEMORIES DATA LIST (With Distinct Quadrant Coordinates & Custom GPU Orbit Animations) ---
const MEMORIES_LIST = [
  {
    id: 'mem-0',
    type: 'photo',
    styleKey: 'fuchsia',
    title: 'A Heartfelt Secret',
    subtitle: 'A special message just for you',
    date: 'Forever Memory',
    caption: 'Every moment shared with you adds a touch of magic to life. Wishing you endless happiness and love today and always!',
    photoUrl: '/photos/butterfly_1.jpg',
    isGolden: false,
    baseX: '50%',
    baseY: '24%',
    size: 56,
    animName: 'roam-golden',
    animDuration: '20s',
    animDelay: '-2s'
  },
  {
    id: 'mem-1',
    type: 'photo',
    styleKey: 'rose',
    title: 'Sunny Amusements & Friendship',
    subtitle: 'Bright blue skies and warm smiles',
    date: 'Sunny Days',
    caption: 'Surrounded by laughter, sunshine, and joyful friends making unforgettable memories together.',
    photoUrl: '/photos/butterfly_1.jpg',
    baseX: '18%',
    baseY: '26%',
    size: 56,
    animName: 'roam-mem-1',
    animDuration: '24s',
    animDelay: '-6s'
  },
  {
    id: 'mem-3',
    type: 'photo',
    styleKey: 'emerald',
    title: 'Mirror Selfie Squad',
    subtitle: 'Fairy lights & golden smiles',
    date: 'Cozy Moments',
    caption: 'Cozy fairy lights, warm smiles, and fun mirror selfies with your favorite squad.',
    photoUrl: '/photos/butterfly_2.jpg',
    baseX: '20%',
    baseY: '55%',
    size: 54,
    animName: 'roam-mem-3',
    animDuration: '26s',
    animDelay: '-4s'
  },
  {
    id: 'mem-4',
    type: 'photo',
    styleKey: 'twilight',
    title: 'Traditional Splendor & Silk',
    subtitle: 'Graceful in traditional saree elegance',
    date: 'Festive Poise',
    caption: 'Draped in rich traditional sarees and dhotis, glowing with timeless festive poise.',
    photoUrl: '/photos/butterfly_3.jpg',
    baseX: '80%',
    baseY: '55%',
    size: 56,
    animName: 'roam-mem-4',
    animDuration: '25s',
    animDelay: '-14s'
  },
  {
    id: 'mem-6',
    type: 'photo',
    styleKey: 'sapphire',
    title: 'Vivid High-Energy Fun',
    subtitle: 'Cheering smiles and pure joy',
    date: 'Joyful Moments',
    caption: 'Unfiltered joy, cheering selfie poses, and infectious happiness shared together.',
    photoUrl: '/photos/butterfly_4.jpg',
    baseX: '78%',
    baseY: '78%',
    size: 54,
    animName: 'roam-mem-6',
    animDuration: '27s',
    animDelay: '-16s'
  },
  {
    id: 'mem-7',
    type: 'photo',
    styleKey: 'coral',
    title: 'Festive Cheer & Warm Waves',
    subtitle: 'Friendly waves and open smiles',
    date: 'Shared Joy',
    caption: 'Friendly waves, contagious smiles, and cherished memories that last forever.',
    photoUrl: '/photos/butterfly_5.jpg',
    baseX: '50%',
    baseY: '72%',
    size: 58,
    animName: 'roam-mem-7',
    animDuration: '23s',
    animDelay: '-9s'
  },
  {
    id: 'mem-8',
    type: 'photo',
    styleKey: 'twilight',
    title: 'Dance Studio Mirror Squad',
    subtitle: 'What you think you Become',
    date: 'Inspiring Vibes',
    caption: 'Capturing joyful dance studio mirror selfies with sweet friends and inspiring vibes.',
    photoUrl: '/photos/butterfly_6.jpg',
    baseX: '36%',
    baseY: '38%',
    size: 56,
    animName: 'roam-mem-3',
    animDuration: '25s',
    animDelay: '-11s'
  },
  {
    id: 'mem-9',
    type: 'photo',
    styleKey: 'rose',
    title: 'Cherished Affection & Hugs',
    subtitle: 'Surrounded by love & warm embraces',
    date: 'Pure Affection',
    caption: 'Sweet candid moments surrounded by loving friends offering the warmest hugs and affection.',
    photoUrl: '/photos/butterfly_7.jpg',
    baseX: '64%',
    baseY: '38%',
    size: 56,
    animName: 'roam-mem-5',
    animDuration: '24s',
    animDelay: '-7s'
  },
  {
    id: 'mem-10',
    type: 'photo',
    styleKey: 'emerald',
    title: 'Festive Traditional Lineup',
    subtitle: 'Golden memories in traditional silk',
    date: 'Festive Poise',
    caption: 'A beautiful outdoor lineup dressed in elegant sarees and veshtis, smiling beneath the green trees.',
    photoUrl: '/photos/butterfly_8.jpg',
    baseX: '38%',
    baseY: '84%',
    size: 58,
    animName: 'roam-mem-1',
    animDuration: '26s',
    animDelay: '-15s'
  }
];

// --- 3D SVG BUTTERFLY COMPONENT ---
const SVGButterfly = ({ styleKey, size = 56, isGolden = false }) => {
  const style = BUTTERFLY_STYLES[styleKey] || BUTTERFLY_STYLES.rose;

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 ${isGolden ? '14px' : '10px'} ${style.glow})`
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <defs>
          <linearGradient id="grad-golden" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="grad-rose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#9D174D" />
          </linearGradient>
          <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
          <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          <linearGradient id="grad-twilight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9D5FF" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
          <linearGradient id="grad-sapphire" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BFDBFE" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="grad-fuchsia" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D0FE" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#701A75" />
          </linearGradient>
          <linearGradient id="grad-coral" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE4E6" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
        </defs>

        {/* LEFT WINGS */}
        <g className="butterfly-wing-left" style={{ transformOrigin: '50px 50px' }}>
          <path d="M 50,50 C 35,20 10,10 5,25 C 0,40 25,60 50,50 Z" fill={style.wingGrad} stroke={style.secondary} strokeWidth="1.2" opacity="0.95" />
          <path d="M 50,50 Q 30,30 10,25" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" fill="none" />
          <path d="M 50,50 C 30,60 15,80 25,90 C 38,98 50,75 50,50 Z" fill={style.wingGrad} stroke={style.primary} strokeWidth="1" opacity="0.85" />
        </g>

        {/* RIGHT WINGS */}
        <g className="butterfly-wing-right" style={{ transformOrigin: '50px 50px' }}>
          <path d="M 50,50 C 65,20 90,10 95,25 C 100,40 75,60 50,50 Z" fill={style.wingGrad} stroke={style.secondary} strokeWidth="1.2" opacity="0.95" />
          <path d="M 50,50 Q 70,30 90,25" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" fill="none" />
          <path d="M 50,50 C 70,60 85,80 75,90 C 62,98 50,75 50,50 Z" fill={style.wingGrad} stroke={style.primary} strokeWidth="1" opacity="0.85" />
        </g>

        {/* BODY */}
        <g>
          <path d="M 50,42 Q 44,28 38,22" stroke={style.primary} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M 50,42 Q 56,28 62,22" stroke={style.primary} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="22" r="1.5" fill={style.secondary} />
          <circle cx="62" cy="22" r="1.5" fill={style.secondary} />
          <ellipse cx="50" cy="43" rx="2.5" ry="3.5" fill="#3D0A24" stroke={style.secondary} strokeWidth="0.5" />
          <ellipse cx="50" cy="54" rx="2" ry="7" fill="#200514" stroke={style.primary} strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
};

export const ButterflyCollectorSection = () => {
  const [activeMemory, setActiveMemory] = useState(null);
  const [landingButterfly, setLandingButterfly] = useState(null);
  const [unlockedMemories, setUnlockedMemories] = useState(new Set());
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  // Handle Butterfly Tap / Click
  const handleButterflyClick = (bot) => {
    setLandingButterfly(bot);

    if (bot.isGolden) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FDE047', '#EC4899', '#FFF']
      });
    }

    setTimeout(() => {
      setActiveMemory(bot);
      setUnlockedMemories((prev) => new Set(prev).add(bot.id));
    }, 500);
  };

  // Close Memory Card & Release Butterfly
  const handleCloseCard = () => {
    setActiveMemory(null);
    setTimeout(() => {
      setLandingButterfly(null);
    }, 350);
  };

  // Reset Garden / Release All Butterflies
  const handleResetGarden = () => {
    setUnlockedMemories(new Set());
    setLandingButterfly(null);
  };

  return (
    <section
      id="butterflies"
      className="py-24 px-4 sm:px-8 max-w-6xl mx-auto relative select-none overflow-hidden"
    >
      {/* PURE GPU CSS KEYFRAME ANIMATIONS (60FPS Smooth, Zero React State Lag) */}
      <style>{`
        @keyframes flapLeft {
          0%, 100% { transform: perspective(300px) rotateY(0deg); }
          50% { transform: perspective(300px) rotateY(65deg); }
        }
        @keyframes flapRight {
          0%, 100% { transform: perspective(300px) rotateY(0deg); }
          50% { transform: perspective(300px) rotateY(-65deg); }
        }
        .butterfly-wing-left {
          animation: flapLeft 0.38s ease-in-out infinite;
        }
        .butterfly-wing-right {
          animation: flapRight 0.38s ease-in-out infinite;
        }

        /* Perfectly Balanced GPU Flight Trajectories (100% Constant Velocity & Smoothness) */
        @keyframes roam-golden {
          0%   { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate3d(-50%, -50%, 0) translate(180px, 90px) rotate(10deg); }
          50%  { transform: translate3d(-50%, -50%, 0) translate(0px, 180px) rotate(0deg); }
          75%  { transform: translate3d(-50%, -50%, 0) translate(-180px, 90px) rotate(-10deg); }
          100% { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
        }

        @keyframes roam-mem-1 {
          0%   { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate3d(-50%, -50%, 0) translate(180px, -60px) rotate(10deg); }
          50%  { transform: translate3d(-50%, -50%, 0) translate(320px, 120px) rotate(0deg); }
          75%  { transform: translate3d(-50%, -50%, 0) translate(160px, 200px) rotate(-10deg); }
          100% { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
        }

        @keyframes roam-mem-2 {
          0%   { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate3d(-50%, -50%, 0) translate(-180px, 80px) rotate(-10deg); }
          50%  { transform: translate3d(-50%, -50%, 0) translate(-320px, 200px) rotate(0deg); }
          75%  { transform: translate3d(-50%, -50%, 0) translate(-160px, 140px) rotate(10deg); }
          100% { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
        }

        @keyframes roam-mem-3 {
          0%   { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate3d(-50%, -50%, 0) translate(160px, 120px) rotate(10deg); }
          50%  { transform: translate3d(-50%, -50%, 0) translate(300px, -40px) rotate(0deg); }
          75%  { transform: translate3d(-50%, -50%, 0) translate(160px, -140px) rotate(-10deg); }
          100% { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
        }

        @keyframes roam-mem-4 {
          0%   { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate3d(-50%, -50%, 0) translate(-160px, -120px) rotate(-10deg); }
          50%  { transform: translate3d(-50%, -50%, 0) translate(-300px, 40px) rotate(0deg); }
          75%  { transform: translate3d(-50%, -50%, 0) translate(-160px, 140px) rotate(10deg); }
          100% { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
        }

        @keyframes roam-mem-5 {
          0%   { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate3d(-50%, -50%, 0) translate(180px, -180px) rotate(12deg); }
          50%  { transform: translate3d(-50%, -50%, 0) translate(340px, 0px) rotate(0deg); }
          75%  { transform: translate3d(-50%, -50%, 0) translate(160px, 160px) rotate(-12deg); }
          100% { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
        }

        @keyframes roam-mem-6 {
          0%   { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate3d(-50%, -50%, 0) translate(-200px, -200px) rotate(-12deg); }
          50%  { transform: translate3d(-50%, -50%, 0) translate(-360px, 0px) rotate(0deg); }
          75%  { transform: translate3d(-50%, -50%, 0) translate(-180px, 160px) rotate(12deg); }
          100% { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
        }

        @keyframes roam-mem-7 {
          0%   { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate3d(-50%, -50%, 0) translate(-140px, -140px) rotate(-8deg); }
          50%  { transform: translate3d(-50%, -50%, 0) translate(0px, -260px) rotate(0deg); }
          75%  { transform: translate3d(-50%, -50%, 0) translate(140px, -140px) rotate(8deg); }
          100% { transform: translate3d(-50%, -50%, 0) translate(0px, 0px) rotate(0deg); }
        }

        .butterfly-container {
          transition: none !important;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .butterfly-container:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* DREAMY ENCHANTED GARDEN CONTAINER */}
      <div className="relative w-full rounded-3xl min-h-[640px] sm:min-h-[700px] bg-gradient-to-b from-[#FFF0F5]/80 via-[#FDF2F8]/90 to-[#FCE7F0]/80 border border-[#F472B6]/40 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Sunbeam Rays Top Right */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-[#FDE047]/30 via-[#FB7185]/15 to-transparent blur-3xl pointer-events-none" />

        {/* Ambient Floating Pollen Sparkles */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#EC4899] animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute top-2/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" style={{ animationDuration: '3.2s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-ping" style={{ animationDuration: '5s' }} />
        </div>

        {/* SECTION HEADER */}
        <div className="relative z-10 text-center pt-8 px-4 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#F472B6]/40 shadow-sm text-xs font-sans-luxury text-[#9D174D]">
            <Sparkles className="w-3.5 h-3.5 text-[#EC4899] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Enchanted Memory Garden</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899]" />
            <span className="font-semibold text-[#831843]">
              Caught: {unlockedMemories.size} / {MEMORIES_LIST.length}
            </span>
            {unlockedMemories.size > 0 && (
              <button
                onClick={handleResetGarden}
                className="ml-1 text-[11px] font-semibold text-[#EC4899] hover:text-[#BE185D] underline transition-colors"
              >
                Release All
              </button>
            )}
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#701A40]">
            Butterfly Collector
          </h2>

          <p className="font-sans-luxury text-xs sm:text-sm text-[#9D174D] max-w-lg mx-auto leading-relaxed">
            Floating across the garden are delicate butterflies carrying our treasured memories. Tap a butterfly to gently catch it and reveal its hidden magic!
          </p>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] font-sans-luxury text-[#BE185D]/90">
            <Sparkles className="w-3.5 h-3.5 text-[#EC4899] animate-bounce" />
            <span>Tap any floating butterfly to unveil treasured memories!</span>
          </div>
        </div>

        {/* FLUTTERING BUTTERFLIES GARDEN VIEWPORT */}
        <div className="absolute inset-0 pt-28 pb-6 overflow-hidden">
          {MEMORIES_LIST.map((bot) => {
            const style = BUTTERFLY_STYLES[bot.styleKey] || BUTTERFLY_STYLES.rose;
            const isLanding = landingButterfly && landingButterfly.id === bot.id;
            const isUnlocked = unlockedMemories.has(bot.id);

            // Once collected/unlocked and no longer landing, disappear from the garden!
            if (isUnlocked && !isLanding) {
              return null;
            }

            return (
              <div
                key={bot.id}
                onClick={() => handleButterflyClick(bot)}
                style={{
                  position: 'absolute',
                  left: isLanding ? '50%' : bot.baseX,
                  top: isLanding ? '50%' : bot.baseY,
                  zIndex: isLanding ? 40 : bot.isGolden ? 30 : 20,
                  animation: isLanding
                    ? 'none'
                    : `${bot.animName} ${bot.animDuration} linear infinite ${bot.animDelay}`,
                  willChange: 'transform'
                }}
                className="butterfly-container group p-8 -m-8 flex items-center justify-center rounded-full cursor-pointer hover:scale-125 transition-transform duration-300"
              >
                {/* Golden Glow Aura */}
                {bot.isGolden && (
                  <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-md animate-pulse pointer-events-none" />
                )}

                {/* Touch Target Hover Pulse Ring */}
                <div className="absolute inset-3 rounded-full border border-dashed border-white/60 opacity-20 group-hover:opacity-100 group-hover:border-[#EC4899] group-hover:animate-ping transition-opacity duration-300 pointer-events-none" />

                {/* SVG Butterfly */}
                <SVGButterfly
                  styleKey={bot.styleKey}
                  size={bot.size}
                  isGolden={bot.isGolden}
                />

                {/* Hover Label */}
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap px-2.5 py-0.5 rounded-full bg-white/95 border border-[#F472B6]/40 text-[10px] font-sans-luxury text-[#701A40] shadow-md flex items-center gap-1">
                  {isUnlocked && <Sparkles className="w-2.5 h-2.5 text-amber-500" />}
                  <span>{bot.title}</span>
                </div>
              </div>
            );
          })}

          {/* ALL CAUGHT GARDEN COMPLETION BANNER */}
          {unlockedMemories.size === MEMORIES_LIST.length && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4 z-10 bg-white/30 backdrop-blur-xs">
              <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shadow-lg animate-bounce">
                <Crown className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#701A40]">
                All Memories Collected!
              </h3>
              <p className="font-sans-luxury text-xs sm:text-sm text-[#9D174D] max-w-sm leading-relaxed">
                You have caught every delicate butterfly and unveiled all hidden memory secrets in the garden!
              </p>
              <button
                onClick={handleResetGarden}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#F472B6] text-white font-sans-luxury text-xs font-medium hover:opacity-95 transition-all shadow-md flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Release All Butterflies Back to Garden</span>
              </button>
            </div>
          )}
        </div>

        {/* BOTTOM FLORAL SILHOUETTE DECORATIONS */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white/70 to-transparent pointer-events-none flex justify-between items-end px-8 pb-2 opacity-50">
          <Feather className="w-8 h-8 text-[#EC4899]/30 transform -rotate-45" />
          <Heart className="w-6 h-6 text-[#F472B6]/30 animate-pulse" />
          <Sparkles className="w-7 h-7 text-amber-400/40 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GLASSMORPHIC MEMORY CARD MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border ${
                activeMemory.isGolden
                  ? 'bg-gradient-to-b from-[#1C160C]/95 via-[#2D2312]/95 to-[#170F05]/95 border-amber-400/60 text-amber-50 shadow-amber-500/20'
                  : 'glass-card border-[#F472B6]/50 text-[#701A40]'
              }`}
            >
              {/* Top Close Button */}
              <button
                onClick={handleCloseCard}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-current transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-4">
                {activeMemory.isGolden ? (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-sans-luxury font-medium flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '5s' }} />
                    Golden Secret Unlocked
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#FFF0F5] border border-[#F472B6]/40 text-[#BE185D] text-xs font-sans-luxury font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
                    {activeMemory.date}
                  </span>
                )}
              </div>

              {/* Memory Title */}
              <h3
                className={`font-serif-luxury text-2xl sm:text-3xl font-bold mb-2 ${
                  activeMemory.isGolden ? 'text-amber-200' : 'text-[#701A40]'
                }`}
              >
                {activeMemory.title}
              </h3>

              <p
                className={`font-sans-luxury text-xs sm:text-sm mb-6 ${
                  activeMemory.isGolden ? 'text-amber-300/80' : 'text-[#9D174D]'
                }`}
              >
                {activeMemory.subtitle}
              </p>

              {/* MEDIA CONTAINER */}
              <div className="relative rounded-2xl overflow-hidden mb-6 border border-white/20 shadow-md group">
                {activeMemory.type === 'video' ? (
                  /* Video Card Preview */
                  <div
                    onClick={() => setFullscreenVideo({ videoUrl: activeMemory.videoUrl, title: activeMemory.title })}
                    className="relative aspect-video bg-black cursor-pointer overflow-hidden flex items-center justify-center"
                  >
                    <video
                      src={activeMemory.videoUrl}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-sans-luxury flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" />
                      <span>Expand Video</span>
                    </div>
                  </div>
                ) : (
                  /* Photo Card Preview */
                  <div className="relative aspect-[4/3] bg-pink-900/10 overflow-hidden flex items-center justify-center">
                    <img
                      src={activeMemory.photoUrl}
                      alt={activeMemory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </div>

              {/* Caption */}
              <p
                className={`font-sans-luxury text-sm leading-relaxed mb-6 italic ${
                  activeMemory.isGolden ? 'text-amber-100/90' : 'text-[#831843]'
                }`}
              >
                "{activeMemory.caption}"
              </p>

              {/* Footer Release Button */}
              <div className="flex justify-end gap-3 pt-2 border-t border-current/10">
                <button
                  onClick={handleCloseCard}
                  className={`px-5 py-2.5 rounded-full text-xs font-sans-luxury font-medium transition-all shadow-sm flex items-center gap-2 ${
                    activeMemory.isGolden
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 hover:from-amber-300 hover:to-amber-400 shadow-amber-500/30'
                      : 'bg-gradient-to-r from-[#EC4899] to-[#F472B6] text-white hover:opacity-95 shadow-[#EC4899]/30'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Release Butterfly</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN VIDEO MODAL */}
      <AnimatePresence>
        {fullscreenVideo && (
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-2 sm:p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/20"
            >
              <button
                onClick={() => setFullscreenVideo(null)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all border border-white/20"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>

              <video
                src={fullscreenVideo.videoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
