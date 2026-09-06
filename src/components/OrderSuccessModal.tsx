import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Calendar, 
  Package, 
  ArrowRight
} from 'lucide-react';
import { Order } from '../types';
import { sound } from '../utils/soundEffects';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onOpenOrders: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose, onOpenOrders }) => {
  useEffect(() => {
    if (order) {
      sound.playHologramConfirm();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#1d1d1f', '#0071e3', '#34c759', '#f59e0b']
        });
      } catch {
        // Fallback if canvas is constrained
      }
    }
  }, [order]);

  if (!order) return null;

  const hasRentals = order.items.some(i => i.orderType === 'rental');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl bg-white border border-black/[0.08] rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.14)] overflow-hidden text-neutral-800 relative flex flex-col max-h-[88vh]"
        >
          {/* Top Banner */}
          <div className="p-7 sm:p-8 text-center border-b border-neutral-100 bg-white relative shrink-0">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-white border border-amber-600/30 ring-2 ring-amber-500/20 luxury-seal-imprint p-0.5 flex items-center justify-center shrink-0">
                <img
                  src="/blazer_bank_logo.svg"
                  alt="Blazer Bank Seal"
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 stroke-[2]" />
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 font-semibold font-serif">
              Blazer Bank Dispatch • Order #{order.id}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight mt-2.5 font-serif">
              Dispatched to Your Hostel Gate
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-1.5 font-serif">
              Estimated campus arrival: <strong className="text-neutral-900 font-bold">{order.etaMinutes} minutes</strong>
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
            {/* Live Delivery Status Widget */}
            <div className="p-5 sm:p-6 rounded-3xl bg-neutral-50/90 border border-black/[0.04] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Package className="w-6 h-6" />
              </div>

              <div>
                <span className="text-sm font-bold text-neutral-900 block">
                  Campus Runner Dispatched
                </span>
                <p className="text-neutral-600 text-sm mt-0.5">
                  Heading to <strong className="text-neutral-900 font-semibold">{order.hostel}</strong>, Room {order.roomNumber}
                </p>
                <div className="text-xs text-neutral-400 mt-1 font-medium">
                  Recipient: {order.studentName} • {order.studentPhone}
                </div>
              </div>
            </div>

            {/* 3-Size Guarantee Reminder */}
            {hasRentals && (
              <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200/60 text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>3 Sizes Included in Your Package</span>
                </div>
                <p className="text-sm text-emerald-900 leading-relaxed">
                  Your courier bag contains your selected size plus 1 size larger and 1 size smaller. Try all three in your hostel room, keep the best fit!
                </p>
              </div>
            )}

            {/* Next-Day Pickup Reminder */}
            {order.pickupScheduledDate && (
              <div className="p-4 sm:p-5 rounded-3xl bg-neutral-50/90 border border-black/[0.04] flex items-start gap-3.5">
                <Calendar className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-900 block text-sm">Doorstep Return Pickup</span>
                  <p className="text-neutral-600 text-sm mt-0.5 leading-relaxed">
                    Scheduled for {order.pickupScheduledDate}. Runner will collect from your hostel room or gate.
                  </p>
                </div>
              </div>
            )}

            {/* Item Breakdown */}
            <div className="bg-neutral-50/90 p-5 sm:p-6 rounded-3xl border border-black/[0.04] space-y-3">
              <span className="text-xs text-neutral-400 uppercase font-bold block tracking-wider">Package Summary</span>
              <div className="space-y-2 text-sm">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-neutral-700">
                    <span className="font-medium">
                      {it.product.name} (Size {it.selectedSize})
                    </span>
                    <span className="font-bold text-neutral-900">₹{it.price}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-neutral-200/70 space-y-1 text-sm">
                {order.depositAmount && (
                  <div className="flex justify-between text-amber-900 font-medium">
                    <span>Pre-Damage Prevention Deposit:</span>
                    <span>₹{order.depositAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-neutral-900">
                  <span>Total Amount ({order.paymentMethod}):</span>
                  <span className="text-base font-extrabold text-neutral-900">
                    ₹{order.total}
                  </span>
                </div>
                {order.expectedRefund && (
                  <div className="pt-1.5 text-xs text-emerald-800 font-semibold flex justify-between bg-emerald-50/80 p-2 rounded-xl">
                    <span>Refund on Zero-Damage Return:</span>
                    <span>₹{order.expectedRefund} (₹199 rental fee deducted)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-5 sm:p-6 bg-neutral-50/80 border-t border-neutral-100 flex gap-3 shrink-0">
            <button
              onClick={() => {
                sound.playBeep(550);
                onOpenOrders();
                onClose();
              }}
              className="flex-1 py-4 rounded-full bg-neutral-900 hover:bg-black text-white font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              <span>Track Live Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playBeep(500);
                onClose();
              }}
              className="px-7 py-4 rounded-full bg-white border border-black/[0.08] hover:bg-neutral-100 text-neutral-700 text-sm font-semibold cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
