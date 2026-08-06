import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, X } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { RealGiftRevealSection } from './RealGiftRevealSection';

export const GiftBoxSection = ({ isBgMusicPlaying, setIsBgMusicPlaying }) => {
  const [isOpened, setIsOpened] = useState(false);
  const giftData = birthdayData.giftSurprise;
  const wasMusicPlayingRef = useRef(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Scroll detection: Pause bg music when video section is in view, resume when scrolled away
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !setIsBgMusicPlaying || !isOpened) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Video section is in viewport -> Pause background music & play gift video
          wasMusicPlayingRef.current = true;
          setIsBgMusicPlaying(false);
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          // Scrolled away from video section -> Resume background music & pause video
          if (wasMusicPlayingRef.current) {
            setIsBgMusicPlaying(true);
          }
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isOpened, setIsBgMusicPlaying]);

  const handleCloseGift = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsOpened(false);
    if (wasMusicPlayingRef.current && setIsBgMusicPlaying) {
      setIsBgMusicPlaying(true);
      wasMusicPlayingRef.current = false;
    }
  };

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
    <div className="w-full">
      <section id="gift" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center relative">
        {/* Section Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#F472B6]/40 text-xs font-sans-luxury text-[#9D174D]">
            <Gift className="w-4 h-4 text-[#EC4899]" />
            <span>Surprise Gift Box</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#701A40]">
            Your Surprise Gift Box
          </h2>
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
            </motion.div>
          ) : (
            /* Revealed Video Container (No Wordings) */
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-full max-w-xs sm:max-w-md mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-[#F472B6]/60 pink-glow relative aspect-[9/16] max-h-[75vh] flex items-center justify-center group"
            >
              {/* Close Video Button */}
              <button
                onClick={handleCloseGift}
                className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-[#EC4899] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all shadow-lg"
                title="Close video & re-seal box"
              >
                <X className="w-4 h-4" />
              </button>

              <video
                ref={videoRef}
                src={giftData?.videoUrl || "/videos/gift_video.mp4"}
                controls
                autoPlay
                loop
                playsInline
                onPlay={() => {
                  if (setIsBgMusicPlaying && isBgMusicPlaying) {
                    wasMusicPlayingRef.current = true;
                    setIsBgMusicPlaying(false);
                  }
                }}
                onPause={() => {
                  if (setIsBgMusicPlaying && wasMusicPlayingRef.current) {
                    setIsBgMusicPlaying(true);
                    wasMusicPlayingRef.current = false;
                  }
                }}
                onEnded={() => {
                  if (setIsBgMusicPlaying && wasMusicPlayingRef.current) {
                    setIsBgMusicPlaying(true);
                    wasMusicPlayingRef.current = false;
                  }
                }}
                className="w-full h-full object-contain rounded-3xl"
                onError={(e) => {
                  // Fallback to clip1.mp4 if gift_video.mp4 isn't present
                  if (!e.target.src.includes('clip1.mp4')) {
                    e.target.src = '/videos/clip1.mp4';
                  }
                }}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* The Real Gift Reveal Section ("One Last Surprise") */}
      <RealGiftRevealSection />
    </div>
  );
};
