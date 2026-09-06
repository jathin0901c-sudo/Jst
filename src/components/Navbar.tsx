import React, { useState } from 'react';
import { 
  MapPin, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Ruler, 
  Zap, 
  ChevronDown,
  Compass,
  Check,
  Package,
  HelpCircle
} from 'lucide-react';
import { AppView, CampusLocation } from '../types';
import { CAMPUSES } from '../data/campuses';
import { sound } from '../utils/soundEffects';

interface NavbarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  selectedCampus: CampusLocation;
  onCampusChange: (campus: CampusLocation) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenScanner: () => void;
  onOpenHowItWorks?: () => void;
  isExpressActive: boolean;
  onToggleExpress: () => void;
  ordersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  selectedCampus,
  onCampusChange,
  cartCount,
  onOpenCart,
  onOpenOrders,
  onOpenScanner,
  onOpenHowItWorks,
  isExpressActive,
  onToggleExpress,
  ordersCount
}) => {
  const [showCampusModal, setShowCampusModal] = useState(false);

  const handleNavClick = (view: AppView) => {
    sound.playBeep(600);
    onViewChange(view);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf4e8]/95 backdrop-blur-xl border-b border-amber-600/20 transition-colors">
      {/* Streamlined Top Delivery Notice Bar - Midnight Navy with Gold Accent */}
      <div className="bg-[#080f1f] border-b border-amber-500/20 px-4 sm:px-8 lg:px-12 py-2 text-xs sm:text-sm text-neutral-300">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium text-neutral-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-neutral-400">Campus Hub:</span>
            <span className="text-white font-semibold">{selectedCampus.name}</span>
            <span className="hidden md:inline text-amber-400/80">({selectedCampus.runnerStation})</span>
          </div>

          <div className="flex items-center gap-3.5 shrink-0 text-xs sm:text-sm">
            <a
              href="https://wa.me/917093545955?text=Hi%20Blazer%20Bank%2C%20I%20need%20help%20with%20a%20blazer%20rental"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 transition-colors font-medium cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp: <strong className="text-white">7093545955</strong></span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Free 2h Gate Drop Available</span>
            </span>
            <span className="text-amber-300 font-medium flex items-center gap-1 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>₹150 Dry Cleaned Lab Proof</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Brand Core */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div 
            onClick={() => handleNavClick('rent')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Enhanced Imprinted Medallion Logo with Gold Rim */}
            <div className="w-12 h-12 rounded-full bg-white border-2 border-amber-500/50 ring-2 ring-amber-500/30 luxury-seal-imprint p-0.5 flex items-center justify-center group-hover:scale-105 transition-all overflow-hidden shrink-0 shadow-md">
              <img
                src="/blazer_bank_logo.svg"
                alt="Blazer Bank Seal"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0b162c] font-serif">
                  Blazer Bank
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 font-bold border border-amber-500/40">
                  Delhi & Rohtak
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-amber-800 font-bold hidden sm:block">
                Formal Wear • Rental • Retail
              </p>
            </div>
          </div>

          {/* Campus Selector Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playBeep(650);
                setShowCampusModal(!showCampusModal);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f2ebd8] hover:bg-[#eae0cb] text-sm font-medium text-[#0b162c] transition-colors cursor-pointer border border-amber-600/20 shadow-xs"
            >
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[200px]">
                {selectedCampus.name.split('(')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-700/70" />
            </button>

            {/* Apple Popover */}
            {showCampusModal && (
              <div className="absolute left-0 mt-2 w-84 bg-[#fdf9f0] border border-amber-600/30 rounded-2xl shadow-[0_20px_50px_rgba(11,22,44,0.15)] p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between px-3 py-2 border-b border-amber-600/15">
                  <span className="text-sm font-semibold text-[#0b162c] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-600" /> Select Campus Hub
                  </span>
                  <span className="text-xs text-amber-800 font-medium">Delhi NCR & Rohtak</span>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-1.5 mt-2 pr-1">
                  {CAMPUSES.map((c) => {
                    const isSelected = selectedCampus.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          sound.playHologramConfirm();
                          onCampusChange(c);
                          setShowCampusModal(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#0b162c] text-white font-semibold shadow-xs'
                            : 'hover:bg-[#f2ebd8] text-[#0b162c]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{c.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-normal ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                            }`}>
                              {c.city}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isSelected ? 'text-amber-300' : 'text-neutral-500'}`}>
                            ⚡ {c.expressTimeMins}m express • {c.hostels.length} hostels
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-amber-300 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Apple Segmented Pill Navigation on Medium+ Screens */}
        <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-[#ede3d1] border border-amber-600/20">
          <button
            onClick={() => handleNavClick('rent')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              currentView === 'rent'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            <span>Rent Formals</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              currentView === 'rent' ? 'bg-amber-400 text-[#0b162c]' : 'bg-amber-200/80 text-amber-950'
            }`}>
              ₹199/d
            </span>
          </button>

          <button
            onClick={() => handleNavClick('buy')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              currentView === 'buy'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Buy Essentials</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              currentView === 'buy' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
            }`}>
              New
            </span>
          </button>

          <button
            onClick={() => handleNavClick('dryclean')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              currentView === 'dryclean'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dry Cleaning</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              currentView === 'dryclean' ? 'bg-emerald-400 text-emerald-950' : 'bg-emerald-100 text-emerald-800'
            }`}>
              ₹149
            </span>
          </button>

          <button
            onClick={() => {
              sound.playScanChirp();
              onOpenScanner();
            }}
            className="px-4 py-2 rounded-full text-sm font-medium text-[#0b162c]/80 hover:text-[#0b162c] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Ruler className="w-4 h-4 text-amber-700" />
            <span>Fit Assistant</span>
          </button>

          {onOpenHowItWorks && (
            <button
              onClick={() => {
                sound.playBeep(620);
                onOpenHowItWorks();
              }}
              className="px-4 py-2 rounded-full text-sm font-semibold text-[#0b162c] hover:bg-white/80 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>How It Works</span>
            </button>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* 30-Min Flash Priority Delivery Toggle */}
          <button
            onClick={() => {
              sound.playExpressPing();
              onToggleExpress();
            }}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border ${
              isExpressActive
                ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/25 border-amber-500/60 text-amber-950 shadow-sm font-semibold ring-2 ring-amber-500/20'
                : 'bg-[#fdf9f0] border-amber-600/30 text-[#0b162c] hover:border-amber-500/50'
            }`}
            title="2-Hour Gate Drop is FREE! Click to enable 30-Min Flash Priority Delivery (+₹49)"
          >
            <Zap className={`w-4 h-4 ${isExpressActive ? 'text-amber-700 fill-amber-500' : 'text-amber-600'}`} />
            <span className="hidden sm:inline">30m Flash</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              isExpressActive ? 'bg-amber-400 text-[#0b162c]' : 'bg-[#ede3d1] text-[#0b162c]'
            }`}>
              +₹49
            </span>
          </button>

          {/* Active Orders Tracker */}
          {ordersCount > 0 && (
            <button
              onClick={() => {
                sound.playBeep(700);
                onOpenOrders();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#f2ebd8] hover:bg-[#eae0cb] text-[#0b162c] text-sm font-medium transition-colors cursor-pointer border border-amber-600/20"
            >
              <Package className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">Orders</span>
              <span className="w-5 h-5 rounded-full bg-[#0b162c] text-white text-xs font-bold flex items-center justify-center">
                {ordersCount}
              </span>
            </button>
          )}

          {/* Cart Bag Trigger - Deep Navy with Gold Finish */}
          <button
            onClick={() => {
              sound.playBeep(750);
              onOpenCart();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b162c] hover:bg-[#122449] text-white text-sm font-semibold transition-all cursor-pointer shadow-md border border-amber-500/40 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="ml-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-[#080f1f] text-xs font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Subnav Segmented Control */}
      <div className="lg:hidden border-t border-amber-600/15 bg-[#f5ebd8] px-4 py-2.5">
        <div className="flex items-center justify-center gap-1 max-w-lg mx-auto p-1 bg-[#ede3d1] rounded-full border border-amber-600/20">
          <button
            onClick={() => handleNavClick('rent')}
            className={`flex-1 py-1.5 px-3 rounded-full text-sm font-semibold transition-all text-center cursor-pointer ${
              currentView === 'rent'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            Rent
          </button>
          <button
            onClick={() => handleNavClick('buy')}
            className={`flex-1 py-1.5 px-3 rounded-full text-sm font-semibold transition-all text-center cursor-pointer ${
              currentView === 'buy'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => handleNavClick('dryclean')}
            className={`flex-1 py-1.5 px-3 rounded-full text-sm font-semibold transition-all text-center cursor-pointer ${
              currentView === 'dryclean'
                ? 'bg-[#0b162c] text-white shadow-sm border border-amber-500/40'
                : 'text-[#0b162c]/80 hover:text-[#0b162c]'
            }`}
          >
            Dry Clean
          </button>
          <button
            onClick={() => {
              sound.playScanChirp();
              onOpenScanner();
            }}
            className="flex-1 py-1.5 px-2.5 rounded-full text-xs sm:text-sm font-medium text-[#0b162c]/80 hover:text-[#0b162c] text-center cursor-pointer"
          >
            Fit Assistant
          </button>
          {onOpenHowItWorks && (
            <button
              onClick={() => {
                sound.playBeep(620);
                onOpenHowItWorks();
              }}
              className="flex-1 py-1.5 px-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#0b162c] hover:text-[#0b162c] text-center cursor-pointer"
            >
              How It Works
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

