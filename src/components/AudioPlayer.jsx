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
  const [isCollapsed, setIsCollapsed] = useState(true);

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
          className="fixed bottom-4 right-4 z-50 cursor-grab active:cursor-grabbing select-none"
          title="Click to toggle player controls, drag to position anywhere"
        >
          {/* Main Floating Pill Music Banner (exact screenshot match) */}
          <div className="relative group">
            <div
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#F472B6]/40 shadow-xl pink-glow text-[#831843] font-sans-luxury text-xs font-medium hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              {/* Decorative 6-Dot Grip Handle */}
              <div className="flex items-center opacity-60 hover:opacity-100 transition-opacity">
                <GripHorizontal className="w-3.5 h-3.5 text-[#EC4899]" />
              </div>

              {/* Play / Pause Mini Control */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-5 h-5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#DB2777] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
                title={isPlaying ? "Pause Music" : "Play Music"}
              >
                {isPlaying ? (
                  <Pause className="w-2.5 h-2.5 fill-white" />
                ) : (
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                )}
              </button>

              {/* Track Title */}
              <span className="truncate max-w-[140px] sm:max-w-[200px] font-medium text-[#831843]">
                {(currentTrack.title || birthdayData.music.title).split('(')[0]}
              </span>

              {/* Animated Equalizer Waveform Bars */}
              <div className="flex items-end gap-0.5 h-3 px-0.5 flex-shrink-0">
                <span className={`w-0.5 bg-[#EC4899] rounded-full transition-all ${isPlaying ? 'h-3 animate-bounce' : 'h-1'}`} style={{ animationDelay: '0ms' }} />
                <span className={`w-0.5 bg-[#F472B6] rounded-full transition-all ${isPlaying ? 'h-2.5 animate-bounce' : 'h-1.5'}`} style={{ animationDelay: '150ms' }} />
                <span className={`w-0.5 bg-[#EC4899] rounded-full transition-all ${isPlaying ? 'h-3 animate-bounce' : 'h-1'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>

            {/* Expanded Popover Controls Panel */}
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-3 w-[250px] p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#F472B6]/40 shadow-2xl space-y-2 text-[#831843]"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {/* Header: Cover + Title + Close */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <img
                      src={currentTrack.albumArt || birthdayData.music.albumArt}
                      alt="Art"
                      className="w-7 h-7 rounded-lg object-cover border border-[#F472B6]/40 shadow-sm"
                    />
                    <div className="truncate">
                      <p className="font-serif-luxury text-xs font-semibold truncate text-[#701A40]">
                        {currentTrack.title || birthdayData.music.title}
                      </p>
                      <p className="font-sans-luxury text-[9px] text-[#9D174D] truncate">
                        {currentTrack.artist || birthdayData.music.artist}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="text-xs text-[#9D174D] hover:text-[#701A40] p-1 rounded hover:bg-black/5"
                  >
                    ✕
                  </button>
                </div>

                {/* Seek range */}
                <div className="space-y-0.5">
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

                {/* Volume bar */}
                <div className="flex items-center justify-between pt-1 border-t border-[#F472B6]/20">
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
                    className="w-20 h-1 bg-[#F9A8D4] rounded-lg appearance-none cursor-pointer accent-[#EC4899]"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};
