import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Sparkles, Check, Search, ShieldCheck } from 'lucide-react';
import { CampusLocation, FashionDepartment, UserPreferences } from '../types';
import { CAMPUSES, createOtherCollege } from '../data/campuses';
import { sound } from '../utils/soundEffects';

interface ChangePreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreferences: UserPreferences;
  onSavePreferences: (prefs: UserPreferences) => void;
}

export const ChangePreferenceModal: React.FC<ChangePreferenceModalProps> = ({
  isOpen,
  onClose,
  currentPreferences,
  onSavePreferences,
}) => {
  if (!isOpen) return null;

  const [dept, setDept] = useState<FashionDepartment>(currentPreferences.department);
  const [selectedCampus, setSelectedCampus] = useState<CampusLocation>(currentPreferences.college);
  const [search, setSearch] = useState('');
  const [isOther, setIsOther] = useState(Boolean(currentPreferences.college.isCustom));
  const [customName, setCustomName] = useState(
    currentPreferences.college.isCustom ? currentPreferences.college.name : ''
  );

  const filtered = CAMPUSES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.shortName.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    sound.playCashRegister();
    const finalCollege = isOther && customName.trim()
      ? createOtherCollege(customName.trim())
      : selectedCampus;

    onSavePreferences({
      department: dept,
      college: finalCollege,
      hasCompletedOnboarding: true,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-xl bg-[#faf5ea] text-[#0b162c] border border-amber-600/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#fdf9f1] border-b border-amber-600/20 flex items-center justify-between shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800 block">
                Personalized Experience
              </span>
              <h3 className="text-xl font-editorial font-bold text-[#0b162c]">
                Change College & Department
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f4ebd9] hover:bg-[#e8dcbf] text-[#0b162c] flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* Department Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2">
                Preferred Fashion Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    sound.playSelectTone();
                    setDept('ethnic');
                  }}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    dept === 'ethnic'
                      ? 'bg-[#350910] text-[#faf5ea] border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-[#fdf9f1] hover:bg-[#f4ebd9] text-[#0b162c] border-amber-600/25'
                  }`}
                >
                  <Sparkles className="w-5 h-5 mb-1.5 text-amber-400" />
                  <span className="font-bold text-sm block">Ethnic Wear</span>
                  <span className="text-[11px] opacity-80 font-light">Sarees, Lehengas & Sherwanis</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playSelectTone();
                    setDept('formals');
                  }}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    dept === 'formals'
                      ? 'bg-[#0b162c] text-[#faf5ea] border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-[#fdf9f1] hover:bg-[#f4ebd9] text-[#0b162c] border-amber-600/25'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 mb-1.5 text-amber-400" />
                  <span className="font-bold text-sm block">Blazers & Formals</span>
                  <span className="text-[11px] opacity-80 font-light">Suits, Blazers & Dresses</span>
                </button>
              </div>
            </div>

            {/* College Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-2">
                Your College Campus
              </label>

              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search campus name..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-amber-600/25 text-xs text-[#0b162c] focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {filtered.map((c) => {
                  const isSelected = !isOther && selectedCampus.id === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        sound.playSelectTone();
                        setSelectedCampus(c);
                        setIsOther(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-[#0b162c] text-[#faf5ea] border-[#0b162c]'
                          : 'bg-[#fdf9f1] hover:bg-[#f4ebd9] text-[#0b162c] border-amber-600/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                        <span className="font-medium truncate">{c.name}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                    </button>
                  );
                })}

                <div
                  onClick={() => {
                    sound.playSelectTone();
                    setIsOther(true);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-xs cursor-pointer ${
                    isOther
                      ? 'bg-[#0b162c] text-[#faf5ea] border-[#0b162c]'
                      : 'bg-[#fdf9f1] hover:bg-[#f4ebd9] text-[#0b162c] border-amber-600/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Other College (Pan-India)</span>
                    {isOther && <Check className="w-4 h-4 text-amber-300" />}
                  </div>
                  {isOther && (
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Enter college name..."
                      className="mt-2 w-full p-2 rounded-lg bg-white text-[#0b162c] text-xs border border-amber-400"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-[#fdf9f1] border-t border-amber-600/20 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-amber-600/30 text-xs font-semibold text-[#0b162c] hover:bg-[#f4ebd9]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl gold-luxury-btn text-xs font-bold shadow-md cursor-pointer"
            >
              Apply Personalization
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
