import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, X, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';

// Web Audio API Synthesized Audio Effects
const playPopSound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    // Ignore audio context autoplay restrictions
  }
};

const playAllStarsChime = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
      gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.4);
    });
  } catch (e) {}
};

export const StarSkySection = () => {
  const [activeWish, setActiveWish] = useState(null);
  const [openedStarIds, setOpenedStarIds] = useState([]);
  const wishes = birthdayData.starWishes || [];

  // Star node coordinates across night sky grid
  const starNodes = [
    { id: 1, top: '20%', left: '15%', size: 'w-7 h-7 sm:w-8 sm:h-8', delay: '0s' },
    { id: 2, top: '15%', left: '45%', size: 'w-8 h-8 sm:w-9 sm:h-9', delay: '0.4s' },
    { id: 3, top: '25%', left: '78%', size: 'w-7 h-7 sm:w-8 sm:h-8', delay: '0.8s' },
    { id: 4, top: '48%', left: '25%', size: 'w-9 h-9 sm:w-10 sm:h-10', delay: '0.2s' },
    { id: 5, top: '40%', left: '60%', size: 'w-7 h-7 sm:w-8 sm:h-8', delay: '1.2s' },
    { id: 6, top: '70%', left: '18%', size: 'w-8 h-8 sm:w-9 sm:h-9', delay: '0.6s' },
    { id: 7, top: '65%', left: '50%', size: 'w-9 h-9 sm:w-10 sm:h-10', delay: '1.0s' },
    { id: 8, top: '75%', left: '82%', size: 'w-7 h-7 sm:w-8 sm:h-8', delay: '0.5s' }
  ];

  const handleStarClick = (star, wishText) => {
    // Play pop audio effect
    playPopSound();

    setActiveWish({ id: star.id, text: wishText });

    if (!openedStarIds.includes(star.id)) {
      const nextOpened = [...openedStarIds, star.id];
      setOpenedStarIds(nextOpened);

      // Star Burst Sparkle Effect
      confetti({
        particleCount: 35,
        spread: 70,
        origin: {
          x: parseFloat(star.left) / 100,
          y: (parseFloat(star.top) + 20) / 100
        },
        colors: ['#F472B6', '#FBBF24', '#C084FC', '#FFFFFF']
      });

      // Check if ALL stars have been opened!
      if (nextOpened.length === starNodes.length) {
        playAllStarsChime();
        setTimeout(() => {
          confetti({
            particleCount: 160,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#EC4899', '#F472B6', '#D946EF', '#F59E0B', '#FFFFFF']
          });
        }, 300);
      }
    }
  };

  const handleResetSky = () => {
    playAllStarsChime();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#FBBF24', '#C084FC']
    });
    setOpenedStarIds([]);
  };

  const handleCloseWish = () => {
    setActiveWish(null);
    // If all stars were viewed, automatically return them all back when closing modal!
    if (openedStarIds.length === starNodes.length) {
      setTimeout(() => {
        setOpenedStarIds([]);
      }, 300);
    }
  };

  const isAllViewed = openedStarIds.length === starNodes.length;

  return (
    <section id="stars" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative my-12 select-none">
      {/* Night Sky Canvas Wrapper */}
      <div className="relative min-h-[520px] sm:min-h-[580px] rounded-3xl bg-gradient-to-b from-[#2D0A1E] via-[#4A1230] to-[#2D0A1E] border-2 border-[#F472B6]/60 shadow-2xl p-6 sm:p-12 overflow-hidden flex flex-col justify-between">
        
        {/* Background ambient stars particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/30 via-rose-950/40 to-black pointer-events-none" />

        {/* Floating tiny twinkling background stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#FBCFE8] animate-pulse"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 95}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              opacity: 0.3 + Math.random() * 0.7,
              animationDuration: `${1.5 + Math.random() * 3}s`
            }}
          />
        ))}

        {/* Section Header overlay inside dark sky */}
        <div className="text-center z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F472B6]/40 text-xs font-sans-luxury text-[#FBCFE8] backdrop-blur-md shadow-lg">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Wish Upon The Stars</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F472B6]" />
            <span>{openedStarIds.length} / {starNodes.length} Revealed</span>
            {openedStarIds.length > 0 && (
              <button
                onClick={handleResetSky}
                className="ml-2 px-2 py-0.5 rounded-full bg-[#F472B6]/30 hover:bg-[#F472B6]/50 text-white text-[10px] flex items-center gap-1 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Stars</span>
              </button>
            )}
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-wide drop-shadow-[0_0_25px_rgba(244,114,182,0.8)]">
            Tap a Star to Pop & Unveil a Wish
          </h2>

          <p className="font-sans-luxury text-xs sm:text-sm text-[#F472B6]/90 max-w-md mx-auto">
            {isAllViewed
              ? "You've opened all the stars! They will return once you close the wish."
              : "Each star pops to reveal a wish. Once all stars are viewed, the sky resets!"}
          </p>
        </div>

        {/* Interactive Star Nodes (Pop on Click, Reappear when all viewed) */}
        <div className="relative w-full h-[340px] z-20">
          <AnimatePresence>
            {starNodes.map((star, idx) => {
              const wishText = wishes[idx % wishes.length];
              const isOpened = openedStarIds.includes(star.id);

              if (isOpened) return null;

              return (
                <motion.button
                  key={star.id}
                  initial={{ scale: 0, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{
                    scale: [1, 2.2, 0],
                    opacity: [1, 1, 0],
                    rotate: [0, 90, 180],
                    transition: { duration: 0.45, ease: 'easeOut' }
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22, delay: idx * 0.04 }}
                  onClick={() => handleStarClick(star, wishText)}
                  style={{ top: star.top, left: star.left }}
                  className={`absolute ${star.size} text-[#F472B6] hover:text-white transition-colors cursor-pointer group z-20`}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Glowing pulse ring behind star */}
                    <div className="absolute -inset-2 rounded-full bg-[#F472B6]/30 blur-md group-hover:bg-amber-300/60 group-hover:blur-lg transition-all animate-pulse" />
                    <Star className="relative w-full h-full fill-[#F472B6] group-hover:fill-amber-300 group-hover:text-amber-300 drop-shadow-[0_0_16px_rgba(244,114,182,0.9)] group-hover:scale-130 transition-all duration-300" />
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>

          {/* Banner overlay when all stars are popped */}
          {isAllViewed && !activeWish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4 z-30"
            >
              <div className="w-16 h-16 rounded-full bg-[#F472B6]/20 border border-[#F472B6] flex items-center justify-center shadow-lg animate-bounce">
                <Star className="w-8 h-8 text-amber-300 fill-amber-300" />
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]">
                All Constellations Viewed!
              </h3>
              <p className="font-sans-luxury text-xs sm:text-sm text-[#FBCFE8] max-w-sm leading-relaxed">
                You've gathered all 8 secret star wishes! Tap below to bring all the stars back to the sky.
              </p>
              <button
                onClick={handleResetSky}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#D946EF] text-white font-sans-luxury text-xs font-semibold hover:scale-105 transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Bring Back All Stars</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Modal / Floating Popover for Unlocked Wish */}
        <AnimatePresence>
          {activeWish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="absolute inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bottom-8 z-40 max-w-lg bg-[#FFF0F5] rounded-2xl p-6 shadow-2xl border-2 border-[#EC4899] text-center pink-glow"
            >
              <button
                onClick={handleCloseWish}
                className="absolute top-3 right-3 text-[#9D174D] hover:text-[#EC4899] p-1 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center mb-2">
                <Sparkles className="w-6 h-6 text-[#EC4899] animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <h3 className="font-[#701A40] font-serif-luxury text-xl font-bold text-[#701A40] mb-2">
                Star Wish #{activeWish.id}
              </h3>

              <p className="font-script-luxury text-2xl text-[#EC4899] leading-relaxed">
                "{activeWish.text}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

