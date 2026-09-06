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
      {/* Apple-style Filter Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center p-1.5 rounded-full bg-neutral-200/70 border border-black/[0.04] self-start overflow-x-auto max-w-full">
          <button
            onClick={() => {
              sound.playBeep(550);
              setActiveCategory('all');
            }}
            className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-white text-neutral-900 shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
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
                ? 'bg-white text-neutral-900 shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>Blazers</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold">₹199/d</span>
          </button>

          <button
            onClick={() => {
              sound.playBeep(650);
              setActiveCategory('combo');
            }}
            className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeCategory === 'combo'
                ? 'bg-white text-neutral-900 shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>2-Piece Combos</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-semibold">₹209/d</span>
          </button>

          <button
            onClick={() => {
              sound.playBeep(700);
              setActiveCategory('tie');
            }}
            className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeCategory === 'tie'
                ? 'bg-white text-neutral-900 shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>Silk Ties</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-semibold">₹39/d</span>
          </button>
        </div>

        <div className="text-sm font-medium text-neutral-600 flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Dispatching From: <strong className="text-neutral-900 font-semibold">{selectedCampus.runnerStation}</strong></span>
        </div>
      </div>

      {/* Grid of Clean Apple Product Cards - Generous Space */}
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
              className="bg-white border border-black/[0.06] rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col group"
            >
              {/* Image Canvas with Floating Apple Badges */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-[#fbfbfd]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />

                {/* Top Corner Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-neutral-900 text-sm font-semibold shadow-xs border border-black/[0.04]">
                    {product.brand}
                  </span>
                  {product.category === 'combo' && (
                    <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-sm font-semibold shadow-xs">
                      2-Piece (Blazer + Tie)
                    </span>
                  )}
                </div>

                {/* Price Pill */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-black/[0.04] text-right">
                  <span className="text-sm text-neutral-400 line-through mr-2">₹{product.mrp}</span>
                  <span className="text-lg sm:text-xl font-bold text-neutral-900">
                    ₹{product.rentPricePerDay}
                    <span className="text-xs font-normal text-neutral-500 ml-1">/day</span>
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
                    className="text-xl sm:text-2xl font-bold text-neutral-900 hover:text-blue-600 transition-colors cursor-pointer tracking-tight"
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-500 font-medium">
                    {product.subtitle}
                  </p>
                  
                  {/* Color Badge */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/[0.04] text-xs font-semibold text-neutral-800">
                      <span className="w-2 h-2 rounded-full bg-neutral-900"></span>
                      Color: {product.color}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                    {product.fabric}
                  </p>
                </div>

                {/* 3-Size Fit Guarantee Clean Row */}
                {isBlazerOrCombo && (
                  <div className="bg-neutral-50 border border-black/[0.04] rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-neutral-600 text-xs sm:text-sm font-medium">
                      <span className="flex items-center gap-1.5 text-neutral-900 font-semibold">
                        <Layers className="w-4 h-4 text-blue-600" />
                        3-Size Fitting Box Included:
                      </span>
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold text-xs">
                        Free Guarantee
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm pt-1">
                      <span className="px-3 py-1 rounded-xl bg-white text-neutral-600 border border-black/[0.06] font-medium">
                        Size {tripleSizes[0]}
                      </span>
                      <span className="px-3.5 py-1 rounded-xl bg-neutral-900 text-white font-bold shadow-xs">
                        Size {tripleSizes[1]} (Selected)
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-white text-neutral-600 border border-black/[0.06] font-medium">
                        Size {tripleSizes[2]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Size Selector Matrix */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span className="font-medium text-neutral-700">Select base fit:</span>
                    <span className="font-semibold text-neutral-900">Selected Size: {currentSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => {
                          sound.playBeep(550);
                          setSelectedSizes(prev => ({ ...prev, [product.id]: sz }));
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                          currentSize === sz
                            ? 'bg-neutral-900 text-white shadow-xs scale-105'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hygiene Certificate Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-sm">
                  <button
                    onClick={() => {
                      sound.playBeep(600);
                      onOpenHygieneModal(product);
                    }}
                    className="flex items-center gap-2 text-emerald-700 hover:underline cursor-pointer font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Dry Cleaned Lab Proof (₹150)</span>
                  </button>

                  <span className="text-neutral-400 text-xs font-medium">
                    Sanitized {product.hygieneBatch.sanitizedDate}
                  </span>
                </div>

                {/* Clean Apple Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      sound.playBeep(650);
                      onSelectProduct(product);
                    }}
                    className="py-3.5 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 text-sm font-semibold transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => {
                      sound.playHologramConfirm();
                      onQuickRent(product, currentSize);
                    }}
                    className="py-3.5 px-4 rounded-full bg-neutral-900 hover:bg-black text-white font-semibold text-sm transition-all cursor-pointer text-center shadow-sm flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Rent • ₹{product.rentPricePerDay}</span>
                    <ArrowRight className="w-4 h-4" />
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

