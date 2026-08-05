import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const TimelineSection = () => {
  const events = birthdayData.timelineEvents;

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#F472B6]/40 text-xs font-sans-luxury text-[#9D174D]">
          <Clock className="w-4 h-4 text-[#EC4899]" />
          <span>Walk Down Memory Lane</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#701A40]">
          Our Journey Together
        </h2>
        <p className="font-sans-luxury text-base text-[#9D174D]">
          Every chapter with you is a cherished memory that shines brighter over time.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Glowing Pink Line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#F9A8D4] via-[#EC4899] to-[#F9A8D4] shadow-[0_0_12px_rgba(236,72,153,0.8)]" />

        {/* Timeline Events List */}
        <div className="space-y-16">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Glowing Center Node Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-[#FFF0F5] border-2 border-[#EC4899] flex items-center justify-center shadow-lg pink-glow">
                  <Sparkles className="w-4 h-4 text-[#EC4899]" />
                </div>

                {/* Content Card (Left or Right on desktop, aligned on mobile) */}
                <div className="w-full sm:w-[45%] pl-12 sm:pl-0">
                  <div className="p-5 sm:p-6 rounded-3xl glass-card border border-[#F472B6]/40 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
                    {/* Event Photo */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl mb-4 bg-slate-100">
                      <img
                        src={event.photoUrl}
                        alt={event.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-sans-luxury font-medium border border-white/20">
                        {event.date}
                      </div>
                    </div>

                    {/* Card Text */}
                    <h3 className="font-serif-luxury text-xl font-bold text-[#701A40] mb-2">
                      {event.title}
                    </h3>
                    <p className="font-sans-luxury text-sm text-[#9D174D] leading-relaxed">
                      {event.caption}
                    </p>
                  </div>
                </div>

                {/* Empty spacer for grid alignment */}
                <div className="hidden sm:block sm:w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
