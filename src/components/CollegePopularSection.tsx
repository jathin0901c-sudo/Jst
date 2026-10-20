import React from 'react';
import { motion } from 'motion/react';
import { Flame, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product, CampusLocation } from '../types';
import { ProductCard } from './ProductCard';
import { sound } from '../utils/soundEffects';

interface CollegePopularSectionProps {
  products: Product[];
  campus: CampusLocation;
  onRentClick: (product: Product, size: string) => void;
  onBuyClick: (product: Product, size: string, e: React.MouseEvent) => void;
  onCleanClick: (product: Product) => void;
  onInspectClick: (product: Product) => void;
  onHygieneClick: (product: Product) => void;
}

export const CollegePopularSection: React.FC<CollegePopularSectionProps> = ({
  products,
  campus,
  onRentClick,
  onBuyClick,
  onCleanClick,
  onInspectClick,
  onHygieneClick,
}) => {
  // Select top 4 trending products based on campus rating and reviews
  const trending = [...products]
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#f4ebd9]/40 border-t border-amber-600/20 text-[#0b162c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 text-xs font-semibold mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Campus Live Radar</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-[#0b162c] tracking-tight">
              Popular Near {campus.name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-light">
              Most reserved formal and ethnic pieces by students and alumni at {campus.shortName} hostels this week.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fdf9f1] border border-amber-600/25 text-xs text-neutral-700 shadow-xs">
            <MapPin className="w-4 h-4 text-amber-700" />
            <span>Runner station: <strong className="text-[#0b162c]">{campus.runnerStation}</strong></span>
          </div>
        </div>

        {/* 4 Cards Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((product) => (
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
