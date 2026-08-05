import React, { useEffect, useRef } from 'react';

export const PetalParticlesCanvas = ({ density = 35, currentHue = 330 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Petal particle class
    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 100;
        this.size = 8 + Math.random() * 12;
        this.speedY = 0.6 + Math.random() * 1.2;
        this.speedX = -0.5 + Math.random() * 1.0;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = 0.4 + Math.random() * 0.5;
        this.hueOffset = (Math.random() - 0.5) * 20; // Variation around current hue
        this.lightness = 60 + Math.random() * 20;
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y > height + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        const activeHue = (currentHue + this.hueOffset + 360) % 360;
        ctx.fillStyle = `hsla(${activeHue}, 85%, ${this.lightness}%, ${this.opacity})`;

        // Draw soft petal curve shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size, -this.size / 2, this.size, this.size, 0, this.size * 1.4);
        ctx.bezierCurveTo(-this.size, this.size, -this.size, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    // Sparkle particle class
    class Sparkle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = 1 + Math.random() * 3;
        this.alpha = Math.random();
        this.alphaSpeed = 0.005 + Math.random() * 0.015;
        this.growing = Math.random() > 0.5;
        this.hueOffset = (Math.random() - 0.5) * 15;
      }

      update() {
        if (this.growing) {
          this.alpha += this.alphaSpeed;
          if (this.alpha >= 1) this.growing = false;
        } else {
          this.alpha -= this.alphaSpeed;
          if (this.alpha <= 0) this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const activeHue = (currentHue + this.hueOffset + 360) % 360;
        ctx.fillStyle = `hsla(${activeHue}, 90%, 75%, ${this.alpha * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${activeHue}, 90%, 65%, 0.9)`;
        ctx.fill();
        ctx.restore();
      }
    }

    const petals = Array.from({ length: density }, () => new Petal());
    const sparkles = Array.from({ length: 25 }, () => new Sparkle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      sparkles.forEach((sparkle) => {
        sparkle.update();
        sparkle.draw();
      });

      petals.forEach((petal) => {
        petal.update();
        petal.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, currentHue]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-80"
    />
  );
};
