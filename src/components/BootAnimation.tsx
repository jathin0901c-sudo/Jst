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
          {/* Apple-style minimalist icon */}
          <div className="w-20 h-20 rounded-3xl bg-white border border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center justify-center mb-6 text-neutral-900">
            <svg
              className="w-10 h-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-1.5">
            Stark Formals
          </h1>
          <p className="text-sm text-neutral-500 mb-8 max-w-xs leading-relaxed">
            Campus formal wear rentals & doorstep sanitization for Delhi NCR & Rohtak.
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

