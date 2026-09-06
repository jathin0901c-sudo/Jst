import React from 'react';
import { Clock, ArrowRight, Zap } from 'lucide-react';
import { CampusLocation } from '../types';
import { sound } from '../utils/soundEffects';

interface InterviewSosBarProps {
  selectedCampus: CampusLocation;
  isExpressActive: boolean;
  onToggleExpress: () => void;
  onSelectRentBlazer: () => void;
}

export const InterviewSosBar: React.FC<InterviewSosBarProps> = ({
  selectedCampus,
  isExpressActive,
  onToggleExpress,
  onSelectRentBlazer
}) => {
  return (
    <div className="bg-[#fdf9f0] border border-amber-500/25 rounded-3xl p-6 sm:p-7 mb-10 shadow-[0_4px_24px_rgba(11,22,44,0.04)] ring-1 ring-amber-500/10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#f4ebd9] border border-amber-400/50 flex items-center justify-center text-amber-700 shrink-0 shadow-xs">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h3 className="font-bold text-[#0b162c] text-lg sm:text-xl tracking-tight font-serif">
                Placement Interview Tomorrow?
              </h3>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-300/60">
                Free 2-Hour Gate Drop
              </span>
            </div>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-serif">
              2-Hour express gate drop is <strong className="text-emerald-700 font-bold">100% FREE</strong> (3 sizes included in garment bag). Need an emergency flash rush in ~30 mins? Priority express is available for +₹49.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
          <button
            onClick={() => {
              sound.playExpressPing();
              onToggleExpress();
            }}
            className={`px-5 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
              isExpressActive
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-[#080f1f] border-amber-400 shadow-md ring-2 ring-amber-400/30'
                : 'bg-[#f2ebd8] hover:bg-[#eae0cb] text-[#0b162c] border-amber-600/20'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{isExpressActive ? '30m Flash Active (+₹49)' : 'Need in 30 Mins? (+₹49)'}</span>
          </button>

          <button
            onClick={() => {
              sound.playBeep(650);
              onSelectRentBlazer();
            }}
            className="px-5 py-3 rounded-full bg-[#0b162c] hover:bg-[#122449] text-white text-sm font-semibold cursor-pointer flex items-center gap-2 transition-all shadow-md border border-amber-500/40 active:scale-95"
          >
            <span>View Blazers</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

