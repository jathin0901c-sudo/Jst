import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ShoppingBag, Sparkles, Check, ArrowRight, ShieldCheck, Box, RefreshCcw } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ServiceExplanationProps {
  onRentClick: () => void;
  onBuyClick: () => void;
  onCleanClick: () => void;
}

export const ServiceExplanation: React.FC<ServiceExplanationProps> = ({
  onRentClick,
  onBuyClick,
  onCleanClick,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#faf5ea] text-[#0b162c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-semibold tracking-widest text-amber-800 block mb-2 font-regal">
            Three Ways to Wear
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#0b162c] tracking-tight">
            Rent, Buy, or Clean
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 font-light">
            Why spend ₹8,000+ for an outfit you’ll wear twice? Blazer Bank gives college students flexible access to India’s best ethnic and formal fashion.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1: Rent */}
          <div className="bg-[#fdf9f1] border border-amber-600/25 rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0b162c] text-amber-300 flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block font-mono">
                  From ₹149 – ₹499 / day
                </span>
                <h3 className="text-xl font-bold font-editorial text-[#0b162c] mt-0.5">
                  Rent for Occasions
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Perfect for 1 to 7 day events — campus placements, Diwali melas, farewell galas, or model UN debates.
              </p>

              <ul className="space-y-2 pt-2 border-t border-amber-600/15 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Free 3-Size Backup Box</strong> included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Delivered sealed in sterile garment covers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Free doorstep hostel pickup (no wash needed)</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playSelectTone();
                onRentClick();
              }}
              className="mt-6 w-full py-3 rounded-2xl gold-luxury-btn text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
            >
              <span>Explore Rental Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 2: Buy */}
          <div className="bg-[#fdf9f1] border border-amber-600/25 rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#350910] text-amber-300 flex items-center justify-center shadow-md">
                <ShoppingBag className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block font-mono">
                  Up to 70% Off Retail MRP
                </span>
                <h3 className="text-xl font-bold font-editorial text-[#0b162c] mt-0.5">
                  Buy for Keeps
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Build your long-term formal and ethnic wardrobe with brand-new pieces and senior-curated circular gems.
              </p>

              <ul className="space-y-2 pt-2 border-t border-amber-600/15 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>100% authentic Raymond & Allen Solly</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Inspected for zero fabric flaws or wear</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Guaranteed college buy-back option later</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playSelectTone();
                onBuyClick();
              }}
              className="mt-6 w-full py-3 rounded-2xl bg-[#0b162c] hover:bg-[#122346] text-[#faf5ea] border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
            >
              <span>Shop Retail Outfits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 3: Clean & Care */}
          <div className="bg-[#fdf9f1] border border-amber-600/25 rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-900 text-emerald-200 flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block font-mono">
                  Only ₹149 / Garment
                </span>
                <h3 className="text-xl font-bold font-editorial text-[#0b162c] mt-0.5">
                  Garment Care Service
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Give your personal blazers, lehengas, and suits the royal treatment with certified industrial sanitation.
              </p>

              <ul className="space-y-2 pt-2 border-t border-amber-600/15 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>254nm UV-C germicidal sanitation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>140°C crisp high-pressure steam press</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>24h rapid hostel pickup & delivery</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playSelectTone();
                onCleanClick();
              }}
              className="mt-6 w-full py-3 rounded-2xl bg-white hover:bg-amber-50 text-[#0b162c] border border-amber-600/40 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
            >
              <span>Book Care Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
