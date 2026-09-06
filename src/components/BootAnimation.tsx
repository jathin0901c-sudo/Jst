import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface BootAnimationProps {
  onComplete: () => void;
}

export const BootAnimation: React.FC<BootAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    sound.playHologramConfirm();

    const t1 = setTimeout(() => setProgress(65), 350);
    const t2 = setTimeout(() => setProgress(100), 750);
    const t3 = setTimeout(() => onComplete(), 1300);

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
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f5f7] text-[#1d1d1f] p-6 select-none"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-sm w-full"
        >
          {/* Luxury Royal Seal Imprint */}
          <div className="w-28 h-28 rounded-full bg-white border-2 border-amber-600/30 ring-4 ring-amber-500/20 luxury-seal-imprint flex items-center justify-center mb-5 p-1 overflow-hidden">
            <img
              src="/blazer_bank_logo.svg"
              alt="Blazer Bank"
              className="w-full h-full object-contain rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mb-1 font-serif">
            Blazer Bank
          </h1>
          <p className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-2 font-serif">
            Formal Wear • Rental • Retail
          </p>
          <p className="text-base text-neutral-600 mb-8 max-w-xs leading-relaxed font-serif italic">
            Prestigious branded formal wear rentals & doorstep delivery for Delhi NCR & Rohtak.
          </p>

          {/* Minimalist progress bar */}
          <div className="w-48 h-1 bg-neutral-200/80 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-neutral-900 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> 3-Size Delivery
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ₹150 Dry Cleaned
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> 2h Express
            </span>
          </div>

          <button
            onClick={() => {
              sound.playBeep(600);
              onComplete();
            }}
            className="mt-8 text-xs text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>Skip</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

