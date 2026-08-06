import React, { useState, useEffect } from 'react';
import { PetalParticlesCanvas } from './components/PetalParticlesCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OurMemoriesFilmStrip } from './components/OurMemoriesFilmStrip';
import { ShadesOfBeautySection } from './components/ShadesOfBeautySection';
import { CinematicMontageSection } from './components/CinematicMontageSection';
import { LetterSection } from './components/LetterSection';
import { StarSkySection } from './components/StarSkySection';
import { GiftBoxSection } from './components/GiftBoxSection';
import { CelebrationSection } from './components/CelebrationSection';
import { AudioPlayer } from './components/AudioPlayer';
import { Sparkles } from 'lucide-react';
import { ButterflyCollectorSection } from './components/ButterflyCollectorSection';
import { HerDigitalAuraSection } from './components/HerDigitalAuraSection';
import { OurMemoriesGrandEntrySection } from './components/OurMemoriesGrandEntrySection';
import { SectionUnlockGate } from './components/SectionUnlockGate';
import { CinematicPortalTransition } from './components/CinematicPortalTransition';
import { PasswordLockScreen } from './components/PasswordLockScreen';
import confetti from 'canvas-confetti';
import { birthdayData } from './config/birthdayData';

export const PINK_SHADES = [
  {
    name: 'Hot Pink Rose',
    bg: '#FFF0F5',
    text: '#701A40',
    accent: '#EC4899',
    secondary: '#F472B6',
    glow: 'rgba(236, 72, 153, 0.6)',
    hue: 330
  },
  {
    name: 'Vivid Fuchsia',
    bg: '#FDF2F8',
    text: '#701A5E',
    accent: '#D946EF',
    secondary: '#E879F9',
    glow: 'rgba(217, 70, 239, 0.6)',
    hue: 300
  },
  {
    name: 'Coral Peach Rose',
    bg: '#FFF1F2',
    text: '#711A2C',
    accent: '#FB7185',
    secondary: '#FDA4AF',
    glow: 'rgba(251, 113, 133, 0.6)',
    hue: 350
  },
  {
    name: 'Deep Crimson Ruby',
    bg: '#FCE7F0',
    text: '#500724',
    accent: '#BE185D',
    secondary: '#F43F5E',
    glow: 'rgba(190, 24, 93, 0.6)',
    hue: 335
  },
  {
    name: 'Blossom Bubblegum',
    bg: '#FFF0F7',
    text: '#831843',
    accent: '#F472B6',
    secondary: '#FBCFE8',
    glow: 'rgba(244, 114, 182, 0.6)',
    hue: 320
  }
];

export default function App() {
  const isPasscodeEnabled = birthdayData.passcodeConfig?.enabled ?? true;
  const [isSiteLocked, setIsSiteLocked] = useState(() => {
    if (!isPasscodeEnabled) return false;
    return sessionStorage.getItem('birthday_site_unlocked') !== 'true';
  });

  const handlePasscodeUnlock = () => {
    sessionStorage.setItem('birthday_site_unlocked', 'true');
    setIsSiteLocked(false);
  };

  const [hasStarted, setHasStarted] = useState(false);
  const [unlockedLevel, setUnlockedLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(birthdayData.music);
  const [shadeIndex, setShadeIndex] = useState(0);

  // Portal Transition State
  const [portalState, setPortalState] = useState({
    isActive: false,
    targetTitle: '',
    targetId: '',
    nextLevel: 1
  });

  // Switch Pink Shade every 5 seconds (5000 ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setShadeIndex((prev) => (prev + 1) % PINK_SHADES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentShade = PINK_SHADES[shadeIndex];

  // Update root CSS variables smoothly on shade update
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--pink-bg', currentShade.bg);
    root.style.setProperty('--pink-text', currentShade.text);
    root.style.setProperty('--pink-accent', currentShade.accent);
    root.style.setProperty('--pink-secondary', currentShade.secondary);
    root.style.setProperty('--pink-glow', currentShade.glow);
    root.style.setProperty('--pink-hue', `${currentShade.hue}deg`);
  }, [currentShade]);

  const handleOpenSurprise = () => {
    // Fire celebratory confetti on entering main page
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#EC4899', '#F472B6', '#D946EF', '#FFD1DC', '#FF69B4', '#F43F5E']
    });

    setHasStarted(true);
    setUnlockedLevel(1);
    setIsPlaying(true);

    // Directly scroll down to first content section without portal
    setTimeout(() => {
      const firstEl = document.getElementById('shades-of-beauty');
      if (firstEl) {
        firstEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const handleUnlockNext = (nextLevel, nextId, nextTitle = 'Next Realm') => {
    const isMemoriesSection =
      nextId === 'memories-grand-entry' ||
      nextId === 'gallery' ||
      nextTitle.toLowerCase().includes('memories');

    if (isMemoriesSection) {
      // Trigger 3D Portal Transition ONLY for Our Memories Section
      setPortalState({
        isActive: true,
        targetTitle: 'Our Memories Vault',
        targetId: nextId,
        nextLevel: nextLevel
      });
    } else {
      // Normal direct smooth scroll unlock for all other sections
      setUnlockedLevel((prev) => Math.max(prev, nextLevel));

      setTimeout(() => {
        const el = document.getElementById(nextId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const handlePortalComplete = () => {
    setUnlockedLevel((prev) => Math.max(prev, portalState.nextLevel));

    setTimeout(() => {
      const el = document.getElementById(portalState.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setPortalState({
        isActive: false,
        targetTitle: '',
        targetId: '',
        nextLevel: 1
      });
    }, 100);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{ backgroundColor: currentShade.bg, color: currentShade.text }}
      className="min-h-screen font-sans-luxury relative selection:bg-[#F9A8D4] selection:text-[#831843] overflow-x-hidden transition-colors duration-1000"
    >
      {/* Background Petals & Shifting Pink Sparkles Canvas */}
      <PetalParticlesCanvas density={32} currentHue={currentShade.hue} />

      {/* Top Navbar */}
      <Navbar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        hasStarted={hasStarted}
        unlockedLevel={unlockedLevel}
      />

      {/* Hero Opening Screen */}
      <HeroSection
        onOpenSurprise={handleOpenSurprise}
        hasOpened={hasStarted}
      />

      {/* Sequential Content Sections Revealed Level by Level */}
      {hasStarted && (
        <main className="space-y-12 sm:space-y-20 relative z-20 pb-32">
          {/* Chapter 1: Shades of Beauty */}
          {unlockedLevel >= 1 && (
            <div>
              <ShadesOfBeautySection />
              <SectionUnlockGate
                currentLevel={1}
                unlockedLevel={unlockedLevel}
                nextTitle="Celestial Bloom"
                nextId="aura"
                onUnlockNext={handleUnlockNext}
              />
            </div>
          )}

          {/* Chapter 2: Her Digital Aura */}
          {unlockedLevel >= 2 && (
            <div>
              <HerDigitalAuraSection />
              <SectionUnlockGate
                currentLevel={2}
                unlockedLevel={unlockedLevel}
                nextTitle="Secret Butterfly Garden"
                nextId="butterflies"
                onUnlockNext={handleUnlockNext}
              />
            </div>
          )}

          {/* Chapter 3: Butterfly Collector */}
          {unlockedLevel >= 3 && (
            <div>
              <ButterflyCollectorSection />
              <SectionUnlockGate
                currentLevel={3}
                unlockedLevel={unlockedLevel}
                nextTitle="Heartfelt Birthday Letter"
                nextId="letter"
                onUnlockNext={handleUnlockNext}
              />
            </div>
          )}

          {/* Chapter 4: Heartfelt Letter & Cinematic Memories */}
          {unlockedLevel >= 4 && (
            <div>
              <LetterSection />
              <CinematicMontageSection />
              <SectionUnlockGate
                currentLevel={4}
                unlockedLevel={unlockedLevel}
                nextTitle="Our Memories Vault"
                nextId="gallery"
                onUnlockNext={handleUnlockNext}
              />
            </div>
          )}

          {/* Chapter 5: Memories Film Strip */}
          {unlockedLevel >= 5 && (
            <div>
              <OurMemoriesFilmStrip
                isBgMusicPlaying={isPlaying}
                setIsBgMusicPlaying={setIsPlaying}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
              />
              <SectionUnlockGate
                currentLevel={5}
                unlockedLevel={unlockedLevel}
                nextTitle="Constellation Star Sky"
                nextId="stars"
                onUnlockNext={handleUnlockNext}
              />
            </div>
          )}

          {/* Chapter 6: Star Sky */}
          {unlockedLevel >= 6 && (
            <div>
              <StarSkySection />
              <SectionUnlockGate
                currentLevel={6}
                unlockedLevel={unlockedLevel}
                nextTitle="Surprise Gift Box"
                nextId="gift"
                onUnlockNext={handleUnlockNext}
              />
            </div>
          )}

          {/* Chapter 7: Gift Box */}
          {unlockedLevel >= 7 && (
            <div>
              <GiftBoxSection
                isBgMusicPlaying={isPlaying}
                setIsBgMusicPlaying={setIsPlaying}
              />
              <SectionUnlockGate
                currentLevel={7}
                unlockedLevel={unlockedLevel}
                nextTitle="Grand Birthday Finale"
                nextId="celebration"
                onUnlockNext={handleUnlockNext}
              />
            </div>
          )}

          {/* Chapter 8: Grand Finale Celebration */}
          {unlockedLevel >= 8 && (
            <CelebrationSection onReplay={handleReplay} />
          )}
        </main>
      )}

      {/* Persistent Audio Player */}
      <AudioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        hasStarted={hasStarted}
        currentTrack={currentTrack}
      />

      {/* 3D Cinematic Portal Tunnel Transition Overlay */}
      <CinematicPortalTransition
        isActive={portalState.isActive}
        targetTitle={portalState.targetTitle}
        onComplete={handlePortalComplete}
      />

      {/* 5-Second Pink Shade Toast Indicator (Bottom Left) */}
      <div className="fixed bottom-4 left-4 z-40 px-3 py-1.5 rounded-full glass-card border text-[11px] font-sans-luxury font-medium flex items-center gap-2 shadow-lg transition-all duration-700 pointer-events-none opacity-90">
        <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ color: currentShade.accent, animationDuration: '4s' }} />
        <span>Shade: <strong>{currentShade.name}</strong></span>
        <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentShade.accent }} />
      </div>

      {/* Website Password Lock Screen Overlay */}
      {isSiteLocked && (
        <PasswordLockScreen onUnlock={handlePasscodeUnlock} />
      )}
    </div>
  );
}
