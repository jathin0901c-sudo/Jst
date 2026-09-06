import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Minus, 
  CheckCircle2, 
  MapPin, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { CampusLocation, DryCleanBooking } from '../types';
import { sound } from '../utils/soundEffects';

interface DryCleanServiceProps {
  selectedCampus: CampusLocation;
  onBookService: (booking: DryCleanBooking) => void;
}

export const DryCleanService: React.FC<DryCleanServiceProps> = ({ selectedCampus, onBookService }) => {
  const [selectedHostel, setSelectedHostel] = useState(selectedCampus.hostels[0]);
  const [roomNumber, setRoomNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [pickupSlot, setPickupSlot] = useState('Tomorrow Morning (08:00 AM - 10:00 AM)');
  const [isUrgent24h, setIsUrgent24h] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [garmentCounts, setGarmentCounts] = useState<{ [key: string]: number }>({
    blazer: 1,
    suitSet: 0,
    shirt: 1,
    trouser: 0,
    tie: 0
  });

  const priceCatalog: { [key: string]: { name: string; price: number; desc: string } } = {
    blazer: { name: 'Formal Blazer / Coat', price: 149, desc: 'Hydrocarbon solvent + UV-C chamber + steam finish' },
    suitSet: { name: '2-Piece Suit (Coat + Pant)', price: 189, desc: 'Complete two-piece boardroom set deep cleaned' },
    shirt: { name: 'Formal Shirt', price: 49, desc: 'Anti-crease starch with crisp collar & cuff pressing' },
    trouser: { name: 'Formal Trouser / Chino', price: 49, desc: 'Precision crease retention steam press' },
    tie: { name: 'Silk Tie / Bowtie', price: 29, desc: 'Delicate stain removal & steam restoration' }
  };

  const updateCount = (key: string, delta: number) => {
    sound.playBeep(delta > 0 ? 650 : 500);
    setGarmentCounts(prev => ({
      ...prev,
      [key]: Math.max(0, (prev[key] || 0) + delta)
    }));
  };

  const calculateSubtotal = () => {
    return Object.entries(garmentCounts).reduce((acc, [key, count]) => {
      const numCount = typeof count === 'number' ? count : 0;
      return acc + (numCount * (priceCatalog[key]?.price || 0));
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const expressFee = isUrgent24h ? 39 : 0;
  const totalCost = subtotal + expressFee;
  const totalPieces = Object.values(garmentCounts).reduce((a: number, b: number) => a + b, 0);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalPieces === 0) {
      alert('Please select at least 1 garment for dry cleaning.');
      return;
    }
    if (!studentName || !studentPhone || !roomNumber) {
      alert('Please provide your name, phone number, and hostel room number.');
      return;
    }

    sound.playHologramConfirm();

    const booking: DryCleanBooking = {
      id: `DRY-CLN-${Math.floor(10000 + Math.random() * 90000)}`,
      garments: Object.entries(garmentCounts)
        .filter(([_, count]) => (typeof count === 'number' && count > 0))
        .map(([key, count]) => ({
          name: priceCatalog[key].name,
          count: count as number,
          pricePerPiece: priceCatalog[key].price
        })),
      campus: selectedCampus.name,
      hostel: selectedHostel,
      roomNumber,
      studentName,
      studentPhone,
      pickupSlot,
      isUrgent24h,
      totalCost,
      status: 'PENDING_PICKUP'
    };

    onBookService(booking);
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Clean Luxury Banner */}
      <div className="bg-[#fdf9f0] border border-amber-600/30 rounded-3xl p-8 sm:p-10 shadow-md font-serif">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f2ebd8] border border-amber-500/30 text-amber-900 text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Doorstep Hostel Dry Cleaning & Steam Press</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b162c] tracking-tight">
              Care for Your Own Formal Suits
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed font-sans">
              Got your own blazer that smells musty or needs razor-sharp steam pressing for placement week? We collect directly from your hostel room, sanitize and press it at ₹149, and deliver it back crisp and ready to wear.
            </p>
          </div>

          <div className="bg-[#f4ebd9] p-6 sm:p-7 rounded-3xl border border-amber-600/20 text-center shrink-0 min-w-[200px]">
            <span className="text-sm text-neutral-600 block font-medium">Standard Blazer Wash</span>
            <span className="text-4xl font-extrabold tracking-tight text-[#0b162c] block my-1">₹149</span>
            <span className="text-xs sm:text-sm text-amber-800 font-bold block">UV-C chamber sanitized</span>
          </div>
        </div>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#fdf9f0] border border-amber-600/30 rounded-3xl p-10 sm:p-12 text-center space-y-6 shadow-md max-w-xl mx-auto font-serif"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-3xl font-bold text-[#0b162c] tracking-tight">
              Pickup Scheduled
            </h3>
            <p className="text-base text-neutral-600 mt-2 font-sans">
              Our campus runner will visit <strong className="text-[#0b162c] font-semibold">{selectedHostel}, Room {roomNumber}</strong> at {selectedCampus.name}.
            </p>
          </div>

          <div className="bg-[#f4ebd9] p-6 rounded-2xl border border-amber-600/20 text-left text-sm space-y-3 font-sans">
            <div className="flex justify-between text-neutral-600">
              <span>Total Garments:</span>
              <span className="text-[#0b162c] font-bold">{totalPieces} Pieces</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Pickup Slot:</span>
              <span className="text-[#0b162c] font-semibold">{pickupSlot}</span>
            </div>
            <div className="flex justify-between text-neutral-700 pt-2 border-t border-amber-600/15">
              <span>Payable Amount:</span>
              <span className="text-[#0b162c] font-bold text-base">₹{totalCost} (Pay UPI / Cash on drop)</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playBeep(600);
              setIsSubmitted(false);
            }}
            className="px-8 py-3.5 rounded-full bg-[#0b162c] text-white font-semibold text-sm hover:bg-[#122449] transition-all cursor-pointer shadow-md active:scale-95 border border-amber-500/40"
          >
            Book Another Garment
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Garment Selection (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf9f0] border border-amber-600/25 rounded-3xl p-7 sm:p-8 shadow-sm space-y-6 font-serif">
              <h3 className="text-xl font-bold text-[#0b162c] flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-700" /> 1. Select Garments to Clean
              </h3>

              <div className="space-y-3.5 font-sans">
                {Object.entries(priceCatalog).map(([key, item]) => {
                  const count = garmentCounts[key] || 0;
                  return (
                    <div
                      key={key}
                      className="p-5 rounded-2xl bg-[#f4ebd9] border border-amber-600/20 flex items-center justify-between transition-colors hover:bg-[#eae0cb] gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#0b162c] font-bold text-base font-serif">{item.name}</span>
                          <span className="text-[#0b162c] text-sm font-bold bg-[#fdf9f0] px-2.5 py-0.5 rounded-full border border-amber-600/20">₹{item.price}</span>
                        </div>
                        <p className="text-sm text-neutral-600 mt-1 leading-normal">{item.desc}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateCount(key, -1)}
                          disabled={count === 0}
                          className="w-10 h-10 rounded-full bg-[#fdf9f0] border border-amber-600/30 hover:bg-[#f2ebd8] disabled:opacity-30 text-[#0b162c] flex items-center justify-center cursor-pointer transition-all shadow-xs"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-7 text-center font-bold text-base text-[#0b162c]">{count}</span>
                        <button
                          type="button"
                          onClick={() => updateCount(key, 1)}
                          className="w-10 h-10 rounded-full bg-[#0b162c] text-white hover:bg-[#122449] border border-amber-500/40 flex items-center justify-center cursor-pointer transition-all shadow-xs"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pickup Coordinates */}
            <div className="bg-[#fdf9f0] border border-amber-600/25 rounded-3xl p-7 sm:p-8 shadow-sm space-y-6 font-serif">
              <h3 className="text-xl font-bold text-[#0b162c] flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-amber-700" /> 2. Pickup Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans">
                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-2">Campus:</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedCampus.name}
                    className="w-full bg-[#f2ebd8] border border-amber-600/20 rounded-2xl px-4 py-3 text-[#0b162c] text-sm cursor-not-allowed font-semibold"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-2">Hostel Wing / Block:</label>
                  <select
                    value={selectedHostel}
                    onChange={(e) => setSelectedHostel(e.target.value)}
                    className="w-full bg-[#f4ebd9] border border-amber-600/20 rounded-2xl px-4 py-3 text-[#0b162c] text-sm focus:ring-2 focus:ring-amber-500/20 outline-none cursor-pointer font-medium"
                  >
                    {selectedCampus.hostels.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-2">Room Number:</label>
                  <input
                    type="text"
                    placeholder="e.g. Room 314, 3rd Floor"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    className="w-full bg-[#f4ebd9] border border-amber-600/20 rounded-2xl px-4 py-3 text-[#0b162c] text-sm focus:ring-2 focus:ring-amber-500/20 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-2">Student Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    className="w-full bg-[#f4ebd9] border border-amber-600/20 rounded-2xl px-4 py-3 text-[#0b162c] text-sm focus:ring-2 focus:ring-amber-500/20 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-2">Phone (for runner pickup):</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                    className="w-full bg-[#f4ebd9] border border-amber-600/20 rounded-2xl px-4 py-3 text-[#0b162c] text-sm focus:ring-2 focus:ring-amber-500/20 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-2">Preferred Slot:</label>
                  <select
                    value={pickupSlot}
                    onChange={(e) => setPickupSlot(e.target.value)}
                    className="w-full bg-[#f4ebd9] border border-amber-600/20 rounded-2xl px-4 py-3 text-[#0b162c] text-sm focus:ring-2 focus:ring-amber-500/20 outline-none cursor-pointer font-medium"
                  >
                    <option>Today Evening (06:00 PM - 08:30 PM)</option>
                    <option>Tomorrow Morning (08:00 AM - 10:00 AM)</option>
                    <option>Tomorrow Lunch (01:00 PM - 03:00 PM)</option>
                    <option>Urgent Within 2 Hours (+Express)</option>
                  </select>
                </div>
              </div>

              {/* 24-Hour Urgent Toggle */}
              <div 
                onClick={() => {
                  sound.playExpressPing();
                  setIsUrgent24h(!isUrgent24h);
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between font-sans ${
                  isUrgent24h 
                    ? 'bg-amber-100/70 border-amber-500 text-amber-950'
                    : 'bg-[#f4ebd9] border-amber-600/20 text-neutral-700 hover:bg-[#eae0cb]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Flame className={`w-6 h-6 ${isUrgent24h ? 'text-amber-700' : 'text-amber-800/60'}`} />
                  <div>
                    <span className="font-bold text-[#0b162c] block text-sm sm:text-base font-serif">24-Hour Emergency Rush Turnaround</span>
                    <span className="text-xs sm:text-sm text-neutral-600">Guaranteed return before your morning placement interview</span>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-950 font-bold text-xs sm:text-sm shrink-0">
                  +₹39
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary & Submit (1 Col) */}
          <div className="space-y-5">
            <div className="bg-[#fdf9f0] border border-amber-600/30 rounded-3xl p-7 sm:p-8 shadow-md space-y-5 sticky top-28 font-serif">
              <h3 className="text-xl font-bold text-[#0b162c]">
                Service Summary
              </h3>

              <div className="space-y-3 text-sm border-b border-amber-600/15 pb-5 font-sans">
                <div className="flex justify-between text-neutral-600">
                  <span>Selected Pieces:</span>
                  <span className="font-bold text-[#0b162c]">{totalPieces} Garments</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Standard Cleaning:</span>
                  <span className="font-medium text-[#0b162c]">₹{subtotal}</span>
                </div>
                {isUrgent24h && (
                  <div className="flex justify-between text-amber-800 font-bold">
                    <span>24h Rush Processing:</span>
                    <span>+₹39</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Doorstep Hostel Delivery:</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-sm text-neutral-600 font-semibold uppercase tracking-wider">Total:</span>
                <span className="text-3xl font-extrabold tracking-tight text-[#0b162c]">
                  ₹{totalCost}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                Pay upon doorstep delivery via UPI (PhonePe, Google Pay) or cash. Zero advance required.
              </p>

              <button
                type="submit"
                disabled={totalPieces === 0}
                className="w-full py-4 rounded-full bg-[#0b162c] hover:bg-[#122449] disabled:opacity-40 text-white font-bold text-sm sm:text-base transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-95 border border-amber-500/40"
              >
                <span className="text-amber-300">Confirm Pickup</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

