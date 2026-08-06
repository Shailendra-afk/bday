import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, Crown, Flower2 } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

// --- AURA COLOR PALETTES FOR ORBITING PARTICLES ---
const AURA_COLORS = [
  { primary: '#EC4899', glow: 'rgba(236, 72, 153, 0.95)', name: 'Pink Rose' },
  { primary: '#F59E0B', glow: 'rgba(245, 158, 11, 0.95)', name: 'Amber Gold' },
  { primary: '#A855F7', glow: 'rgba(168, 85, 247, 0.95)', name: 'Lavender' },
  { primary: '#3B82F6', glow: 'rgba(59, 130, 246, 0.95)', name: 'Azure' },
  { primary: '#D946EF', glow: 'rgba(217, 70, 239, 0.95)', name: 'Fuchsia' },
  { primary: '#10B981', glow: 'rgba(16, 185, 129, 0.95)', name: 'Emerald' },
  { primary: '#FB7185', glow: 'rgba(251, 113, 133, 0.95)', name: 'Coral' }
];

export const HerDigitalAuraSection = () => {
  const shades = birthdayData.shadesOfBeauty || [];
  const canvasRef = useRef(null);

  // --- STATE ---
  const [activePhoto, setActivePhoto] = useState(null);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

  // References for Performance Tracking & Render Loop
  const nodesRef = useRef([]);
  const ambientParticlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const hoveredPhotoRef = useRef(null);

  // Initialize Particle System & Orbit Nodes
  useEffect(() => {
    if (!shades.length) return;

    // Build Photo Orbit Nodes
    const loadedNodes = shades.map((shade, idx) => {
      const colorObj = AURA_COLORS[idx % AURA_COLORS.length];
      const img = new Image();
      img.src = shade.photoUrl;

      // Elliptical Orbit Parameters
      const orbitRadiusX = 180 + (idx % 4) * 45;
      const orbitRadiusY = 140 + (idx % 3) * 35;
      const speed = 0.0028 + (idx % 5) * 0.0009;
      const angle = (idx / shades.length) * Math.PI * 2;

      return {
        ...shade,
        img,
        colorObj,
        angle,
        speed,
        orbitRadiusX,
        orbitRadiusY,
        x: 0,
        y: 0,
        baseSize: 38,
        currentSize: 38,
        pulseOffset: idx * 0.8
      };
    });

    nodesRef.current = loadedNodes;

    // Build Ambient Cosmic Stardust & Butterfly Particles (60 particles)
    const specks = [];
    const particleColors = ['#EC4899', '#A855F7', '#38BDF8', '#F59E0B', '#F472B6', '#E879F9'];

    for (let i = 0; i < 60; i++) {
      specks.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.0018 + Math.random() * 0.0035,
        orbitRadiusX: 80 + Math.random() * 260,
        orbitRadiusY: 60 + Math.random() * 190,
        size: 1.5 + Math.random() * 3.5,
        color: particleColors[i % particleColors.length],
        alpha: 0.25 + Math.random() * 0.65,
        type: i % 4 === 0 ? 'star' : i % 5 === 0 ? 'butterfly' : 'speck'
      });
    }
    ambientParticlesRef.current = specks;
  }, [shades]);

  // Main 60 FPS Canvas Render Loop with Energy Laser Pulses & Harmonic Sway
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let lastHoveredId = null;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const mouse = mousePosRef.current;
      const time = performance.now() * 0.001;

      ctx.clearRect(0, 0, width, height);

      // 1. Multi-Layer Radial Aurora Glow Spheres
      const pulseScale = 1 + Math.sin(time * 1.8) * 0.08;

      const radialGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        30,
        centerX,
        centerY,
        290 * pulseScale
      );
      radialGrad.addColorStop(0, 'rgba(236, 72, 153, 0.45)');
      radialGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.3)');
      radialGrad.addColorStop(0.7, 'rgba(245, 158, 11, 0.15)');
      radialGrad.addColorStop(1, 'rgba(9, 5, 16, 0)');

      ctx.save();
      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 290 * pulseScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Draw Cosmic Specks & Floating Butterflies
      ambientParticlesRef.current.forEach((speck) => {
        speck.angle += speck.speed;
        const px = centerX + Math.cos(speck.angle) * speck.orbitRadiusX;
        const py = centerY + Math.sin(speck.angle) * speck.orbitRadiusY + Math.sin(time * 2 + speck.angle) * 8;

        ctx.save();
        ctx.fillStyle = speck.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = speck.color;
        ctx.globalAlpha = speck.alpha;

        if (speck.type === 'star') {
          ctx.fillRect(px - speck.size / 2, py - speck.size / 2, speck.size, speck.size);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, speck.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // 3. Update & Draw Photo Nodes with Laser Pulse Energy Threads
      let currentHoveredCandidate = null;

      nodesRef.current.forEach((node) => {
        node.angle += node.speed;
        // Harmonic Floating Sway
        const swayY = Math.sin(time * 2 + node.pulseOffset) * 12;
        let targetX = centerX + Math.cos(node.angle) * node.orbitRadiusX;
        let targetY = centerY + Math.sin(node.angle) * node.orbitRadiusY + swayY;

        const dx = mouse.x - targetX;
        const dy = mouse.y - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let isNearMouse = dist < 120;

        if (isNearMouse) {
          currentHoveredCandidate = node;
          targetX += (mouse.x - targetX) * 0.22;
          targetY += (mouse.y - targetY) * 0.22;
          node.currentSize += (60 - node.currentSize) * 0.22;
        } else {
          node.currentSize += (node.baseSize - node.currentSize) * 0.2;
        }

        node.x = targetX;
        node.y = targetY;

        // Laser Energy Thread
        ctx.save();
        ctx.strokeStyle = node.colorObj.glow;
        ctx.lineWidth = isNearMouse ? 2.2 : 0.8;
        ctx.globalAlpha = isNearMouse ? 0.9 : 0.25;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
        ctx.restore();

        // Traveling Light Energy Pulse Speck along Thread
        const pulseProg = (time * 1.5 + node.pulseOffset) % 1.0;
        const pulseX = centerX + (node.x - centerX) * pulseProg;
        const pulseY = centerY + (node.y - centerY) * pulseProg;

        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.colorObj.primary;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Photo Gem Container
        ctx.save();
        // Outer Glowing Color Ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.currentSize / 2 + 4, 0, Math.PI * 2);
        ctx.fillStyle = node.colorObj.primary;
        ctx.shadowBlur = 20;
        ctx.shadowColor = node.colorObj.primary;
        ctx.fill();

        // Inner Photo Clip
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.currentSize / 2, 0, Math.PI * 2);
        ctx.clip();

        if (node.img.complete && node.img.naturalWidth > 0) {
          ctx.drawImage(
            node.img,
            node.x - node.currentSize / 2,
            node.y - node.currentSize / 2,
            node.currentSize,
            node.currentSize
          );
        } else {
          ctx.fillStyle = node.colorObj.primary;
          ctx.fill();
        }
        ctx.restore();
      });

      // Update Hovered State
      const currentId = currentHoveredCandidate ? currentHoveredCandidate.id : null;
      if (currentId !== lastHoveredId) {
        lastHoveredId = currentId;
        hoveredPhotoRef.current = currentHoveredCandidate;
        setHoveredPhoto(currentHoveredCandidate);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [shades]);

  // Track Mouse Movement
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 };
    if (hoveredPhotoRef.current) {
      hoveredPhotoRef.current = null;
      setHoveredPhoto(null);
    }
  };

  // Canvas Click / Tap Handler
  const handleCanvasClick = () => {
    if (hoveredPhoto) {
      setActivePhoto(hoveredPhoto);
    }
  };

  return (
    <section
      id="aura"
      className="py-20 px-4 sm:px-8 max-w-6xl mx-auto relative select-none overflow-hidden my-6"
    >
      <style>{`
        @keyframes titleGlowShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .title-shimmer-text {
          background-size: 200% auto;
          animation: titleGlowShimmer 6s ease infinite;
        }
      `}</style>

      {/* IMMERSIVE DARK CELESTIAL BLOOM CONTAINER */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
        className="relative w-full rounded-3xl min-h-[700px] sm:min-h-[780px] bg-gradient-to-b from-[#0B0418] via-[#16082B] via-[#0D041A] to-[#070212] border-2 border-[#F472B6]/40 shadow-[0_0_120px_rgba(236,72,153,0.3)] overflow-hidden cursor-crosshair flex items-center justify-center"
      >
        {/* Starry Night Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #FFFFFF, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 90px 40px, #EC4899, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 180px, #F59E0B, rgba(0,0,0,0))`,
            backgroundSize: '260px 260px'
          }}
        />

        {/* TOP TITLE HEADER */}
        <div className="absolute top-8 inset-x-0 z-20 text-center pointer-events-none px-4">
          <h2 className="font-serif-luxury text-4xl sm:text-6xl font-extrabold tracking-tight title-shimmer-text bg-gradient-to-r from-pink-300 via-purple-300 via-amber-200 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(236,72,153,0.85)]">
            Celestial Bloom
          </h2>
        </div>

        {/* 60 FPS INTERACTIVE CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10"
        />

        {/* CENTERPIECE ARTISTIC SILHOUETTE PROFILE CONTOUR WITH ANIMATED RINGS */}
        <div className="relative z-15 flex flex-col items-center justify-center pointer-events-none select-none">

          {/* Rotating Outer Energy Rings */}
          <div className="absolute w-72 h-88 sm:w-96 sm:h-[440px] rounded-full border-2 border-dashed border-pink-400/40 animate-spin pointer-events-none" style={{ animationDuration: '24s' }} />
          <div className="absolute w-80 h-96 sm:w-[420px] sm:h-[480px] rounded-full border border-dashed border-purple-400/30 animate-spin pointer-events-none" style={{ animationDuration: '32s', animationDirection: 'reverse' }} />

          {/* Silhouette Radial Glow */}
          <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-radial from-pink-500/40 via-purple-500/25 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />

          {/* ARTISTIC PORTRAIT SILHOUETTE FRAME */}
          <div className="relative w-56 h-72 sm:w-68 sm:h-88 rounded-full overflow-hidden flex items-center justify-center border-4 border-pink-400/60 shadow-[0_0_80px_rgba(236,72,153,0.7)] bg-gradient-to-b from-[#1C0D2E]/90 via-[#2A1138]/90 to-[#0F0518]/90 backdrop-blur-md">
            {/* Real Centerpiece Video Loop Overlay */}
            <video
              src={birthdayData.auraVideoUrl || "/videos/clip1.mp4"}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90 filter brightness-115 contrast-125 saturate-150 drop-shadow-[0_0_40px_rgba(236,72,153,0.95)] transform scale-105"
            />

            {/* Glowing Contour Overlay Tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090510] via-pink-500/20 to-purple-500/30 pointer-events-none mix-blend-color-dodge" />

            {/* Crown Emblem */}
            <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
              <Crown className="w-6 h-6 text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] animate-bounce" />
            </div>
          </div>
        </div>

        {/* HOVER TOOLTIP HINT */}
        <AnimatePresence>
          {hoveredPhoto && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              style={{
                position: 'absolute',
                left: hoveredPhoto.x,
                top: hoveredPhoto.y - 48,
                transform: 'translateX(-50%)',
                zIndex: 30
              }}
              className="pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-pink-400/60 text-xs font-sans-luxury font-bold text-[#701A40] shadow-2xl flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>{hoveredPhoto.title}</span>
              <span className="text-[10px] text-pink-700/70 font-normal">(Tap to Expand)</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FULLSCREEN LUXURY LIGHTBOX MODAL - PHOTO & DESCRIPTION */}
      <AnimatePresence>
        {activePhoto && (
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[88vh] rounded-3xl p-4 sm:p-6 bg-[#140A21]/95 backdrop-blur-2xl border-2 border-pink-400/50 shadow-[0_0_100px_rgba(236,72,153,0.5)] overflow-hidden flex flex-col items-center justify-center space-y-3"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20 shadow-xl cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Res Photo Display */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black max-h-[72vh]">
                <img
                  src={activePhoto.photoUrl}
                  alt={activePhoto.title || "Photo View"}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl select-none"
                />
              </div>

              {/* Photo Title */}
              {activePhoto.title && (
                <div className="w-full text-center px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-pink-200">
                    {activePhoto.title}
                  </h3>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
