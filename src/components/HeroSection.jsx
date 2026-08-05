import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const HeroSection = ({ onOpenSurprise, hasOpened }) => {
  const [isAwakening, setIsAwakening] = useState(true);
  const [typedQuote, setTypedQuote] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullQuote = birthdayData.heroQuote || "Some people make life more beautiful simply by being in it.";

  // Initial Awakening Blackout Sequence (1.2 Seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAwakening(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect logic (starts after awakening)
  useEffect(() => {
    if (isAwakening) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < fullQuote.length) {
        setTypedQuote(fullQuote.slice(0, index + 1));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [isAwakening, fullQuote]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FCE7F0] to-[#FFF0F5] select-none">
      
      {/* ========================================================================= */}
      {/* INITIAL MAGICAL AWAKENING TRANSITION OVERLAY */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAwakening && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#0A0314] flex flex-col items-center justify-center gap-4 text-center px-4"
          >
            {/* Glowing Ambient Halo */}
            <div className="absolute w-72 h-72 rounded-full bg-pink-500/20 blur-3xl animate-pulse" />
            
            <Sparkles className="w-8 h-8 text-pink-400 animate-spin z-10" style={{ animationDuration: '4s' }} />
            
            <p className="font-serif-luxury text-base sm:text-lg tracking-widest text-pink-200/90 uppercase animate-pulse z-10 font-bold drop-shadow-md">
              Awakening Magical Experience...
            </p>

            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glowing blurred radial spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-tr from-[#F9A8D4]/60 via-[#F472B6]/40 to-[#EC4899]/30 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="max-w-3xl mx-auto text-center z-20 space-y-8 py-12">
        {/* Typewriter Quote Box */}
        <div className="min-h-[70px] sm:min-h-[90px] flex items-center justify-center">
          <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl italic text-[#831843] leading-relaxed tracking-wide drop-shadow-sm">
            "{typedQuote}"
            {!isTypingDone && !isAwakening && (
              <span className="inline-block w-0.5 h-6 ml-1 bg-[#EC4899] animate-pulse" />
            )}
          </p>
        </div>

        {/* Main Birthday Greeting & Featured Single Photo Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingDone ? 1 : 0.85, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Single Featured Hero Photo Frame - Centered */}
          <div className="flex justify-center items-center w-full my-4">
            <div className="relative group cursor-pointer">
              <div className="relative w-56 sm:w-64 md:w-72 h-68 sm:h-80 md:h-88 rounded-3xl p-1.5 bg-gradient-to-tr from-[#EC4899] via-[#F472B6] to-[#D946EF] pink-glow shadow-2xl mx-auto transform hover:scale-[1.03] transition-transform duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white bg-white shadow-inner">
                  <img
                    src={birthdayData.heroPhotoUrl || "/photos/shade2.png"}
                    alt={birthdayData.recipientName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                </div>
              </div>
              {/* Floating Sparkle Icon Badge */}
              <div className="absolute -bottom-2 -right-2 p-2.5 rounded-2xl bg-white/95 shadow-xl backdrop-blur-sm border border-[#F472B6]/50 animate-bounce">
                <Sparkles className="w-5 h-5 text-[#EC4899]" />
              </div>
            </div>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold text-[#701A40] tracking-tight leading-tight">
            Happy Birthday, <br />
            <span className="bg-gradient-to-r from-[#EC4899] via-[#D946EF] to-[#F59E0B] bg-clip-text text-transparent">{birthdayData.recipientName}</span>{' '}
            <Heart className="inline-block w-8 h-8 sm:w-12 sm:h-12 text-[#EC4899] fill-[#EC4899] animate-bounce" />
          </h1>

          <p className="font-script-luxury text-2xl sm:text-3xl text-[#9D174D] font-medium pt-2">
            "{birthdayData.subtitle}"
          </p>
        </motion.div>

        {/* Glowing Action Button Before Entering Main Page */}
        {!hasOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isTypingDone ? 1 : 0.85, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-6 flex flex-col items-center gap-3"
          >
            <div className="relative group inline-block">
              {/* Outer pulsing glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#DB2777] rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />
              
              <button
                onClick={onOpenSurprise}
                className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#DB2777] bg-[length:200%_auto] text-white font-sans-luxury font-bold text-lg sm:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer overflow-hidden group"
              >
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Open Your Surprise</span>
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </button>
            </div>
            <p className="font-sans-luxury text-xs text-[#9D174D]/80 tracking-widest uppercase">
              Click to unlock background music & enter
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
