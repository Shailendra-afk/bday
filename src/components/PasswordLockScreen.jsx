import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';

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
        particleCount: 150,
        spread: 90,
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0214]/98 backdrop-blur-2xl px-4 py-8 overflow-y-auto selection:bg-pink-500 selection:text-white">
      {/* Background Glowing Halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] bg-gradient-to-tr from-pink-600/40 via-fuchsia-500/30 to-rose-500/40 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Glassmorphic Card - Dark, High-Contrast */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: isUnlockedSuccess ? 1.05 : 1, 
          y: 0,
          x: isShaking ? [0, -12, 12, -8, 8, -4, 4, 0] : 0
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-[#160626] border-2 border-pink-500/60 shadow-[0_0_60px_rgba(236,72,153,0.4)] text-center space-y-6"
      >
        {/* Animated Lock Icon Header */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-rose-400 p-1 shadow-lg shadow-pink-500/50">
            <div className="w-full h-full rounded-full bg-[#0d0316] flex items-center justify-center">
              {isUnlockedSuccess ? (
                <Unlock className="w-8 h-8 text-pink-300 animate-bounce" />
              ) : (
                <Lock className="w-8 h-8 text-pink-400 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* PIN Digit Indicators (Dots) */}
        <div className="flex justify-center items-center gap-4 py-1">
          {Array.from({ length: codeLength }).map((_, idx) => {
            const isFilled = idx < pin.length;
            return (
              <motion.div
                key={idx}
                animate={isFilled ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-5 rounded-full transition-all duration-300 border-2 ${
                  isFilled
                    ? 'bg-gradient-to-r from-pink-400 to-fuchsia-400 border-white shadow-[0_0_16px_rgba(244,114,182,1)] scale-110'
                    : 'bg-[#250a3d] border-pink-400/60'
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
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-200 bg-rose-950/80 border border-rose-500/60 py-2 px-3 rounded-full mx-auto max-w-xs font-semibold"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {isUnlockedSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-200 bg-emerald-950/80 border border-emerald-500/60 py-2 px-4 rounded-full mx-auto max-w-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Unlocked!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive High-Contrast Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-[260px] mx-auto pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              disabled={isUnlockedSuccess}
              className="w-full h-14 rounded-2xl bg-[#280c3f] hover:bg-pink-600 active:bg-pink-700 border-2 border-pink-400/50 hover:border-pink-200 text-white font-black text-2xl font-serif-luxury transition-all duration-150 flex items-center justify-center shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {num}
            </button>
          ))}

          {/* Clear Key */}
          <button
            onClick={handleClear}
            disabled={isUnlockedSuccess || pin.length === 0}
            className="w-full h-14 rounded-2xl bg-[#210934] hover:bg-rose-700 active:bg-rose-800 border-2 border-pink-400/40 hover:border-rose-300 text-pink-200 font-bold text-xs sm:text-sm font-sans-luxury transition-all duration-150 flex items-center justify-center active:scale-95 disabled:opacity-40 cursor-pointer"
          >
            Clear
          </button>

          {/* Zero Key */}
          <button
            onClick={() => handleKeyPress('0')}
            disabled={isUnlockedSuccess}
            className="w-full h-14 rounded-2xl bg-[#280c3f] hover:bg-pink-600 active:bg-pink-700 border-2 border-pink-400/50 hover:border-pink-200 text-white font-black text-2xl font-serif-luxury transition-all duration-150 flex items-center justify-center shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            0
          </button>

          {/* Backspace Key */}
          <button
            onClick={handleBackspace}
            disabled={isUnlockedSuccess || pin.length === 0}
            className="w-full h-14 rounded-2xl bg-[#210934] hover:bg-pink-600 active:bg-pink-700 border-2 border-pink-400/40 hover:border-pink-200 text-pink-200 font-bold text-lg font-sans-luxury transition-all duration-150 flex items-center justify-center active:scale-95 disabled:opacity-40 cursor-pointer"
          >
            ⌫
          </button>
        </div>
      </motion.div>
    </div>
  );
};
