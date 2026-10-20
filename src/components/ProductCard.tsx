import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, ArrowRight, Eye, ShoppingBag, Calendar, Check, Sparkle } from 'lucide-react';
import { Product } from '../types';
import { sound } from '../utils/soundEffects';

interface ProductCardProps {
  product: Product;
  onRentClick: (product: Product, size: string) => void;
  onBuyClick: (product: Product, size: string, e: React.MouseEvent) => void;
  onCleanClick: (product: Product) => void;
  onInspectClick: (product: Product) => void;
  onHygieneClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onRentClick,
  onBuyClick,
  onCleanClick,
  onInspectClick,
  onHygieneClick,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback image if remote url fails
  const displayImage = imageError
    ? (product.department === 'ethnic' 
        ? 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
        : '/images/allen_solly_navy_blazer.jpg')
    : product.image;

  return (
    <div className="group relative flex flex-col bg-[#fdf9f1] border border-amber-600/20 hover:border-amber-600/45 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 text-[#0b162c]">
      {/* Visual Image Container with Zoom Effect */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f4ebd9]">
        <img
          src={displayImage}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle royal gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c]/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {/* Availability Status */}
          <div className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md shadow-xs bg-[#0b162c]/85 text-amber-300 border border-amber-400/30">
            {product.availability}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Inspect Button */}
            <button
              type="button"
              onClick={() => {
                sound.playSelectTone();
                onInspectClick(product);
              }}
              title="Quick View Details"
              className="w-8 h-8 rounded-full bg-[#fdf9f1]/90 hover:bg-white text-[#0b162c] border border-amber-500/30 flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Favorite Button */}
            <button
              type="button"
              onClick={() => {
                sound.playBeep(isFavorited ? 400 : 700);
                setIsFavorited(!isFavorited);
              }}
              className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95 ${
                isFavorited
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : 'bg-[#fdf9f1]/90 hover:bg-white text-neutral-600 border-amber-500/30'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Senior Donated / Certified Hygiene Proof Tag */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10">
          <button
            type="button"
            onClick={() => {
              sound.playSelectTone();
              onHygieneClick(product);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0b162c]/90 hover:bg-[#071120] text-emerald-300 border border-emerald-400/40 text-[10px] font-semibold backdrop-blur-md cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>₹150 Dry Clean Proof</span>
          </button>

          {product.seniorDonated && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/90 text-slate-950 font-bold backdrop-blur-xs">
              Alumni Donated
            </span>
          )}
        </div>

        {/* Desktop Quick Action Buttons (Revealed on Hover) */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-14 flex-col gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
          <button
            type="button"
            onClick={() => {
              sound.playSelectTone();
              onRentClick(product, selectedSize);
            }}
            className="w-full py-2.5 px-3 rounded-xl gold-luxury-btn text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Rent for ₹{product.rentPricePerDay}/day</span>
          </button>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                sound.playSelectTone();
                onBuyClick(product, selectedSize, e);
              }}
              className="py-2 px-2 rounded-xl bg-[#0b162c]/95 hover:bg-[#122346] text-[#faf5ea] border border-amber-400/40 text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3 h-3 text-amber-300" />
              <span>Buy ₹{product.retailPrice?.toLocaleString('en-IN')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playSelectTone();
                onCleanClick(product);
              }}
              className="py-2 px-2 rounded-xl bg-white/95 hover:bg-amber-50 text-[#0b162c] border border-amber-500/40 text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md active:scale-95 transition-all"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Clean ₹{product.cleanPrice || 149}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Category line */}
          <div className="flex items-center justify-between text-xs text-amber-900/80 mb-1">
            <span className="font-semibold tracking-wider uppercase text-[10px] text-amber-800">
              {product.brand}
            </span>
            <span className="text-[11px] text-neutral-500">
              ★ {product.rating} ({product.reviewsCount})
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onInspectClick(product)}
            className="text-base font-bold font-editorial text-[#0b162c] line-clamp-1 hover:text-amber-800 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Size Selector */}
        <div className="pt-2 border-t border-amber-600/15">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
              Select Size
            </span>
            <span className="text-[10px] text-emerald-800 font-medium">
              Free Backup Included
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    sound.playSelectTone();
                    setSelectedSize(size);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-[#0b162c] text-[#faf5ea] border-[#0b162c] shadow-xs'
                      : 'bg-[#f4ebd9]/60 hover:bg-[#f4ebd9] text-[#0b162c] border-amber-600/25'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Triple Price Display */}
        <div className="pt-3 border-t border-amber-600/15 bg-[#f4ebd9]/40 -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-3.5 sm:p-4 rounded-b-3xl">
          <div className="grid grid-cols-3 gap-1 text-center divide-x divide-amber-600/20 text-xs">
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-bold block">Rent</span>
              <span className="font-bold text-amber-900 text-sm">
                ₹{product.rentPricePerDay}
                <span className="text-[10px] text-neutral-500 font-normal">/day</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-bold block">Buy</span>
              <span className="font-bold text-[#0b162c] text-sm">
                ₹{product.retailPrice?.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-bold block">Clean</span>
              <span className="font-bold text-emerald-900 text-sm">
                ₹{product.cleanPrice || 149}
              </span>
            </div>
          </div>

          {/* Mobile Buttons (Always Visible on Touch Devices) */}
          <div className="sm:hidden mt-3 grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onRentClick(product, selectedSize)}
              className="py-2 rounded-xl gold-luxury-btn text-[11px] font-bold shadow-xs active:scale-95"
            >
              Rent
            </button>
            <button
              type="button"
              onClick={(e) => onBuyClick(product, selectedSize, e)}
              className="py-2 rounded-xl bg-[#0b162c] text-[#faf5ea] text-[11px] font-semibold active:scale-95"
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => onCleanClick(product)}
              className="py-2 rounded-xl bg-white text-[#0b162c] border border-amber-500/40 text-[11px] font-semibold active:scale-95"
            >
              Clean
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
