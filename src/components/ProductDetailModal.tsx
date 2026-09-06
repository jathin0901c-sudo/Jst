import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Flame, 
  Calendar, 
  ShoppingBag
} from 'lucide-react';
import { Product, CampusLocation } from '../types';
import { sound } from '../utils/soundEffects';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product, 
    size: string, 
    orderType: 'rental' | 'retail', 
    rentalDays?: number, 
    express?: boolean
  ) => void;
  onOpenHygieneModal: (product: Product) => void;
  selectedCampus: CampusLocation;
  isExpressActiveGlobal: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenHygieneModal,
  selectedCampus,
  isExpressActiveGlobal
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [orderType, setOrderType] = useState<'rental' | 'retail'>(
    product.type === 'retail' ? 'retail' : 'rental'
  );
  const [rentalDays, setRentalDays] = useState(1);
  const [expressDelivery, setExpressDelivery] = useState(isExpressActiveGlobal);

  const isRental = orderType === 'rental';
  const isBlazerOrCombo = product.category === 'blazer' || product.category === 'combo';

  const getTripleSizes = (size: string) => {
    const num = parseInt(size, 10);
    if (isNaN(num)) return [size];
    return [(num - 2).toString(), num.toString(), (num + 2).toString()];
  };

  const tripleSizes = getTripleSizes(selectedSize);

  // Price calculations
  const rentDaily = product.rentPricePerDay || 199;
  const basePrice = isRental ? rentDaily * rentalDays : (product.retailPrice || 0);
  const expressFee = (isRental && expressDelivery) ? 49 : 0;
  const totalPrice = basePrice + expressFee;

  const handleAction = () => {
    sound.playHologramConfirm();
    onAddToCart(product, selectedSize, orderType, rentalDays, expressDelivery);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/40 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl bg-white border border-black/[0.08] rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.12)] overflow-hidden text-neutral-900 relative flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-amber-600/30 ring-2 ring-amber-500/20 luxury-seal-imprint p-0.5 flex items-center justify-center shrink-0">
                <img
                  src="/blazer_bank_logo.svg"
                  alt="Blazer Bank Seal"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs sm:text-sm font-semibold font-serif">
                {product.brand}
              </span>
              <span className="text-neutral-500 text-xs sm:text-sm font-medium uppercase tracking-wider font-serif">
                {product.category}
              </span>
            </div>

            <button
              onClick={() => {
                sound.playBeep(500);
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-7 sm:p-9 overflow-y-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {/* Product Visual */}
              <div className="space-y-4">
                <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-neutral-50 border border-black/[0.04]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {/* Sourcing pill */}
                  {product.seniorDonated && (
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-black/[0.04] rounded-2xl p-3.5 text-sm text-neutral-800 flex items-center gap-2.5 shadow-xs font-medium">
                      <Sparkles className="w-4 h-4 text-neutral-600 shrink-0" />
                      <span className="truncate">{product.donorCollege}</span>
                    </div>
                  )}
                </div>

                {/* Hygiene Certificate button */}
                {product.dryCleanCertified && (
                  <button
                    onClick={() => {
                      sound.playBeep(650);
                      onOpenHygieneModal(product);
                    }}
                    className="w-full p-4 rounded-2xl bg-emerald-50/80 hover:bg-emerald-50 border border-emerald-200 text-emerald-950 text-left flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold block text-sm">Dry Clean Hygiene Certificate</span>
                        <span className="text-xs text-emerald-800">₹150 Wash Bill Proof • UV-C Chamber Sealed</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-800 underline shrink-0">View Proof</span>
                  </button>
                )}
              </div>

              {/* Product Configuration */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                    {product.name}
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1 font-medium">
                    {product.subtitle}
                  </p>
                  
                  {/* Color and Fabric Specifications */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/[0.04] text-xs font-semibold text-neutral-800">
                      <span className="w-2 h-2 rounded-full bg-neutral-900"></span>
                      Color: {product.color}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 border border-black/[0.04] text-xs font-medium text-neutral-600">
                      Fabric: {product.fabric}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 mt-3.5 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Rental or Buy Mode Toggle */}
                {product.type === 'both' && (
                  <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-neutral-200/70 rounded-full border border-black/[0.04]">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playBeep(550);
                        setOrderType('rental');
                      }}
                      className={`py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        orderType === 'rental'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Rent (@ ₹{product.rentPricePerDay}/day)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playBeep(550);
                        setOrderType('retail');
                      }}
                      className={`py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        orderType === 'retail'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Buy New (@ ₹{product.retailPrice})
                    </button>
                  </div>
                )}

                {/* Size Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span className="font-medium">Select Size:</span>
                    <span className="text-neutral-900 font-bold">Size {selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          sound.playBeep(550);
                          setSelectedSize(sz);
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-neutral-900 text-white shadow-xs scale-105'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3-Size Delivery Protocol Callout for Rentals */}
                {isRental && isBlazerOrCombo && (
                  <div className="bg-neutral-50/90 border border-black/[0.04] rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-neutral-900 font-bold">
                        <Layers className="w-4 h-4 text-neutral-700" />
                        Perfect Fit Guarantee (3 Sizes)
                      </span>
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold text-xs">Included Free</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      We automatically add 1 size larger and 1 size smaller to your delivery package for free. Try all 3 at your hostel, keep the one that fits.
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-neutral-500 text-xs font-medium">Delivered:</span>
                      <span className="px-3 py-1 rounded-lg bg-white border border-black/[0.06] text-neutral-700 text-xs font-semibold">
                        {tripleSizes[0]}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-neutral-900 text-white text-xs font-bold shadow-xs">
                        {tripleSizes[1]} (Chosen)
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-white border border-black/[0.06] text-neutral-700 text-xs font-semibold">
                        {tripleSizes[2]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Rental Duration Slider */}
                {isRental && (
                  <div className="bg-neutral-50/90 border border-black/[0.04] rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-neutral-700 font-medium">
                        <Calendar className="w-4 h-4 text-neutral-500" />
                        Rental Duration:
                      </span>
                      <span className="text-neutral-900 font-bold">{rentalDays} Day{rentalDays > 1 ? 's' : ''}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {[1, 2, 3].map((days) => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => {
                            sound.playBeep(550);
                            setRentalDays(days);
                          }}
                          className={`p-3 rounded-xl text-center cursor-pointer transition-all ${
                            rentalDays === days
                              ? 'bg-neutral-900 text-white shadow-xs'
                              : 'bg-white border border-black/[0.06] text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <span className="block text-sm font-semibold">{days} Day{days > 1 ? 's' : ''}</span>
                          <span className="text-xs opacity-75 font-medium">₹{rentDaily * days}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 30-Min Flash Express Toggle (2h is free) */}
                {isRental && (
                  <div
                    onClick={() => {
                      sound.playExpressPing();
                      setExpressDelivery(!expressDelivery);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      expressDelivery
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-neutral-50 border-black/[0.04] text-neutral-600 hover:bg-neutral-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Flame className={`w-5 h-5 ${expressDelivery ? 'text-amber-600' : 'text-neutral-400'}`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900 text-sm">30-Min Flash Priority Delivery</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">2h Gate Drop is Free</span>
                        </div>
                        <span className="text-xs text-neutral-500">Need it immediately? Upgrade to 30m flash courier</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs shrink-0">
                      +₹49
                    </span>
                  </div>
                )}

                {/* Rental Process Mini Steps */}
                {isRental && (
                  <div className="p-4 rounded-2xl bg-neutral-100/80 border border-black/[0.04] space-y-2">
                    <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                      <span>How Rental Works</span>
                      <span className="text-amber-800 font-bold">Pre-Damage Deposit: ₹1,500</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[11px] pt-1">
                      <div className="p-2 rounded-xl bg-white border border-black/[0.04]">
                        <span className="block font-bold text-neutral-900">1. Order</span>
                        <span className="text-neutral-500 text-[10px] block">Deposit Held</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-black/[0.04]">
                        <span className="block font-bold text-neutral-900">2. 3 Sizes</span>
                        <span className="text-emerald-700 font-bold text-[10px] block">Free 2h Drop</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-black/[0.04]">
                        <span className="block font-bold text-neutral-900">3. Wear</span>
                        <span className="text-neutral-500 text-[10px] block">Ace Event</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-black/[0.04]">
                        <span className="block font-bold text-neutral-900">4. Refund</span>
                        <span className="text-emerald-700 text-[10px] font-bold block">₹1,301 Back</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-500 pt-1 leading-snug">
                      *Agent confirms no damage at gate, we deduct ₹199 and send back remaining to your UPI.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="bg-neutral-50/80 border-t border-neutral-100 p-5 sm:p-6 flex items-center justify-between shrink-0">
            <div>
              <span className="text-xs text-neutral-500 block font-medium uppercase tracking-wider">Rental Fee:</span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold tracking-tight text-neutral-900">
                  ₹{totalPrice}
                </span>
                {isRental && (
                  <span className="text-xs sm:text-sm text-neutral-500 font-medium">
                    (₹199 net rental • 3 sizes included)
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAction}
              className="px-8 py-4 rounded-full bg-neutral-900 hover:bg-black text-white font-semibold text-sm sm:text-base transition-all cursor-pointer shadow-sm flex items-center gap-2.5 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{isRental ? 'Add Rental to Bag' : 'Add to Bag'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
