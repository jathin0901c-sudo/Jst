import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, ShieldCheck, Sparkles, Check, Truck, 
  Clock, ArrowRight, Info, AlertCircle, ShoppingBag 
} from 'lucide-react';
import { Product, CampusLocation } from '../types';
import { sound } from '../utils/soundEffects';

interface RentalBookingModalProps {
  product: Product | null;
  selectedSize: string;
  campus: CampusLocation;
  isExpressDefault: boolean;
  onClose: () => void;
  onConfirmRental: (
    product: Product, 
    size: string, 
    days: number, 
    startDate: string, 
    endDate: string,
    isExpress: boolean
  ) => void;
}

export const RentalBookingModal: React.FC<RentalBookingModalProps> = ({
  product,
  selectedSize: initialSize,
  campus,
  isExpressDefault,
  onClose,
  onConfirmRental,
}) => {
  if (!product) return null;

  const [size, setSize] = useState(initialSize || product.sizes[0] || '40');
  const [days, setDays] = useState(1);
  const [isExpress, setIsExpress] = useState(isExpressDefault);

  // Today's date formatted as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);

  // Calculate return date based on start date and duration
  const startObj = new Date(startDate || today);
  const endObj = new Date(startObj);
  endObj.setDate(startObj.getDate() + days);
  const endDateFormatted = endObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const startDateFormatted = startObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate pricing
  const dailyRate = product.rentPricePerDay;
  const rentalSubtotal = dailyRate * days;
  const expressCharge = isExpress ? 79 : 0;
  const hygieneFee = 0; // Free dry cleaning included!
  const refundableDeposit = Math.round(dailyRate * 1.5);
  const totalDue = rentalSubtotal + expressCharge;

  // Compute 3-size backup guarantee
  const numSize = parseInt(size, 10);
  const backupSizes = !isNaN(numSize)
    ? [`${numSize - 2}`, `${numSize}`, `${numSize + 2}`]
    : [size];

  const handleBooking = () => {
    sound.playCashRegister();
    onConfirmRental(
      product,
      size,
      days,
      startDate,
      endObj.toISOString().split('T')[0],
      isExpress
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-2xl bg-[#faf5ea] text-[#0b162c] border border-amber-600/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-amber-600/20 bg-[#fdf9f1] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0b162c] text-amber-300 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-editorial text-[#0b162c] leading-tight">
                  Configure Rental Duration & Fit
                </h3>
                <span className="text-xs text-amber-900/80 font-medium">
                  {campus.shortName} · Free Doorstep Pickup
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.playBeep(450);
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-[#f4ebd9] hover:bg-[#e8dcbf] text-[#0b162c] flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
            {/* Product Summary Mini Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#fdf9f1] border border-amber-600/20">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-20 rounded-xl object-cover shrink-0 border border-amber-500/30"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                  {product.brand} · {product.department === 'ethnic' ? 'Ethnic Couture' : 'Formal Wear'}
                </span>
                <h4 className="font-bold text-sm sm:text-base font-editorial text-[#0b162c] truncate">
                  {product.name}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs">
                  <span className="font-bold text-amber-900">
                    ₹{product.rentPricePerDay}/day
                  </span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Dry Clean Sanitized
                  </span>
                </div>
              </div>
            </div>

            {/* Step 1: Select Size with 3-Size Backup Explanation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Primary Size
                </label>
                <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  3-Size Guarantee Active
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      sound.playSelectTone();
                      setSize(s);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                      size === s
                        ? 'bg-[#0b162c] text-[#faf5ea] border-[#0b162c] shadow-sm'
                        : 'bg-[#fdf9f1] hover:bg-[#f4ebd9] text-[#0b162c] border-amber-600/25'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Backup size notice */}
              <div className="mt-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-600/20 text-xs text-amber-950 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Never worry about awkward fit:</strong> We automatically pack size{' '}
                  <span className="font-bold text-[#0b162c] underline">{backupSizes.join(', ')}</span>{' '}
                  in your delivery wardrobe bag at zero extra cost. Keep what fits best!
                </p>
              </div>
            </div>

            {/* Step 2: Animated Rental Duration Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Rental Duration
                </label>
                <span className="text-xs text-amber-900 font-bold">
                  {days} {days === 1 ? 'Day' : 'Days'} Selected
                </span>
              </div>

              {/* Day count buttons */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 mb-4">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      sound.playSelectTone();
                      setDays(num);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      days === num
                        ? 'bg-[#0b162c] text-amber-300 border-[#0b162c] shadow-sm scale-102'
                        : 'bg-[#fdf9f1] hover:bg-[#f4ebd9] text-[#0b162c] border-amber-600/25'
                    }`}
                  >
                    {num} {num === 1 ? 'day' : 'days'}
                  </button>
                ))}
              </div>

              {/* Animated Date Range Display */}
              <motion.div
                key={`dates-${days}-${startDate}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="p-4 rounded-2xl bg-[#0b162c] text-[#faf5ea] border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-amber-300/80 font-bold tracking-wider block">
                      Delivery Window to Hostel
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {startDateFormatted} → {endDateFormatted}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-amber-300/70 font-mono block">
                    Total Duration
                  </span>
                  <span className="text-sm font-mono font-bold text-amber-300">
                    {days * 24} Hours
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Express Delivery Option */}
            <div className="p-4 rounded-2xl bg-[#fdf9f1] border border-amber-600/20 flex items-center justify-between cursor-pointer"
              onClick={() => {
                sound.playSelectTone();
                setIsExpress(!isExpress);
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isExpress ? 'bg-amber-500 text-slate-950' : 'bg-neutral-200 text-neutral-600'}`}>
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-[#0b162c] block">
                    Campus Priority Express (45 Mins)
                  </span>
                  <span className="text-xs text-neutral-600">
                    Direct runner delivery to {campus.shortName} hostel gate
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-amber-900">+₹79</span>
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={() => {}}
                  className="w-4 h-4 text-[#0b162c] accent-[#0b162c] rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Price Breakdown with Animated Total */}
            <div className="p-4 rounded-2xl bg-[#f4ebd9]/60 border border-amber-600/20 space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-700">
                <span>Rental rate ({days} {days === 1 ? 'day' : 'days'} × ₹{dailyRate})</span>
                <span className="font-semibold text-[#0b162c]">₹{rentalSubtotal}</span>
              </div>

              <div className="flex items-center justify-between text-neutral-700">
                <span>Free 3-Size Backup & Dry Clean Seal</span>
                <span className="text-emerald-800 font-semibold">Included (₹0)</span>
              </div>

              {isExpress && (
                <div className="flex items-center justify-between text-neutral-700">
                  <span>Campus Express Delivery Runner</span>
                  <span className="font-semibold text-[#0b162c]">₹{expressCharge}</span>
                </div>
              )}

              <div className="pt-2 border-t border-amber-600/20 flex items-center justify-between text-sm sm:text-base font-bold">
                <span className="text-[#0b162c]">Payable Amount</span>
                {/* Smooth Animated Total Price */}
                <motion.span
                  key={`total-${totalDue}`}
                  initial={{ scale: 1.15, color: '#c59b43' }}
                  animate={{ scale: 1, color: '#0b162c' }}
                  transition={{ duration: 0.2 }}
                  className="text-lg sm:text-xl font-editorial font-bold text-[#0b162c]"
                >
                  ₹{totalDue.toLocaleString('en-IN')}
                </motion.span>
              </div>

              <p className="text-[10px] text-neutral-500 pt-1">
                Zero security deposit required for verified students at {campus.shortName}. Return unwashed in supplied sealed bag.
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 sm:p-6 bg-[#fdf9f1] border-t border-amber-600/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-neutral-600 text-center sm:text-left">
              <span>Primary: </span>
              <strong className="text-[#0b162c]">Size {size}</strong>
              <span> · Includes backup sizes</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-amber-600/30 text-xs font-semibold text-[#0b162c] hover:bg-[#f4ebd9] cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleBooking}
                className="flex-1 sm:flex-none px-7 py-3 rounded-xl gold-luxury-btn text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag & Continue</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
