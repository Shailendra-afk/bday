import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { LightboxModal } from './LightboxModal';

export const GallerySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = birthdayData.galleryPhotos;

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#F472B6]/40 text-xs font-sans-luxury text-[#9D174D]">
          <Camera className="w-4 h-4 text-[#EC4899]" />
          <span>Scrapbook of Memories</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#701A40]">
          Our Favorite Moments
        </h2>
        <p className="font-sans-luxury text-base text-[#9D174D]">
          Every picture holds a timeless story. Click on any photo to take a closer look into our memories together.
        </p>
      </div>

      {/* Grid Layout: Mobile 1 col, Tablet 2 col, Desktop 4 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {photos.map((photo, index) => {
          // Slight alternating rotation for realistic polaroid scrapbook feel
          const rotationDegree = index % 2 === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0';

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`group cursor-pointer bg-[#FFF0F5] rounded-2xl p-3 sm:p-4 shadow-lg border border-[#F9A8D4] hover:border-[#EC4899] pink-glow-hover transition-all duration-500 transform ${rotationDegree} hover:scale-105 hover:z-20`}
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#FCE7F0] mb-3 flex items-center justify-center">
                <img
                  src={photo.photoUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-sans-luxury flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#F472B6]" /> View Full View
                  </span>
                </div>
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="text-center pt-1 pb-2">
                <h3 className="font-serif-luxury font-bold text-base text-[#701A40] truncate">
                  {photo.title}
                </h3>
                <p className="font-script-luxury text-lg text-[#9D174D] truncate pt-0.5">
                  "{photo.caption}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <LightboxModal
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={(nextPhoto) => setSelectedPhoto(nextPhoto)}
        />
      )}
    </section>
  );
};
