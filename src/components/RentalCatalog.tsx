import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { Product, CampusLocation } from '../types';
import { PRODUCTS } from '../data/mockProducts';
import { sound } from '../utils/soundEffects';

interface RentalCatalogProps {
  onSelectProduct: (product: Product) => void;
  onOpenHygieneModal: (product: Product) => void;
  onQuickRent: (product: Product, size: string) => void;
  selectedCampus: CampusLocation;
  isExpressActive: boolean;
  selectedSizeGlobal: string;
}

export const RentalCatalog: React.FC<RentalCatalogProps> = ({
  onSelectProduct,
  onOpenHygieneModal,
  onQuickRent,
  selectedCampus,
  selectedSizeGlobal
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'blazer' | 'combo' | 'tie'>('all');
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});

  const rentalItems = PRODUCTS.filter(p => p.type === 'rental' || p.type === 'both');

  const filteredItems = rentalItems.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const getActiveSize = (product: Product) => {
    if (selectedSizes[product.id]) return selectedSizes[product.id];
    if (selectedSizeGlobal && product.sizes.includes(selectedSizeGlobal)) return selectedSizeGlobal;
    return product.sizes[0];
  };

  const getTripleSizes = (size: string) => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return [size];
    return [(num - 2).toString(), num.toString(), (num + 2).toString()];
  };

  return (
    <div id="rental-catalog" className="space-y-6 scroll-mt-24">
      {/* Filter Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center p-1.5 rounded-full bg-[#ede3d1] border border-amber-600/20 self-start overflow-x-auto max-w-full shadow-xs">
          <button
            onClick={() => {
              sound.playBeep(550);
              setActiveCategory('all');
            }}
            className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40 font-bold'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            All Rentals ({rentalItems.length})
          </button>

          <button
            onClick={() => {
              sound.playBeep(600);
              setActiveCategory('blazer');
            }}
            className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeCategory === 'blazer'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40 font-bold'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            <span>Blazers</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeCategory === 'blazer' ? 'bg-amber-400 text-[#0b162c]' : 'bg-amber-200/80 text-amber-950'
            }`}>
              ₹199/d
            </span>
          </button>

          <button
            onClick={() => {
              sound.playBeep(650);
              setActiveCategory('combo');
            }}
            className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeCategory === 'combo'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40 font-bold'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            <span>2-Piece Combos</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeCategory === 'combo' ? 'bg-amber-400 text-[#0b162c]' : 'bg-[#e0d6c4] text-amber-950'
            }`}>
              ₹209/d
            </span>
          </button>

          <button
            onClick={() => {
              sound.playBeep(700);
              setActiveCategory('tie');
            }}
            className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeCategory === 'tie'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40 font-bold'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            <span>Silk Ties</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeCategory === 'tie' ? 'bg-amber-400 text-[#0b162c]' : 'bg-[#e0d6c4] text-amber-950'
            }`}>
              ₹39/d
            </span>
          </button>
        </div>

        <div className="text-sm font-medium text-neutral-700 flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Dispatching From: <strong className="text-[#0b162c] font-bold">{selectedCampus.runnerStation}</strong></span>
        </div>
      </div>

      {/* Grid of Clean Product Cards - Off-White Canvas with Navy & Gold Finishing */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
        {filteredItems.map((product) => {
          const currentSize = getActiveSize(product);
          const tripleSizes = getTripleSizes(currentSize);
          const isBlazerOrCombo = product.category === 'blazer' || product.category === 'combo';

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-[#fdf9f0] border border-amber-500/25 rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(11,22,44,0.04)] hover:shadow-[0_20px_50px_rgba(11,22,44,0.12)] hover:border-amber-500/50 transition-all duration-300 flex flex-col group ring-1 ring-amber-500/5"
            >
              {/* Image Canvas with Floating Badges */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-[#f8f3e7]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />

                {/* Top Corner Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#fdf9f0]/95 backdrop-blur-md text-[#0b162c] text-sm font-bold shadow-xs border border-amber-600/30 font-serif">
                    {product.brand}
                  </span>
                  {product.category === 'combo' && (
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0b162c] text-amber-300 text-sm font-semibold shadow-xs border border-amber-500/40">
                      2-Piece (Blazer + Tie)
                    </span>
                  )}
                </div>

                {/* Price Pill */}
                <div className="absolute top-4 right-4 bg-[#fdf9f0]/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-amber-600/30 text-right">
                  <span className="text-sm text-neutral-400 line-through mr-2 font-serif">₹{product.mrp}</span>
                  <span className="text-lg sm:text-xl font-bold text-[#0b162c] font-serif">
                    ₹{product.rentPricePerDay}
                    <span className="text-xs font-semibold text-amber-800 ml-1 font-sans">/day</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 
                    onClick={() => {
                      sound.playBeep(650);
                      onSelectProduct(product);
                    }}
                    className="text-xl sm:text-2xl font-bold text-[#0b162c] hover:text-amber-800 transition-colors cursor-pointer tracking-tight font-serif"
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-600 font-medium">
                    {product.subtitle}
                  </p>
                  
                  {/* Color Badge */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ebd8] border border-amber-600/20 text-xs font-semibold text-[#0b162c]">
                      <span className="w-2 h-2 rounded-full bg-[#0b162c]"></span>
                      Color: {product.color}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed pt-1 font-serif">
                    {product.fabric}
                  </p>
                </div>

                {/* 3-Size Fit Guarantee Clean Row */}
                {isBlazerOrCombo && (
                  <div className="bg-[#f4ebd9] border border-amber-500/25 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-neutral-600 text-xs sm:text-sm font-medium">
                      <span className="flex items-center gap-1.5 text-[#0b162c] font-bold">
                        <Layers className="w-4 h-4 text-amber-700" />
                        3-Size Fitting Box Included:
                      </span>
                      <span className="text-amber-900 bg-amber-500/20 px-2.5 py-0.5 rounded-full font-bold text-xs border border-amber-500/30">
                        Free Guarantee
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm pt-1">
                      <span className="px-3 py-1 rounded-xl bg-[#fdf9f0] text-[#0b162c]/80 border border-amber-600/20 font-medium shadow-xs">
                        Size {tripleSizes[0]}
                      </span>
                      <span className="px-3.5 py-1 rounded-xl bg-[#0b162c] text-amber-300 font-bold shadow-md border border-amber-400">
                        Size {tripleSizes[1]} (Selected)
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-[#fdf9f0] text-[#0b162c]/80 border border-amber-600/20 font-medium shadow-xs">
                        Size {tripleSizes[2]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Size Selector Matrix */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span className="font-medium text-[#0b162c]">Select base fit:</span>
                    <span className="font-bold text-[#0b162c]">Selected Size: {currentSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => {
                          sound.playBeep(550);
                          setSelectedSizes(prev => ({ ...prev, [product.id]: sz }));
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
                          currentSize === sz
                            ? 'bg-[#0b162c] text-amber-300 border-amber-400 shadow-md scale-105 font-bold'
                            : 'bg-[#f2ebd8] hover:bg-[#eae0cb] text-[#0b162c] border-amber-600/20'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hygiene Certificate Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-amber-600/15 text-sm">
                  <button
                    onClick={() => {
                      sound.playBeep(600);
                      onOpenHygieneModal(product);
                    }}
                    className="flex items-center gap-2 text-emerald-800 hover:underline cursor-pointer font-bold"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Dry Cleaned Lab Proof (₹150)</span>
                  </button>

                  <span className="text-amber-800/80 text-xs font-medium">
                    Sanitized {product.hygieneBatch.sanitizedDate}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      sound.playBeep(650);
                      onSelectProduct(product);
                    }}
                    className="py-3.5 px-4 rounded-full bg-[#f2ebd8] hover:bg-[#eae0cb] text-[#0b162c] text-sm font-semibold transition-colors cursor-pointer text-center border border-amber-600/20"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      sound.playHologramConfirm();
                      onQuickRent(product, currentSize);
                    }}
                    className="py-3.5 px-4 rounded-full bg-[#0b162c] hover:bg-[#122449] text-white font-semibold text-sm transition-all cursor-pointer text-center shadow-md flex items-center justify-center gap-2 border border-amber-500/40 active:scale-95"
                  >
                    <span>Rent • ₹{product.rentPricePerDay}</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

