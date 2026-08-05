import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, Flower2, Star } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

// --- 16 VIBRANT & HYPER-COLORFUL PALETTES ---
const BALLOON_MATERIAL_PALETTES = [
  { name: 'Fuchsia Rose', primary: '#EC4899', secondary: '#F472B6', borderGrad: 'from-pink-500 via-fuchsia-400 to-amber-300', glow: 'rgba(236, 72, 153, 0.95)', sparkle: '#F472B6' },
  { name: 'Royal Lavender', primary: '#A855F7', secondary: '#C084FC', borderGrad: 'from-purple-500 via-indigo-400 to-pink-300', glow: 'rgba(168, 85, 247, 0.95)', sparkle: '#C084FC' },
  { name: 'Sky Azure', primary: '#0EA5E9', secondary: '#38BDF8', borderGrad: 'from-sky-400 via-cyan-300 to-emerald-300', glow: 'rgba(14, 165, 233, 0.95)', sparkle: '#38BDF8' },
  { name: 'Sunset Peach', primary: '#F97316', secondary: '#FB923C', borderGrad: 'from-orange-500 via-amber-400 to-rose-400', glow: 'rgba(249, 115, 22, 0.95)', sparkle: '#FB923C' },
  { name: 'Mint Emerald', primary: '#10B981', secondary: '#34D399', borderGrad: 'from-emerald-400 via-teal-300 to-sky-300', glow: 'rgba(16, 185, 129, 0.95)', sparkle: '#34D399' },
  { name: 'Champagne Gold', primary: '#F59E0B', secondary: '#FBBF24', borderGrad: 'from-amber-400 via-yellow-300 to-pink-300', glow: 'rgba(245, 158, 11, 0.95)', sparkle: '#FBBF24' },
  { name: 'Lilac Violet', primary: '#C084FC', secondary: '#E879F9', borderGrad: 'from-fuchsia-400 via-purple-300 to-rose-300', glow: 'rgba(192, 132, 252, 0.95)', sparkle: '#E879F9' },
  { name: 'Coral Sunrise', primary: '#FB7185', secondary: '#FDA4AF', borderGrad: 'from-rose-500 via-pink-400 to-amber-300', glow: 'rgba(251, 113, 133, 0.95)', sparkle: '#FDA4AF' },
  { name: 'Electric Magenta', primary: '#D946EF', secondary: '#F0ABFC', borderGrad: 'from-fuchsia-500 via-pink-400 to-purple-400', glow: 'rgba(217, 70, 239, 0.95)', sparkle: '#F0ABFC' },
  { name: 'Ocean Cyan', primary: '#3B82F6', secondary: '#60A5FA', borderGrad: 'from-blue-500 via-sky-400 to-indigo-300', glow: 'rgba(59, 130, 246, 0.95)', sparkle: '#60A5FA' },
  { name: 'Lime Jade', primary: '#059669', secondary: '#10B981', borderGrad: 'from-emerald-500 via-lime-400 to-teal-300', glow: 'rgba(5, 150, 105, 0.95)', sparkle: '#10B981' },
  { name: 'Golden Honey', primary: '#EAB308', secondary: '#FACC15', borderGrad: 'from-yellow-400 via-amber-500 to-rose-400', glow: 'rgba(234, 179, 8, 0.95)', sparkle: '#FACC15' },
  { name: 'Plum Passion', primary: '#9333EA', secondary: '#C084FC', borderGrad: 'from-purple-600 via-fuchsia-500 to-pink-300', glow: 'rgba(147, 51, 234, 0.95)', sparkle: '#C084FC' },
  { name: 'Blossom Candy', primary: '#F472B6', secondary: '#FBCFE8', borderGrad: 'from-pink-400 via-rose-300 to-purple-300', glow: 'rgba(244, 114, 182, 0.95)', sparkle: '#FBCFE8' },
  { name: 'Periwinkle Star', primary: '#6366F1', secondary: '#818CF8', borderGrad: 'from-indigo-500 via-purple-400 to-sky-300', glow: 'rgba(99, 102, 241, 0.95)', sparkle: '#818CF8' },
  { name: 'Ruby Crimson', primary: '#BE185D', secondary: '#F43F5E', borderGrad: 'from-rose-600 via-pink-500 to-amber-300', glow: 'rgba(190, 24, 93, 0.95)', sparkle: '#F43F5E' }
];

// --- 3D FLOATING SKY PLACEMENT POSITIONS ---
const BALLOON_3D_POSITIONS = [
  { left: '6%', top: '6%', scale: 0.95, z: 20, speed: 4.8 },
  { left: '28%', top: '3%', scale: 1.1, z: 30, speed: 4.2 },
  { left: '52%', top: '5%', scale: 0.88, z: 15, speed: 5.6 },
  { left: '76%', top: '4%', scale: 1.05, z: 25, speed: 4.5 },
  { left: '14%', top: '27%', scale: 1.08, z: 28, speed: 4.4 },
  { left: '38%', top: '24%', scale: 0.92, z: 18, speed: 5.2 },
  { left: '62%', top: '28%', scale: 1.15, z: 35, speed: 3.9 },
  { left: '84%', top: '26%', scale: 0.9, z: 16, speed: 5.4 },
  { left: '8%', top: '50%', scale: 1.12, z: 32, speed: 4.1 },
  { left: '30%', top: '48%', scale: 0.85, z: 14, speed: 5.8 },
  { left: '54%', top: '51%', scale: 1.05, z: 24, speed: 4.6 },
  { left: '78%', top: '49%', scale: 0.96, z: 22, speed: 5.0 },
  { left: '16%', top: '72%', scale: 0.9, z: 18, speed: 5.3 },
  { left: '40%', top: '70%', scale: 1.14, z: 34, speed: 4.0 },
  { left: '64%', top: '73%', scale: 0.94, z: 20, speed: 5.1 },
  { left: '86%', top: '71%', scale: 1.08, z: 26, speed: 4.3 }
];

export const ShadesOfBeautySection = () => {
  const shades = birthdayData.shadesOfBeauty || [];
  const [activeIndex, setActiveIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isLightWaveActive, setIsLightWaveActive] = useState(false);
  const canvasRef = useRef(null);

  // Periodic 18-Second Global Rainbow Stardust Sweep Wave Effect
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsLightWaveActive(true);
      setTimeout(() => setIsLightWaveActive(false), 2500);
    }, 18000);

    return () => clearInterval(waveInterval);
  }, []);

  // 60 FPS Multi-Color Particle & Stardust Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleColors = ['#F472B6', '#C084FC', '#38BDF8', '#FB923C', '#34D399', '#FBBF24', '#F0ABFC'];

    class ColorfulParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = 2.5 + Math.random() * 6.5;
        this.speedY = 0.4 + Math.random() * 0.8;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.type = Math.floor(Math.random() * 4); // 0=petal, 1=bubble, 2=star, 3=sparkle
        this.alpha = 0.3 + Math.random() * 0.6;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.03;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.angle) * 0.4;
        this.angle += this.spin;

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset();
          this.y = height + 20;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.type === 0) {
          // Color Blossom Petal
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 1.6, Math.PI / 4, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        } else if (this.type === 1) {
          // Glass Bubble
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 1.3, 0, Math.PI * 2);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else if (this.type === 2) {
          // Twinkling Star
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
          // Glowing Sparkle Dot
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 55 }, () => new ColorfulParticle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  if (!shades.length) return null;

  const activeShade = activeIndex !== null ? shades[activeIndex] : null;

  return (
    <section
      id="shades-of-beauty"
      className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative select-none overflow-hidden my-4"
    >
      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes rainbowShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes kenBurnsZoom {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.12) translate(-1%, -1%); }
          100% { transform: scale(1); }
        }

        @keyframes rainbowSweepWave {
          0% { transform: translateX(-100%) rotate(15deg); opacity: 0; }
          50% { opacity: 0.75; }
          100% { transform: translateX(200%) rotate(15deg); opacity: 0; }
        }

        .rainbow-title-shimmer {
          background-size: 200% auto;
          animation: rainbowShimmer 6s ease infinite;
        }

        .ken-burns-img {
          animation: kenBurnsZoom 16s ease-in-out infinite alternate;
        }

        .rainbow-sweep-effect {
          animation: rainbowSweepWave 2.5s ease-in-out forwards;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* VIBRANT MULTI-COLOR CANVAS & ATMOSPHERIC ENVIRONMENT */}
      {/* ========================================================================= */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#FFF0F7] via-[#FCE7F0] via-[#F3E8FF] via-[#E0F2FE] via-[#FEF3C7] via-[#FDF4FF] to-[#FFF0F7] border-4 border-white shadow-[0_0_100px_rgba(236,72,153,0.35)] overflow-hidden min-h-[920px] sm:min-h-[1150px]"
      >
        {/* 60 FPS Multi-Color Canvas Overlay */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        {/* Dynamic Multi-Hue Radial Aurora Rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1200px] h-[550px] bg-gradient-radial from-pink-400/40 via-purple-400/30 via-sky-400/20 to-transparent blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />

        {/* Global Rainbow Light Sweep Wave Effect */}
        {isLightWaveActive && (
          <div className="absolute inset-0 pointer-events-none z-40 bg-gradient-to-r from-transparent via-amber-300/40 via-pink-400/50 via-cyan-300/40 to-transparent rainbow-sweep-effect" />
        )}

        {/* ========================================================================= */}
        {/* HEADING WITH SHIMMERING RAINBOW GRADIENT */}
        {/* ========================================================================= */}
        <div className="relative z-20 text-center max-w-3xl mx-auto space-y-4 mb-12 pt-2">
          {/* Rainbow Shimmer Title */}
          <div className="relative inline-block">
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight rainbow-title-shimmer bg-gradient-to-r from-[#EC4899] via-[#A855F7] via-[#0EA5E9] via-[#F59E0B] to-[#EC4899] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(236,72,153,0.55)]">
              Shades of Beauty
            </h2>

            {/* Floating Side Sparkles & Flowers */}
            <div className="absolute -top-4 -right-8 text-amber-400 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-3 -left-8 text-pink-500 animate-pulse">
              <Flower2 className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3D FLOATING VIBRANT BALLOONS CANVAS (Interactive & Animated) */}
        {/* ========================================================================= */}
        <div className="relative w-full h-[740px] sm:h-[900px] z-10">
          {shades.map((shade, idx) => {
            const palette = BALLOON_MATERIAL_PALETTES[idx % BALLOON_MATERIAL_PALETTES.length];
            const pos = BALLOON_3D_POSITIONS[idx % BALLOON_3D_POSITIONS.length];

            // Interactive Mouse Repulsion Physics
            let pushX = 0;
            let pushY = 0;
            if (mousePos.x > 0) {
              const balloonX = (parseFloat(pos.left) / 100) * 1000;
              const balloonY = (parseFloat(pos.top) / 100) * 800;
              const dx = mousePos.x - balloonX;
              const dy = mousePos.y - balloonY;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 180 && dist > 0) {
                const force = (180 - dist) / 180;
                pushX = -(dx / dist) * force * 38;
                pushY = -(dy / dist) * force * 38;
              }
            }

            return (
              <motion.div
                key={shade.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  position: 'absolute',
                  left: pos.left,
                  top: pos.top,
                  zIndex: pos.z
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: pos.scale }}
                viewport={{ once: true }}
                animate={{
                  x: pushX,
                  y: [pushY, pushY - 22, pushY],
                  rotate: [-4, 4, -4]
                }}
                transition={{
                  y: {
                    duration: pos.speed,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (idx % 4) * 0.3
                  },
                  x: { type: 'spring', stiffness: 200, damping: 20 },
                  scale: { duration: 0.6 }
                }}
                className="flex flex-col items-center cursor-pointer group select-none"
              >
                {/* Multi-Layer Pulsing Neon Radial Aura Glow */}
                <div
                  className="absolute -inset-8 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse"
                  style={{ background: palette.glow, animationDuration: '4s' }}
                />

                {/* Hyper-Vibrant Dual-Gradient Border Balloon Shell */}
                <div
                  className={`relative w-34 h-44 sm:w-46 sm:h-56 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] p-2 bg-gradient-to-tr ${palette.borderGrad} backdrop-blur-md shadow-2xl ${isLightWaveActive ? 'scale-110 shadow-[0_0_50px_rgba(245,158,11,0.9)]' : ''} group-hover:scale-115 group-hover:rotate-4 transition-all duration-500 overflow-hidden`}
                  style={{
                    boxShadow: `0 18px 45px ${palette.glow}, inset 0 0 30px rgba(255,255,255,0.9)`
                  }}
                >
                  {/* Photo Inside Balloon with Continuous Ken Burns Slow Zoom */}
                  <div className="w-full h-full rounded-[50%_50%_50%_50%/40%_40%_60%_60%] overflow-hidden border-2 border-white/95 bg-white shadow-inner relative">
                    <img
                      src={shade.photoUrl}
                      alt={shade.title}
                      className="w-full h-full object-cover ken-burns-img select-none"
                    />
                  </div>

                  {/* Specular Glass Reflection Shine */}
                  <div className="absolute top-3 left-4 w-6 h-11 rounded-full bg-gradient-to-b from-white/95 to-transparent blur-[1px] transform -rotate-12 pointer-events-none" />
                </div>

                {/* Satin Ribbon Knot */}
                <div
                  className="w-4 h-3 rounded-b-md shadow-md -mt-0.5 z-10"
                  style={{ backgroundColor: palette.primary }}
                />

                {/* Trailing Satin Ribbon String */}
                <div
                  className="w-0.5 h-14 sm:h-18"
                  style={{
                    background: `linear-gradient(to bottom, ${palette.primary}, ${palette.secondary}50, transparent)`
                  }}
                />

                {/* Hanging Heart / Crystal Charm */}
                <div
                  className="w-4 h-4 rounded-full border border-white shadow-md flex items-center justify-center -mt-2 z-10 animate-bounce"
                  style={{ backgroundColor: palette.primary, animationDuration: '3s' }}
                >
                  <Heart className="w-2.5 h-2.5 text-white fill-white" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PURE PHOTO LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeShade && (
          <div
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] rounded-3xl p-3 sm:p-4 bg-[#140A21]/90 backdrop-blur-2xl border-2 border-pink-400/50 shadow-[0_0_100px_rgba(236,72,153,0.5)] overflow-hidden flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20 shadow-xl"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Pure High-Res Photo Display */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black">
                <img
                  src={activeShade.photoUrl}
                  alt={activeShade.title || "Photo View"}
                  className="max-h-[78vh] w-auto max-w-full object-contain rounded-xl select-none"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
