import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Sun, Moon, Star, Shield, Music, Smile } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const ReasonsSection = () => {
  const reasons = birthdayData.reasonsList;

  // Icon mapper helper
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Smile': return <Smile className="w-6 h-6 text-[#EC4899]" />;
      case 'Heart': return <Heart className="w-6 h-6 text-[#EC4899] fill-[#EC4899]/20" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#F472B6]" />;
      case 'Sun': return <Sun className="w-6 h-6 text-[#EC4899]" />;
      case 'Music': return <Music className="w-6 h-6 text-[#EC4899]" />;
      case 'Shield': return <Shield className="w-6 h-6 text-[#F472B6]" />;
      case 'Moon': return <Moon className="w-6 h-6 text-[#EC4899]" />;
      case 'Star': return <Star className="w-6 h-6 text-[#EC4899] fill-[#EC4899]/20" />;
      default: return <Heart className="w-6 h-6 text-[#EC4899]" />;
    }
  };

  return (
    <section id="reasons" className="py-20 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#F472B6]/40 text-xs font-sans-luxury text-[#9D174D]">
          <Heart className="w-4 h-4 text-[#EC4899]" />
          <span>Countless Reasons</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#701A40]">
          Why You're Amazing
        </h2>
        <p className="font-sans-luxury text-base text-[#9D174D]">
          Just a few of the million wonderful qualities that make you so special.
        </p>
      </div>

      {/* Floating Animated Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8 }}
            className="p-6 rounded-3xl glass-card border border-[#F9A8D4] hover:border-[#EC4899] pink-glow-hover transition-all duration-300 flex flex-col items-start gap-4 group"
          >
            {/* Icon Bubble */}
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] border border-[#F472B6]/40 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              {getIcon(item.icon)}
            </div>

            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#701A40] mb-1 group-hover:text-[#EC4899] transition-colors">
                {item.title}
              </h3>
              <p className="font-sans-luxury text-xs text-[#9D174D] leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
