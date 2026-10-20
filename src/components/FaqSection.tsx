import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How does the free 3-Size Backup Guarantee work?',
    a: 'Whenever you rent a blazer, suit, or ethnic outfit, our logistics team automatically packs your chosen size plus one size smaller and one size larger in the same delivery bag. Try all three on at your hostel room, pick the one that fits you best, and return the other two immediately to the delivery runner at zero extra charge.'
  },
  {
    q: 'Do I need to wash or dry clean the outfit before returning it?',
    a: 'Absolutely not. Never wash or iron rented garments in your hostel. Simply pack the outfit into the provided sterile return bag. Every garment undergoes mandatory hospital-grade organic hydrocarbon dry wash, UV-C germicidal decontamination, and 140°C form steam pressing before it can ever be rented again.'
  },
  {
    q: 'Is there a security deposit for college students?',
    a: 'Zero security deposit is required for verified college students studying at our partner campuses (IIT Delhi, DTU, DU, NSUT, IIIT, IIM Rohtak, MDU, etc.). Just verify your college email ID or show your student ID card at delivery.'
  },
  {
    q: 'How quickly can you deliver to my hostel room?',
    a: 'We operate dedicated runner stations located within 1.5km of each major campus hub. Priority express delivery takes 35 to 50 minutes directly to your hostel gate in Delhi NCR and Rohtak.'
  },
  {
    q: 'What is the difference between Renting and Buying?',
    a: 'Renting allows you to wear premium branded formalwear or designer ethnic pieces for 1 to 7 days starting at ₹149/day. Buying gives you permanent ownership of brand-new retail items or inspected senior-curated pieces at 50% to 70% off retail MRP.'
  },
  {
    q: 'How does the ₹149 Garment Care & Dry Cleaning service work?',
    a: 'If you have your own blazer, sherwani, or saree that has food stains, creases, or needs fresh sanitization before an event, our runner picks it up from your hostel gate. It is processed in our central dry clean facility and delivered back ready to wear within 24 hours.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    sound.playSelectTone();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#faf5ea] border-t border-amber-600/20 text-[#0b162c]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-semibold tracking-widest text-amber-800 block mb-2 font-regal">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#0b162c] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-600 mt-2 font-light">
            Everything you need to know about campus rentals, sizes, hygiene proofs, and deposits.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#fdf9f1] border border-amber-600/25 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base font-editorial text-[#0b162c]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light border-t border-amber-600/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
