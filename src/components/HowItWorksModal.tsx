import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, ArrowRight } from 'lucide-react';
import { RentalProcessGuide } from './RentalProcessGuide';
import { sound } from '../utils/soundEffects';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrowseRentals: () => void;
  onOpenFitScanner: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onBrowseRentals,
  onOpenFitScanner,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playBeep(400);
            onClose();
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden my-auto max-h-[92vh] flex flex-col z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-neutral-100 bg-neutral-50/80 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">How Stark Formals Works</h3>
                <p className="text-xs text-neutral-500">Step-by-step student rental & return walkthrough</p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playBeep(450);
                onClose();
              }}
              className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-4 sm:p-8 overflow-y-auto">
            <RentalProcessGuide
              onBrowseRentals={() => {
                onClose();
                onBrowseRentals();
              }}
              onOpenFitScanner={() => {
                onClose();
                onOpenFitScanner();
              }}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
