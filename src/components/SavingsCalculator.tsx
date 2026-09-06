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
    <div className="bg-[#fdf9f0] border border-amber-600/20 rounded-3xl p-8 sm:p-10 shadow-md mb-10 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-amber-600/15 mb-8 gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0b162c] tracking-tight font-serif">
            The Economics of Formal Rental
          </h3>
          <p className="text-base text-neutral-600 mt-1 font-serif">
            College students wear a suit an average of 2 times a year. See what you save.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-sm font-bold self-start sm:self-center border border-emerald-200 font-serif">
          <ArrowDownRight className="w-5 h-5 text-emerald-600" />
          <span>Save {percentSaved}% Cash</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Sliders */}
        <div className="lg:col-span-1 space-y-6 bg-[#f4ebd9] p-6 sm:p-7 rounded-3xl border border-amber-600/20 flex flex-col justify-center">
          <div>
            <div className="flex justify-between text-sm font-semibold text-neutral-700 mb-2 font-serif">
              <span>Events / Interviews this year:</span>
              <span className="text-[#0b162c] font-bold">{wearsPerYear} time{wearsPerYear > 1 ? 's' : ''}</span>
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
              className="w-full accent-amber-600 cursor-pointer h-2 bg-[#e2d8c3] rounded-lg appearance-none"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1.5 font-medium font-serif">
              <span>1 (Interview)</span>
              <span>2 (Farewell)</span>
              <span>5 (Frequent)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold text-neutral-700 mb-2 font-serif">
              <span>Showroom Retail Price:</span>
              <span className="text-[#0b162c] font-bold">₹{estimatedRetailPrice.toLocaleString('en-IN')}</span>
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
              className="w-full accent-amber-600 cursor-pointer h-2 bg-[#e2d8c3] rounded-lg appearance-none"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1.5 font-medium font-serif">
              <span>₹4k (Entry)</span>
              <span>₹8.5k (Raymond/VH)</span>
              <span>₹15k (Premium)</span>
            </div>
          </div>
        </div>

        {/* Side by Side Comparison Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Traditional Buying */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#f4ebd9] border border-amber-600/20 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2 font-serif">
                Buying New from Mall
              </span>
              <div className="text-3xl sm:text-4xl font-bold text-neutral-400 line-through font-serif">
                ₹{totalBuyCost.toLocaleString('en-IN')}
              </div>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed font-serif">
              High upfront cash burn, body sizing shifts after college, and sits inside your hostel wardrobe gathering dust for 360 days.
            </p>
          </div>

          {/* Blazer Bank Rental in Royal Navy & Gold */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#0b162c] text-white shadow-xl flex flex-col justify-between space-y-4 border border-amber-500/40">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-200/80 uppercase tracking-wider font-serif">
                  Renting on Blazer Bank
                </span>
                <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-serif">
                  Zero Maintenance
                </span>
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white flex items-baseline gap-2 font-serif">
                <span>₹{totalRentCost.toLocaleString('en-IN')}</span>
                <span className="text-sm text-amber-200/70 font-normal font-sans">(@ ₹199/day)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-sm font-serif">
              <span className="text-amber-100/70 font-medium">Net Money Kept:</span>
              <span className="text-amber-300 font-bold flex items-center gap-1.5 text-base sm:text-lg">
                <Sparkles className="w-4 h-4 text-amber-400" />
                ₹{netSaved.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

