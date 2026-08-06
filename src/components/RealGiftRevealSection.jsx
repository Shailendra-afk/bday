import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';

export const RealGiftRevealSection = () => {
  const giftData = birthdayData.giftSurprise || {};
  const photoUrl = giftData.realGiftPhotoUrl || '/photos/real_gift.png';
  const title = giftData.title || 'One Last Surprise';
  const lines = giftData.lines || [
    'The laughter was only the beginning...',
    "This isn't just a picture.",
    "It's waiting for you in the real world."
  ];
  const badgeText = giftData.badge || '🎁 Reserved Especially for You';

  // Unwrapping state: 'sealed' | 'untying' | 'blooming' | 'revealed'
  const [revealState, setRevealState] = useState('sealed');
  const isRevealed = revealState === 'revealed';

  // Parallax & Cursor state
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Particle Canvas & Mouse Sparkles Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle seeds
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * 0.05 + 0.02,
      color: Math.random() > 0.4 ? 'rgba(251, 207, 232, ' : 'rgba(254, 240, 138, '
    }));

    // Orbiting butterflies
    const butterflies = Array.from({ length: 5 }, (_, i) => ({
      angle: (i * Math.PI * 2) / 5,
      radiusX: 140 + Math.random() * 60,
      radiusY: 50 + Math.random() * 30,
      speed: 0.015 + Math.random() * 0.01,
      size: 14 + Math.random() * 6,
      flapSpeed: 0.15 + Math.random() * 0.1,
      flap: 0
    }));

    // Cursor sparkles array
    let cursorSparkles = [];

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Mouse parallax normalization (-1 to 1)
      const normX = (x / canvas.width - 0.5) * 2;
      const normY = (y / canvas.height - 0.5) * 2;
      setMousePos({ x: normX, y: normY, rawX: x, rawY: y });

      // Add cursor trail sparkle
      if (Math.random() > 0.3) {
        cursorSparkles.push({
          x,
          y,
          size: Math.random() * 4 + 2,
          life: 1,
          color: Math.random() > 0.5 ? '#FBCFE8' : '#FDE047'
        });
        if (cursorSparkles.length > 25) cursorSparkles.shift();
      }
    };

    const parent = canvas.parentElement;
    if (parent) parent.addEventListener('pointermove', handlePointerMove);

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.42;

      // Draw warm center spotlight glow
      const spotGrad = ctx.createRadialGradient(
        centerX, centerY, 10,
        centerX, centerY, canvas.width * 0.45
      );
      spotGrad.addColorStop(0, 'rgba(251, 207, 232, 0.14)');
      spotGrad.addColorStop(0.5, 'rgba(244, 114, 182, 0.05)');
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render floating golden dust & particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(tick * 0.02 + p.size) * 0.5;
        p.opacity += Math.sin(tick * p.pulse) * 0.01;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const alpha = Math.max(0.1, Math.min(0.9, p.opacity));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(251, 207, 232, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render orbiting glowing butterflies
      butterflies.forEach((b) => {
        b.angle += b.speed;
        b.flap += b.flapSpeed;
        const bx = centerX + Math.cos(b.angle) * b.radiusX;
        const by = centerY + Math.sin(b.angle) * b.radiusY - 20;

        ctx.save();
        ctx.translate(bx, by);
        const wingScale = Math.abs(Math.sin(b.flap));
        
        // Butterfly glow & body
        ctx.fillStyle = 'rgba(251, 207, 232, 0.9)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#EC4899';

        // Left Wing
        ctx.beginPath();
        ctx.ellipse(-b.size * 0.4 * wingScale, 0, b.size * 0.5 * wingScale, b.size * 0.7, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        // Right Wing
        ctx.beginPath();
        ctx.ellipse(b.size * 0.4 * wingScale, 0, b.size * 0.5 * wingScale, b.size * 0.7, -Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Render cursor sparkles trail
      cursorSparkles.forEach((s) => {
        s.life -= 0.03;
        s.y += 0.3;
        if (s.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      cursorSparkles = cursorSparkles.filter(s => s.life > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (parent) parent.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // Handle Box Trigger / Untying / Blooming Sequence
  const handleOpenRealGift = () => {
    if (revealState !== 'sealed') return;

    setRevealState('untying');

    // Trigger initial sparkle burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#FDE047', '#F472B6', '#FBCFE8', '#FFF0F5']
      });
    } catch (e) {}

    // Phase 2: Blooming light explosion
    setTimeout(() => {
      setRevealState('blooming');

      try {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FDE047', '#EC4899', '#FFF', '#F472B6']
        });
      } catch (e) {}
    }, 900);

    // Phase 3: Final Photo Rising & Revealed State
    setTimeout(() => {
      setRevealState('revealed');
    }, 1800);
  };

  // Touch Ripple Handler for Mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (!touch || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev.slice(-4), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="real-gift-reveal"
      onTouchStart={handleTouchStart}
      className="relative min-h-[900px] py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#060205] via-[#160814] to-[#0a0308] text-white flex flex-col items-center justify-center selection:bg-[#EC4899] selection:text-white"
    >
      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-90"
      />

      {/* Mobile Touch Ripples Overlay */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{ left: ripple.x, top: ripple.y }}
          className="absolute w-24 h-24 -ml-12 -mt-12 rounded-full bg-[#F472B6]/30 border border-[#FDE047]/60 animate-ping pointer-events-none z-20"
        />
      ))}

      {/* Background Radial Light Rays & Shimmer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#EC4899]/20 via-[#F472B6]/15 to-[#FDE047]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FDE047]/10 rounded-full blur-[90px]" />
      </div>

      {/* Golden Light Bloom Explosion Overlay */}
      <AnimatePresence>
        {revealState === 'blooming' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 2.5 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-40 inset-0 m-auto w-96 h-96 rounded-full bg-radial from-[#FFFBEB] via-[#FDE047]/80 to-transparent blur-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main Content Container with Mouse Parallax */}
      <motion.div
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 4}deg) rotateX(${-mousePos.y * 4}deg)`
        }}
        className="relative z-30 w-full max-w-4xl mx-auto flex flex-col items-center text-center transition-transform duration-300 ease-out"
      >
        {/* Floating Pedestal Base */}
        <div className="relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px] w-full my-6">
          
          {/* Circular Glass & Marble Pedestal */}
          <div className="absolute bottom-6 w-72 sm:w-96 h-16 rounded-[100%] bg-gradient-to-r from-[#F472B6]/30 via-[#FFF0F5]/40 to-[#F472B6]/30 backdrop-blur-xl border border-white/30 shadow-[0_20px_50px_rgba(236,72,153,0.3)] flex items-center justify-center">
            {/* Pedestal Inner Glow Ring */}
            <div className="w-full h-full rounded-[100%] bg-radial from-[#FDE047]/40 to-transparent blur-sm animate-pulse" />
          </div>

          {/* Pedestal Bottom Shadow */}
          <div className="absolute bottom-2 w-80 sm:w-[420px] h-10 rounded-[100%] bg-black/60 blur-md pointer-events-none" />

          {/* ============================================================== */}
          {/* 3D BLUSH PINK LUXURY GIFT BOX (Floating & Levitating)          */}
          {/* ============================================================== */}
          {!isRevealed && (
            <motion.div
              onClick={handleOpenRealGift}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={{
                y: revealState === 'sealed' ? [0, -14, 0] : [0, -4, 0],
                rotate: revealState === 'sealed' ? [-1.5, 1.5, -1.5] : 0,
                scale: isHovered && revealState === 'sealed' ? 1.06 : 1
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 0.3 }
              }}
              className="cursor-pointer relative z-30 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center group select-none"
            >
              {/* Box Glow Aura */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#EC4899] via-[#F472B6] to-[#FDE047] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* 3D Box Main Body */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#FBCFE8] via-[#F472B6] to-[#DB2777] rounded-3xl shadow-[0_25px_60px_rgba(219,39,119,0.5)] border-2 border-[#FFF0F5]/60 overflow-hidden flex items-center justify-center">
                
                {/* Embossed Floral Pattern Overlay */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(#FFF 1.5px, transparent 1.5px), radial-gradient(#FFF 1.5px, #F472B6 1.5px)`,
                    backgroundSize: `30px 30px`,
                    backgroundPosition: `0 0, 15px 15px`
                  }}
                />

                {/* Vertical Satin Ribbon */}
                <motion.div
                  animate={
                    revealState === 'untying' || revealState === 'blooming'
                      ? { x: -140, opacity: 0, rotate: -20 }
                      : { x: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.7 }}
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-[#9D174D] via-[#F472B6] to-[#9D174D] border-x border-[#FDE047]/60 shadow-lg z-10"
                />

                {/* Horizontal Satin Ribbon */}
                <motion.div
                  animate={
                    revealState === 'untying' || revealState === 'blooming'
                      ? { y: 140, opacity: 0, rotate: 20 }
                      : { y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.7 }}
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-12 bg-gradient-to-b from-[#9D174D] via-[#F472B6] to-[#9D174D] border-y border-[#FDE047]/60 shadow-lg z-10"
                />

                {/* Box Lid (Lifts upward & tilts on reveal) */}
                <motion.div
                  animate={
                    revealState === 'untying'
                      ? { y: -30, rotateX: -15 }
                      : revealState === 'blooming'
                      ? { y: -120, rotateX: -45, opacity: 0, scale: 1.15 }
                      : { y: 0, rotateX: 0 }
                  }
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#FBCFE8] via-[#F472B6] to-[#BE185D] rounded-t-3xl border-b-2 border-[#FDE047]/60 shadow-xl z-20 flex items-center justify-center"
                >
                  {/* Luxury Ribbon Bow Center */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFF0F5] via-[#FDE047] to-[#F472B6] border-2 border-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Gift className="w-8 h-8 text-[#831843] animate-pulse" />
                  </div>
                </motion.div>

                {/* Inside Golden Rays (Visible when opening) */}
                {(revealState === 'untying' || revealState === 'blooming') && (
                  <div className="absolute inset-0 bg-radial from-[#FFFBEB] via-[#FDE047] to-transparent animate-pulse z-0" />
                )}

                {/* Click Instruction Label */}
                {revealState === 'sealed' && (
                  <div className="absolute bottom-4 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-[11px] font-sans-luxury text-[#FDE047] font-medium tracking-wider flex items-center gap-1.5 shadow-lg group-hover:bg-[#EC4899] group-hover:text-white transition-colors">
                    <Sparkles className="w-3 h-3 text-[#FDE047] animate-spin" />
                    <span>Click to Unwrap Real Gift</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* REVEALED PHOTO IN PREMIUM FLOATING CRYSTAL GLASS FRAME          */}
          {/* ============================================================== */}
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 70, scale: 0.65, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 w-full max-w-sm sm:max-w-md mx-auto group"
            >
              {/* Outer Bloom Lighting & Glow */}
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#EC4899] via-[#FDE047] to-[#F472B6] opacity-70 blur-2xl group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

              {/* Crystal Glass Frame Container */}
              <div className="relative rounded-[32px] p-3 sm:p-4 bg-gradient-to-b from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border-2 border-white/40 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden">
                
                {/* Diagonal Glass Reflection Highlight */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-br from-white/30 via-white/5 to-transparent rotate-45 pointer-events-none z-20" />

                {/* Photo Wrapper with Ken Burns Zoom Effect */}
                <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-2xl bg-black border border-white/20">
                  <motion.img
                    src={photoUrl}
                    alt="Real Physical Gift Surprise"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.08 }}
                    transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    className="w-full h-full object-cover rounded-[24px]"
                    onError={(e) => {
                      // Fallback if image path missing
                      e.target.src = '/photos/new_hero.jpg';
                    }}
                  />

                  {/* Inner Photo Vignette */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none rounded-[24px]" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 z-30 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-xs font-sans-luxury text-[#FDE047] font-semibold flex items-center gap-1.5 shadow-lg">
                    <Heart className="w-3.5 h-3.5 text-[#EC4899] fill-[#EC4899] animate-bounce" />
                    <span>Real Physical Gift</span>
                  </div>
                </div>

                {/* Bottom Glass Glow Strip */}
                <div className="mt-3 py-2 px-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                  <p className="text-xs font-serif-luxury text-[#FBCFE8] tracking-widest uppercase">
                    Wrapped with Love & Sent to You 💖
                  </p>
                </div>
              </div>

              {/* Orbiting Sparkles & Hearts */}
              <div className="absolute -top-4 -right-4 z-40 p-2.5 rounded-full bg-[#EC4899] text-white shadow-xl animate-bounce">
                <Sparkles className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div className="absolute -bottom-4 -left-4 z-40 p-2.5 rounded-full bg-[#BE185D] text-white shadow-xl animate-pulse">
                <Heart className="w-5 h-5 fill-current text-[#FBCFE8]" />
              </div>
            </motion.div>
          )}
        </div>

        {/* ============================================================== */}
        {/* TYPOGRAPHY & ELEGANT COPY REVEAL                               */}
        {/* ============================================================== */}
        <div className="space-y-6 mt-8 max-w-xl mx-auto px-4">
          
          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif-luxury text-4xl sm:text-6xl font-bold bg-gradient-to-r from-[#FFF0F5] via-[#FBCFE8] to-[#FDE047] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(244,114,182,0.4)]"
          >
            {title}
          </motion.h2>

          {/* Line-by-Line Staggered Text Animations */}
          <div className="space-y-3 font-serif-luxury text-lg sm:text-2xl text-[#FCE7F0]/90 leading-relaxed font-light">
            {lines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + idx * 0.35 }}
                className={idx === lines.length - 1 ? "text-[#FDE047] font-semibold text-xl sm:text-3xl pt-2 tracking-wide drop-shadow-[0_2px_10px_rgba(253,224,71,0.5)]" : ""}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Animated Reserved Badge Beneath */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="pt-4 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#BE185D]/80 via-[#EC4899]/80 to-[#BE185D]/80 border border-[#FDE047]/60 shadow-[0_10px_30px_rgba(236,72,153,0.4)] text-sm sm:text-base font-sans-luxury text-white font-semibold tracking-wider hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-[#FDE047] animate-spin" />
              <span>{badgeText}</span>
              <Sparkles className="w-4 h-4 text-[#FDE047] animate-spin" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
