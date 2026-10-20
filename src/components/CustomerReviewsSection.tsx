import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Review {
  id: string;
  student: string;
  college: string;
  role: string;
  occasion: string;
  rating: number;
  outfit: string;
  comment: string;
  verifiedStudent: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    student: 'Aarav Malhotra',
    college: 'IIT Delhi (Nilgiri Hostel)',
    role: 'B.Tech CSE \'24 · Placed at McKinsey',
    occasion: 'Final Partner Interview Round',
    rating: 5,
    outfit: 'Allen Solly Midnight Navy Blazer',
    comment: 'The 3-size backup box saved me. My primary choice felt slightly snug on the chest, but the size 42 in the same box was bespoke perfection. Delivered to Nilgiri hostel gate in 35 minutes.',
    verifiedStudent: true,
  },
  {
    id: 'rev-2',
    student: 'Ananya Sharma',
    college: 'SRCC DU North Campus',
    role: 'B.Com (Hons) \'24 · Cultural Secretary',
    occasion: 'Farewell Gala & Night Prom',
    rating: 5,
    outfit: 'Varanasi Royal Katan Silk Saree',
    comment: 'Renting a ₹15,000 Varanasi silk saree for just ₹349 for my farewell was the smartest student decision. It arrived sealed in a sterile hanger cover with the ₹150 dry clean bill attached. Absolutely zero odor.',
    verifiedStudent: true,
  },
  {
    id: 'rev-3',
    student: 'Rohan Verma',
    college: 'DTU Rohini (Aryabhatta Hall)',
    role: 'Mechanical \'24 · Placed at Tata Motors',
    occasion: 'Campus Placement Day 1',
    rating: 5,
    outfit: 'Classic Charcoal 2-Piece Suit',
    comment: 'Did not want to ask parents for ₹9,000 for a suit I might only wear once. Rented for 2 days for ₹598 total. Zero deposit hassle, and returning it was just dropping it at the hostel guard station.',
    verifiedStudent: true,
  },
  {
    id: 'rev-4',
    student: 'Divya Khurana',
    college: 'NIFT Delhi Hauz Khas',
    role: 'Fashion Design \'24',
    occasion: 'College Graduation Dinner',
    rating: 5,
    outfit: 'Burgundy Velvet Zardozi Lehenga',
    comment: 'The embroidery quality is genuine haute couture. The built-in can-can layer gave full volume without needing extra petticoats. The fabric felt fresh and sanitized like a five-star hotel towel.',
    verifiedStudent: true,
  }
];

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#faf5ea] border-t border-amber-600/20 text-[#0b162c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-semibold tracking-widest text-amber-800 block mb-2 font-regal">
            Student Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#0b162c] tracking-tight">
            Trusted by 4,200+ College Students
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2 font-light">
            From Day-1 campus placement shortlists to farewell photo sessions across Delhi NCR and Rohtak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#fdf9f1] border border-amber-600/20 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Student Order
                  </span>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed font-editorial italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-amber-600/15 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#0b162c]">{rev.student}</h4>
                  <span className="text-neutral-500 block text-[11px]">{rev.college}</span>
                  <span className="text-amber-900 font-medium text-[11px]">{rev.role}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-neutral-400 block font-mono">Wore</span>
                  <span className="font-semibold text-xs text-[#0b162c]">{rev.outfit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
