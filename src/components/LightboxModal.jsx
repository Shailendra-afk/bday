import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export const LightboxModal = ({ photo, photos, onClose, onNavigate }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : 0;

  const handlePrev = () => {
    if (!photo) return;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(photos[prevIndex]);
  };

  const handleNext = () => {
    if (!photo) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    onNavigate(photos[nextIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, currentIndex, photos, onClose]);

  if (!photo) return null;

  // Touch Swipe Handlers for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md hidden sm:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md hidden sm:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Polaroid Card Content */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative z-40 max-w-xl w-full bg-[#FFF0F5] rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-[#F472B6]/60 pink-glow overflow-hidden"
        >
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-xl bg-[#FCE7F0] max-h-[60vh] flex items-center justify-center">
            <img
              src={photo.photoUrl}
              alt={photo.title}
              className="w-full h-full object-contain max-h-[60vh]"
            />
          </div>

          {/* Caption Area */}
          <div className="mt-4 text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-[#EC4899] fill-[#EC4899]" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#701A40]">
                {photo.title}
              </h3>
            </div>
            <p className="font-script-luxury text-xl text-[#9D174D] italic">
              "{photo.caption}"
            </p>
            <p className="font-sans-luxury text-xs text-[#EC4899] uppercase tracking-wider font-semibold">
              {photo.date || 'Cherished Memory'} • {currentIndex + 1} of {photos.length}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
