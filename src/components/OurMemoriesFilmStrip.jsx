import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  ChevronLeft,
  ChevronRight,
  Disc,
  RotateCw
} from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const OurMemoriesFilmStrip = ({ isBgMusicPlaying, setIsBgMusicPlaying, setCurrentTrack }) => {
  const videos = birthdayData.ourMemoriesVideos || [];
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  // Rolling Camera Reel state
  const [isRolling, setIsRolling] = useState(true);

  // Fullscreen video state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);

  // Mouse spotlight position tracking
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const modalContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const wasMusicPlayingRef = useRef(false);

  const currentIndex = selectedVideo
    ? videos.findIndex((v) => v.id === selectedVideo.id)
    : 0;

  // Track switching when entering/exiting Our Memories section
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || !setCurrentTrack) return;

    const memoriesTrack = birthdayData.memoriesMusic || birthdayData.music;
    const defaultTrack = birthdayData.music;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setCurrentTrack(memoriesTrack);
        } else {
          setCurrentTrack(defaultTrack);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, [setCurrentTrack]);

  // Handle video modal open/close background music pause & resume
  useEffect(() => {
    if (!setIsBgMusicPlaying) return;

    if (selectedVideo) {
      if (isBgMusicPlaying) {
        wasMusicPlayingRef.current = true;
        setIsBgMusicPlaying(false);
      }
    } else if (wasMusicPlayingRef.current) {
      setIsBgMusicPlaying(true);
      wasMusicPlayingRef.current = false;
    }
  }, [selectedVideo, setIsBgMusicPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePrevClip = () => {
    if (!videos.length) return;
    setDirection(-1);
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setSelectedVideo(videos[prevIndex]);
  };

  const handleNextClip = () => {
    if (!videos.length) return;
    setDirection(1);
    const nextIndex = (currentIndex + 1) % videos.length;
    setSelectedVideo(videos[nextIndex]);
  };

  // Track mouse move for dynamic section spotlight
  const handleMouseMoveSection = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Keyboard controls listener (Space to play/pause, Left/Right for Prev/Next clip)
  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevClip();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextClip();
      } else if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo, isPlaying, currentIndex]);

  // Handle controls auto-hide timer
  useEffect(() => {
    if (!selectedVideo) return;

    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 2500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [selectedVideo, isPlaying]);

  // Video autoplay when opened or switched
  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      setIsPlaying(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsMuted(true);
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  }, [selectedVideo]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const toggleFullscreen = () => {
    if (!modalContainerRef.current) return;

    if (!document.fullscreenElement) {
      modalContainerRef.current.requestFullscreen?.().then(() => {
        setIsFullscreenMode(true);
      }).catch((err) => console.error(err));
    } else {
      document.exitFullscreen?.().then(() => {
        setIsFullscreenMode(false);
      }).catch((err) => console.error(err));
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!videos.length) return null;

  // Tripled video list for seamless infinite rolling loop
  const displayVideos = [...videos, ...videos, ...videos];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : dir < 0 ? '-100%' : '0%',
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)'
    }),
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : dir < 0 ? '100%' : '0%',
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)'
    })
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      onMouseMove={handleMouseMoveSection}
      className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#070709] py-16 sm:py-24 text-white overflow-hidden select-none"
    >
      {/* Subtle Analog Film Grain Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Dynamic Mouse Spotlight Beam Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(236, 72, 153, 0.12), transparent 80%)`
        }}
      />

      {/* Vintage Cinema Projector Light Cone Beam from Top Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] pointer-events-none z-0 opacity-25 bg-gradient-to-b from-white/20 via-[#F472B6]/10 to-transparent clip-polygon animate-pulse" style={{ clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)' }} />

      {/* Spinning Vintage 35mm Reel Icons (Top Left & Top Right) */}
      <div className="absolute top-6 left-6 sm:left-12 opacity-15 pointer-events-none z-10 flex items-center gap-2">
        <Disc className="w-16 h-16 sm:w-24 sm:h-24 text-white animate-spin" style={{ animationDuration: '25s' }} />
      </div>
      <div className="absolute top-6 right-6 sm:right-12 opacity-15 pointer-events-none z-10 flex items-center gap-2">
        <Disc className="w-16 h-16 sm:w-24 sm:h-24 text-white animate-spin" style={{ animationDuration: '25s' }} />
      </div>

      {/* Floating Dust Bokeh Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 7) % 100}%`,
              y: '110%',
              opacity: 0.1,
              scale: 0.5
            }}
            animate={{
              y: '-10%',
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 12 + (i % 8) * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.7
            }}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#F472B6] to-[#FCE7F0] blur-[1px]"
          />
        ))}
      </div>

      <div className="relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto px-4 mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-sans-luxury text-[#F472B6] mb-4 shadow-lg">
            <Film className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>35mm Rolling Camera Collection</span>
            <button
              onClick={() => setIsRolling(!isRolling)}
              className="ml-1 p-1 rounded-full bg-white/10 hover:bg-[#EC4899] text-white transition-colors"
              title={isRolling ? "Pause Roll" : "Play Roll"}
            >
              <RotateCw className={`w-3 h-3 ${isRolling ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            </button>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Our Memories
          </h2>
          <p className="font-sans-luxury text-sm sm:text-base text-white/70 mt-3 max-w-lg mx-auto">
            Click on any clip to watch it individually in fullscreen view.
          </p>
          <div className="mt-4 h-0.5 w-16 mx-auto bg-gradient-to-r from-transparent via-[#EC4899] to-transparent rounded-full" />
        </motion.div>

        {/* Vintage 35mm Infinite Rolling Film Reel Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          onMouseEnter={() => setIsRolling(false)}
          onMouseLeave={() => setIsRolling(true)}
          className="w-full relative py-6 bg-[#111115] border-y border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
        >
          {/* Top Sprocket Perforations Rail */}
          <div className="w-full h-8 bg-[#0a0a0d] border-b border-white/10 flex items-center justify-between px-3 overflow-hidden select-none">
            <div className="flex items-center gap-6 sm:gap-8 w-full justify-between">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-4 h-2.5 rounded-[2px] bg-black border border-white/10 shadow-inner" />
                  <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                    {i % 2 === 0 ? `KODAK 35mm` : `▶ 0${(i % 7) + 1}A`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Infinite Rolling Horizontal Track */}
          <div className="w-full overflow-hidden py-6">
            <motion.div
              animate={isRolling ? { x: ['0%', '-33.3333%'] } : {}}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 48,
                  ease: 'linear'
                }
              }}
              className="flex gap-4 sm:gap-6 md:gap-8 px-6 w-max"
            >
              {displayVideos.map((video, index) => {
                const originalIndex = index % videos.length;
                return (
                  <motion.div
                    key={`${video.id}-${index}`}
                    layoutId={index < videos.length ? `film-frame-${video.id}` : undefined}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setDirection(0);
                      setSelectedVideo(video);
                    }}
                    className="w-[280px] sm:w-[380px] md:w-[450px] aspect-[16/10] flex-shrink-0 snap-center relative rounded-lg overflow-hidden bg-black cursor-pointer group border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_40px_rgba(236,72,153,0.3)] transition-all duration-500"
                  >
                    {/* Vintage Frame Rim Highlight */}
                    <div className="absolute inset-0 border border-white/10 rounded-lg z-20 pointer-events-none group-hover:border-[#EC4899]/50 transition-colors duration-500" />

                    {/* Video Preview Canvas (Pre-playing loop inside roll!) */}
                    <video
                      src={video.videoUrl}
                      preload="metadata"
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {/* Glass Reflective Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-white/10 opacity-70 group-hover:opacity-30 transition-opacity duration-500 z-10" />

                    {/* Subtle Hover Play Badge */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#EC4899] group-hover:border-[#F472B6] transition-all duration-300 shadow-2xl">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Vintage Frame Index Corner Stamp */}
                    <div className="absolute bottom-2 right-3 z-20 text-[10px] font-mono text-white/50 tracking-wider">
                      #{String(originalIndex + 1).padStart(2, '0')}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Sprocket Perforations Rail */}
          <div className="w-full h-8 bg-[#0a0a0d] border-t border-white/10 flex items-center justify-between px-3 overflow-hidden select-none">
            <div className="flex items-center gap-6 sm:gap-8 w-full justify-between">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-4 h-2.5 rounded-[2px] bg-black border border-white/10 shadow-inner" />
                  <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                    {i % 2 === 0 ? `SAFETY FILM` : `SAFETY FILM`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Expanded Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#07070a]/92 backdrop-blur-3xl p-3 sm:p-6 md:p-10 overflow-hidden"
          >
            {/* Dynamic Ambilight Video Aura Glow in Background */}
            <video
              key={`ambient-${selectedVideo.id}`}
              src={selectedVideo.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter blur-[100px] opacity-45 scale-125 pointer-events-none select-none transition-all duration-700 z-0"
            />

            {/* Vintage Cinema Backdrop Vignette & Ambient Gradient */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

            {/* Floating Bokeh Stars & Particles in Modal Void */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: `${(i * 6.5) % 100}%`,
                    y: '105%',
                    opacity: 0.2
                  }}
                  animate={{
                    y: '-10%',
                    opacity: [0.2, 0.7, 0.2],
                    scale: [0.6, 1.4, 0.6]
                  }}
                  transition={{
                    duration: 7 + (i % 5) * 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.4
                  }}
                  className="absolute w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#FBCFE8] blur-[2px]"
                />
              ))}
            </div>

            {/* Top Ambient Badge in Modal Void */}
            <div className="absolute top-5 left-6 sm:left-10 z-40 flex items-center gap-3 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899] animate-ping" />
              <span className="text-xs sm:text-sm font-serif-luxury font-medium tracking-wide text-white/90 bg-black/60 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-2xl">
                Our Memories • Clip {currentIndex + 1} of {videos.length}
              </span>
            </div>

            {/* Camera Flash Burst Effect on Open */}
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 bg-white pointer-events-none z-50"
            />

            {/* Main Expanded Video Player Box */}
            <motion.div
              ref={modalContainerRef}
              layoutId={`film-frame-${selectedVideo.id}`}
              className="relative w-full max-w-6xl aspect-video max-h-[82vh] bg-black rounded-2xl overflow-hidden shadow-[0_0_120px_rgba(236,72,153,0.4)] border border-white/20 flex items-center justify-center group z-30"
            >
              {/* Animated Video Clip Transition */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={selectedVideo.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 280, damping: 28 },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.25 },
                    filter: { duration: 0.25 }
                  }}
                  className="w-full h-full flex items-center justify-center relative"
                >
                  {/* Vintage Film Lens Flash Effect on Slide Change */}
                  <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent pointer-events-none z-20"
                  />

                  <video
                    ref={videoRef}
                    src={selectedVideo.videoUrl}
                    playsInline
                    autoPlay
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleNextClip}
                    onClick={togglePlay}
                    className="w-full h-full object-contain bg-black cursor-pointer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#EC4899] hover:border-[#F472B6] transition-all backdrop-blur-md shadow-xl"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Previous / Next Side Floating Arrows (Overlay) */}
              <AnimatePresence>
                {showControls && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      onClick={handlePrevClip}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#EC4899] transition-all backdrop-blur-md shadow-2xl"
                      aria-label="Previous clip"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onClick={handleNextClip}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#EC4899] transition-all backdrop-blur-md shadow-2xl"
                      aria-label="Next clip"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              {/* Custom Minimal Controls Overlay */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-x-0 bottom-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2.5 backdrop-blur-sm pointer-events-auto"
                  >
                    {/* Scrubbable Progress Timeline */}
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-xs font-mono text-white/80 min-w-[36px] text-right">
                        {formatTime(currentTime)}
                      </span>
                      <div className="relative flex-1 flex items-center">
                        <input
                          type="range"
                          min={0}
                          max={duration || 100}
                          step={0.1}
                          value={currentTime}
                          onChange={handleSeek}
                          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#EC4899] focus:outline-none"
                        />
                      </div>
                      <span className="text-xs font-mono text-white/60 min-w-[36px]">
                        {formatTime(duration)}
                      </span>
                    </div>

                    {/* Controls Toolbar: Play/Pause, Prev/Next, Volume, Fullscreen */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Left: Prev / Play / Pause / Next */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={handlePrevClip}
                          className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
                          title="Previous clip (Left Arrow)"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={togglePlay}
                          className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-[#EC4899] border border-white/10 transition-colors text-white"
                          title="Play / Pause (Spacebar)"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5 fill-[#EC4899]" />
                          ) : (
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          )}
                        </button>
                        <button
                          onClick={handleNextClip}
                          className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
                          title="Next clip (Right Arrow)"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Volume Control */}
                        <div className="flex items-center gap-2 ml-2 sm:ml-4">
                          <button
                            onClick={toggleMute}
                            className="p-1.5 rounded-full text-white/80 hover:text-white transition-colors"
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="w-5 h-5 text-red-400" />
                            ) : (
                              <Volume2 className="w-5 h-5" />
                            )}
                          </button>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-16 sm:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#EC4899]"
                          />
                        </div>
                      </div>

                      {/* Right: Fullscreen Toggle & Clip Index Counter */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-white/60 hidden sm:inline">
                          {currentIndex + 1} / {videos.length}
                        </span>
                        <button
                          onClick={toggleFullscreen}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
                        >
                          {isFullscreenMode ? (
                            <Minimize className="w-4 h-4" />
                          ) : (
                            <Maximize className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurMemoriesFilmStrip;
