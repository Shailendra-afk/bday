import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, Award } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const GiftBoxSection = () => {
  const [isOpened, setIsOpened] = useState(false);
  const giftData = birthdayData.giftSurprise;

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Trigger celebration confetti burst!
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F9A8D4', '#EC4899', '#F472B6', '#FFF0F5', '#DB2777']
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#EC4899', '#F472B6']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#F9A8D4', '#FFF0F5']
        });
      }, 300);
    } catch (e) {
      console.warn('Confetti burst trigger:', e);
    }
  };

  return (
    <section id="gift" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center relative">
      {/* Section Header */}
      <div className="space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#F472B6]/40 text-xs font-sans-luxury text-[#9D174D]">
          <Gift className="w-4 h-4 text-[#EC4899]" />
          <span>A Special Birthday Present</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#701A40]">
          Your Surprise Gift Box
        </h2>
        <p className="font-sans-luxury text-base text-[#9D174D] max-w-md mx-auto">
          Tap the ribbon-tied gift box below to unwrap your birthday surprise.
        </p>
      </div>

      {/* Gift Box Container */}
      <div className="relative flex justify-center items-center py-6 min-h-[380px]">
        {!isOpened ? (
          /* Sealed Ribbon Gift Box */
          <motion.div
            onClick={handleOpenGift}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer relative w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-tr from-[#EC4899] via-[#F472B6] to-[#FBCFE8] rounded-3xl shadow-2xl border-2 border-[#EC4899] pink-glow flex flex-col items-center justify-center p-6 overflow-hidden group"
          >
            {/* Vertical Ribbon */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-[#BE185D] via-[#EC4899] to-[#BE185D] shadow-md z-10" />
            {/* Horizontal Ribbon */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-b from-[#BE185D] via-[#EC4899] to-[#BE185D] shadow-md z-10" />

            {/* Ribbon Bow Icon */}
            <div className="relative z-20 w-20 h-20 rounded-full bg-[#FFF0F5] border-2 border-[#EC4899] flex flex-col items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Gift className="w-10 h-10 text-[#831843] animate-bounce" />
            </div>

            <p className="relative z-20 font-sans-luxury text-xs uppercase tracking-widest font-bold text-[#831843] mt-4 bg-white/90 px-3 py-1 rounded-full shadow-sm">
              Tap To Untie Ribbon
            </p>
          </motion.div>
        ) : (
          /* Revealed Gift Card Content */
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-lg bg-[#FFF0F5] rounded-3xl p-8 shadow-2xl border-2 border-[#F472B6]/60 pink-glow relative text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#FCE7F0] border border-[#F472B6]/50 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8 text-[#EC4899]" />
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#701A40]">
                {giftData.title}
              </h3>
              <p className="font-sans-luxury text-sm text-[#9D174D] mt-2 leading-relaxed">
                {giftData.message}
              </p>
            </div>

            {/* Special Voucher Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F9A8D4]/40 via-[#FFF0F5] to-[#FCE7F0]/40 border border-[#F472B6]/40 space-y-1">
              <p className="font-sans-luxury text-xs text-[#EC4899] font-bold uppercase tracking-wider">
                Official Birthday Pass
              </p>
              <p className="font-serif-luxury text-lg font-bold text-[#831843]">
                {giftData.voucherCode}
              </p>
              <p className="font-script-luxury text-xl text-[#9D174D]">
                "{giftData.voucherText}"
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#9D174D] font-sans-luxury">
              <Heart className="w-4 h-4 text-[#EC4899] fill-[#EC4899]" />
              <span>Unwrapped with love for {birthdayData.recipientName}</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
