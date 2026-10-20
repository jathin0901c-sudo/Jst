import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Waves, Flame, Award, MoveHorizontal, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface GarmentCareSectionProps {
  onOpenBooking: () => void;
  campusName: string;
}

export const GarmentCareSection: React.FC<GarmentCareSectionProps> = ({ onOpenBooking, campusName }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="garment-care-section" className="py-16 sm:py-24 bg-[#071120] text-[#faf5ea] relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Dry Clean & Micro-Sanitization</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-white tracking-tight">
            Garment Care & Restoration
          </h2>

          <p className="text-sm sm:text-base text-amber-100/75 mt-3 font-light leading-relaxed">
            From farewell champagne spills to placement collar sweat — we restore student blazers, sherwanis, and silk sarees to showroom condition in 24 hours.
          </p>
        </div>

        {/* Interactive Before & After Draggable Slider */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-3">
            <span className="text-xs text-amber-300/80 font-mono uppercase tracking-wider flex items-center justify-center gap-1.5">
              <MoveHorizontal className="w-4 h-4" />
              Drag the golden divider left or right to inspect fabric rejuvenation
            </span>
          </div>

          <div
            ref={containerRef}
            onMouseDown={() => {
              setIsDragging(true);
              sound.playSelectTone();
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[360px] sm:h-[460px] rounded-3xl overflow-hidden border border-amber-500/35 shadow-2xl select-none cursor-ew-resize bg-[#091222]"
          >
            {/* "After" Image (Full background) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/allen_solly_navy_blazer.jpg)',
                filter: 'brightness(1.04) contrast(1.08)'
              }}
            >
              {/* After Label */}
              <div className="absolute top-4 right-4 z-20 bg-emerald-950/85 border border-emerald-400/50 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-300 block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  After Care: Restored & Pristine
                </span>
                <span className="text-[10px] text-emerald-200/80">
                  140°C Sanitizing Steam · Zero Creases · Crisp Lapel Form
                </span>
              </div>
            </div>

            {/* "Before" Image (Clipped by slider percentage) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center w-[1000px] sm:w-[1200px]"
                style={{
                  backgroundImage: 'url(/images/allen_solly_navy_blazer.jpg)',
                  filter: 'grayscale(0.35) brightness(0.82) sepia(0.28) contrast(0.92)'
                }}
              >
                {/* Visual overlay simulating wrinkles & dullness */}
                <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />
                <div className="absolute top-1/3 left-1/4 w-12 h-12 rounded-full bg-amber-900/40 blur-xs border border-amber-800/20" />
                
                {/* Before Label */}
                <div className="absolute top-4 left-4 z-20 bg-red-950/85 border border-red-500/40 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                  <span className="text-xs uppercase font-bold tracking-wider text-red-300 block">
                    Before: Stained & Creased
                  </span>
                  <span className="text-[10px] text-red-200/80">
                    Hostel Wardrobe Creases · Food & Dust Stains
                  </span>
                </div>
              </div>
            </div>

            {/* Draggable Divider Line & Golden Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Vertical line */}
              <div className="w-[3px] h-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.8)]" />

              {/* Center Handle Button */}
              <div className="absolute w-12 h-12 rounded-full bg-[#0b162c] border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-2xl shadow-amber-900/80 pointer-events-auto cursor-grab active:cursor-grabbing">
                <MoveHorizontal className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Steps of Professional Garment Care */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0b162c]/80 border border-amber-500/20 rounded-3xl p-6 relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-4">
              <Waves className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold uppercase">Step 01</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2 font-editorial">
              Organic Hydrocarbon Wash
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed font-light">
              Gentle extraction of perspiration, oil, and micro-particles without damaging delicate wool, katan silk, or velvet fibers.
            </p>
          </div>

          <div className="bg-[#0b162c]/80 border border-amber-500/20 rounded-3xl p-6 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Step 02</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2 font-editorial">
              254nm UV-C Germicidal Decontamination
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed font-light">
              Hospital-grade disinfection eradicates 99.99% of surface bacteria and odor molecules before delivery to campus hostels.
            </p>
          </div>

          <div className="bg-[#0b162c]/80 border border-amber-500/20 rounded-3xl p-6 relative">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-400/30 text-red-400 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-red-400 font-bold uppercase">Step 03</span>
            <h3 className="text-lg font-bold text-white mt-1 mb-2 font-editorial">
              140°C High-Pressure Form Steam Press
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed font-light">
              Rebuilds shoulder chest canvas and lapel roll. Outfits are packed in breathable dust-proof sterile garment bags with hangers.
            </p>
          </div>
        </div>

        {/* Campus Care Booking Banner */}
        <div className="bg-gradient-to-r from-[#102042] via-[#0b162c] to-[#350910] border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider block">
              Doorstep Hostel Pickup at {campusName}
            </span>
            <h4 className="text-xl sm:text-2xl font-editorial font-bold text-white">
              Need your own outfit professionally dry cleaned?
            </h4>
            <p className="text-xs sm:text-sm text-amber-100/70">
              Only ₹149 per blazer / ethnic piece · 24-hour turnaround with free pickup and drop.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-full gold-luxury-btn text-sm font-semibold shrink-0 cursor-pointer shadow-lg active:scale-95 transition-all"
          >
            Book Garment Care Pickup
          </button>
        </div>
      </div>
    </section>
  );
};
