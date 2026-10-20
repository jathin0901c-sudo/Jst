import React, { useState } from 'react';
import { 
  Crown, 
  MapPin, 
  ShoppingBag, 
  Sparkles, 
  Ruler, 
  RefreshCw, 
  Menu, 
  X, 
  ShieldCheck, 
  Package, 
  Calendar,
  ChevronDown 
} from 'lucide-react';
import { CampusLocation, FashionDepartment, UserPreferences } from '../types';
import { sound } from '../utils/soundEffects';

interface NavbarProps {
  preferences: UserPreferences;
  onChangePreferences: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenScanner: () => void;
  onOpenHowItWorks: () => void;
  ordersCount: number;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  preferences,
  onChangePreferences,
  cartCount,
  onOpenCart,
  onOpenOrders,
  onOpenScanner,
  onOpenHowItWorks,
  ordersCount,
  onNavigateSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (sectionId: string) => {
    sound.playSelectTone();
    setIsMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#071120]/95 backdrop-blur-xl border-b border-amber-500/25 text-[#faf5ea] transition-all">
      {/* Top Banner: Campus & Department Context Bar */}
      <div className="bg-[#0b162c] border-b border-amber-500/15 px-4 sm:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-amber-200/70 hidden sm:inline">Delivering to:</span>
            <strong className="text-white font-semibold truncate">
              {preferences.college.shortName}
            </strong>
            <span className="text-amber-400/40">·</span>
            <span className="text-amber-300 font-medium">
              {preferences.department === 'ethnic' ? 'Ethnic Couture' : 'Blazers & Formals'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playSelectTone();
              onChangePreferences();
            }}
            className="flex items-center gap-1.5 text-amber-300 hover:text-white font-semibold text-xs cursor-pointer shrink-0 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Change</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Monogram */}
        <div
          onClick={() => {
            sound.playSelectTone();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-[#0b162c] border border-amber-400/60 flex items-center justify-center shadow-lg group-hover:border-amber-300 transition-colors">
            <Crown className="w-5 h-5 text-amber-400 group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <span className="font-regal text-base sm:text-lg tracking-widest text-white font-bold block leading-none">
              BLAZER BANK
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-amber-300/80 font-medium block mt-0.5">
              Haute College Fashion
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links (Unboxed clean typography) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase text-amber-100/80">
          <button
            type="button"
            onClick={() => handleNav('ethnic-section')}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1"
          >
            Ethnic Wear
          </button>

          <button
            type="button"
            onClick={() => handleNav('formals-section')}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1"
          >
            Blazers & Formals
          </button>

          <button
            type="button"
            onClick={() => handleNav('garment-care-section')}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1 flex items-center gap-1 text-emerald-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Care Service (₹149)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playSelectTone();
              onOpenHowItWorks();
            }}
            className="hover:text-amber-300 transition-colors cursor-pointer py-1"
          >
            How Rentals Work
          </button>
        </nav>

        {/* Action Controls & Bag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Biometric Fit Scanner Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playSelectTone();
              onOpenScanner();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b162c] hover:bg-[#122346] border border-amber-400/35 text-amber-300 text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Fit Scanner</span>
          </button>

          {/* Orders Tracker Button */}
          {ordersCount > 0 && (
            <button
              type="button"
              onClick={() => {
                sound.playSelectTone();
                onOpenOrders();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b162c] hover:bg-[#122346] border border-amber-400/35 text-white text-xs font-semibold cursor-pointer transition-all active:scale-95 shadow-sm"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Track</span>
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {ordersCount}
              </span>
            </button>
          )}

          {/* Bag Button (Flying target anchor) */}
          <button
            id="nav-bag-button"
            type="button"
            onClick={() => {
              sound.playSelectTone();
              onOpenCart();
            }}
            className="relative p-2.5 rounded-full bg-[#0b162c] hover:bg-[#122346] border border-amber-400/50 text-amber-300 cursor-pointer shadow-md active:scale-95 transition-all"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shadow-lg border-2 border-[#071120] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-[#0b162c] text-amber-300 border border-amber-500/30 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#071120] border-t border-amber-500/20 px-6 py-6 space-y-4 shadow-2xl">
          <div className="p-4 rounded-2xl bg-[#0b162c] border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 block">
                Active Campus Hub
              </span>
              <span className="text-sm font-bold text-white block">
                {preferences.college.shortName}
              </span>
              <span className="text-xs text-amber-200/70">
                {preferences.department === 'ethnic' ? 'Ethnic Wear' : 'Blazers & Formals'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onChangePreferences();
              }}
              className="px-3 py-1.5 rounded-xl gold-luxury-btn text-xs font-bold"
            >
              Change
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2 text-sm font-semibold">
            <button
              type="button"
              onClick={() => handleNav('ethnic-section')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#0b162c] text-white flex items-center justify-between"
            >
              <span>Ethnic Wear Collection</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('formals-section')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#0b162c] text-white flex items-center justify-between"
            >
              <span>Blazers & Formals Collection</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </button>

            <button
              type="button"
              onClick={() => handleNav('garment-care-section')}
              className="w-full text-left p-3 rounded-xl hover:bg-[#0b162c] text-emerald-300 flex items-center justify-between"
            >
              <span>Garment Care & Cleaning (₹149)</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenScanner();
              }}
              className="w-full text-left p-3 rounded-xl hover:bg-[#0b162c] text-white flex items-center justify-between"
            >
              <span>AI Biometric Fit Scanner</span>
              <Ruler className="w-4 h-4 text-amber-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenHowItWorks();
              }}
              className="w-full text-left p-3 rounded-xl hover:bg-[#0b162c] text-white"
            >
              How Rentals & 3-Size Backup Work
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
