import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, AlertCircle, Delete, RotateCcw } from 'lucide-react';
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
        particleCount: 160,
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070110]/98 backdrop-blur-2xl px-4 py-8 overflow-y-auto selection:bg-pink-500 selection:text-white">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] bg-gradient-to-tr from-pink-600/45 via-fuchsia-500/35 to-rose-500/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-600/25 rounded-full blur-3xl pointer-events-none animate-ping" style={{ animationDuration: '4s' }} />

      {/* Main Glassmorphic Card - Premium Dark Luxury */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: isUnlockedSuccess ? 1.05 : 1, 
          y: 0,
          x: isShaking ? [0, -14, 14, -10, 10, -5, 5, 0] : 0
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[340px] sm:max-w-sm p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1c0733]/90 via-[#150426]/95 to-[#0e021c]/98 border-2 border-pink-500/50 shadow-[0_0_70px_rgba(236,72,153,0.45)] text-center space-y-6 backdrop-blur-md"
      >
        {/* Animated Lock Icon Header */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-rose-400 p-1 shadow-[0_0_25px_rgba(236,72,153,0.6)]">
            <div className="w-full h-full rounded-full bg-[#0d0217] flex items-center justify-center">
              {isUnlockedSuccess ? (
                <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-pink-300 animate-bounce" />
              ) : (
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400 animate-pulse" />
              )}
            </div>
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* PIN Digit Indicators (Dots) */}
        <div className="flex justify-center items-center gap-4 py-1">
          {Array.from({ length: codeLength }).map((_, idx) => {
            const isFilled = idx < pin.length;
            return (
              <motion.div
                key={idx}
                animate={isFilled ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300 border-2 ${
                  isFilled
                    ? 'bg-gradient-to-r from-pink-400 via-fuchsia-400 to-rose-400 border-white shadow-[0_0_20px_rgba(244,114,182,1)] scale-110'
                    : 'bg-[#210838] border-pink-400/50'
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
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-200 bg-rose-950/80 border border-rose-500/60 py-2 px-3 rounded-full mx-auto max-w-xs font-semibold shadow-lg"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {isUnlockedSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-200 bg-emerald-950/80 border border-emerald-500/60 py-2 px-4 rounded-full mx-auto max-w-xs font-bold shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Unlocked!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Luxury Keypad */}
        <div className="grid grid-cols-3 gap-3 sm:gap-3.5 max-w-[270px] sm:max-w-[290px] mx-auto pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleKeyPress(num)}
              disabled={isUnlockedSuccess}
              className="w-full h-14 sm:h-16 rounded-2xl bg-gradient-to-b from-[#2d0c47] to-[#1c0530] hover:from-pink-600 hover:to-fuchsia-600 active:from-pink-700 active:to-fuchsia-700 border-2 border-pink-400/40 hover:border-pink-200 text-white font-black text-2xl sm:text-3xl font-serif-luxury transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] disabled:opacity-50 cursor-pointer"
            >
              {num}
            </motion.button>
          ))}

          {/* Clear Key */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleClear}
            disabled={isUnlockedSuccess || pin.length === 0}
            className="w-full h-14 sm:h-16 rounded-2xl bg-gradient-to-b from-[#27073b] to-[#170226] hover:from-rose-600 hover:to-pink-600 border-2 border-pink-400/30 hover:border-rose-200 text-pink-200 hover:text-white font-bold text-xs sm:text-sm font-sans-luxury transition-all duration-200 flex items-center justify-center shadow-md active:scale-95 disabled:opacity-35 cursor-pointer gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </motion.button>

          {/* Zero Key */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleKeyPress('0')}
            disabled={isUnlockedSuccess}
            className="w-full h-14 sm:h-16 rounded-2xl bg-gradient-to-b from-[#2d0c47] to-[#1c0530] hover:from-pink-600 hover:to-fuchsia-600 active:from-pink-700 active:to-fuchsia-700 border-2 border-pink-400/40 hover:border-pink-200 text-white font-black text-2xl sm:text-3xl font-serif-luxury transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] disabled:opacity-50 cursor-pointer"
          >
            0
          </motion.button>

          {/* Backspace Key */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleBackspace}
            disabled={isUnlockedSuccess || pin.length === 0}
            className="w-full h-14 sm:h-16 rounded-2xl bg-gradient-to-b from-[#27073b] to-[#170226] hover:from-pink-600 hover:to-fuchsia-600 border-2 border-pink-400/30 hover:border-pink-200 text-pink-200 hover:text-white font-bold text-base sm:text-lg font-sans-luxury transition-all duration-200 flex items-center justify-center shadow-md active:scale-95 disabled:opacity-35 cursor-pointer"
          >
            <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
