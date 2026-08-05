import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Heart, GripHorizontal } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const AudioPlayer = ({ isPlaying, setIsPlaying, hasStarted, currentTrack = birthdayData.music }) => {
  const mainAudioRef = useRef(null);
  const memoriesAudioRef = useRef(null);

  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const hasResetOnStart = useRef(false);

  // Identify whether current active track is Memories ("Let The Celebration Begin") or Main ("Kaarkuzhal Kadavaiye")
  const isMemoriesTrack = currentTrack?.audioUrl === birthdayData.memoriesMusic?.audioUrl || 
                          currentTrack?.title?.includes('Celebration');

  // Play / Pause / Dual Audio Track Switching
  useEffect(() => {
    const activeAudio = isMemoriesTrack ? memoriesAudioRef.current : mainAudioRef.current;
    const inactiveAudio = isMemoriesTrack ? mainAudioRef.current : memoriesAudioRef.current;

    if (!activeAudio) return;

    // Pause the inactive audio track (keeps its exact timestamp natively in memory)
    if (inactiveAudio) {
      inactiveAudio.pause();
    }

    if (isPlaying && hasStarted) {
      const playPromise = activeAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay prevented or interrupted:', err);
          setIsPlaying(false);
        });
      }
    } else {
      if (activeAudio) activeAudio.pause();
    }
  }, [currentTrack, isPlaying, hasStarted, isMemoriesTrack, setIsPlaying]);

  // Reset Kaarkuzhal to 0:00 when surprise opens for the very first time
  useEffect(() => {
    if (hasStarted && !hasResetOnStart.current) {
      hasResetOnStart.current = true;
      if (mainAudioRef.current) {
        mainAudioRef.current.currentTime = 0;
      }
      if (memoriesAudioRef.current) {
        memoriesAudioRef.current.currentTime = 0;
      }
      setCurrentTime(0);
    }
  }, [hasStarted]);

  // Sync Volume & Mute to both audio elements
  useEffect(() => {
    const targetVol = isMuted ? 0 : volume;
    if (mainAudioRef.current) mainAudioRef.current.volume = targetVol;
    if (memoriesAudioRef.current) memoriesAudioRef.current.volume = targetVol;
  }, [volume, isMuted]);

  // Handle Seek bar
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    const activeAudio = isMemoriesTrack ? memoriesAudioRef.current : mainAudioRef.current;
    if (activeAudio) {
      activeAudio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Main Audio event listeners
  const handleMainTimeUpdate = () => {
    if (!isMemoriesTrack && mainAudioRef.current) {
      setCurrentTime(mainAudioRef.current.currentTime);
    }
  };

  const handleMainLoadedMetadata = () => {
    if (!isMemoriesTrack && mainAudioRef.current) {
      setDuration(mainAudioRef.current.duration);
    }
  };

  // Memories Audio event listeners
  const handleMemoriesTimeUpdate = () => {
    if (isMemoriesTrack && memoriesAudioRef.current) {
      setCurrentTime(memoriesAudioRef.current.currentTime);
    }
  };

  const handleMemoriesLoadedMetadata = () => {
    if (isMemoriesTrack && memoriesAudioRef.current) {
      setDuration(memoriesAudioRef.current.duration);
    }
  };

  return (
    <>
      {/* 1. Main Background Music: Kaarkuzhal Kadavaiye */}
      <audio
        ref={mainAudioRef}
        src={birthdayData.music.audioUrl}
        loop
        onTimeUpdate={handleMainTimeUpdate}
        onLoadedMetadata={handleMainLoadedMetadata}
      />

      {/* 2. Our Memories Music: Let The Celebration Begin (Dude) */}
      <audio
        ref={memoriesAudioRef}
        src={birthdayData.memoriesMusic.audioUrl}
        loop
        onTimeUpdate={handleMemoriesTimeUpdate}
        onLoadedMetadata={handleMemoriesLoadedMetadata}
      />

      {hasStarted && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          whileDrag={{ scale: 1.04, shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 cursor-grab active:cursor-grabbing touch-none select-none"
          title="Click and drag to position anywhere on screen"
        >
          {isCollapsed ? (
            // Collapsed Floating Button
            <div
              className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full glass-panel pink-glow text-[#831843] font-sans-luxury text-xs font-medium hover:scale-105 transition-all duration-300 shadow-xl border border-[#F472B6]/40 cursor-grab"
            >
              <GripHorizontal className="w-3.5 h-3.5 text-[#EC4899]/70" />
              <button
                onClick={() => setIsCollapsed(false)}
                onPointerDown={(e) => e.stopPropagation()}
                className="flex items-center gap-2 outline-none"
              >
                <div className="relative flex items-center justify-center">
                  <Music className={`w-3.5 h-3.5 text-[#EC4899] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
                  {isPlaying && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-ping" />
                  )}
                </div>
                <span className="truncate max-w-[140px]">{(currentTrack.title || birthdayData.music.title).split('(')[0]}</span>
              </button>
            </div>
          ) : (
            // Full Expanded Compact Glass Player
            <div className="w-[240px] sm:w-[270px] p-3 rounded-2xl glass-panel border border-[#F472B6]/50 shadow-2xl backdrop-blur-xl relative overflow-hidden group cursor-grab">
              {/* Top Drag Handle Bar */}
              <div className="flex justify-center -mt-1 mb-1 opacity-50 group-hover:opacity-100 transition-opacity">
                <GripHorizontal className="w-4 h-3 text-[#EC4899]" />
              </div>

              {/* Subtle glowing accent gradient */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#F9A8D4]/40 blur-xl pointer-events-none" />

              {/* Header row: Album art + title + collapse button */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md flex-shrink-0 border border-[#F472B6]/40 group-hover:rotate-1 transition-transform">
                  <img
                    src={currentTrack.albumArt || birthdayData.music.albumArt}
                    alt="Album Cover"
                    className="w-full h-full object-cover"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
                      <Heart className="w-3.5 h-3.5 text-white animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-luxury font-semibold text-xs text-[#701A40] truncate">
                    {currentTrack.title || birthdayData.music.title}
                  </h4>
                  <p className="font-sans-luxury text-[10px] text-[#9D174D] truncate">
                    {currentTrack.artist || birthdayData.music.artist}
                  </p>
                </div>

                {/* Equalizer animation bars */}
                <div className="flex items-end gap-0.5 h-3 px-0.5 flex-shrink-0">
                  <span className={`w-0.5 bg-[#EC4899] rounded-full transition-all ${isPlaying ? 'h-3 animate-bounce' : 'h-1'}`} style={{ animationDelay: '0ms' }} />
                  <span className={`w-0.5 bg-[#F472B6] rounded-full transition-all ${isPlaying ? 'h-2.5 animate-bounce' : 'h-1.5'}`} style={{ animationDelay: '150ms' }} />
                  <span className={`w-0.5 bg-[#EC4899] rounded-full transition-all ${isPlaying ? 'h-3 animate-bounce' : 'h-1'}`} style={{ animationDelay: '300ms' }} />
                </div>

                <button
                  onClick={() => setIsCollapsed(true)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="text-[10px] text-[#9D174D] hover:text-[#701A40] p-1 rounded hover:bg-black/5 leading-none"
                  title="Minimize player"
                >
                  ✕
                </button>
              </div>

              {/* Progress bar */}
              <div className="space-y-0.5 mb-2" onPointerDown={(e) => e.stopPropagation()}>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-[#F9A8D4] rounded-lg appearance-none cursor-pointer accent-[#EC4899]"
                />
                <div className="flex justify-between text-[9px] font-sans-luxury text-[#9D174D]">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Bar: Play/Pause, Volume */}
              <div className="flex items-center justify-between" onPointerDown={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={togglePlay}
                    className="w-7 h-7 rounded-full bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-1.5">
                  <button onClick={toggleMute} className="text-[#9D174D] hover:text-[#701A40]">
                    {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-12 h-1 bg-[#F9A8D4] rounded-lg appearance-none cursor-pointer accent-[#EC4899]"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};
