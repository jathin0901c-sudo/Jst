import React from 'react';
import { Crown, MapPin, Phone, Mail, Instagram, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { CampusLocation } from '../types';
import { sound } from '../utils/soundEffects';

interface FooterProps {
  currentCampus: CampusLocation;
  onChangeCampus: () => void;
  onOpenHowItWorks: () => void;
  onOpenFitScanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentCampus,
  onChangeCampus,
  onOpenHowItWorks,
  onOpenFitScanner,
}) => {
  return (
    <footer className="bg-[#071120] text-[#faf5ea] border-t border-amber-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-amber-500/15">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0b162c] border border-amber-400/50 flex items-center justify-center p-2 shadow-lg">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="font-regal text-base tracking-widest text-amber-300 font-bold block">
                  BLAZER BANK
                </span>
                <span className="text-[10px] tracking-wider text-amber-200/60 uppercase">
                  Haute College Fashion House
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-100/70 font-light leading-relaxed max-w-sm">
              Empowering students across Delhi NCR and Rohtak with accessible luxury formalwear, wedding-grade ethnic couture, and certified garment care.
            </p>

            <div className="pt-2 flex items-center gap-3 text-amber-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#0b162c] border border-amber-500/30 flex items-center justify-center hover:bg-amber-400 hover:text-slate-950 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#0b162c] border border-amber-500/30 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@blazerbank.com"
                className="w-8 h-8 rounded-full bg-[#0b162c] border border-amber-500/30 flex items-center justify-center hover:bg-amber-400 hover:text-slate-950 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="font-regal text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-amber-100/75">
              <li>
                <a href="#ethnic-section" className="hover:text-amber-300 transition-colors">
                  Ethnic Wear Rentals
                </a>
              </li>
              <li>
                <a href="#formals-section" className="hover:text-amber-300 transition-colors">
                  Placement Blazers & Suits
                </a>
              </li>
              <li>
                <a href="#garment-care-section" className="hover:text-amber-300 transition-colors">
                  Garment Dry Clean & Care (₹149)
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenFitScanner}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  AI Biometric Fit Scanner
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenHowItWorks}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  How 3-Size Backup Works
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Assurance */}
          <div>
            <h4 className="font-regal text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
              Student Guarantees
            </h4>
            <ul className="space-y-2.5 text-xs text-amber-100/75">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Odor & UV-C Sanitized</span>
              </li>
              <li>No Security Deposit for Students</li>
              <li>₹150 Laundry Bill Proof Enclosed</li>
              <li>Free Doorstep Return Pickup</li>
              <li>Pre-Damage Photo Log Protection</li>
            </ul>
          </div>

          {/* Campus Support & Hubs */}
          <div>
            <h4 className="font-regal text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">
              Campus Concierge
            </h4>
            <div className="space-y-3 text-xs text-amber-100/75">
              <div className="p-3 rounded-xl bg-[#0b162c] border border-amber-500/20">
                <span className="text-[10px] uppercase text-amber-400/80 font-bold block mb-1">
                  Active Dispatch Hub
                </span>
                <span className="font-bold text-white block truncate">
                  {currentCampus.name}
                </span>
                <span className="text-[11px] text-emerald-400 font-mono block mt-0.5">
                  Runner: {currentCampus.runnerStation}
                </span>
                <button
                  type="button"
                  onClick={onChangeCampus}
                  className="mt-2 text-[11px] text-amber-300 hover:text-white underline cursor-pointer"
                >
                  Switch Campus Hub →
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-200/80">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Student Helpline: +91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/60">
          <p>© {new Date().getFullYear()} Blazer Bank Haute Fashion. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for Indian collegiate excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};
