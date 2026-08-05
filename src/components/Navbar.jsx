import React from 'react';
import { Heart, Music, Volume2, VolumeX } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const Navbar = ({ isPlaying, setIsPlaying, hasStarted, unlockedLevel = 9 }) => {
  const navLinks = [
    { name: 'Shades of Beauty', href: '#shades-of-beauty', level: 1 },
    { name: 'Celestial Bloom', href: '#aura', level: 2 },
    { name: 'Butterflies', href: '#butterflies', level: 3 },
    { name: 'Letter & Cinema', href: '#letter', level: 4 },
    { name: 'Memories Vault', href: '#memories-grand-entry', level: 5 },
    { name: 'Memories Reel', href: '#gallery', level: 6 },
    { name: 'Stars', href: '#stars', level: 7 },
    { name: 'Gift', href: '#gift', level: 8 }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 py-3 transition-all duration-300">
      <nav className="max-w-6xl mx-auto rounded-full glass-panel px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-sm border border-[#F472B6]/40">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Heart className="w-5 h-5 text-[#EC4899] fill-[#EC4899] group-hover:scale-110 transition-transform" />
          <span className="font-serif-luxury font-bold text-sm sm:text-base text-[#831843]">
            {birthdayData.recipientName}'s Birthday
          </span>
        </a>

        {/* Quick Jump Links (Desktop) - Filtered by unlocked sections */}
        {hasStarted && (
          <div className="hidden md:flex items-center gap-5 text-xs font-sans-luxury text-[#9D174D] font-medium">
            {navLinks
              .filter((link) => link.level <= unlockedLevel)
              .map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#EC4899] transition-colors"
                >
                  {link.name}
                </a>
              ))}
          </div>
        )}

        {/* Audio Quick Toggle */}
        {hasStarted && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF0F5] border border-[#F472B6]/40 text-xs font-sans-luxury text-[#9D174D] hover:text-[#EC4899] transition-all shadow-sm"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#EC4899]" />
                <span className="hidden sm:inline">Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#9D174D]" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>
        )}
      </nav>
    </header>
  );
};
