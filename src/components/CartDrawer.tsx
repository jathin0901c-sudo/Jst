import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ShieldCheck, 
  Flame, 
  Layers, 
  CreditCard, 
  Banknote, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { CartItem, CampusLocation, Order } from '../types';
import { sound } from '../utils/soundEffects';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  selectedCampus: CampusLocation;
  isExpressGlobal: boolean;
  onOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  selectedCampus,
  isExpressGlobal,
  onOrderSuccess
}) => {
  const [hostel, setHostel] = useState(selectedCampus.hostels[0]);
  const [roomNumber, setRoomNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');
  const [expressDelivery, setExpressDelivery] = useState(isExpressGlobal);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const hasRentals = items.some(i => i.orderType === 'rental');
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const expressCharge = (expressDelivery && hasRentals) ? 49 : 0;
  const total = subtotal + expressCharge;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!roomNumber || !studentName || !studentPhone) {
      alert('Please complete hostel room number, student name, and phone.');
      return;
    }

    sound.playHologramConfirm();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `OD-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...items],
        campus: selectedCampus.name,
        hostel,
        roomNumber,
        studentName,
        studentPhone,
        paymentMethod,
        expressDelivery,
        subtotal,
        expressCharge,
        total,
        status: expressDelivery ? 'DISPATCHED_RADAR' : 'OUT_FOR_CAMPUS',
        etaMinutes: expressDelivery ? selectedCampus.expressTimeMins : 120,
        pickupScheduledDate: hasRentals ? 'Tomorrow 10:00 AM - 01:00 PM' : undefined
      };

      setIsProcessing(false);
      onOrderSuccess(newOrder);
      onClearCart();
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full max-w-xl bg-white/95 backdrop-blur-2xl border-l border-black/[0.08] h-full flex flex-col text-neutral-800 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
                  Bag ({items.length})
                </h2>
                <p className="text-xs text-neutral-500 font-medium">Campus Delivery for {selectedCampus.name}</p>
              </div>
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

          {/* Body content */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-neutral-400 space-y-4">
              <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ShoppingBag className="w-9 h-9 stroke-[1.5]" />
              </div>
              <p className="text-xl font-bold text-neutral-900">Your bag is empty</p>
              <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
                Rent blazers @ ₹199/day with our free 3-size guarantee, or browse new formal shirts & ties.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
              {/* Item List */}
              <div className="space-y-4">
                {items.map((item) => {
                  const isBlazer = item.product.category === 'blazer' || item.product.category === 'combo';

                  return (
                    <div
                      key={item.cartItemId}
                      className="p-5 rounded-3xl bg-neutral-50/90 border border-black/[0.04] space-y-3.5 relative"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-2xl border border-black/[0.04] shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-neutral-900 text-sm sm:text-base truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => {
                                sound.playBeep(450);
                                onRemoveItem(item.cartItemId);
                              }}
                              className="text-neutral-400 hover:text-red-500 p-1.5 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2.5 mt-1.5 text-xs text-neutral-500">
                            <span className="px-2.5 py-1 rounded-lg bg-white border border-black/[0.06] text-neutral-800 font-semibold">
                              Size {item.selectedSize}
                            </span>
                            <span className="capitalize font-medium">
                              {item.orderType === 'rental' ? `Rent (${item.rentalDays || 1} day)` : 'New Retail'}
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between mt-3">
                            <span className="text-base font-extrabold text-neutral-900">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3-Size Guarantee Pill for Rentals */}
                      {item.orderType === 'rental' && isBlazer && item.guaranteedSizes && (
                        <div className="bg-white border border-black/[0.04] rounded-2xl p-3.5 text-xs space-y-1.5">
                          <div className="flex items-center justify-between text-neutral-900">
                            <span className="flex items-center gap-2 font-bold">
                              <Layers className="w-4 h-4 text-neutral-600" />
                              3-Size Delivery Box Included:
                            </span>
                            <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-0.5 rounded-full">
                              ₹0 Free
                            </span>
                          </div>
                          <p className="text-neutral-600 text-xs leading-relaxed">
                            Delivers Sizes {item.guaranteedSizes.join(', ')} directly to your room. Keep what fits best!
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 30-Min Flash Express Toggle (2h is free) */}
              {hasRentals && (
                <div
                  onClick={() => {
                    sound.playExpressPing();
                    setExpressDelivery(!expressDelivery);
                  }}
                  className={`p-4 rounded-3xl border cursor-pointer transition-all flex items-center justify-between ${
                    expressDelivery
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-neutral-50 border-black/[0.04] text-neutral-600 hover:bg-neutral-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Flame className={`w-5 h-5 ${expressDelivery ? 'text-amber-600' : 'text-neutral-400'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 block text-sm">30-Min Flash Priority Delivery</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">2h Gate Drop is Free</span>
                      </div>
                      <span className="text-xs text-neutral-500 font-medium">Standard 2-hour gate drop is ₹0. Upgrade for 30m doorstep flash drop.</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs shrink-0">
                    +₹49
                  </span>
                </div>
              )}

              {/* Hostel Delivery Coordinates Form */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 bg-neutral-50/90 p-6 rounded-3xl border border-black/[0.04]">
                <span className="text-neutral-500 font-bold text-xs block uppercase tracking-wider">
                  Hostel Delivery Details
                </span>

                <div>
                  <label className="text-neutral-600 text-xs font-semibold block mb-1.5">Campus</label>
                  <div className="text-neutral-900 font-bold text-sm p-3 bg-white rounded-2xl border border-black/[0.06]">
                    {selectedCampus.name}
                  </div>
                </div>

                <div>
                  <label className="text-neutral-600 text-xs font-semibold block mb-1.5">Hostel / Hall</label>
                  <select
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    className="w-full bg-white border border-black/[0.08] rounded-2xl p-3 text-neutral-900 font-medium focus:border-neutral-900 outline-none cursor-pointer text-sm transition-colors"
                  >
                    {selectedCampus.hostels.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-600 text-xs font-semibold block mb-1.5">Room / Bed</label>
                    <input
                      type="text"
                      placeholder="e.g. 204, Block B"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      required
                      className="w-full bg-white border border-black/[0.08] rounded-2xl p-3 text-neutral-900 font-medium focus:border-neutral-900 outline-none text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-600 text-xs font-semibold block mb-1.5">Student Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      className="w-full bg-white border border-black/[0.08] rounded-2xl p-3 text-neutral-900 font-medium focus:border-neutral-900 outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-600 text-xs font-semibold block mb-1.5">Phone Number (Delivery OTP)</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                    className="w-full bg-white border border-black/[0.08] rounded-2xl p-3 text-neutral-900 font-medium focus:border-neutral-900 outline-none text-sm transition-colors"
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="text-neutral-600 text-xs font-semibold block mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playBeep(550);
                        setPaymentMethod('UPI');
                      }}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                        paymentMethod === 'UPI'
                          ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs'
                          : 'bg-white border-black/[0.06] text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <CreditCard className={`w-5 h-5 ${paymentMethod === 'UPI' ? 'text-white' : 'text-neutral-500'}`} />
                      <div>
                        <span className="block font-bold text-xs sm:text-sm">UPI Fast Pay</span>
                        <span className={`text-xs ${paymentMethod === 'UPI' ? 'text-neutral-300' : 'text-neutral-500'}`}>GPay / PhonePe</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playBeep(550);
                        setPaymentMethod('COD');
                      }}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                        paymentMethod === 'COD'
                          ? 'bg-neutral-900 border-neutral-900 text-white shadow-xs'
                          : 'bg-white border-black/[0.06] text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <Banknote className={`w-5 h-5 ${paymentMethod === 'COD' ? 'text-white' : 'text-neutral-500'}`} />
                      <div>
                        <span className="block font-bold text-xs sm:text-sm">Cash on Delivery</span>
                        <span className={`text-xs ${paymentMethod === 'COD' ? 'text-neutral-300' : 'text-neutral-500'}`}>Cash at Gate</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Security Deposit Waiver */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 text-xs leading-relaxed flex items-center gap-3 font-medium">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    <strong className="font-bold">₹0 Security Deposit Required:</strong> Verified students in Delhi & Rohtak with valid campus ID.
                  </span>
                </div>
              </form>
            </div>
          )}

          {/* Footer Billing Bar */}
          {items.length > 0 && (
            <div className="bg-neutral-50/90 border-t border-neutral-100 p-6 sm:p-7 space-y-4 shrink-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-500">
                  <span>Items Subtotal:</span>
                  <span className="text-neutral-900 font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>2-Hour Gate Drop:</span>
                  <span className="font-bold">Free</span>
                </div>
                {expressCharge > 0 && (
                  <div className="flex justify-between text-amber-800 font-medium">
                    <span>30-Min Flash Priority Delivery:</span>
                    <span className="font-bold">+₹49</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Student Fitting & Return Pickup:</span>
                  <span className="font-bold">Free</span>
                </div>
                <div className="flex justify-between text-neutral-900 font-bold text-base pt-3 border-t border-neutral-200">
                  <span>Total Amount:</span>
                  <span className="text-2xl font-extrabold tracking-tight text-neutral-900">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-neutral-900 hover:bg-black disabled:opacity-50 text-white font-bold text-sm sm:text-base transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2.5 active:scale-[0.99]"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-white" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>Place Order (₹{total})</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
