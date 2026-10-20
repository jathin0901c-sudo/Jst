import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Filter } from 'lucide-react';
import { Product, EthnicCategory } from '../types';
import { ProductCard } from './ProductCard';
import { sound } from '../utils/soundEffects';

interface EthnicWearCollectionProps {
  products: Product[];
  onRentClick: (product: Product, size: string) => void;
  onBuyClick: (product: Product, size: string, e: React.MouseEvent) => void;
  onCleanClick: (product: Product) => void;
  onInspectClick: (product: Product) => void;
  onHygieneClick: (product: Product) => void;
}

const ETHNIC_CATEGORIES: { id: EthnicCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Ethnic Wear' },
  { id: 'sarees', label: 'Sarees' },
  { id: 'lehengas', label: 'Lehengas' },
  { id: 'kurtas', label: 'Kurtas & Kurta Sets' },
  { id: 'sherwanis', label: 'Sherwanis' },
  { id: 'indo_western', label: 'Indo-Western Outfits' },
  { id: 'dupattas_accessories', label: 'Dupattas & Accessories' },
];

export const EthnicWearCollection: React.FC<EthnicWearCollectionProps> = ({
  products,
  onRentClick,
  onBuyClick,
  onCleanClick,
  onInspectClick,
  onHygieneClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<EthnicCategory | 'all'>('all');

  const ethnicProducts = products.filter(p => p.department === 'ethnic');
  const filteredProducts = activeCategory === 'all'
    ? ethnicProducts
    : ethnicProducts.filter(p => p.category === activeCategory);

  return (
    <section id="ethnic-section" className="py-16 sm:py-24 bg-[#faf5ea] border-t border-amber-600/20 text-[#0b162c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#350910] text-amber-300 border border-amber-500/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Royal Indian Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-[#0b162c] tracking-tight">
              Ethnic Wear Collection
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 font-light max-w-xl">
              Authentic handlooms, rich velvets, and modern Indo-western silhouettes tailored for campus farewells, Diwali fests, and cultural nights.
            </p>
          </div>

          <div className="text-sm text-neutral-600 font-medium font-editorial">
            Showing <strong className="text-amber-900">{filteredProducts.length}</strong> haute couture items
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {ETHNIC_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playSelectTone();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#350910] text-[#faf5ea] border-amber-500/60 shadow-md ring-1 ring-amber-400/40'
                    : 'bg-[#fdf9f1] hover:bg-[#f4ebd9] text-[#0b162c] border-amber-600/25'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRentClick={onRentClick}
              onBuyClick={onBuyClick}
              onCleanClick={onCleanClick}
              onInspectClick={onInspectClick}
              onHygieneClick={onHygieneClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
