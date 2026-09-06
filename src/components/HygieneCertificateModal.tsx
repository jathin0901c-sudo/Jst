import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, CheckCircle2, QrCode, Sparkles, Receipt } from 'lucide-react';
import { Product } from '../types';
import { sound } from '../utils/soundEffects';

interface HygieneCertificateModalProps {
  product: Product | null;
  onClose: () => void;
}

export const HygieneCertificateModal: React.FC<HygieneCertificateModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const batch = product.hygieneBatch;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl bg-[#fdf9f0] border border-amber-600/30 rounded-3xl shadow-2xl overflow-hidden text-[#0b162c] relative flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-amber-600/15 flex items-center justify-between bg-[#fdf9f0] shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0b162c] tracking-tight font-serif">
                  Hygiene Certificate
                </h3>
                <p className="text-xs text-emerald-800 font-semibold font-serif">
                  Verified Industrial Dry Clean • ID: {batch.certificateId}
                </p>
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

          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Why this matters callout */}
            <div className="bg-emerald-50 border border-emerald-300 p-5 rounded-3xl text-emerald-950 space-y-2">
              <div className="flex items-center gap-2.5 font-bold text-sm font-serif">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>Zero Odor, Sanitized Guarantee</span>
              </div>
              <p className="text-sm text-emerald-900 leading-relaxed font-serif">
                Every blazer undergoes a mandatory ₹150 professional industrial dry clean cycle before hostel delivery. Delivered sealed in sterile protection covers.
              </p>
            </div>

            {/* Bill Proof Box */}
            <div className="bg-[#f4ebd9] border border-amber-600/25 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-600/15 text-sm">
                <span className="text-[#0b162c] flex items-center gap-2 font-bold font-serif">
                  <Receipt className="w-4 h-4 text-amber-700" />
                  Dry Clean Laundry Receipt
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs font-serif">
                  Paid Invoice Proof
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm font-serif">
                <div>
                  <span className="text-neutral-500 block text-xs uppercase font-bold tracking-wider mb-1">Item</span>
                  <span className="text-[#0b162c] font-bold">{product.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs uppercase font-bold tracking-wider mb-1">Invoice No.</span>
                  <span className="text-[#0b162c] font-mono font-bold">{batch.billProofNumber}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs uppercase font-bold tracking-wider mb-1">Wash Cost</span>
                  <span className="text-amber-800 font-bold">₹{batch.washCost}.00</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-xs uppercase font-bold tracking-wider mb-1">Sanitized On</span>
                  <span className="text-neutral-700 font-medium">{batch.sanitizedDate}</span>
                </div>
              </div>
            </div>

            {/* Scientific Disinfection Protocol */}
            <div className="space-y-3">
              <span className="text-xs text-amber-800 font-bold tracking-wider uppercase block font-serif">
                3-Step Disinfection Protocol
              </span>

              <div className="space-y-3 text-sm font-serif">
                <div className="p-4 rounded-2xl bg-[#f4ebd9] border border-amber-600/20 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#0b162c] font-bold">1. Organic Solvent Deep Wash:</span>
                    <p className="text-neutral-600 text-xs mt-1 leading-relaxed">Deep extraction of oils, sweat, and micro-particles without fabric stress.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4ebd9] border border-amber-600/20 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#0b162c] font-bold">2. 254nm UV-C Germicidal Treatment:</span>
                    <p className="text-neutral-600 text-xs mt-1 leading-relaxed">Eliminates 99.99% of surface bacteria and viral contaminants.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4ebd9] border border-amber-600/20 flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#0b162c] font-bold">3. High-Pressure 140°C Sanitizing Steam:</span>
                    <p className="text-neutral-600 text-xs mt-1 leading-relaxed">Restores crisp lapel structure and eliminates micro-wrinkles.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* QA Inspector Stamp & QR */}
            <div className="p-5 rounded-3xl bg-[#f4ebd9] border border-amber-600/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block mb-0.5 font-serif">Certified Facility</span>
                <span className="text-[#0b162c] font-bold text-sm font-serif">{batch.facility}</span>
                <div className="flex items-center gap-2.5 mt-1.5 text-xs text-neutral-600 font-medium font-serif">
                  <span>Inspector: {batch.inspectorId}</span>
                  <span className="text-emerald-800 font-bold">• {batch.labRating}</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white border border-amber-600/25 flex items-center justify-center text-[#0b162c] shadow-xs">
                <QrCode className="w-8 h-8 stroke-[1.5]" />
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 bg-[#f4ebd9] border-t border-amber-600/20 flex justify-end shrink-0">
            <button
              onClick={() => {
                sound.playBeep(500);
                onClose();
              }}
              className="px-7 py-3 rounded-full bg-[#0b162c] hover:bg-[#122449] text-white text-sm font-semibold cursor-pointer transition-all active:scale-95 border border-amber-500/40 font-serif"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
