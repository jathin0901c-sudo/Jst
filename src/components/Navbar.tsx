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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-black/[0.06] transition-colors">
      {/* Streamlined Top Delivery Notice Bar */}
      <div className="bg-neutral-100/80 border-b border-black/[0.04] px-4 sm:px-8 lg:px-12 py-2 text-xs sm:text-sm text-neutral-600">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium text-neutral-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Active Campus Hub:</span>
            <span className="text-neutral-900 font-semibold">{selectedCampus.name}</span>
            <span className="hidden md:inline text-neutral-400">({selectedCampus.runnerStation})</span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs sm:text-sm">
            <span className="hidden sm:flex items-center gap-1.5 text-neutral-600">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>2h Express Doorstep Delivery Available</span>
            </span>
            <span className="text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>₹150 Dry Cleaned Proof</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Bar */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between gap-4">
        {/* Brand Core */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div 
            onClick={() => handleNavClick('rent')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                  Stark Formals
                </span>
                <span className="hidden md:inline-block text-xs px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-medium">
                  Delhi & Rohtak
                </span>
              </div>
              <p className="text-xs text-neutral-500 hidden sm:block">
                Tailored Suits @ ₹199/Day
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-sm font-medium text-neutral-800 transition-colors cursor-pointer border border-black/[0.04]"
            >
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[200px]">
                {selectedCampus.name.split('(')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {/* Apple Popover */}
            {showCampusModal && (
              <div className="absolute left-0 mt-2 w-84 bg-white border border-black/[0.08] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.14)] p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100">
                  <span className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-neutral-500" /> Select Campus
                  </span>
                  <span className="text-xs text-neutral-400">Delhi NCR & Rohtak</span>
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
                            ? 'bg-neutral-100 text-neutral-900 font-semibold'
                            : 'hover:bg-neutral-50 text-neutral-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-neutral-900">{c.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-normal">
                              {c.city}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">
                            ⚡ {c.expressTimeMins}m express • {c.hostels.length} hostels
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-neutral-900 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Apple Segmented Pill Navigation on Medium+ Screens */}
        <nav className="hidden lg:flex items-center p-1.5 rounded-full bg-neutral-100/90 border border-black/[0.04]">
          <button
            onClick={() => handleNavClick('rent')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              currentView === 'rent'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <span>Rent Formals</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold">
              ₹199/d
            </span>
          </button>

          <button
            onClick={() => handleNavClick('buy')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              currentView === 'buy'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
            <span>Buy Essentials</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-700 font-bold">
              New
            </span>
          </button>

          <button
            onClick={() => handleNavClick('dryclean')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              currentView === 'dryclean'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dry Cleaning</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold">
              ₹149
            </span>
          </button>

          <button
            onClick={() => {
              sound.playScanChirp();
              onOpenScanner();
            }}
            className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Ruler className="w-4 h-4 text-neutral-500" />
            <span>Fit Assistant</span>
          </button>

          {onOpenHowItWorks && (
            <button
              onClick={() => {
                sound.playBeep(620);
                onOpenHowItWorks();
              }}
              className="px-4 py-2 rounded-full text-sm font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-neutral-500" />
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
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm font-semibold'
                : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
            }`}
            title="2-Hour Gate Drop is FREE! Click to enable 30-Min Flash Priority Delivery (+₹49)"
          >
            <Zap className={`w-4 h-4 ${isExpressActive ? 'text-amber-600 fill-amber-500' : 'text-neutral-500'}`} />
            <span className="hidden sm:inline">30m Flash</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isExpressActive ? 'bg-amber-200 text-amber-900 font-bold' : 'bg-neutral-100 text-neutral-600'
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
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200/70 text-neutral-800 text-sm font-medium transition-colors cursor-pointer border border-black/[0.04]"
            >
              <Package className="w-4 h-4 text-neutral-600" />
              <span className="hidden sm:inline">Orders</span>
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
                {ordersCount}
              </span>
            </button>
          )}

          {/* Cart Bag Trigger */}
          <button
            onClick={() => {
              sound.playBeep(750);
              onOpenCart();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="ml-0.5 w-5 h-5 rounded-full bg-white text-neutral-900 text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Subnav Segmented Control */}
      <div className="lg:hidden border-t border-black/[0.04] bg-neutral-50/80 px-4 py-2.5">
        <div className="flex items-center justify-center gap-1 max-w-lg mx-auto p-1 bg-neutral-200/70 rounded-full">
          <button
            onClick={() => handleNavClick('rent')}
            className={`flex-1 py-1.5 px-3 rounded-full text-sm font-semibold transition-all text-center cursor-pointer ${
              currentView === 'rent'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Rent
          </button>
          <button
            onClick={() => handleNavClick('buy')}
            className={`flex-1 py-1.5 px-3 rounded-full text-sm font-semibold transition-all text-center cursor-pointer ${
              currentView === 'buy'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => handleNavClick('dryclean')}
            className={`flex-1 py-1.5 px-3 rounded-full text-sm font-semibold transition-all text-center cursor-pointer ${
              currentView === 'dryclean'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Dry Clean
          </button>
          <button
            onClick={() => {
              sound.playScanChirp();
              onOpenScanner();
            }}
            className="flex-1 py-1.5 px-2.5 rounded-full text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-900 text-center cursor-pointer"
          >
            Fit Assistant
          </button>
          {onOpenHowItWorks && (
            <button
              onClick={() => {
                sound.playBeep(620);
                onOpenHowItWorks();
              }}
              className="flex-1 py-1.5 px-2.5 rounded-full text-xs sm:text-sm font-semibold text-neutral-800 hover:text-neutral-950 text-center cursor-pointer"
            >
              How It Works
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

