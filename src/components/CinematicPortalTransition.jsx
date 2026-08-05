import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export const CinematicPortalTransition = ({ isActive, targetTitle, onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let startTime = Date.now();

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Portal Warp Stars & Crystal Particle Engine
    class WarpParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = Math.random() * 1000 + 100;
        this.size = 2 + Math.random() * 4;
        this.color = ['#EC4899', '#A855F7', '#38BDF8', '#F59E0B', '#F472B6', '#E879F9'][
          Math.floor(Math.random() * 6)
        ];
      }

      update(speed) {
        this.z -= speed;
        if (this.z <= 10) {
          this.reset();
          this.z = 1000;
        }
      }

      draw(progress) {
        const k = 400 / this.z;
        const px = this.x * k + width / 2;
        const py = this.y * k + height / 2;

        if (px < 0 || px > width || py < 0 || py > height) return;

        const size = Math.max(0.5, this.size * k * 0.8);
        const alpha = Math.min(1, (1000 - this.z) / 400);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        // Draw light speed streak during warp zoom
        if (progress > 0.3) {
          const prevK = 400 / (this.z + 40);
          const prevPx = this.x * prevK + width / 2;
          const prevPy = this.y * prevK + height / 2;

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(prevPx, prevPy);
          ctx.strokeStyle = this.color;
          ctx.lineWidth = size;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 120 }, () => new WarpParticle());

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000; // Time in seconds
      const progress = Math.min(1, elapsed / 3.0); // 3 second total duration

      ctx.clearRect(0, 0, width, height);

      // Warp speed increases as user enters portal
      const warpSpeed = 15 + Math.pow(progress, 2.5) * 65;

      // Draw Rotating Energy Rings at Portal Mouth
      const centerX = width / 2;
      const centerY = height / 2;
      const ringRadius = 50 + progress * 400;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(elapsed * 2);

      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius * (r * 0.35), 0, Math.PI * 2);
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(236, 72, 153, 0.6)' : 'rgba(168, 85, 247, 0.6)';
        ctx.lineWidth = 3 + r;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#EC4899';
        ctx.setLineDash([20, 15]);
        ctx.stroke();
      }
      ctx.restore();

      // Update & Draw 3D Warp Particles
      particles.forEach((p) => {
        p.update(warpSpeed);
        p.draw(progress);
      });

      // Complete transition after 3.2s
      if (progress < 1) {
        animationId = requestAnimationFrame(render);
      } else if (onComplete) {
        onComplete();
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-[#070210] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* 3D Warp Tunnel Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

          {/* Central Swirling Light Rays & Ambient Bloom Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-radial from-pink-400/40 via-purple-500/30 via-cyan-400/20 to-transparent blur-3xl pointer-events-none animate-spin z-0" style={{ animationDuration: '10s' }} />

          {/* Floating Text & Guidance Badge inside Portal */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative z-20 text-center space-y-3 px-6 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-pink-400/50 shadow-2xl text-xs font-sans-luxury text-pink-200">
              <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="font-bold uppercase tracking-wider">Traveling Through Portal</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_35px_rgba(236,72,153,0.9)]">
              Entering {targetTitle}
            </h2>

            <p className="font-script-luxury text-xl sm:text-2xl text-pink-300 italic">
              Arriving in another magical realm...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
