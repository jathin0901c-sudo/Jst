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
    <div className="bg-white border border-black/[0.06] rounded-3xl p-6 sm:p-7 mb-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h3 className="font-bold text-neutral-900 text-lg sm:text-xl tracking-tight">
                Placement Interview Tomorrow?
              </h3>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-semibold">
                Free 2-Hour Gate Drop
              </span>
            </div>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              2-Hour express gate drop is <strong className="text-emerald-700 font-semibold">100% FREE</strong> (3 sizes included). Need an emergency flash delivery in ~30 mins? Priority express is available for +₹49.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
          <button
            onClick={() => {
              sound.playExpressPing();
              onToggleExpress();
            }}
            className={`px-5 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              isExpressActive
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80'
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
            className="px-5 py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-semibold cursor-pointer flex items-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <span>View Blazers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

