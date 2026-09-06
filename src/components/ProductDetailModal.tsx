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
          className="w-full max-w-4xl bg-[#fdf9f0] border border-amber-600/30 rounded-3xl shadow-2xl overflow-hidden text-[#0b162c] relative flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-amber-600/15 flex items-center justify-between shrink-0 bg-[#fdf9f0]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-amber-500/40 ring-2 ring-amber-500/20 luxury-seal-imprint p-0.5 flex items-center justify-center shrink-0">
                <img
                  src="/blazer_bank_logo.svg"
                  alt="Blazer Bank Seal"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="px-4 py-1.5 rounded-full bg-[#f2ebd8] border border-amber-500/30 text-[#0b162c] text-xs sm:text-sm font-semibold font-serif">
                {product.brand}
              </span>
              <span className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider font-serif">
                {product.category}
              </span>
            </div>

            <button
              onClick={() => {
                sound.playBeep(500);
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-[#f2ebd8] hover:bg-[#eae0cb] text-[#0b162c] border border-amber-600/20 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-7 sm:p-9 overflow-y-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {/* Product Visual */}
              <div className="space-y-4">
                <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-[#f4ebd9] border border-amber-600/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {/* Sourcing pill */}
                  {product.seniorDonated && (
                    <div className="absolute bottom-4 left-4 right-4 bg-[#fdf9f0]/95 backdrop-blur-md border border-amber-600/20 rounded-2xl p-3.5 text-sm text-[#0b162c] flex items-center gap-2.5 shadow-sm font-serif">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
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
                    className="w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-left flex items-center justify-between cursor-pointer transition-all hover:bg-emerald-100/70"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                      <div>
                        <span className="font-bold block text-sm font-serif">Dry Clean Hygiene Certificate</span>
                        <span className="text-xs text-emerald-800 font-serif">₹150 Wash Bill Proof • UV-C Chamber Sealed</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-800 underline shrink-0 font-serif">View Proof</span>
                  </button>
                )}
              </div>

              {/* Product Configuration */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0b162c] tracking-tight font-serif">
                    {product.name}
                  </h2>
                  <p className="text-sm text-neutral-600 mt-1 font-serif">
                    {product.subtitle}
                  </p>
                  
                  {/* Color and Fabric Specifications */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ebd8] border border-amber-600/25 text-xs font-semibold text-[#0b162c] font-serif">
                      <span className="w-2 h-2 rounded-full bg-[#0b162c]"></span>
                      Color: {product.color}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#f2ebd8] border border-amber-600/25 text-xs font-medium text-neutral-700 font-serif">
                      Fabric: {product.fabric}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 mt-3.5 leading-relaxed font-serif">
                    {product.description}
                  </p>
                </div>

                {/* Rental or Buy Mode Toggle */}
                {product.type === 'both' && (
                  <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#e8dfce] rounded-full border border-amber-600/20">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playBeep(550);
                        setOrderType('rental');
                      }}
                      className={`py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer font-serif ${
                        orderType === 'rental'
                          ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                          : 'text-[#0b162c] hover:text-black'
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
                      className={`py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer font-serif ${
                        orderType === 'retail'
                          ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                          : 'text-[#0b162c] hover:text-black'
                      }`}
                    >
                      Buy New (@ ₹{product.retailPrice})
                    </button>
                  </div>
                )}

                {/* Size Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-neutral-600 font-serif">
                    <span className="font-medium">Select Size:</span>
                    <span className="text-[#0b162c] font-bold">Size {selectedSize}</span>
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
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer font-serif ${
                          selectedSize === sz
                            ? 'bg-[#0b162c] text-white shadow-sm scale-105 border border-amber-500/40'
                            : 'bg-[#f4ebd9] text-[#0b162c] hover:bg-[#eae0cb] border border-amber-600/20'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3-Size Delivery Protocol Callout for Rentals */}
                {isRental && isBlazerOrCombo && (
                  <div className="bg-[#f4ebd9] border border-amber-600/20 rounded-2xl p-5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-[#0b162c] font-bold font-serif">
                        <Layers className="w-4 h-4 text-amber-700" />
                        Perfect Fit Guarantee (3 Sizes)
                      </span>
                      <span className="text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold text-xs font-serif">Included Free</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-serif">
                      We automatically add 1 size larger and 1 size smaller to your delivery package for free. Try all 3 at your hostel, keep the one that fits.
                    </p>

                    <div className="flex items-center gap-2 pt-1 font-serif">
                      <span className="text-amber-800 text-xs font-medium">Delivered:</span>
                      <span className="px-3 py-1 rounded-lg bg-[#fdf9f0] border border-amber-600/25 text-[#0b162c] text-xs font-bold">
                        {tripleSizes[0]}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-[#0b162c] text-white text-xs font-bold shadow-xs border border-amber-500/40">
                        {tripleSizes[1]} (Chosen)
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-[#fdf9f0] border border-amber-600/25 text-[#0b162c] text-xs font-bold">
                        {tripleSizes[2]}
                      </span>
                    </div>
                  </div>
                )}

                {/* Rental Duration Selector */}
                {isRental && (
                  <div className="bg-[#f4ebd9] border border-amber-600/20 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-sm font-serif">
                      <span className="flex items-center gap-2 text-neutral-700 font-medium">
                        <Calendar className="w-4 h-4 text-amber-700" />
                        Rental Duration:
                      </span>
                      <span className="text-[#0b162c] font-bold">{rentalDays} Day{rentalDays > 1 ? 's' : ''}</span>
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
                          className={`p-3 rounded-xl text-center cursor-pointer transition-all font-serif ${
                            rentalDays === days
                              ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                              : 'bg-[#fdf9f0] border border-amber-600/20 text-[#0b162c] hover:bg-[#eae0cb]'
                          }`}
                        >
                          <span className="block text-sm font-bold">{days} Day{days > 1 ? 's' : ''}</span>
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
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-950 shadow-sm'
                        : 'bg-[#f4ebd9] border-amber-600/20 text-[#0b162c] hover:bg-[#eae0cb]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Flame className={`w-5 h-5 ${expressDelivery ? 'text-amber-600' : 'text-neutral-400'}`} />
                      <div>
                        <div className="flex items-center gap-2 font-serif">
                          <span className="font-bold text-[#0b162c] text-sm">30-Min Flash Priority Delivery</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-1.5 py-0.5 rounded-full">2h Gate Drop is Free</span>
                        </div>
                        <span className="text-xs text-neutral-600 font-serif">Need it immediately? Upgrade to 30m flash courier</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-950 font-bold text-xs shrink-0 border border-amber-500/30 font-serif">
                      +₹49
                    </span>
                  </div>
                )}

                {/* Rental Process Mini Steps */}
                {isRental && (
                  <div className="p-4 rounded-2xl bg-[#f4ebd9] border border-amber-600/20 space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-800 font-bold uppercase tracking-wider font-serif">
                      <span>How Rental Works</span>
                      <span className="text-amber-900 font-bold">Pre-Damage Deposit: ₹1,500</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[11px] pt-1 font-serif">
                      <div className="p-2 rounded-xl bg-[#fdf9f0] border border-amber-600/20">
                        <span className="block font-bold text-[#0b162c]">1. Order</span>
                        <span className="text-neutral-500 text-[10px] block">Deposit Held</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#fdf9f0] border border-amber-600/20">
                        <span className="block font-bold text-[#0b162c]">2. 3 Sizes</span>
                        <span className="text-emerald-800 font-bold text-[10px] block">Free 2h Drop</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#fdf9f0] border border-amber-600/20">
                        <span className="block font-bold text-[#0b162c]">3. Wear</span>
                        <span className="text-neutral-500 text-[10px] block">Ace Event</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#fdf9f0] border border-amber-600/20">
                        <span className="block font-bold text-[#0b162c]">4. Refund</span>
                        <span className="text-emerald-800 text-[10px] font-bold block">₹1,301 Back</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-600 pt-1 leading-snug font-serif">
                      *Agent confirms no damage at gate, we deduct ₹199 and send back remaining to your UPI.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="bg-[#f4ebd9] border-t border-amber-600/20 p-5 sm:p-6 flex items-center justify-between shrink-0">
            <div>
              <span className="text-xs text-amber-800 block font-bold uppercase tracking-wider font-serif">Rental Fee:</span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl font-extrabold tracking-tight text-[#0b162c] font-serif">
                  ₹{totalPrice}
                </span>
                {isRental && (
                  <span className="text-xs sm:text-sm text-neutral-600 font-medium font-serif">
                    (₹199 net rental • 3 sizes included)
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAction}
              className="px-8 py-4 rounded-full bg-[#0b162c] hover:bg-[#122449] text-white font-semibold text-sm sm:text-base transition-all cursor-pointer shadow-md flex items-center gap-2.5 active:scale-95 border border-amber-500/40 font-serif"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span>{isRental ? 'Add Rental to Bag' : 'Add to Bag'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
