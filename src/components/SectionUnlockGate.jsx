import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SectionUnlockGate = ({
  currentLevel,
  unlockedLevel,
  nextTitle,
  nextId,
  onUnlockNext
}) => {
  const isLatestUnlocked = unlockedLevel === currentLevel;
  const isAlreadyUnlocked = unlockedLevel > currentLevel;

  const handleUnlockClick = () => {
    // Fire celebratory confetti on chapter progression
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.75 },
      colors: ['#EC4899', '#F472B6', '#D946EF', '#FFD1DC', '#F43F5E', '#BE185D']
    });

    if (onUnlockNext) {
      onUnlockNext(currentLevel + 1, nextId, nextTitle);
    }
  };

  if (isAlreadyUnlocked) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 px-4 flex items-center justify-center">
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#F472B6]/40 to-transparent" />
        <div className="px-4 py-1.5 rounded-full bg-[#FFF0F7] border border-[#F472B6]/30 text-xs font-sans-luxury text-[#9D174D]/75 flex items-center gap-1.5 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Chapter Completed</span>
        </div>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-[#F472B6]/40 to-transparent" />
      </div>
    );
  }

  if (isLatestUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl mx-auto my-14 px-4 text-center z-30 relative"
      >
        <div className="relative p-8 rounded-3xl bg-gradient-to-b from-white/95 via-[#FFF0F5]/95 to-white/95 border-2 border-[#F472B6]/60 shadow-2xl backdrop-blur-md space-y-5">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-[#EC4899] to-[#D946EF] flex items-center justify-center text-white shadow-lg animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#701A40]">
              Ready for the Next Chapter?
            </h3>
            <p className="text-xs sm:text-sm font-sans-luxury text-[#9D174D] mt-1">
              Unlock <strong className="text-[#EC4899] font-semibold">{nextTitle}</strong> to continue your birthday surprise
            </p>
          </div>

          <div className="pt-2">
            <div className="relative group inline-block">
              {/* Outer pulsing glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#DB2777] rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />

              <button
                onClick={handleUnlockClick}
                className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#DB2777] text-white font-sans-luxury font-bold text-base sm:text-lg shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                <span>Proceed to {nextTitle}</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};
