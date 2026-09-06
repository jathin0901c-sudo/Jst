import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  Ruler, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  GraduationCap, 
  Sparkles,
  Zap,
  Building,
  Check
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface RentalProcessGuideProps {
  onBrowseRentals?: () => void;
  onOpenFitScanner?: () => void;
}

export const RentalProcessGuide: React.FC<RentalProcessGuideProps> = ({
  onBrowseRentals,
  onOpenFitScanner,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      step: 1,
      shortTitle: 'Pick & Deposit',
      title: 'Choose Branded Blazer & Book Upfront Deposit',
      tagline: 'Authentic Branded Wear • ₹1,500 - ₹2,000 Pre-Damage Deposit',
      badge: 'Step 1 • Selection & Deposit',
      icon: Package,
      time: 'Takes 2 Minutes',
      summary: 'Pick from 100% authentic branded blazers (Allen Solly, Raymond, Van Heusen). As all blazers are high-value branded garments, we take an initial ₹1,500 - ₹2,000 Pre-Damage Prevention Deposit at booking.',
      details: [
        'Select your branded formalwear: Blazers (@ ₹199/day) or 2-Piece matching combos (@ ₹209/day).',
        'Choose your rental duration (1 day for interview, 2 days for weekend galas, or custom dates).',
        'Pre Damage Prevention Deposit: ₹1,500 (single blazer) or ₹2,000 (combo) is taken upfront to protect authentic designer apparel.',
        '2-Hour Express Gate Drop is 100% FREE! (or upgrade to 30-min flash courier for +₹49).'
      ],
      tip: 'Pro-tip: Unsure about your chest size? You can use our Biometric Fit Scanner or guess approximate size—we deliver 3 sizes anyway!'
    },
    {
      step: 2,
      shortTitle: '3-Size Delivery',
      title: '3-Size Box Delivered Directly to Your Hostel Gate',
      tagline: 'Free 2-Hour Gate Drop • Selected Size + 1 Up + 1 Down in One Sealed Bag',
      badge: 'Step 2 • Free 2-Hour Gate Drop',
      icon: Truck,
      time: 'Free 2h Drop (or 30m Rush)',
      summary: 'Our campus runner arrives at your hostel gate with a sealed garment bag holding 3 sizes for FREE within 2 hours. If you want express delivery in 30 minutes, it is available for extra charges.',
      details: [
        'Free 2-Hour Express Gate Drop: Zero delivery fee across all partner campuses.',
        'Need it in 30 minutes? Emergency 30-minute flash priority express is available for +₹49.',
        'Never panic about a tight chest or short sleeves on interview morning.',
        'Example: Order size 40, and we pack Size 38, 40, and 42 together on luxury hangers.',
        'Each garment is factory-steamed, fresh, and sealed with a sterile ₹150 dry-cleaning batch certificate.',
        'Delivered straight to hostel gates across IIT Delhi, DTU, NSUT, DU North & South Campus, IIM Rohtak, and 20+ hubs.'
      ],
      tip: 'The 3-size guarantee and 2-hour gate drop are 100% free with every blazer and 2-piece combo rental!'
    },
    {
      step: 3,
      shortTitle: 'Wear & Impress',
      title: 'Try On in Your Room & Step Out with Confidence',
      tagline: 'Own the Group Discussion, Placement Interview, or Gala',
      badge: 'Step 3 • The Event',
      icon: Sparkles,
      time: 'Your Big Day',
      summary: 'Try on the garments in your hostel room, pick the one that fits like custom tailoring, and conquer your event.',
      details: [
        'Try all 3 sizes in privacy. Pick the best fit; leave the other 2 in the return pocket.',
        'Pristine presentation: crisp lapels, non-wrinkle finish, and hospital-grade sanitization.',
        'Wear it for campus placements, Bain/McKinsey consulting case interviews, civil services mocks, or college farewells.',
        'Normal transit creases, lint, and wear wrinkles are 100% covered. We dry clean anyway!'
      ],
      tip: 'You look sharp without sinking ₹10,000+ into an expensive showroom suit you might only wear once a year.'
    },
    {
      step: 4,
      shortTitle: 'Inspection & Refund',
      title: 'Gate Return: Agent Confirms Zero Damage → We Deduct ₹199 & Send Remaining!',
      tagline: 'Instant UPI Refund • No Laundry Or Washing Required By You',
      badge: 'Step 4 • Return & Settlement',
      icon: RotateCcw,
      time: 'Scheduled Pickup',
      summary: 'Simply hand the bag back to our runner at your hostel gate. Once our agent confirms no damage is done to the branded product, we deduct ₹199 and immediately send back the remaining balance to your UPI!',
      details: [
        'Our campus runner meets you at your hostel gate at your scheduled return slot.',
        '60-Second Agent Verification: Our agent quickly inspects the blazer for zero structural damage (no cuts, burns, or fabric tears).',
        'Transparent Settlement: Once confirmed damage-free, we deduct ₹199 (daily rental) and immediately send back the remaining amount (e.g. ₹1,500 - ₹199 = ₹1,301) straight to your UPI/bank account.',
        'CRITICAL RULE: Do NOT wash, iron, or dry-clean the suit yourself! Blazer Bank handles 100% of the dry cleaning.'
      ],
      tip: 'Returning is as simple as handing back a delivery parcel. You get your money back within minutes!'
    }
  ];

  const faqs = [
    {
      q: 'How does the Pre-Damage Prevention Deposit work?',
      a: 'Because all blazers at Blazer Bank are authentic, high-value branded formalwear (Allen Solly, Raymond, Van Heusen, Louis Philippe retailing at ₹8,000–₹14,000), we collect an initial Pre-Damage Prevention Deposit of ₹1,500 (single blazers) or ₹2,000 (2-piece combos) at booking. When you return the suit at your hostel gate, our agent performs a quick 60-second check. If our agent confirms no damage is done to the product, we deduct the ₹199 daily rental fee and send back the entire remaining amount (e.g., ₹1,500 - ₹199 = ₹1,301 refund; or ₹2,000 - ₹199 = ₹1,801 refund) instantly to your UPI or bank account!'
    },
    {
      q: 'What counts as "damage"? Will I lose my deposit for wrinkles or sweat?',
      a: 'Absolutely NOT! Normal wear wrinkles, hanger folds, and sweat are 100% covered. In fact, every single blazer goes through our ₹150 tri-phase dry clean facility before it is ever rented again, so sanitization and cleaning are on us. The Pre-Damage Prevention Deposit only protects against catastrophic structural damage, such as intentional fabric shears, cigarette burns, or permanent ink soaking.'
    },
    {
      q: 'Do I have to wash or dry-clean the formal wear before returning?',
      a: 'No, absolutely not! In fact, please do not wash or iron the suit with hostel equipment. Blazer Bank handles 100% of the professional dry cleaning and sanitization. Each returned garment is sent to our certified facility for a ₹150 hospital-grade tri-phase dry wash, steam press, and bacterial inspection before it can ever be rented again.'
    },
    {
      q: 'How does the "3-Size Fit Guarantee" work? Is it really free?',
      a: 'Yes, it is completely free with every blazer or combo rental! When you reserve your size (e.g. Size 40), our dispatch system automatically packs three garments: your selected size (40), one size down (38), and one size up (42) in a single luxury multi-hanger garment bag. You try all three in your room, wear the one that fits perfectly, and keep all three in the bag for our runner to collect upon return.'
    },
    {
      q: 'How fast can I get a suit for an emergency interview tomorrow morning?',
      a: 'Our standard 2-Hour Express Gate Drop is 100% FREE! Hyperlocal campus runners station at key perimeters (e.g., Hauz Khas for IIT Delhi, Bawana for DTU, Dwarka for NSUT, Vishwavidyalaya for DU, and Rohtak Gate 2) and drop your 3-size package directly at your hostel gate within 2 hours at zero extra charge. If you have an urgent short-notice interview and want it in 30 minutes, you can choose 30-Minute Flash Express delivery for a small extra charge (+₹49).'
    },
    {
      q: 'Can I extend my rental if my placement interviews continue for another day?',
      a: 'Yes! If you clear Round 1 and need the suit for Round 2 or 3 tomorrow, simply tap "Extend Rental" in your Orders tab or message our WhatsApp helpline. Rental extensions are charged at the same low daily rate (₹199/day for blazers, ₹209/day for combos).'
    }
  ];

  return (
    <section id="how-it-works" className="bg-white border border-black/[0.06] rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] mb-10 transition-all">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 border-b border-neutral-100 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white border border-amber-600/30 ring-2 ring-amber-500/20 luxury-seal-imprint p-0.5 flex items-center justify-center shrink-0 shadow-xs">
              <img
                src="/blazer_bank_logo.svg"
                alt="Blazer Bank Seal"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs sm:text-sm font-semibold">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Official Blazer Bank Process & Guarantee</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-neutral-950 tracking-tight leading-tight font-serif">
            How Renting Works at Blazer Bank
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-2 leading-relaxed font-serif">
            From emergency interview shortlists to gala evenings: how Delhi NCR & Rohtak students get authentic branded suits delivered in 2 hours with transparent deposit settlement.
          </p>
        </div>

        {/* Quick Value Metrics Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-neutral-50 border border-black/[0.04] text-center">
            <div className="text-lg font-bold text-neutral-900">₹199</div>
            <div className="text-xs text-neutral-500 font-medium">Per Day Blazer</div>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-center">
            <div className="text-lg font-bold text-blue-700">3 Sizes</div>
            <div className="text-xs text-blue-600 font-medium">Zero Fit Panic</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
            <div className="text-lg font-bold text-emerald-800">Free 2h</div>
            <div className="text-xs text-emerald-700 font-medium">Gate Drop (₹0)</div>
          </div>
          <div className="p-3 rounded-2xl bg-neutral-50 border border-black/[0.04] text-center">
            <div className="text-lg font-bold text-neutral-900">₹0 Wash</div>
            <div className="text-xs text-neutral-600 font-medium">We Dry Clean</div>
          </div>
        </div>
      </div>

      {/* Interactive Step Navigation Bar */}
      <div className="pt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-neutral-100/90 rounded-2xl border border-black/[0.04] mb-8">
          {steps.map((s) => {
            const isSelected = activeStep === s.step;
            const Icon = s.icon;
            return (
              <button
                key={s.step}
                onClick={() => {
                  sound.playBeep(550 + s.step * 70);
                  setActiveStep(s.step);
                }}
                className={`py-3 px-3 sm:px-4 rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-white text-neutral-900 shadow-sm font-bold border border-black/[0.04]'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isSelected 
                    ? 'bg-neutral-900 text-white' 
                    : 'bg-neutral-200/80 text-neutral-700'
                }`}>
                  {s.step}
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider hidden sm:block">Step {s.step}</div>
                  <div className="text-xs sm:text-sm truncate font-semibold">{s.shortTitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Highlight Card */}
        {(() => {
          const current = steps.find(s => s.step === activeStep) || steps[0];
          const Icon = current.icon;
          return (
            <div className="bg-neutral-50/90 border border-black/[0.06] rounded-3xl p-6 sm:p-8 lg:p-10 mb-10 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-semibold">
                      {current.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {current.time}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Student Verified
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                      {current.title}
                    </h3>
                    <p className="text-neutral-500 font-medium text-sm sm:text-base mt-1">
                      {current.tagline}
                    </p>
                  </div>

                  <p className="text-neutral-700 text-base leading-relaxed">
                    {current.summary}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {current.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-sm text-neutral-700 leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-xs sm:text-sm text-neutral-600 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{current.tip}</span>
                  </div>

                  {/* Navigation between steps */}
                  <div className="flex items-center gap-3 pt-2">
                    {activeStep < 4 ? (
                      <button
                        onClick={() => {
                          sound.playBeep(650);
                          setActiveStep(activeStep + 1);
                        }}
                        className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                      >
                        <span>Next: Step {activeStep + 1}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sound.playBeep(700);
                          if (onBrowseRentals) {
                            onBrowseRentals();
                          } else {
                            window.scrollTo({ top: 800, behavior: 'smooth' });
                          }
                        }}
                        className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Ready? Browse Rental Suits @ ₹199</span>
                      </button>
                    )}

                    {activeStep > 1 && (
                      <button
                        onClick={() => {
                          sound.playBeep(500);
                          setActiveStep(activeStep - 1);
                        }}
                        className="px-4 py-2.5 rounded-full bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-sm font-semibold cursor-pointer transition-colors"
                      >
                        Back
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Visual Graphic / Infographic card */}
                <div className="lg:col-span-5 bg-white border border-black/[0.06] rounded-3xl p-6 sm:p-7 shadow-xs">
                  <div className="border-b border-neutral-100 pb-4 mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 font-semibold uppercase">Workflow Snapshot</div>
                        <div className="text-sm font-bold text-neutral-900">{current.shortTitle} Preview</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">
                      Phase {activeStep}/4
                    </span>
                  </div>

                  {activeStep === 1 && (
                    <div className="space-y-4 text-xs sm:text-sm text-neutral-600">
                      <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-2">
                        <div className="font-semibold text-neutral-900 flex items-center justify-between">
                          <span>Allen Solly Blazer Rental</span>
                          <span className="text-blue-600 font-bold">₹199 / day</span>
                        </div>
                        <div className="text-neutral-500 text-xs">Includes 3-size fitting pack & campus runner transit.</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-2">
                        <div className="font-semibold text-neutral-900 flex items-center justify-between">
                          <span>Allen Solly 2-Piece Combo (Blazer + Silk Tie)</span>
                          <span className="text-neutral-900 font-bold">₹209 / day</span>
                        </div>
                        <div className="text-neutral-500 text-xs">Streamlined formal styling ready for campus placements.</div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-950">
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>Pre Damage Prevention Deposit</span>
                        </div>
                        <div className="text-xs text-amber-900">₹1,500 – ₹2,000 upfront. We deduct ₹199 on return and instantly send back the remaining balance!</div>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-3.5">
                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-blue-900 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-700">Inside Your Delivery Bag:</div>
                        <div className="grid grid-cols-3 gap-2 text-center pt-1">
                          <div className="p-2.5 rounded-xl bg-white border border-blue-200 shadow-2xs">
                            <div className="text-xs text-neutral-400">Size Down</div>
                            <div className="text-base font-extrabold text-neutral-900">38</div>
                            <div className="text-[10px] text-neutral-500">Backup fit</div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-2xs">
                            <div className="text-[10px] text-blue-200 font-medium">Selected</div>
                            <div className="text-base font-extrabold">40</div>
                            <div className="text-[10px] text-blue-100">Primary fit</div>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white border border-blue-200 shadow-2xs">
                            <div className="text-xs text-neutral-400">Size Up</div>
                            <div className="text-base font-extrabold text-neutral-900">42</div>
                            <div className="text-[10px] text-neutral-500">Backup fit</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-neutral-50 border border-black/[0.04] text-xs text-neutral-600 space-y-1.5">
                        <div className="font-semibold text-neutral-900">⚡ Hyperlocal Campus Dispatch</div>
                        <div>Runners stationed at DTU, IIT Delhi, NSUT, DU North & South, IIM Rohtak.</div>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-2.5">
                        <div className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Placement Readiness:</div>
                        <div className="text-base font-bold text-white">Bespoke Fit Without the Tailor Delay</div>
                        <div className="text-xs text-neutral-300 leading-relaxed">
                          Clean shoulders, crisp armholes, and wrinkle-resistant fabric engineered for high-pressure consulting and finance interviews.
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-amber-600" />
                          <span>Student Shield Included</span>
                        </div>
                        <div>Minor accidental transit wrinkles or lint are 100% covered. Zero anxiety.</div>
                      </div>
                    </div>
                  )}

                  {activeStep === 4 && (
                    <div className="space-y-3.5">
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2.5">
                        <div className="text-xs font-bold uppercase text-emerald-700 tracking-wider">Return & Instant Settlement:</div>
                        <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-xs space-y-1">
                          <div className="flex justify-between font-semibold text-neutral-900">
                            <span>Pre-Damage Deposit Paid:</span>
                            <span>₹1,500</span>
                          </div>
                          <div className="flex justify-between text-neutral-500">
                            <span>Agent Verifies Zero Damage:</span>
                            <span className="text-emerald-700 font-bold">✓ Approved</span>
                          </div>
                          <div className="flex justify-between text-neutral-700">
                            <span>Deduct Daily Rental Fee:</span>
                            <span className="text-neutral-900 font-semibold">-₹199</span>
                          </div>
                          <div className="pt-1.5 border-t border-emerald-100 flex justify-between font-bold text-emerald-800 text-sm">
                            <span>Sent Back to Your UPI:</span>
                            <span>₹1,301 Refund</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-neutral-50 border border-black/[0.04] text-xs text-neutral-600">
                        <div className="font-semibold text-neutral-900 mb-1">Hostel Gate Handover</div>
                        <div>Our runner contacts your phone when outside your hostel. 60-second inspection & instant refund. Done!</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {/* DEDICATED PRE DAMAGE PREVENTION DEPOSIT SECTOR */}
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white rounded-3xl p-6 sm:p-10 mb-10 shadow-lg border border-neutral-800">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Security & Deposit Transparency</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pre Damage Prevention Deposit Sector
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base mt-2 leading-relaxed">
              Because every single blazer in Blazer Bank is an authentic, luxury branded garment (Allen Solly, Raymond, Van Heusen, Louis Philippe), we take <strong className="text-white">₹1,500 to ₹2,000</strong> at booking as a Pre Damage Prevention Deposit.
            </p>
          </div>

          {/* 3-Step Deposit & Refund Mechanism Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/10 text-amber-300 flex items-center justify-center font-bold text-sm mb-3">
                  1
                </div>
                <h4 className="font-bold text-white text-base">Upfront Deposit</h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  We take ₹1,500 for single blazers (or ₹2,000 for combos) at checkout. This protects genuine branded luxury suits from severe damage.
                </p>
              </div>
              <div className="text-xs font-semibold text-amber-300/90 pt-2 border-t border-white/10">
                ₹1,500 – ₹2,000 Pre-Held
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/10 text-blue-300 flex items-center justify-center font-bold text-sm mb-3">
                  2
                </div>
                <h4 className="font-bold text-white text-base">Agent Inspection</h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  When you hand back the bag to our runner at your hostel gate, our agent conducts a quick 60-second inspection to confirm zero structural damage.
                </p>
              </div>
              <div className="text-xs font-semibold text-blue-300/90 pt-2 border-t border-white/10">
                Verified at Hostel Gate
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">
                  3
                </div>
                <h4 className="font-bold text-emerald-300 text-base">Deduct ₹199 & Refund Remainder</h4>
                <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                  If our agent confirms no damage is done to the product, we deduct ₹199 (daily rental fee) and send back the remaining balance immediately!
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-300 pt-2 border-t border-emerald-500/20">
                ₹1,301 – ₹1,801 Instant UPI Refund
              </div>
            </div>
          </div>

          {/* Interactive Calculation Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Example Refund Calculation</span>
              <div className="text-lg sm:text-xl font-bold text-white flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span>₹1,500 Deposit</span>
                <span className="text-neutral-400">−</span>
                <span className="text-amber-300">₹199 Rental Fee</span>
                <span className="text-neutral-400">=</span>
                <span className="text-emerald-400 font-extrabold text-xl sm:text-2xl">₹1,301 Refund Sent Back</span>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Damage Verified = Guaranteed Refund</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 mt-4 text-center md:text-left">
            *Note: Transit creases, folding marks, and normal wear are 100% on us! We dry clean each suit with hospital-grade sanitization anyway. You only need to safeguard against catastrophic physical cuts, tears, or burns.
          </p>
        </div>

        {/* Traditional Buying vs Blazer Bank Rental Comparison Table */}
        <div className="bg-neutral-50/80 border border-black/[0.04] rounded-3xl p-6 sm:p-8 mb-10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Why Students Prefer Blazer Bank Over Buying
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Clear breakdown of costs, logistics, and effort for college events.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500">
                  <th className="pb-3 font-semibold">Aspect</th>
                  <th className="pb-3 font-semibold text-neutral-400">Traditional Showroom Buy</th>
                  <th className="pb-3 font-bold text-neutral-900">Blazer Bank Rental</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/60 text-neutral-700">
                <tr>
                  <td className="py-3 font-medium text-neutral-900">Upfront Cost</td>
                  <td className="py-3 text-neutral-500">₹8,500 – ₹16,000</td>
                  <td className="py-3 font-bold text-emerald-600">₹199 / day (Save 97%)</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-neutral-900">Wrong Size Risk</td>
                  <td className="py-3 text-neutral-500">Needs expensive tailor alteration</td>
                  <td className="py-3 font-bold text-blue-600">Free 3 Sizes Delivered Together</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-neutral-900">Dry Cleaning & Care</td>
                  <td className="py-3 text-neutral-500">You pay ₹250+ per dry-clean cycle</td>
                  <td className="py-3 font-semibold text-neutral-900">₹0 for you (We handle sanitization)</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-neutral-900">Wardrobe Clutter</td>
                  <td className="py-3 text-neutral-500">Sits in hostel cupboard for 11 months</td>
                  <td className="py-3 font-semibold text-neutral-900">Collected next day right at hostel gate</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-neutral-900">Emergency Speed</td>
                  <td className="py-3 text-neutral-500">2-3 days showroom visits</td>
                  <td className="py-3 font-bold text-emerald-700">Free 2-Hour Gate Drop (or 30m flash rush)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="border-t border-neutral-100 pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Frequently Asked Rental Questions
              </h4>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Everything you need to know about deposits, sizing, delivery, and returns.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 font-semibold hidden sm:inline-block">
              6 Campus Answers
            </span>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl border border-black/[0.06] bg-white transition-all overflow-hidden"
                >
                  <button
                    onClick={() => {
                      sound.playBeep(isOpen ? 450 : 600);
                      setOpenFaq(isOpen ? null : index);
                    }}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-neutral-900 pr-2">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-5 text-neutral-600 text-xs sm:text-sm leading-relaxed border-t border-neutral-100 pt-3 bg-neutral-50/40">
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

        {/* Bottom Quick Action CTAs */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-neutral-500">
            Have a specific question about your campus delivery hub? Contact our student runner hotline at <span className="text-neutral-900 font-semibold">+91 98110 44820</span>.
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenFitScanner && (
              <button
                onClick={() => {
                  sound.playScanChirp();
                  onOpenFitScanner();
                }}
                className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <Ruler className="w-3.5 h-3.5 text-neutral-500" />
                <span>Calculate My Size</span>
              </button>
            )}

            {onBrowseRentals && (
              <button
                onClick={() => {
                  sound.playBeep(700);
                  onBrowseRentals();
                }}
                className="px-5 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Browse Rentals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
