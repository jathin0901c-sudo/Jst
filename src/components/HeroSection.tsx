import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, ShieldCheck, ArrowRight, Truck, RefreshCw, 
  ShoppingBag, Calendar, CheckCircle2, Award 
} from 'lucide-react';
import { CampusLocation, FashionDepartment } from '../types';
import { sound } from '../utils/soundEffects';

interface HeroSectionProps {
  department: FashionDepartment;
  campus: CampusLocation;
  onChangePreferences: () => void;
  onExploreDepartment: (dept: FashionDepartment) => void;
  onScrollToCare: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  department,
  campus,
  onChangePreferences,
  onExploreDepartment,
  onScrollToCare,
}) => {
  const isEthnic = department === 'ethnic';

  return (
    <section className="relative overflow-hidden bg-[#071120] text-[#faf5ea] pt-8 pb-16 sm:pb-24 border-b border-amber-500/20">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Campus Personalization Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-amber-500/15">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Curated for {campus.name}</span>
            <span className="text-amber-200/50">·</span>
            <span className="text-amber-200/90">{campus.expressTimeMins}m Direct Hostel Gate Dispatch</span>
          </div>

          <button
            type="button"
            onClick={onChangePreferences}
            className="text-xs text-amber-300 hover:text-white flex items-center gap-1.5 cursor-pointer underline underline-offset-4 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change College or Category</span>
          </button>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold tracking-[0.2em] text-amber-400 block font-regal">
                {isEthnic ? 'Royal Indian Ethnic Couture' : 'Tailored Formal & Placement House'}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-bold text-white tracking-tight leading-[1.12]">
                {isEthnic ? (
                  <>
                    Command the room at{' '}
                    <span className="text-gold-metallic">{campus.shortName}</span>{' '}
                    farewells & fest galas.
                  </>
                ) : (
                  <>
                    Boardroom polish tailored for{' '}
                    <span className="text-gold-metallic">{campus.shortName}</span>{' '}
                    placements.
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-amber-100/75 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Rent haute couture pieces starting at <strong>₹199/day</strong> with a free 3-size backup box, purchase pristine circular wardrobe staples, or send your existing blazer for hospital-grade UV-C dry cleaning.
              </p>
            </div>

            {/* Service Triple CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playSelectTone();
                  const el = document.getElementById(isEthnic ? 'ethnic-section' : 'formals-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-full gold-luxury-btn text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xl active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Rent Outfits (from ₹199)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSelectTone();
                  const el = document.getElementById(isEthnic ? 'ethnic-section' : 'formals-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-[#0b162c] hover:bg-[#122346] text-[#faf5ea] border border-amber-400/40 text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer active:scale-95 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300" />
                <span>Buy Outfits</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSelectTone();
                  onScrollToCare();
                }}
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-amber-400/20 text-xs sm:text-sm font-medium flex items-center gap-1.5 cursor-pointer backdrop-blur-md active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Care Service (₹149)</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-amber-500/15 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="font-bold text-amber-300 text-sm sm:text-base font-editorial block">
                  3-Size Guarantee
                </span>
                <span className="text-[11px] text-amber-100/60 leading-tight block">
                  We pack +1 and -1 size for free in case you need it.
                </span>
              </div>
              <div>
                <span className="font-bold text-amber-300 text-sm sm:text-base font-editorial block">
                  ₹150 Dry Clean
                </span>
                <span className="text-[11px] text-amber-100/60 leading-tight block">
                  Sealed proof bill & 254nm UV-C sterilized.
                </span>
              </div>
              <div>
                <span className="font-bold text-amber-300 text-sm sm:text-base font-editorial block">
                  Free Doorstep Drop
                </span>
                <span className="text-[11px] text-amber-100/60 leading-tight block">
                  Direct runner pickup from your campus hostel.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Dual Fashion Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Primary Image Card */}
              <div className="rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl bg-[#0b162c] aspect-[4/5] relative group">
                <img
                  src={isEthnic
                    ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
                    : '/images/allen_solly_navy_blazer.jpg'
                  }
                  alt={isEthnic ? 'Ethnic Wear' : 'Formals'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-transparent to-black/20" />

                {/* Floating Category Switcher on Image */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-[#0b162c]/90 border border-amber-400/40 backdrop-blur-md shadow-xl text-left">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-amber-300 font-bold uppercase tracking-wider text-[10px]">
                      Quick Switch Department
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      In Stock at Hub #4
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => onExploreDepartment('ethnic')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
                        isEthnic
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                          : 'bg-[#071120] text-amber-100 border-amber-400/25 hover:border-amber-400/50'
                      }`}
                    >
                      Ethnic Wear
                    </button>

                    <button
                      type="button"
                      onClick={() => onExploreDepartment('formals')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold cursor-pointer transition-all border ${
                        !isEthnic
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                          : 'bg-[#071120] text-amber-100 border-amber-400/25 hover:border-amber-400/50'
                      }`}
                    >
                      Blazers & Formals
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
