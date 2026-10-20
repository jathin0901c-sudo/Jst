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
  const [hostel, setHostel] = useState(selectedCampus.hostels?.[0] || 'Main Hostel Gate');
  const [customHostel, setCustomHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');
  const [expressDelivery, setExpressDelivery] = useState(isExpressGlobal);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const hasRentals = items.some(i => i.orderType === 'rental');
  const rentalItems = items.filter(i => i.orderType === 'rental');
  const rentalSubtotal = rentalItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const retailSubtotal = items.filter(i => i.orderType !== 'rental').reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const subtotal = rentalSubtotal + retailSubtotal;
  const expressCharge = (expressDelivery && hasRentals) ? 49 : 0;

  // Pre-Damage Prevention Deposit for branded rentals
  const depositAmount = rentalItems.reduce((acc, item) => {
    if (item.product.department === 'ethnic') return acc + (1000 * item.quantity);
    if (item.product.category === 'combo') return acc + (2000 * item.quantity);
    if (item.product.category === 'blazer' || item.product.category === 'mens_blazers' || item.product.category === 'formal_suits') return acc + (1500 * item.quantity);
    return acc;
  }, 0);

  // Total payable now
  const total = depositAmount > 0
    ? (depositAmount + retailSubtotal + expressCharge)
    : (subtotal + expressCharge);

  const expectedRefund = depositAmount > 0 ? Math.max(0, depositAmount - rentalSubtotal) : 0;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!roomNumber.trim() || !studentName.trim() || !studentPhone.trim()) {
      setValidationError('Please complete hostel room number, student name, and mobile number.');
      return;
    }

    setValidationError('');
    sound.playHologramConfirm();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `OD-${Math.floor(100000 + Math.random() * 900000)}`;
      const finalHostelName = customHostel.trim() || hostel;
      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...items],
        campus: selectedCampus.name,
        hostel: finalHostelName,
        roomNumber,
        studentName,
        studentPhone,
        paymentMethod,
        expressDelivery,
        subtotal,
        expressCharge,
        depositAmount: depositAmount > 0 ? depositAmount : undefined,
        expectedRefund: expectedRefund > 0 ? expectedRefund : undefined,
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
      <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full max-w-xl bg-[#fdf9f0] border-l border-amber-500/30 h-full flex flex-col text-[#0b162c] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-amber-600/15 flex items-center justify-between shrink-0 bg-[#fdf9f0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f2ebd8] border border-amber-500/30 flex items-center justify-center text-amber-800">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0b162c] tracking-tight font-serif">
                  Bag ({items.length})
                </h2>
                <p className="text-xs text-amber-800 font-medium">Campus Delivery for {selectedCampus.name}</p>
              </div>
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

          {/* Body content */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-neutral-400 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#f2ebd8] border border-amber-500/30 flex items-center justify-center text-amber-800">
                <ShoppingBag className="w-9 h-9 stroke-[1.5]" />
              </div>
              <p className="text-xl font-bold text-[#0b162c] font-serif">Your bag is empty</p>
              <p className="text-sm text-neutral-600 max-w-sm leading-relaxed font-serif">
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
                      className="p-5 rounded-3xl bg-[#f4ebd9] border border-amber-600/20 space-y-3.5 relative shadow-xs"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-2xl border border-amber-600/20 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-[#0b162c] text-sm sm:text-base truncate font-serif">
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
                            <span className="px-2.5 py-1 rounded-lg bg-[#fdf9f0] border border-amber-600/25 text-[#0b162c] font-bold">
                              Size {item.selectedSize}
                            </span>
                            <span className="capitalize font-medium text-amber-900">
                              {item.orderType === 'rental' ? `Rent (${item.rentalDays || 1} day)` : 'New Retail'}
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between mt-3">
                            <span className="text-base font-extrabold text-[#0b162c] font-serif">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3-Size Guarantee Pill for Rentals */}
                      {item.orderType === 'rental' && isBlazer && item.guaranteedSizes && (
                        <div className="bg-[#fdf9f0] border border-amber-600/25 rounded-2xl p-3.5 text-xs space-y-1.5">
                          <div className="flex items-center justify-between text-[#0b162c]">
                            <span className="flex items-center gap-2 font-bold font-serif">
                              <Layers className="w-4 h-4 text-amber-700" />
                              3-Size Delivery Box Included:
                            </span>
                            <span className="text-emerald-800 font-bold text-xs bg-emerald-100/70 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                              ₹0 Free
                            </span>
                          </div>
                          <p className="text-neutral-600 text-xs leading-relaxed font-serif">
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
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-950 shadow-sm'
                      : 'bg-[#f4ebd9] border-amber-600/20 text-[#0b162c] hover:bg-[#eae0cb]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Flame className={`w-5 h-5 ${expressDelivery ? 'text-amber-600' : 'text-neutral-400'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0b162c] block text-sm font-serif">30-Min Flash Priority Delivery</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-1.5 py-0.5 rounded-full">2h Gate Drop is Free</span>
                      </div>
                      <span className="text-xs text-neutral-600 font-medium">Standard 2-hour gate drop is ₹0. Upgrade for 30m doorstep flash drop.</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-950 font-bold text-xs shrink-0 border border-amber-500/30">
                    +₹49
                  </span>
                </div>
              )}

              {/* Hostel Delivery Coordinates Form */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 bg-[#f4ebd9] p-6 rounded-3xl border border-amber-600/20 shadow-xs">
                <span className="text-amber-800 font-bold text-xs block uppercase tracking-wider">
                  Hostel Delivery Details
                </span>

                {validationError && (
                  <div className="p-3 rounded-xl bg-red-100 border border-red-300 text-red-900 text-xs font-semibold">
                    {validationError}
                  </div>
                )}

                <div>
                  <label className="text-neutral-600 text-xs font-semibold block mb-1.5">Campus</label>
                  <div className="text-[#0b162c] font-bold text-sm p-3 bg-[#fdf9f0] rounded-2xl border border-amber-600/20 font-serif">
                    {selectedCampus.name}
                  </div>
                </div>

                <div>
                  <label className="text-neutral-600 text-xs font-semibold block mb-1.5">Hostel / Hall / PG</label>
                  {selectedCampus.hostels && selectedCampus.hostels.length > 0 ? (
                    <select
                      value={hostel}
                      onChange={(e) => setHostel(e.target.value)}
                      className="w-full bg-[#fdf9f0] border border-amber-600/25 rounded-2xl p-3 text-[#0b162c] font-medium focus:border-amber-500 outline-none cursor-pointer text-sm transition-colors"
                    >
                      {selectedCampus.hostels.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder="e.g. Tagore Hostel, Girls PG..."
                      value={customHostel}
                      onChange={(e) => setCustomHostel(e.target.value)}
                      className="w-full bg-[#fdf9f0] border border-amber-600/25 rounded-2xl p-3 text-[#0b162c] font-medium focus:border-amber-500 outline-none text-sm transition-colors"
                    />
                  )}
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
                      className="w-full bg-[#fdf9f0] border border-amber-600/25 rounded-2xl p-3 text-[#0b162c] font-medium focus:border-amber-500 outline-none text-sm transition-colors"
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
                      className="w-full bg-[#fdf9f0] border border-amber-600/25 rounded-2xl p-3 text-[#0b162c] font-medium focus:border-amber-500 outline-none text-sm transition-colors"
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
                    className="w-full bg-[#fdf9f0] border border-amber-600/25 rounded-2xl p-3 text-[#0b162c] font-medium focus:border-amber-500 outline-none text-sm transition-colors"
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
                          ? 'bg-[#0b162c] border-amber-500/50 text-white shadow-md'
                          : 'bg-[#fdf9f0] border-amber-600/20 text-[#0b162c] hover:bg-[#f2ebd8]'
                      }`}
                    >
                      <CreditCard className={`w-5 h-5 ${paymentMethod === 'UPI' ? 'text-amber-300' : 'text-neutral-500'}`} />
                      <div>
                        <span className="block font-bold text-xs sm:text-sm font-serif">UPI Fast Pay</span>
                        <span className={`text-xs ${paymentMethod === 'UPI' ? 'text-amber-200/80' : 'text-neutral-500'}`}>GPay / PhonePe</span>
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
                          ? 'bg-[#0b162c] border-amber-500/50 text-white shadow-md'
                          : 'bg-[#fdf9f0] border-amber-600/20 text-[#0b162c] hover:bg-[#f2ebd8]'
                      }`}
                    >
                      <Banknote className={`w-5 h-5 ${paymentMethod === 'COD' ? 'text-amber-300' : 'text-neutral-500'}`} />
                      <div>
                        <span className="block font-bold text-xs sm:text-sm font-serif">Cash on Delivery</span>
                        <span className={`text-xs ${paymentMethod === 'COD' ? 'text-amber-200/80' : 'text-neutral-500'}`}>Cash at Gate</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Pre Damage Prevention Deposit Notice */}
                {depositAmount > 0 ? (
                  <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-950 text-xs leading-relaxed space-y-1.5 font-serif">
                    <div className="flex items-center gap-2 font-bold text-amber-950">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Pre Damage Prevention Deposit: ₹{depositAmount}</span>
                    </div>
                    <p className="text-amber-900 text-xs leading-relaxed">
                      As all blazers are high-value branded garments (Allen Solly, Raymond, Van Heusen), a ₹{depositAmount} deposit is collected upfront. When our agent confirms no damage at your gate upon return, we deduct ₹{rentalSubtotal} and send back the remaining <strong>₹{expectedRefund}</strong> straight to your UPI!
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs leading-relaxed flex items-center gap-3 font-medium">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span className="font-serif">
                      <strong className="font-bold">Verified Student Checkout:</strong> Fast dispatch to campus hostels across Delhi NCR & Rohtak.
                    </span>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Footer Billing Bar */}
          {items.length > 0 && (
            <div className="bg-[#f4ebd9] border-t border-amber-600/20 p-6 sm:p-7 space-y-4 shrink-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600 font-serif">
                  <span>Rental / Items Fee:</span>
                  <span className="text-[#0b162c] font-bold">₹{subtotal}</span>
                </div>
                {depositAmount > 0 && (
                  <div className="flex justify-between text-amber-900 font-semibold font-serif">
                    <span>Pre-Damage Prevention Deposit:</span>
                    <span>₹{depositAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-800 font-medium font-serif">
                  <span>2-Hour Gate Drop:</span>
                  <span className="font-bold">Free</span>
                </div>
                {expressCharge > 0 && (
                  <div className="flex justify-between text-amber-800 font-medium font-serif">
                    <span>30-Min Flash Priority Delivery:</span>
                    <span className="font-bold">+₹49</span>
                  </div>
                )}
                {depositAmount > 0 && (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-1 font-serif">
                    <div className="flex justify-between font-bold">
                      <span>Refund on Gate Return:</span>
                      <span className="text-emerald-800 font-extrabold text-sm">₹{expectedRefund} back to UPI</span>
                    </div>
                    <div className="text-[11px] text-emerald-900 leading-snug">
                      *Agent confirms zero damage ➔ we deduct ₹{rentalSubtotal} & immediately send back ₹{expectedRefund}.
                    </div>
                  </div>
                )}
                <div className="flex justify-between text-[#0b162c] font-bold text-base pt-3 border-t border-amber-600/20 font-serif">
                  <span>Total Payable Now:</span>
                  <span className="text-2xl font-extrabold tracking-tight text-[#0b162c]">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#0b162c] hover:bg-[#122449] disabled:opacity-50 text-white font-bold text-sm sm:text-base transition-all cursor-pointer shadow-md flex items-center justify-center gap-2.5 active:scale-[0.99] border border-amber-500/40"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
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
