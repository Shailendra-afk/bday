import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Heart, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';

export const PasswordLockScreen = ({ onUnlock }) => {
  const config = birthdayData.passcodeConfig || {
    passcode: "0801",
    hint: "Hint: Birthday date in MMDD format (0801)",
    title: "Secret Birthday Realm",
    subtitle: "Enter the secret 4-digit PIN to unlock Pranathi's surprise."
  };

  const targetCode = String(config.passcode || "0801");
  const codeLength = targetCode.length;

  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showHint, setShowHint] = useState(false);
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
      setErrorMsg("Incorrect Passcode. Give it another try! 💖");
      
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0316]/95 backdrop-blur-xl px-4 py-8 overflow-y-auto selection:bg-pink-500 selection:text-white">
      {/* Background Animated Glowing Halos */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gradient-to-tr from-pink-600/30 via-fuchsia-500/20 to-rose-500/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: isUnlockedSuccess ? 1.05 : 1, 
          y: 0,
          x: isShaking ? [0, -12, 12, -8, 8, -4, 4, 0] : 0
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.25)] text-center space-y-6 bg-gradient-to-b from-white/10 to-white/5"
      >
        {/* Animated Lock Header Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-rose-400 p-1 shadow-lg shadow-pink-500/40">
            <div className="w-full h-full rounded-full bg-[#160626] flex items-center justify-center">
              {isUnlockedSuccess ? (
                <Unlock className="w-10 h-10 text-pink-300 animate-bounce" />
              ) : (
                <Lock className="w-10 h-10 text-pink-400 animate-pulse" />
              )}
            </div>
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <Heart className="absolute -bottom-1 -left-2 w-5 h-5 text-pink-400 fill-pink-400 animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-pink-300 drop-shadow">
            {config.title || "Secret Birthday Realm"}
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/80 font-sans-luxury max-w-xs mx-auto leading-relaxed">
            {config.subtitle || `Enter secret ${codeLength}-digit PIN code to unlock ${birthdayData.recipientName}'s surprise.`}
          </p>
        </div>

        {/* PIN Digit Indicators (Dots) */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 py-2">
          {Array.from({ length: codeLength }).map((_, idx) => {
            const isFilled = idx < pin.length;
            return (
              <motion.div
                key={idx}
                animate={isFilled ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-300 border-2 ${
                  isFilled
                    ? 'bg-gradient-to-r from-pink-400 to-fuchsia-400 border-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.8)]'
                    : 'bg-white/10 border-pink-300/40'
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
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-300 bg-rose-950/60 border border-rose-500/40 py-2 px-3 rounded-full mx-auto max-w-xs font-medium"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {isUnlockedSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 py-2 px-4 rounded-full mx-auto max-w-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Access Granted! Opening Surprise...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-[280px] mx-auto pt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              disabled={isUnlockedSuccess}
              className="w-full h-12 sm:h-14 rounded-2xl bg-white/10 hover:bg-pink-500/25 active:bg-pink-500/40 border border-white/15 hover:border-pink-400/50 text-white font-bold text-lg sm:text-xl font-serif-luxury transition-all duration-200 flex items-center justify-center shadow-sm active:scale-95 disabled:opacity-50"
            >
              {num}
            </button>
          ))}

          {/* Clear Key */}
          <button
            onClick={handleClear}
            disabled={isUnlockedSuccess || pin.length === 0}
            className="w-full h-12 sm:h-14 rounded-2xl bg-white/5 hover:bg-rose-500/20 active:bg-rose-500/30 border border-white/10 text-pink-200/80 font-medium text-xs font-sans-luxury transition-all duration-200 flex items-center justify-center active:scale-95 disabled:opacity-40"
          >
            Clear
          </button>

          {/* Zero Key */}
          <button
            onClick={() => handleKeyPress('0')}
            disabled={isUnlockedSuccess}
            className="w-full h-12 sm:h-14 rounded-2xl bg-white/10 hover:bg-pink-500/25 active:bg-pink-500/40 border border-white/15 hover:border-pink-400/50 text-white font-bold text-lg sm:text-xl font-serif-luxury transition-all duration-200 flex items-center justify-center shadow-sm active:scale-95 disabled:opacity-50"
          >
            0
          </button>

          {/* Backspace Key */}
          <button
            onClick={handleBackspace}
            disabled={isUnlockedSuccess || pin.length === 0}
            className="w-full h-12 sm:h-14 rounded-2xl bg-white/5 hover:bg-pink-500/20 active:bg-pink-500/30 border border-white/10 text-pink-200/80 font-medium text-xs font-sans-luxury transition-all duration-200 flex items-center justify-center active:scale-95 disabled:opacity-40"
          >
            ⌫
          </button>
        </div>

        {/* Hint Toggle & Keyboard Note */}
        <div className="pt-2 space-y-2">
          {config.hint && (
            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 text-xs text-pink-300/80 hover:text-pink-200 underline underline-offset-4 transition-colors font-medium cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? "Hide Hint" : "Need a Hint?"}
              </button>

              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs italic text-amber-200/90 bg-amber-950/40 border border-amber-500/30 rounded-xl p-2.5 mt-2 max-w-xs mx-auto"
                  >
                    {config.hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}

          <p className="text-[10px] text-pink-300/50 font-sans-luxury">
            💡 Tip: You can also use your keyboard numbers to enter PIN
          </p>
        </div>
      </motion.div>
    </div>
  );
};
