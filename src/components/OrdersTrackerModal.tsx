import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  X, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Package
} from 'lucide-react';
import { Order, DryCleanBooking } from '../types';
import { sound } from '../utils/soundEffects';

interface OrdersTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  dryCleanOrders: DryCleanBooking[];
}

export const OrdersTrackerModal: React.FC<OrdersTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
  dryCleanOrders
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-3xl bg-white border border-black/[0.08] rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.14)] overflow-hidden text-neutral-800 relative flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                  Orders & Live Deliveries
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  Track campus runners & pickups in real time
                </p>
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

          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {orders.length === 0 && dryCleanOrders.length === 0 ? (
              <div className="text-center py-16 text-neutral-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <Package className="w-8 h-8 stroke-[1.5]" />
                </div>
                <p className="text-base font-bold text-neutral-800">No active orders</p>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Rent a blazer or book a dry clean to track live delivery progress here.
                </p>
              </div>
            ) : (
              <>
                {/* Orders List */}
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-3xl bg-neutral-50/90 border border-black/[0.04] space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200/70 pb-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-neutral-900 text-sm sm:text-base">{ord.id}</span>
                        <span className="px-3 py-1 rounded-full bg-neutral-200/80 text-neutral-900 text-xs font-semibold">
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-neutral-700 font-semibold text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        <span>ETA: ~{ord.etaMinutes} mins</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-400 block text-xs uppercase font-bold tracking-wider mb-1">Destination</span>
                        <span className="text-neutral-900 font-semibold">{ord.hostel}, Room {ord.roomNumber}</span>
                        <span className="text-neutral-500 block text-xs mt-0.5">{ord.campus}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-xs uppercase font-bold tracking-wider mb-1">Payment</span>
                        <span className="text-neutral-900 font-semibold">₹{ord.total} via {ord.paymentMethod}</span>
                        {ord.expressDelivery && (
                          <span className="text-amber-800 block text-xs font-bold mt-0.5">⚡ 30-Min Flash Priority Delivery Active</span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-1">
                      <div className="flex justify-between text-xs text-neutral-500 font-medium">
                        <span className="text-neutral-900 font-bold">Dispatched</span>
                        <span className="text-neutral-800 font-bold">On-Campus Runner</span>
                        <span>Delivered</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div className="h-full bg-neutral-900 w-2/3 rounded-full" />
                      </div>
                    </div>

                    {ord.pickupScheduledDate && (
                      <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-between text-xs sm:text-sm font-medium">
                        <span className="text-neutral-500">Next-Day Return Pickup:</span>
                        <span className="text-neutral-900 font-bold">{ord.pickupScheduledDate}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Dry Clean Orders List */}
                {dryCleanOrders.map((dc) => (
                  <div
                    key={dc.id}
                    className="p-6 rounded-3xl bg-neutral-50/90 border border-black/[0.04] space-y-3"
                  >
                    <div className="flex justify-between items-center border-b border-neutral-200/70 pb-3">
                      <span className="font-bold text-neutral-900 text-sm sm:text-base">{dc.id} (Dry Clean)</span>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                        {dc.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="text-sm text-neutral-600 space-y-1">
                      <div>Pickup Slot: <span className="text-neutral-900 font-semibold">{dc.pickupSlot}</span></div>
                      <div>Hostel: <span className="text-neutral-900 font-semibold">{dc.hostel}, Room {dc.roomNumber}</span></div>
                      <div className="text-emerald-800 font-bold pt-1.5 text-base">Total: ₹{dc.totalCost}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="p-5 sm:p-6 bg-neutral-50/80 border-t border-neutral-100 flex justify-end">
            <button
              onClick={() => {
                sound.playBeep(500);
                onClose();
              }}
              className="px-7 py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-semibold cursor-pointer transition-all active:scale-95"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
