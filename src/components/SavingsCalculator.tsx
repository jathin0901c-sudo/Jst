import React, { useState } from 'react';
import { Sparkles, ArrowDownRight } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const SavingsCalculator: React.FC = () => {
  const [wearsPerYear, setWearsPerYear] = useState(2);
  const [estimatedRetailPrice, setEstimatedRetailPrice] = useState(8500);

  const totalBuyCost = estimatedRetailPrice + (wearsPerYear * 250); // garment + maintenance dry cleaning
  const totalRentCost = wearsPerYear * 199;
  const netSaved = totalBuyCost - totalRentCost;
  const percentSaved = Math.round((netSaved / totalBuyCost) * 100);

  return (
    <div className="bg-white border border-black/[0.06] rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 mb-8 gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            The Economics of Formal Rental
          </h3>
          <p className="text-base text-neutral-600 mt-1">
            College students wear a suit an average of 2 times a year. See what you save.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-sm font-bold self-start sm:self-center border border-emerald-100">
          <ArrowDownRight className="w-5 h-5 text-emerald-600" />
          <span>Save {percentSaved}% Cash</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Sliders */}
        <div className="lg:col-span-1 space-y-6 bg-neutral-50/80 p-6 sm:p-7 rounded-3xl border border-black/[0.04] flex flex-col justify-center">
          <div>
            <div className="flex justify-between text-sm font-semibold text-neutral-700 mb-2">
              <span>Events / Interviews this year:</span>
              <span className="text-neutral-900 font-bold">{wearsPerYear} time{wearsPerYear > 1 ? 's' : ''}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={wearsPerYear}
              onChange={(e) => {
                sound.playBeep(500 + parseInt(e.target.value) * 60);
                setWearsPerYear(parseInt(e.target.value));
              }}
              className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1.5 font-medium">
              <span>1 (Interview)</span>
              <span>2 (Farewell)</span>
              <span>5 (Frequent)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold text-neutral-700 mb-2">
              <span>Showroom Retail Price:</span>
              <span className="text-neutral-900 font-bold">₹{estimatedRetailPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="4000"
              max="15000"
              step="1000"
              value={estimatedRetailPrice}
              onChange={(e) => {
                sound.playBeep(620);
                setEstimatedRetailPrice(parseInt(e.target.value));
              }}
              className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1.5 font-medium">
              <span>₹4k (Entry)</span>
              <span>₹8.5k (Raymond/VH)</span>
              <span>₹15k (Premium)</span>
            </div>
          </div>
        </div>

        {/* Side by Side Comparison Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Traditional Buying */}
          <div className="p-7 sm:p-8 rounded-3xl bg-neutral-50/80 border border-black/[0.04] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Buying New from Mall
              </span>
              <div className="text-3xl sm:text-4xl font-bold text-neutral-400 line-through">
                ₹{totalBuyCost.toLocaleString('en-IN')}
              </div>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              High upfront cash burn, body sizing shifts after college, and sits inside your hostel wardrobe gathering dust for 360 days.
            </p>
          </div>

          {/* Blazer Bank Rental */}
          <div className="p-7 sm:p-8 rounded-3xl bg-neutral-900 text-white shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Renting on Blazer Bank
                </span>
                <span className="text-xs font-bold bg-white/15 text-white px-3 py-1 rounded-full">
                  Zero Maintenance
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
                <span>₹{totalRentCost.toLocaleString('en-IN')}</span>
                <span className="text-sm text-neutral-400 font-normal">(@ ₹199/day)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-sm">
              <span className="text-neutral-400 font-medium">Net Money Kept:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-base sm:text-lg">
                <Sparkles className="w-4 h-4" />
                ₹{netSaved.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

