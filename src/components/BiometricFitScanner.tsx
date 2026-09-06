import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scan, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Check, 
  Ruler
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface BiometricFitScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySize: (size: string) => void;
}

export const BiometricFitScanner: React.FC<BiometricFitScannerProps> = ({ isOpen, onClose, onApplySize }) => {
  const [height, setHeight] = useState(175); // cm
  const [weight, setWeight] = useState(70); // kg
  const [bodyType, setBodyType] = useState<'slim' | 'athletic' | 'regular' | 'broad'>('athletic');
  const [occasion, setOccasion] = useState('Placement Interview');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    primarySize: string;
    threeSizes: string[];
    confidence: number;
    chestInches: number;
    drop: string;
    fitNotes: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleRunScan = () => {
    sound.playScanChirp();
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      let primary = 40;
      let chest = 38;

      if (height < 168 && weight < 62) {
        primary = 36;
        chest = 35;
      } else if (height < 174 && weight < 68) {
        primary = 38;
        chest = 37;
      } else if (weight >= 70 && weight <= 78) {
        primary = 40;
        chest = 39;
      } else if (weight > 78 && weight <= 86) {
        primary = 42;
        chest = 41;
      } else if (weight > 86) {
        primary = 44;
        chest = 43;
      }

      if (bodyType === 'broad' && primary < 44) {
        primary += 2;
        chest += 1.5;
      } else if (bodyType === 'slim' && primary > 36 && weight < 65) {
        primary -= 2;
        chest -= 1;
      }

      const primStr = primary.toString();
      const three = [(primary - 2).toString(), primStr, (primary + 2).toString()];

      sound.playHologramConfirm();
      setIsScanning(false);
      setScanResult({
        primarySize: primStr,
        threeSizes: three,
        confidence: 99,
        chestInches: chest,
        drop: bodyType === 'athletic' ? 'Drop 7 (Tapered)' : 'Drop 6 (Standard Fit)',
        fitNotes: `Optimal shoulder seam alignment with proper 0.5" cuff reveal. Tailored for ${occasion}.`
      });
    }, 1400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-2xl bg-white border border-black/[0.08] rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.14)] overflow-hidden text-neutral-900 relative flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="p-6 sm:p-7 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                <Ruler className="w-5 h-5 text-neutral-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-neutral-900">
                  Smart Fit Calculator
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                  Calculate your precise blazer chest size & 3-size pack
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playBeep(500);
                onClose();
              }}
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Visual silhouette representation */}
            <div className="relative h-44 rounded-3xl bg-neutral-50/90 border border-black/[0.04] flex items-center justify-center overflow-hidden">
              {isScanning && (
                <motion.div
                  animate={{ y: [-70, 70, -70] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-1 bg-blue-500 shadow-[0_0_16px_rgba(59,130,246,0.8)] z-20"
                />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <svg className="w-36 h-36 text-neutral-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 40 20 L 50 28 L 60 20" stroke="#1d1d1f" strokeWidth="1.5" />
                  <path d="M 40 20 L 32 30 L 38 60 L 50 65 L 62 60 L 68 30 L 60 20" stroke="#1d1d1f" strokeWidth="1.5" />
                  <path d="M 40 20 L 44 48 L 50 65" stroke="#737373" strokeWidth="1.2" />
                  <path d="M 60 20 L 56 48 L 50 65" stroke="#737373" strokeWidth="1.2" />
                  <line x1="58" y1="36" x2="65" y2="36" stroke="#1d1d1f" strokeWidth="1.2" />
                  <circle cx="32" cy="30" r="2" fill="#1d1d1f" />
                  <circle cx="68" cy="30" r="2" fill="#1d1d1f" />
                </svg>

                <div className="absolute bottom-3 text-xs sm:text-sm text-neutral-600 font-semibold tracking-wide">
                  {height} cm • {weight} kg • {bodyType.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Sliders and controls */}
            <div className="space-y-4">
              {/* Height slider */}
              <div className="bg-neutral-50/90 p-5 rounded-3xl border border-black/[0.04]">
                <div className="flex justify-between text-sm font-semibold text-neutral-700 mb-2.5">
                  <span>Height</span>
                  <span className="text-neutral-900 font-bold">{height} cm ({Math.floor(height/30.48)}&apos;{Math.round((height%30.48)/2.54)}&quot;)</span>
                </div>
                <input
                  type="range"
                  min="155"
                  max="195"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
              </div>

              {/* Weight slider */}
              <div className="bg-neutral-50/90 p-5 rounded-3xl border border-black/[0.04]">
                <div className="flex justify-between text-sm font-semibold text-neutral-700 mb-2.5">
                  <span>Weight</span>
                  <span className="text-neutral-900 font-bold">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="105"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
              </div>

              {/* Body Frame */}
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Body Build:</span>
                <div className="grid grid-cols-4 gap-2.5">
                  {(['slim', 'athletic', 'regular', 'broad'] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        sound.playBeep(550);
                        setBodyType(b);
                      }}
                      className={`py-3 px-3 rounded-2xl capitalize text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                        bodyType === b
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">Occasion:</span>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-neutral-50/90 border border-black/[0.08] rounded-2xl px-4 py-3.5 text-neutral-900 font-medium text-sm focus:ring-2 focus:ring-neutral-900/10 outline-none cursor-pointer"
                >
                  <option>Placement Panel Interview</option>
                  <option>Farewell / Graduation Gala</option>
                  <option>National Case Study Competition</option>
                  <option>College Fresher / Orientation</option>
                  <option>Summer Internship First Day</option>
                </select>
              </div>
            </div>

            {/* Scan Action Button */}
            {!scanResult && (
              <button
                onClick={handleRunScan}
                disabled={isScanning}
                className="w-full py-4 rounded-full bg-neutral-900 text-white font-bold text-sm sm:text-base hover:bg-black transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2.5 active:scale-95"
              >
                {isScanning ? (
                  <span>Analyzing Biometric Dimensions...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Calculate Recommended Size</span>
                  </>
                )}
              </button>
            )}

            {/* Scan Results Display */}
            {scanResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-50/90 border border-black/[0.06] rounded-3xl p-6 space-y-5 shadow-xs"
              >
                <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.04]">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-base font-bold text-neutral-900">
                      Recommendation Ready
                    </span>
                  </div>
                  <span className="text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full text-xs font-bold">
                    {scanResult.confidence}% confidence match
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-white border border-black/[0.04]">
                    <span className="text-xs text-neutral-500 font-medium block">Primary Size</span>
                    <span className="text-2xl font-extrabold text-neutral-900 block mt-1">Size {scanResult.primarySize}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-black/[0.04]">
                    <span className="text-xs text-neutral-500 font-medium block">Est. Chest</span>
                    <span className="text-2xl font-extrabold text-neutral-900 block mt-1">{scanResult.chestInches}&quot;</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-black/[0.04]">
                    <span className="text-xs text-neutral-500 font-medium block">3-Size Pack</span>
                    <span className="text-sm font-bold text-neutral-900 block mt-2">{scanResult.threeSizes.join(', ')}</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed bg-white p-4 rounded-2xl border border-black/[0.04]">
                  {scanResult.fitNotes}
                </p>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => {
                      sound.playHologramConfirm();
                      onApplySize(scanResult.primarySize);
                      onClose();
                    }}
                    className="flex-1 py-4 rounded-full bg-neutral-900 text-white font-bold text-sm sm:text-base hover:bg-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    <Check className="w-5 h-5" />
                    <span>Apply Size {scanResult.primarySize}</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playBeep(500);
                      setScanResult(null);
                    }}
                    className="px-6 py-4 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-sm font-semibold cursor-pointer transition-colors"
                  >
                    Adjust
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

