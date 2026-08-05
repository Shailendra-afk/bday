import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const CelebrationSection = ({ onReplay }) => {
  const canvasRef = useRef(null);
  const msg = birthdayData.finalMessage;

  // Fireworks + Floating Lanterns Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Firework Particle Class
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = 0.015 + Math.random() * 0.015;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Lantern Class
    class Lantern {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 20 + Math.random() * 100;
        this.size = 10 + Math.random() * 10;
        this.speedY = 0.4 + Math.random() * 0.6;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02;
      }

      update() {
        this.y -= this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;

        if (this.y < -30) this.reset();
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size * 1.3);
        ctx.fillStyle = 'rgba(244, 114, 182, 0.7)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(236, 72, 153, 0.9)';
        ctx.fill();
        ctx.restore();
      }
    }

    let particles = [];
    const lanterns = Array.from({ length: 15 }, () => new Lantern());

    const colors = ['#F9A8D4', '#EC4899', '#F472B6', '#FBCFE8', '#FFF0F5'];

    const createExplosion = (x, y) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 35; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Random periodic fireworks launch
      tick++;
      if (tick % 60 === 0) {
        createExplosion(
          Math.random() * (width * 0.8) + width * 0.1,
          Math.random() * (height * 0.5) + height * 0.1
        );
      }

      // Render Lanterns
      lanterns.forEach((lantern) => {
        lantern.update();
        lantern.draw();
      });

      // Render Particles
      particles.forEach((p, idx) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(idx, 1);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="celebration" className="relative min-h-[600px] w-full my-12 py-20 px-4 flex items-center justify-center overflow-hidden">
      {/* Night Sky Card Canvas Background */}
      <div className="absolute inset-0 max-w-6xl mx-auto rounded-3xl bg-gradient-to-b from-[#2D0A1E] via-[#4A1230] to-[#2D0A1E] border-2 border-[#F472B6]/60 shadow-2xl overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-2xl mx-auto text-center space-y-8 p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F472B6]/40 text-xs font-sans-luxury text-[#FBCFE8] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#F472B6]" />
            <span>Grand Finale</span>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white tracking-wide leading-tight">
            {msg.heading}{' '}
            <Heart className="inline-block w-10 h-10 text-[#EC4899] fill-[#EC4899] animate-pulse" />
          </h2>

          <p className="font-script-luxury text-2xl sm:text-3xl text-[#FBCFE8] leading-relaxed max-w-xl mx-auto pt-2">
            "{msg.subtext}"
          </p>

          <p className="font-sans-luxury text-sm text-[#F472B6] font-medium uppercase tracking-widest pt-4">
            {msg.closing}
          </p>
        </motion.div>

        {/* Elegant Replay Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-6"
        >
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#DB2777] text-white font-sans-luxury font-semibold text-base shadow-xl pink-glow hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Relive The Experience</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
