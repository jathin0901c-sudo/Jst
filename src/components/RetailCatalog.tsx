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
      {/* Luxury Retail Banner */}
      <div className="bg-[#fdf9f0] border border-amber-600/30 rounded-3xl p-8 sm:p-10 shadow-md font-serif">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2ebd8] border border-amber-500/30 text-amber-900 text-xs sm:text-sm font-semibold mb-3">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Direct Brand & Outlet Sourcing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b162c] tracking-tight">
              Buy Brand New Formal Essentials
            </h2>
            <p className="text-base text-neutral-700 mt-2 leading-relaxed font-sans">
              Curated tailored essentials from Allen Solly for your permanent corporate wardrobe. Blazers (₹5k–6k), 4-Piece Combos, Non-Iron Shirts, Trousers, Ties, and Oxford Shoes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            {['Allen Solly', 'Bata', 'Hush Puppies'].map((b) => (
              <span key={b} className="px-4 py-1.5 rounded-full bg-[#f2ebd8] border border-amber-600/20 text-[#0b162c] text-xs sm:text-sm font-semibold">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-[#fdf9f0] border border-amber-600/25 p-5 sm:p-6 rounded-3xl shadow-sm space-y-4 font-serif">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center p-1.5 rounded-full bg-[#f2ebd8] border border-amber-600/20 overflow-x-auto max-w-full">
            <button
              onClick={() => {
                sound.playBeep(550);
                setSelectedCategory('all');
              }}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                  : 'text-[#0b162c] hover:text-amber-800'
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
                  ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                  : 'text-[#0b162c] hover:text-amber-800'
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
                  ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                  : 'text-[#0b162c] hover:text-amber-800'
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
                  ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                  : 'text-[#0b162c] hover:text-amber-800'
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
                  ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                  : 'text-[#0b162c] hover:text-amber-800'
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
                  ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                  : 'text-[#0b162c] hover:text-amber-800'
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
                  ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                  : 'text-[#0b162c] hover:text-amber-800'
              }`}
            >
              Shoes
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-600 hidden sm:inline text-sm font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                sound.playBeep(600);
                setSortBy(e.target.value as any);
              }}
              className="bg-[#f2ebd8] border border-amber-600/20 rounded-full px-4 py-2 text-[#0b162c] outline-none cursor-pointer text-sm font-semibold hover:bg-[#eae0cb] transition-colors"
            >
              <option value="featured">Featured Student Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount %</option>
            </select>
          </div>
        </div>

        {/* Brand Filter Pills */}
        <div className="flex items-center gap-2 pt-3 border-t border-amber-600/15 overflow-x-auto">
          <span className="text-neutral-600 text-sm shrink-0 font-medium">Brand:</span>
          <button
            onClick={() => setSelectedBrand('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm cursor-pointer font-semibold transition-all ${
              selectedBrand === 'all'
                ? 'bg-[#0b162c] text-white shadow-xs border border-amber-500/40'
                : 'bg-[#f2ebd8] text-[#0b162c] border border-amber-600/15 hover:bg-[#eae0cb]'
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
                  ? 'bg-[#0b162c] text-white shadow-xs font-semibold border border-amber-500/40'
                  : 'bg-[#f2ebd8] text-[#0b162c] border border-amber-600/15 hover:bg-[#eae0cb]'
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
              className="bg-[#fdf9f0] border border-amber-600/25 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group font-serif"
            >
              <div className="relative h-80 sm:h-96 overflow-hidden bg-[#f8f3e7]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#fdf9f0]/95 backdrop-blur-md text-[#0b162c] text-sm font-bold shadow-xs border border-amber-600/20">
                    {product.brand}
                  </span>
                  {product.category === 'combo' && (
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0b162c] text-amber-300 border border-amber-500/40 text-xs sm:text-sm font-semibold shadow-xs">
                      {product.id.includes('2p') ? '2-Piece (Blazer + Tie)' : '4-Piece Full Suite'}
                    </span>
                  )}
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-600 text-white text-sm font-bold shadow-xs">
                    {discountPercent}% Off
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#fdf9f0]/95 backdrop-blur-md border border-amber-600/20 rounded-2xl px-4 py-2.5 flex items-center justify-between text-sm shadow-xs text-[#0b162c]">
                  <span className="font-semibold">Brand Direct Box</span>
                  <span className="text-emerald-800 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Factory Fresh
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
                    className="text-xl sm:text-2xl font-bold text-[#0b162c] hover:text-amber-700 transition-colors cursor-pointer tracking-tight"
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-600 font-medium font-sans">
                    {product.subtitle}
                  </p>
                  
                  {/* Color Badge */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ebd8] border border-amber-600/20 text-xs font-bold text-[#0b162c]">
                      <span className="w-2 h-2 rounded-full bg-[#0b162c]"></span>
                      Color: {product.color}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b162c]">
                      ₹{product.retailPrice?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-neutral-500 line-through ml-2.5 font-sans">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-emerald-900 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full font-bold">
                    Save ₹{((product.mrp - (product.retailPrice || 0))).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Size options */}
                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span className="font-semibold text-neutral-700">Select Size:</span>
                    <span className="font-bold text-[#0b162c]">Size {size}</span>
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
                            ? 'bg-[#0b162c] text-white shadow-xs scale-105 border border-amber-500/40'
                            : 'bg-[#f4ebd9] text-[#0b162c] border border-amber-600/20 hover:bg-[#eae0cb]'
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
                    className="py-3.5 px-4 rounded-full bg-[#fdf9f0] border border-amber-600/25 hover:bg-[#f2ebd8] text-[#0b162c] text-sm font-bold cursor-pointer text-center transition-colors"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => {
                      sound.playHologramConfirm();
                      onAddToCart(product, size);
                    }}
                    className="py-3.5 px-4 rounded-full bg-[#0b162c] hover:bg-[#122449] text-white font-bold text-sm cursor-pointer flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 border border-amber-500/40"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-300" />
                    <span className="text-amber-300">Add to Bag</span>
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

