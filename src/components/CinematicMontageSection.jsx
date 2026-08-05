import React from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const CinematicMontageSection = () => {
  const clips = birthdayData.cinematicClips || [];

  if (!clips.length) return null;

  return (
    <section id="cinematic-montage" className="w-full bg-black py-12 px-0 relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      {/* Section Title */}
      <div className="text-center max-w-xl mx-auto px-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#F472B6]/40 text-xs font-sans-luxury text-[#9D174D] mb-3">
          <Film className="w-4 h-4 text-[#EC4899]" />
          <span>Cinemas</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Your Favorite Cinemas
        </h2>
      </div>

      {/* Broad Full-Bleed Vertical Video Stack (Touches Screen Edges) */}
      <div className="space-y-10 w-full">
        {clips.map((clip, index) => (
          <motion.div
            key={clip.id || index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full h-[75vh] sm:h-[88vh] lg:h-screen bg-black border-y border-white/15 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Broad Full-Screen Edge-to-Edge Video */}
            <video
              src={clip.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              className="w-full h-full object-cover pointer-events-none select-none"
            />

            {/* Minimal Cinema Name Badge Overlay (Top Left, Full-Bleed Edge Offset) */}
            {clip.title && (
              <div className="absolute top-6 left-6 sm:left-12 z-20 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/25 shadow-2xl text-xs sm:text-sm font-serif-luxury font-medium tracking-wide text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] animate-pulse" />
                <span>{clip.title}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CinematicMontageSection;
