import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Camera, Heart, Crown, Star, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OurMemoriesGrandEntrySection = ({ onEnterMemories }) => {
  const handleGrandEntry = () => {
    // Grand celebration fireworks confetti
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#EC4899', '#F472B6', '#D946EF', '#FFD1DC', '#F43F5E', '#F59E0B']
    });

    if (onEnterMemories) {
      onEnterMemories();
    }
  };

  return (
    <section
      id="memories-grand-entry"
      className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-b from-[#0F051D] via-[#1A0A2A] to-[#070709] py-20 sm:py-28 text-white overflow-hidden select-none"
    >
      {/* Background Glowing Spotlight Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-gradient-to-tr from-[#EC4899]/30 via-[#D946EF]/20 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Floating Animated 3D Glass Badges */}
      <div className="absolute top-12 left-10 opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '8s' }}>
        <Film className="w-16 h-16 sm:w-24 sm:h-24 text-[#F472B6]" />
      </div>
      <div className="absolute top-20 right-12 opacity-20 pointer-events-none animate-bounce" style={{ animationDuration: '6s' }}>
        <Camera className="w-16 h-16 sm:w-24 sm:h-24 text-[#E879F9]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-10">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-500/40 shadow-[0_0_25px_rgba(236,72,153,0.3)] backdrop-blur-md"
        >
          <Crown className="w-4 h-4 text-amber-300 animate-bounce" />
          <span className="text-xs sm:text-sm font-sans-luxury font-bold text-pink-200 uppercase tracking-widest">
            Main Feature Section • Grand Entry
          </span>
          <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.div>

        {/* Grand Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Welcome to <br />
            <span className="bg-gradient-to-r from-[#F472B6] via-[#EC4899] to-[#E879F9] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
              Our Memories Vault
            </span>
          </h2>
          <p className="max-w-2xl mx-auto font-sans-luxury text-sm sm:text-lg text-pink-100/80 leading-relaxed font-light">
            A timeless collection of our favorite smiles, adventures, candid polaroids, and unforgettable moments together.
          </p>
        </motion.div>

        {/* 3 Feature Highlights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4"
        >
          <div className="p-5 rounded-2xl bg-white/5 border border-pink-500/20 backdrop-blur-md space-y-2 hover:border-pink-500/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center mx-auto text-pink-300">
              <Film className="w-5 h-5" />
            </div>
            <h4 className="font-serif-luxury font-bold text-base text-pink-100">35mm Film Strip</h4>
            <p className="text-xs text-pink-200/70 font-sans-luxury">Interactive rolling cinema reel of our favorite memory clips.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-pink-500/20 backdrop-blur-md space-y-2 hover:border-pink-500/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center mx-auto text-purple-300">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="font-serif-luxury font-bold text-base text-pink-100">Polaroid Treasury</h4>
            <p className="text-xs text-pink-200/70 font-sans-luxury">High-definition memories with dates, captions & zoom lightbox.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-pink-500/20 backdrop-blur-md space-y-2 hover:border-pink-500/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-300">
              <Heart className="w-5 h-5 fill-amber-300/30" />
            </div>
            <h4 className="font-serif-luxury font-bold text-base text-pink-100">Soundtrack Control</h4>
            <p className="text-xs text-pink-200/70 font-sans-luxury">Curated background music tailored for romantic nostalgia.</p>
          </div>
        </motion.div>

        {/* Grand Entry Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-6 flex flex-col items-center gap-3"
        >
          <div className="relative group inline-block">
            {/* Outer pulsing glowing aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#D946EF] rounded-full blur-xl opacity-80 group-hover:opacity-100 transition duration-500 animate-pulse" />

            <button
              onClick={handleGrandEntry}
              className="relative inline-flex items-center gap-3 px-10 sm:px-14 py-5 sm:py-6 rounded-full bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#D946EF] text-white font-sans-luxury font-extrabold text-lg sm:text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer overflow-hidden group border border-white/30"
            >
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '5s' }} />
              <span>Enter Our Memories Vault</span>
              <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />

              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </button>
          </div>

          <p className="text-xs sm:text-sm font-sans-luxury text-pink-200/70 tracking-wide flex items-center gap-1.5 animate-pulse">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Tap to open the main memory gallery & video film strip</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
