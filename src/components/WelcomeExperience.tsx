import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Search, ArrowRight, Check, ShieldCheck, Shirt, Crown, RefreshCw } from 'lucide-react';
import { CampusLocation, FashionDepartment, UserPreferences } from '../types';
import { CAMPUSES, createOtherCollege } from '../data/campuses';
import { sound } from '../utils/soundEffects';

interface WelcomeExperienceProps {
  onComplete: (preferences: UserPreferences) => void;
  initialPreferences?: UserPreferences | null;
}

export const WelcomeExperience: React.FC<WelcomeExperienceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'category' | 'college'>('category');
  const [selectedDept, setSelectedDept] = useState<FashionDepartment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<CampusLocation>(CAMPUSES[0]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customCollegeInput, setCustomCollegeInput] = useState('');

  const filteredCampuses = CAMPUSES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDepartment = (dept: FashionDepartment) => {
    sound.playSelectTone();
    setSelectedDept(dept);
    // Smooth transition to step 2
    setTimeout(() => {
      setStep('college');
    }, 450);
  };

  const handleConfirmOnboarding = () => {
    sound.playCashRegister();
    const finalCollege = isOtherSelected && customCollegeInput.trim()
      ? createOtherCollege(customCollegeInput.trim())
      : selectedCampus;

    const prefs: UserPreferences = {
      department: selectedDept || 'ethnic',
      college: finalCollege,
      hasCompletedOnboarding: true
    };

    onComplete(prefs);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#071120] text-[#faf5ea] flex flex-col">
      {/* Top royal branding bar */}
      <header className="px-6 py-4 border-b border-amber-500/20 flex items-center justify-between shrink-0 bg-[#071120]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0b162c] border border-amber-500/50 flex items-center justify-center p-1.5 shadow-md">
            <Crown className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="font-regal text-sm tracking-widest text-amber-300 font-semibold block">
              BLAZER BANK
            </span>
            <span className="text-[10px] tracking-wider text-amber-200/70 uppercase">
              Haute College Fashion House
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-200/80">
          <span className={`w-2 h-2 rounded-full ${step === 'category' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
          <span className="font-medium">
            {step === 'category' ? 'Step 1 of 2: Your Vibe' : 'Step 2 of 2: Your Campus'}
          </span>
        </div>
      </header>

      {/* Main onboarding canvas */}
      <div className="flex-1 relative overflow-y-auto flex flex-col justify-center items-center p-4 sm:p-8">
        <AnimatePresence mode="wait">
          {step === 'category' && (
            <motion.div
              key="step-category"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full max-w-5xl my-auto py-4"
            >
              <div className="text-center mb-8 sm:mb-10">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
                  Couture Rentals · Tailored Purchases · Certified Care
                </span>
                <h1 className="text-3xl sm:text-5xl font-editorial font-bold text-[#faf5ea] tracking-tight">
                  What are you looking for?
                </h1>
                <p className="text-sm sm:text-base text-amber-100/70 max-w-xl mx-auto mt-2 font-light">
                  Tailored specifically for college life — from high-stakes placement interviews to royal festive celebrations.
                </p>
              </div>

              {/* Two visual expanding panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Panel 1: Ethnic Wear */}
                <motion.button
                  type="button"
                  onClick={() => handleSelectDepartment('ethnic')}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group relative text-left rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer p-0 h-[380px] sm:h-[460px] flex flex-col justify-end ${
                    selectedDept === 'ethnic'
                      ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-2xl shadow-amber-950/60'
                      : 'border-amber-500/25 hover:border-amber-400/60 shadow-xl'
                  }`}
                >
                  {/* Background Image & Gradient */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20050a] via-[#350910]/75 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#20050a]/60 to-transparent" />

                  {/* Panel Content */}
                  <div className="relative z-10 p-6 sm:p-8 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Festive · Farewell · Cultural Galas</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-white leading-tight">
                      Ethnic Wear
                    </h2>

                    <p className="text-xs sm:text-sm text-amber-100/80 line-clamp-2 font-light">
                      Varanasi silk sarees, velvet lehengas, authentic Lucknowi chikankari kurtas, royal sherwanis & Indo-western fusion.
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-amber-400/20 text-xs font-medium text-amber-300">
                      <span>Rent from ₹249/day · Buy or Clean</span>
                      <span className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Explore Ethnic <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.button>

                {/* Panel 2: Blazers & Formals */}
                <motion.button
                  type="button"
                  onClick={() => handleSelectDepartment('formals')}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group relative text-left rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer p-0 h-[380px] sm:h-[460px] flex flex-col justify-end ${
                    selectedDept === 'formals'
                      ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-2xl shadow-blue-950/60'
                      : 'border-amber-500/25 hover:border-amber-400/60 shadow-xl'
                  }`}
                >
                  {/* Background Image & Gradient */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: 'url(/images/allen_solly_navy_blazer.jpg)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071120] via-[#0b162c]/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071120]/70 to-transparent" />

                  {/* Panel Content */}
                  <div className="relative z-10 p-6 sm:p-8 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-semibold backdrop-blur-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Placements · Conferences · Boardrooms</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-white leading-tight">
                      Blazers & Formals
                    </h2>

                    <p className="text-xs sm:text-sm text-amber-100/80 line-clamp-2 font-light">
                      Tailored Allen Solly blazers, peak-lapel tuxedos, women’s power blazers, formal shirts, trousers & Italian leather shoes.
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-amber-400/20 text-xs font-medium text-amber-300">
                      <span>Rent from ₹199/day · 3-Size Fit Backup</span>
                      <span className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Explore Formals <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'college' && (
            <motion.div
              key="step-college"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full max-w-2xl my-auto py-6"
            >
              <div className="bg-[#0b162c]/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                {/* Header */}
                <div className="mb-6 text-center sm:text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                      Campus Delivery Hubs
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep('category')}
                      className="text-xs text-amber-300 hover:text-white underline cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Change Category ({selectedDept === 'ethnic' ? 'Ethnic Wear' : 'Blazers & Formals'})
                    </button>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-white">
                    Which college are you from?
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-100/70 mt-1">
                    We deliver in sterile garment bags directly to your hostel gate with free 3-size backup.
                  </p>
                </div>

                {/* Search Field */}
                <div className="relative mb-5">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-400/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by college name, short code, or city..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#071120] border border-amber-500/30 text-white placeholder-amber-200/40 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                {/* College List */}
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 mb-5">
                  {filteredCampuses.map((campus) => {
                    const isSelected = !isOtherSelected && selectedCampus.id === campus.id;
                    return (
                      <button
                        key={campus.id}
                        type="button"
                        onClick={() => {
                          sound.playSelectTone();
                          setSelectedCampus(campus);
                          setIsOtherSelected(false);
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                            : 'bg-[#071120]/60 border-amber-500/15 hover:border-amber-500/40 text-amber-100/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-amber-400/60'}`} />
                          <div className="truncate">
                            <span className="font-semibold text-sm block truncate">
                              {campus.name}
                            </span>
                            <span className="text-xs text-amber-200/60 flex items-center gap-2">
                              <span>{campus.city}</span>
                              <span>·</span>
                              <span>{campus.expressTimeMins}m express delivery</span>
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {/* "Other College" option */}
                  <div
                    onClick={() => {
                      sound.playSelectTone();
                      setIsOtherSelected(true);
                    }}
                    className={`w-full p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isOtherSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                        : 'bg-[#071120]/60 border-amber-500/15 hover:border-amber-500/40 text-amber-100/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <div>
                          <span className="font-semibold text-sm block">Other College / Pan-India Delivery</span>
                          <span className="text-xs text-amber-200/60">Enter your college name for campus dispatch</span>
                        </div>
                      </div>
                      {isOtherSelected && (
                        <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      )}
                    </div>

                    {isOtherSelected && (
                      <div className="mt-3 pt-3 border-t border-amber-500/20">
                        <input
                          type="text"
                          value={customCollegeInput}
                          onChange={(e) => setCustomCollegeInput(e.target.value)}
                          placeholder="Type your college name (e.g. BITS Pilani, BVP Delhi, Galgotias)..."
                          autoFocus
                          className="w-full px-4 py-2.5 rounded-xl bg-[#071120] border border-amber-400/50 text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirmation Action */}
                <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-amber-200/70 text-center sm:text-left">
                    <span>Personalizing for </span>
                    <strong className="text-amber-300 font-semibold">
                      {isOtherSelected ? (customCollegeInput || 'Your College') : selectedCampus.shortName}
                    </strong>
                    <span> · </span>
                    <strong className="text-amber-300 font-semibold">
                      {selectedDept === 'ethnic' ? 'Ethnic Wear' : 'Blazers & Formals'}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmOnboarding}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-luxury-btn text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                  >
                    <span>Enter Blazer Bank</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
