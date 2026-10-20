import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface BootAnimationProps {
  onComplete: () => void;
}

export const BootAnimation: React.FC<BootAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    sound.playHologramConfirm();

    // Fast, brief sequence (under 950ms total)
    const t1 = setTimeout(() => setStage(2), 250);
    const t2 = setTimeout(() => setStage(3), 600);
    const t3 = setTimeout(() => onComplete(), 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#071120] text-[#faf5ea] p-6 select-none"
      >
        <div className="flex flex-col items-center text-center max-w-sm w-full">
          {/* Stitched Monogram Crest */}
          <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
            {/* Thread Stitch SVG Outline Animation */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Outer decorative ring */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(197, 155, 67, 0.2)"
                strokeWidth="1.5"
              />
              {/* Animated stitched thread path */}
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#d4af37"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="stitch-path"
              />
            </svg>

            {/* Inner Crest Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-20 h-20 rounded-full bg-[#0b162c] border border-amber-400/50 flex items-center justify-center shadow-2xl relative"
            >
              <Crown className="w-10 h-10 text-amber-400 drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]" />
            </motion.div>
          </div>

          {/* Stitched brand typography */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="space-y-1"
          >
            <h1 className="font-regal text-2xl sm:text-3xl font-bold tracking-widest text-amber-300">
              BLAZER BANK
            </h1>
            <p className="text-[11px] uppercase tracking-[0.25em] text-amber-200/70 font-medium">
              Haute College Fashion
            </p>
          </motion.div>

          {/* Subtle thread progress bar */}
          <div className="w-36 h-[2px] bg-amber-500/20 rounded-full mt-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
              initial={{ width: '0%' }}
              animate={{ width: stage === 1 ? '30%' : stage === 2 ? '75%' : '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>

          <p className="text-[10px] text-amber-100/50 mt-3 font-mono">
            STERILIZED · BESPOKE · CAMPUS FAST
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
