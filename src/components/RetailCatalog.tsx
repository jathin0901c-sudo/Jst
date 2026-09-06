import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockProducts';
import { sound } from '../utils/soundEffects';

interface RetailCatalogProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const RetailCatalog: React.FC<RetailCatalogProps> = ({
  onSelectProduct,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'blazer' | 'combo' | 'shirt' | 'trouser' | 'tie' | 'shoes'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'discount'>('featured');
  const [chosenSizes, setChosenSizes] = useState<{ [productId: string]: string }>({});

  const retailProducts = PRODUCTS.filter(p => p.type === 'retail' || p.type === 'both');
  const brands = Array.from(new Set(retailProducts.map(p => p.brand.split(' ')[0])));

  const filtered = retailProducts.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedBrand !== 'all' && !p.brand.toLowerCase().includes(selectedBrand.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    const priceA = a.retailPrice || 0;
    const priceB = b.retailPrice || 0;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'discount') {
      const discA = (a.mrp - priceA) / a.mrp;
      const discB = (b.mrp - priceB) / b.mrp;
      return discB - discA;
    }
    return 0;
  });

  const getActiveSize = (product: Product) => {
    return chosenSizes[product.id] || product.sizes[0];
  };

  return (
    <div className="space-y-8">
      {/* Clean Apple Retail Banner */}
      <div className="bg-white border border-black/[0.06] rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs sm:text-sm font-semibold mb-3">
              <Sparkles className="w-4 h-4 text-neutral-600" />
              <span>Direct Brand & Outlet Sourcing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Buy Brand New Formal Essentials
            </h2>
            <p className="text-base text-neutral-600 mt-2 leading-relaxed">
              Curated tailored essentials from Allen Solly for your permanent corporate wardrobe. Blazers (₹5k–6k), 4-Piece Combos, Non-Iron Shirts, Trousers, Ties, and Oxford Shoes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            {['Allen Solly', 'Bata', 'Hush Puppies'].map((b) => (
              <span key={b} className="px-4 py-1.5 rounded-full bg-neutral-100 border border-black/[0.04] text-neutral-800 text-xs sm:text-sm font-medium">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white border border-black/[0.06] p-5 sm:p-6 rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center p-1.5 rounded-full bg-neutral-200/70 border border-black/[0.04] overflow-x-auto max-w-full">
            <button
              onClick={() => {
                sound.playBeep(550);
                setSelectedCategory('all');
              }}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Essentials ({retailProducts.length})
            </button>

            <button
              onClick={() => {
                sound.playBeep(600);
                setSelectedCategory('blazer');
              }}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'blazer'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Blazers (from ₹5,499)
            </button>

            <button
              onClick={() => {
                sound.playBeep(620);
                setSelectedCategory('combo');
              }}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'combo'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Combos (2-Pc & 4-Pc)
            </button>

            <button
              onClick={() => {
                sound.playBeep(640);
                setSelectedCategory('tie');
              }}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'tie'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Silk Ties (from ₹899)
            </button>

            <button
              onClick={() => {
                sound.playBeep(660);
                setSelectedCategory('shirt');
              }}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'shirt'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Shirts (₹1,299)
            </button>

            <button
              onClick={() => {
                sound.playBeep(700);
                setSelectedCategory('trouser');
              }}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'trouser'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Trousers (from ₹1,499)
            </button>

            <button
              onClick={() => {
                sound.playBeep(750);
                setSelectedCategory('shoes');
              }}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'shoes'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Shoes
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 hidden sm:inline text-sm font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                sound.playBeep(600);
                setSortBy(e.target.value as any);
              }}
              className="bg-neutral-100 border border-black/[0.06] rounded-full px-4 py-2 text-neutral-800 outline-none cursor-pointer text-sm font-medium hover:bg-neutral-200/80 transition-colors"
            >
              <option value="featured">Featured Student Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount %</option>
            </select>
          </div>
        </div>

        {/* Brand Filter Pills */}
        <div className="flex items-center gap-2 pt-3 border-t border-neutral-100 overflow-x-auto">
          <span className="text-neutral-500 text-sm shrink-0 font-medium">Brand:</span>
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm cursor-pointer font-semibold transition-all ${
              selectedBrand === 'all'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
            }`}
          >
            All Brands
          </button>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => {
                sound.playBeep(600);
                setSelectedBrand(brand);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm cursor-pointer font-medium transition-all ${
                selectedBrand === brand
                  ? 'bg-neutral-900 text-white shadow-xs font-semibold'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Retail Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
        {filtered.map((product) => {
          const size = getActiveSize(product);
          const discountPercent = Math.round(((product.mrp - (product.retailPrice || 0)) / product.mrp) * 100);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-black/[0.06] rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-80 sm:h-96 overflow-hidden bg-[#fbfbfd]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-neutral-900 text-sm font-semibold shadow-xs border border-black/[0.04]">
                    {product.brand}
                  </span>
                  {product.category === 'combo' && (
                    <span className="px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-semibold shadow-xs">
                      {product.id.includes('2p') ? '2-Piece (Blazer + Tie)' : '4-Piece Full Suite'}
                    </span>
                  )}
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-sm font-semibold shadow-xs">
                    {discountPercent}% Off
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-black/[0.05] rounded-2xl px-4 py-2.5 flex items-center justify-between text-sm shadow-xs text-neutral-800">
                  <span className="font-semibold">Brand Direct Box</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Factory Fresh
                  </span>
                </div>
              </div>

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
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                      ₹{product.retailPrice?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-neutral-400 line-through ml-2.5">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold">
                    Save ₹{((product.mrp - (product.retailPrice || 0))).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Size options */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span className="font-medium text-neutral-700">Select Size:</span>
                    <span className="font-semibold text-neutral-900">Size {size}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(sz => (
                      <button
                        key={sz}
                        onClick={() => {
                          sound.playBeep(550);
                          setChosenSizes(prev => ({ ...prev, [product.id]: sz }));
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all ${
                          size === sz
                            ? 'bg-neutral-900 text-white shadow-xs scale-105'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      sound.playBeep(650);
                      onSelectProduct(product);
                    }}
                    className="py-3.5 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 text-sm font-semibold cursor-pointer text-center transition-colors"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => {
                      sound.playHologramConfirm();
                      onAddToCart(product, size);
                    }}
                    className="py-3.5 px-4 rounded-full bg-neutral-900 hover:bg-black text-white font-semibold text-sm cursor-pointer flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
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

