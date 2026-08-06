import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';

const KEYPAD_BUTTONS = [
  { num: '1', style: 'from-pink-500 to-rose-600 border-pink-300 shadow-pink-500/40' },
  { num: '2', style: 'from-fuchsia-500 to-pink-600 border-fuchsia-300 shadow-fuchsia-500/40' },
  { num: '3', style: 'from-purple-500 to-fuchsia-600 border-purple-300 shadow-purple-500/40' },
  { num: '4', style: 'from-rose-500 to-orange-500 border-rose-300 shadow-rose-500/40' },
  { num: '5', style: 'from-amber-500 to-rose-500 border-amber-300 shadow-amber-500/40' },
  { num: '6', style: 'from-pink-600 to-purple-600 border-pink-300 shadow-pink-500/40' },
  { num: '7', style: 'from-violet-600 to-purple-600 border-violet-300 shadow-violet-500/40' },
  { num: '8', style: 'from-fuchsia-600 to-rose-600 border-fuchsia-300 shadow-fuchsia-500/40' },
  { num: '9', style: 'from-rose-600 to-pink-700 border-rose-300 shadow-rose-500/40' },
];

export const PasswordLockScreen = ({ onUnlock }) => {
  const config = birthdayData.passcodeConfig || { passcode: "0801" };
  const targetCode = String(config.passcode || "0801");
  const codeLength = targetCode.length;

  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlockedSuccess, setIsUnlockedSuccess] = useState(false);

  // Keyboard listening for physical numeric key presses
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isUnlockedSuccess) return;

      if (e.key >= '0' && e.key <= '9') {
        if (pin.length < codeLength) {
          handleKeyPress(e.key);
        }
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isUnlockedSuccess, codeLength]);

  const handleKeyPress = (numStr) => {
    if (isUnlockedSuccess || pin.length >= codeLength) return;
    setErrorMsg('');
    const newPin = pin + numStr;
    setPin(newPin);

    // Auto verify when digits filled
    if (newPin.length === codeLength) {
      verifyPin(newPin);
    }
  };

  const handleBackspace = () => {
    if (isUnlockedSuccess) return;
    setErrorMsg('');
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isUnlockedSuccess) return;
    setErrorMsg('');
    setPin('');
  };

  const verifyPin = (enteredPin) => {
    if (enteredPin === targetCode) {
      setIsUnlockedSuccess(true);
      setErrorMsg('');

      // Confetti outburst celebration
      confetti({
        particleCount: 160,
        spread: 95,
        origin: { y: 0.5 },
        colors: ['#EC4899', '#F472B6', '#D946EF', '#FFD1DC', '#FF69B4', '#F43F5E', '#FBBF24']
      });

      // Delay slightly for unlock animation before notifying parent
      setTimeout(() => {
        onUnlock();
      }, 1100);
    } else {
      setIsShaking(true);
      setErrorMsg("Incorrect Passcode 💖");
      
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07010f]/98 backdrop-blur-2xl px-4 py-8 overflow-y-auto selection:bg-pink-500 selection:text-white">
      {/* Background Vibrant Glowing Halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] bg-gradient-to-tr from-pink-600/40 via-fuchsia-500/35 to-purple-600/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none animate-ping" style={{ animationDuration: '4s' }} />

      {/* Main Glassmorphic Card - Vibrant & High-Contrast */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: isUnlockedSuccess ? 1.05 : 1, 
          y: 0,
          x: isShaking ? [0, -12, 12, -8, 8, -4, 4, 0] : 0
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-[#140524]/95 border-2 border-pink-400/60 shadow-[0_0_70px_rgba(236,72,153,0.45)] text-center space-y-6"
      >
        {/* Animated Colorful Lock Icon Header */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-amber-400 p-1 shadow-lg shadow-pink-500/60 animate-pulse">
            <div className="w-full h-full rounded-full bg-[#0b0214] flex items-center justify-center">
              {isUnlockedSuccess ? (
                <Unlock className="w-8 h-8 text-pink-300 animate-bounce" />
              ) : (
                <Lock className="w-8 h-8 text-pink-400" />
              )}
            </div>
          </div>
          <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '5s' }} />
        </div>

        {/* PIN Digit Indicators (Colorful Dots) */}
        <div className="flex justify-center items-center gap-4 py-1">
          {Array.from({ length: codeLength }).map((_, idx) => {
            const isFilled = idx < pin.length;
            return (
              <motion.div
                key={idx}
                animate={isFilled ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-5 rounded-full transition-all duration-300 border-2 ${
                  isFilled
                    ? 'bg-gradient-to-r from-amber-300 via-pink-400 to-fuchsia-400 border-white shadow-[0_0_18px_rgba(244,114,182,1)] scale-110'
                    : 'bg-[#220938] border-pink-400/60'
                }`}
              />
            );
          })}
        </div>

        {/* Error / Status Toast Message */}
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-100 bg-rose-950/80 border border-rose-500/60 py-2 px-3 rounded-full mx-auto max-w-xs font-bold shadow-lg"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {isUnlockedSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-100 bg-emerald-950/80 border border-emerald-500/60 py-2 px-4 rounded-full mx-auto max-w-xs font-bold shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Unlocked!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Colorful & Attractive Keypad Grid */}
        <div className="p-3 rounded-3xl bg-[#0b0213]/90 border border-pink-500/30 backdrop-blur-md shadow-inner">
          <div className="grid grid-cols-3 gap-3 max-w-[260px] mx-auto">
            {KEYPAD_BUTTONS.map(({ num, style }) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                disabled={isUnlockedSuccess}
                className={`w-full h-14 rounded-2xl bg-gradient-to-br ${style} border-2 text-white font-extrabold text-2xl sm:text-3xl font-serif-luxury transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-105 active:scale-90 hover:brightness-125 disabled:opacity-50 cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`}
              >
                {num}
              </button>
            ))}

            {/* Clear Key - Amber Rose Gradient */}
            <button
              onClick={handleClear}
              disabled={isUnlockedSuccess || pin.length === 0}
              className="w-full h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-rose-600 border-2 border-amber-300/70 text-amber-100 font-extrabold text-xs sm:text-sm font-sans-luxury transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-105 active:scale-90 hover:brightness-125 disabled:opacity-40 cursor-pointer shadow-amber-500/30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            >
              Clear
            </button>

            {/* Zero Key - Vibrant Rose Gold Gradient */}
            <button
              onClick={() => handleKeyPress('0')}
              disabled={isUnlockedSuccess}
              className="w-full h-14 rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 border-2 border-pink-300 text-white font-extrabold text-2xl sm:text-3xl font-serif-luxury transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-105 active:scale-90 hover:brightness-125 disabled:opacity-50 cursor-pointer shadow-pink-500/40 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            >
              0
            </button>

            {/* Backspace Key - Violet Fuchsia Gradient */}
            <button
              onClick={handleBackspace}
              disabled={isUnlockedSuccess || pin.length === 0}
              className="w-full h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-purple-300/70 text-pink-100 font-extrabold text-lg sm:text-xl font-sans-luxury transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-105 active:scale-90 hover:brightness-125 disabled:opacity-40 cursor-pointer shadow-purple-500/30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            >
              ⌫
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
