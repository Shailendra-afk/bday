import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, MailOpen } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export const LetterSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const letter = birthdayData.birthdayLetter;

  const fullLetterString = `${letter.greeting}\n\n${letter.paragraphs.join('\n\n')}\n\n${letter.signOff}`;

  useEffect(() => {
    if (!isOpen) {
      setTypedText('');
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index < fullLetterString.length) {
        setTypedText(fullLetterString.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [isOpen, fullLetterString]);

  return (
    <section id="letter" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center relative">
      {/* Section Header */}
      <div className="space-y-4 mb-16">
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#701A40]">
          A Letter For You
        </h2>
        <p className="font-sans-luxury text-base text-[#9D174D] max-w-lg mx-auto">
          Tap on the sealed wax envelope to open your special birthday message.
        </p>
      </div>

      {/* Interactive Envelope Wrapper */}
      <div className="relative flex justify-center items-center py-6">
        {!isOpen ? (
          /* Sealed Envelope Graphic */
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer relative w-[320px] sm:w-[460px] h-[220px] sm:h-[300px] bg-gradient-to-br from-[#FFF0F5] to-[#FCE7F0] border-2 border-[#F472B6]/70 rounded-3xl shadow-2xl pink-glow hover:pink-glow-hover transition-all flex flex-col items-center justify-center p-6 overflow-hidden group"
          >
            {/* Top flap diagonal lines */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-[#F9A8D4]/30 border-b border-[#F472B6]/40 clip-path-envelope" />

            {/* Wax Seal Button */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#EC4899] to-[#DB2777] flex flex-col items-center justify-center text-white shadow-xl pink-glow group-hover:scale-110 transition-transform">
              <Heart className="w-7 h-7 sm:w-9 sm:h-9 fill-white text-white animate-pulse" />
              <span className="text-[10px] font-sans-luxury font-bold uppercase tracking-widest mt-0.5">
                OPEN
              </span>
            </div>

            <p className="relative z-10 font-script-luxury text-xl sm:text-2xl text-[#9D174D] mt-4">
              For {birthdayData.recipientName}
            </p>
          </motion.div>
        ) : (
          /* Open Letter Paper Display */
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-[#FFF0F5] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#F472B6]/60 pink-glow relative text-left"
          >
            {/* Decorative Top Corners */}
            <div className="absolute top-4 right-4 flex items-center gap-1 text-[#EC4899]">
              <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            {/* Handwritten Paper Texture / Letter Text */}
            <div className="font-script-luxury text-2xl sm:text-3xl text-[#701A40] leading-relaxed whitespace-pre-wrap min-h-[300px]">
              {typedText}
              {typedText.length < fullLetterString.length && (
                <span className="inline-block w-0.5 h-6 ml-1 bg-[#EC4899] animate-pulse" />
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-[#F9A8D4] flex justify-between items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-sans-luxury text-[#9D174D] hover:text-[#EC4899] underline"
              >
                Close Envelope
              </button>
              <span className="font-sans-luxury text-xs text-[#EC4899] tracking-wider uppercase font-semibold">
                Handcrafted with Love
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
