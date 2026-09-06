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
    <div className="rounded-3xl bg-white border border-black/[0.06] p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Main message */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-white border border-amber-600/30 ring-2 ring-amber-500/20 luxury-seal-imprint p-0.5 flex items-center justify-center shrink-0 shadow-xs">
              <img
                src="/blazer_bank_logo.svg"
                alt="Blazer Bank Seal"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Official Blazer Bank Guarantee • Included Free With Every Rental</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight mb-3 font-serif">
            The 3-Size Fit Guarantee. <br className="hidden sm:inline" />
            <span className="text-neutral-500 font-normal">Delivered together, zero fitting panic.</span>
          </h2>

          <p className="text-base text-neutral-700 leading-relaxed mb-5 font-serif">
            Never stress about wrong sizing on interview morning. When you reserve a size, we automatically pack <strong className="text-neutral-950 font-semibold">Selected + 1 Size Smaller + 1 Size Larger</strong> in a sealed wardrobe bag. Try them on in your hostel room, keep the sharpest fit, and hand back the rest to our runner.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sound.playBeep(600);
                setShowExplanation(!showExplanation);
              }}
              className="text-sm font-semibold text-neutral-900 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>3-Size Breakdown</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showExplanation ? 'rotate-180' : ''}`} />
            </button>

            {onOpenHowItWorks && (
              <>
                <span className="text-neutral-300">•</span>
                <button
                  onClick={() => {
                    sound.playBeep(620);
                    onOpenHowItWorks();
                  }}
                  className="text-sm font-semibold text-neutral-800 hover:text-blue-600 underline underline-offset-4 cursor-pointer"
                >
                  Full Rental Process (Booking to Return)
                </button>
              </>
            )}

            <span className="text-neutral-300">•</span>

            <button
              onClick={() => {
                sound.playScanChirp();
                onOpenScanner();
              }}
              className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Ruler className="w-4 h-4" />
              <span>Unsure of your size? Open Fit Assistant</span>
            </button>
          </div>
        </div>

        {/* Apple 3-Size Box Visualizer */}
        <div className="bg-neutral-50/90 border border-black/[0.04] rounded-3xl p-6 sm:p-7 text-center sm:min-w-[360px]">
          <div className="flex items-center justify-between text-sm text-neutral-500 mb-4 font-semibold">
            <span>What arrives at your room:</span>
            <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold text-xs">
              Free Add-On
            </span>
          </div>

          {/* Size Pills */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="border border-black/[0.06] bg-white rounded-2xl p-3.5 text-center shadow-xs">
              <span className="text-xs block text-neutral-400 font-medium">Fitted</span>
              <span className="text-lg sm:text-xl font-bold text-neutral-700">{sizes[0]}</span>
              <span className="text-xs text-neutral-400 block mt-0.5">Try on</span>
            </div>

            <div className="border-2 border-neutral-900 bg-white rounded-2xl p-3.5 text-center shadow-sm relative scale-105">
              <span className="text-xs block text-blue-600 font-bold">Your Pick</span>
              <span className="text-xl sm:text-2xl font-extrabold text-neutral-900">{sizes[1]}</span>
              <span className="text-xs text-neutral-900 font-semibold block mt-0.5">Selected</span>
            </div>

            <div className="border border-black/[0.06] bg-white rounded-2xl p-3.5 text-center shadow-xs">
              <span className="text-xs block text-neutral-400 font-medium">Roomier</span>
              <span className="text-lg sm:text-xl font-bold text-neutral-700">{sizes[2]}</span>
              <span className="text-xs text-neutral-400 block mt-0.5">Try on</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 bg-white border border-black/[0.04] rounded-2xl py-2.5 px-4">
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
            className="mt-8 pt-8 border-t border-neutral-100 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-black/[0.04]">
                <span className="text-sm font-bold text-neutral-900 block mb-1.5">1. Doorstep Delivery</span>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Our campus runner arrives with 3 sizes in a clean sanitized garment cover right outside your hostel wing.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-black/[0.04]">
                <span className="text-sm font-bold text-neutral-900 block mb-1.5">2. 5-Minute Try-On</span>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Slip into them in front of your mirror to check shoulder drape and sleeve length. Keep the one that looks sharpest.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-black/[0.04]">
                <span className="text-sm font-bold text-neutral-900 block mb-1.5">3. Next-Day Return</span>
                <p className="text-sm text-neutral-600 leading-relaxed">
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

