import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Check, Sparkles, ChevronDown, Ruler } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface PerfectFitBannerProps {
  onOpenScanner: () => void;
  onOpenHowItWorks?: () => void;
}

export const PerfectFitBanner: React.FC<PerfectFitBannerProps> = ({ onOpenScanner, onOpenHowItWorks }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const demoSize = '40';

  const getSizes = (size: string) => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return [size];
    return [(num - 2).toString(), num.toString(), (num + 2).toString()];
  };

  const sizes = getSizes(demoSize);

  return (
    <div className="rounded-3xl bg-[#fdf9f0] border border-amber-500/25 p-8 sm:p-10 shadow-[0_4px_24px_rgba(11,22,44,0.04)] mb-10 transition-all ring-1 ring-amber-500/10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Main message */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-amber-500/50 ring-2 ring-amber-500/30 luxury-seal-imprint p-0.5 flex items-center justify-center shrink-0 shadow-sm">
              <img
                src="/blazer_bank_logo.svg"
                alt="Blazer Bank Seal"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-950 text-xs sm:text-sm font-bold">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Official Blazer Bank Guarantee • Included Free With Every Rental</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b162c] tracking-tight leading-tight mb-3 font-serif">
            The 3-Size Fit Guarantee. <br className="hidden sm:inline" />
            <span className="text-neutral-500 font-normal">Delivered together, zero fitting panic.</span>
          </h2>

          <p className="text-base text-[#0b162c]/85 leading-relaxed mb-5 font-serif">
            Never stress about wrong sizing on interview morning. When you reserve a size, we automatically pack <strong className="text-[#0b162c] font-bold">Selected + 1 Size Smaller + 1 Size Larger</strong> in a sealed wardrobe bag. Try them on in your hostel room, keep the sharpest fit, and hand back the rest to our runner.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playBeep(600);
                setShowExplanation(!showExplanation);
              }}
              className="text-sm font-semibold text-[#0b162c] hover:text-amber-800 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>3-Size Breakdown</span>
              <ChevronDown className={`w-4 h-4 text-amber-700 transition-transform duration-200 ${showExplanation ? 'rotate-180' : ''}`} />
            </button>

            {onOpenHowItWorks && (
              <>
                <span className="text-amber-300">•</span>
                <button
                  onClick={() => {
                    sound.playBeep(620);
                    onOpenHowItWorks();
                  }}
                  className="text-sm font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-4 cursor-pointer"
                >
                  Full Rental Process (Booking to Return)
                </button>
              </>
            )}

            <span className="text-amber-300">•</span>

            <button
              onClick={() => {
                sound.playScanChirp();
                onOpenScanner();
              }}
              className="text-sm font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer"
            >
              <Ruler className="w-4 h-4 text-amber-700" />
              <span>Unsure of your size? Open Fit Assistant</span>
            </button>
          </div>
        </div>

        {/* 3-Size Box Visualizer with Navy & Gold Styling */}
        <div className="bg-[#f4ebd9] border border-amber-500/25 rounded-3xl p-6 sm:p-7 text-center sm:min-w-[360px] shadow-sm">
          <div className="flex items-center justify-between text-sm text-[#0b162c]/70 mb-4 font-semibold">
            <span>What arrives at your room:</span>
            <span className="text-amber-900 bg-amber-500/20 px-3 py-1 rounded-full font-bold text-xs border border-amber-500/40">
              Free Add-On
            </span>
          </div>

          {/* Size Pills */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="border border-amber-600/20 bg-[#fdf9f0] rounded-2xl p-3.5 text-center shadow-xs">
              <span className="text-xs block text-neutral-400 font-medium">Fitted</span>
              <span className="text-lg sm:text-xl font-bold text-[#0b162c]">{sizes[0]}</span>
              <span className="text-xs text-neutral-400 block mt-0.5">Try on</span>
            </div>

            <div className="border-2 border-amber-400 bg-[#0b162c] text-white rounded-2xl p-3.5 text-center shadow-lg relative scale-105">
              <span className="text-xs block text-amber-300 font-bold">Your Pick</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white">{sizes[1]}</span>
              <span className="text-xs text-amber-300 font-semibold block mt-0.5">Selected</span>
            </div>

            <div className="border border-amber-600/20 bg-[#fdf9f0] rounded-2xl p-3.5 text-center shadow-xs">
              <span className="text-xs block text-neutral-400 font-medium">Roomier</span>
              <span className="text-lg sm:text-xl font-bold text-[#0b162c]">{sizes[2]}</span>
              <span className="text-xs text-neutral-400 block mt-0.5">Try on</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#0b162c] bg-[#fdf9f0] border border-amber-600/20 rounded-2xl py-2.5 px-4 shadow-xs">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>₹199 deducted on return • Remainder sent back to your UPI</span>
          </div>
        </div>
      </div>

      {/* Expandable Explanation Details */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 pt-8 border-t border-amber-600/15 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#f4ebd9] border border-amber-600/20">
                <span className="text-sm font-bold text-[#0b162c] block mb-1.5 font-serif">1. Doorstep Delivery</span>
                <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                  Our campus runner arrives with 3 sizes in a clean sanitized garment cover right outside your hostel wing.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f4ebd9] border border-amber-600/20">
                <span className="text-sm font-bold text-[#0b162c] block mb-1.5 font-serif">2. 5-Minute Try-On</span>
                <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                  Slip into them in front of your mirror to check shoulder drape and sleeve length. Keep the one that looks sharpest.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#f4ebd9] border border-amber-600/20">
                <span className="text-sm font-bold text-[#0b162c] block mb-1.5 font-serif">3. Next-Day Return</span>
                <p className="text-sm text-neutral-600 leading-relaxed font-serif">
                  After your placement or event, the runner returns to your hostel gate at your preferred time slot for seamless pickup.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

