import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AppView, 
  Product, 
  CampusLocation, 
  CartItem, 
  Order, 
  DryCleanBooking 
} from './types';
import { CAMPUSES } from './data/campuses';
import { PRODUCTS } from './data/mockProducts';
import { sound } from './utils/soundEffects';

import { BootAnimation } from './components/BootAnimation';
import { Navbar } from './components/Navbar';
import { PerfectFitBanner } from './components/PerfectFitBanner';
import { SavingsCalculator } from './components/SavingsCalculator';
import { InterviewSosBar } from './components/InterviewSosBar';
import { RentalCatalog } from './components/RentalCatalog';
import { RetailCatalog } from './components/RetailCatalog';
import { DryCleanService } from './components/DryCleanService';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HygieneCertificateModal } from './components/HygieneCertificateModal';
import { BiometricFitScanner } from './components/BiometricFitScanner';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrdersTrackerModal } from './components/OrdersTrackerModal';
import { RentalProcessGuide } from './components/RentalProcessGuide';
import { HowItWorksModal } from './components/HowItWorksModal';
import { Instagram, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';

export default function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [currentView, setCurrentView] = useState<AppView>('rent');
  const [selectedCampus, setSelectedCampus] = useState<CampusLocation>(CAMPUSES[0]);
  const [isExpressActive, setIsExpressActive] = useState(false);
  const [selectedSizeGlobal, setSelectedSizeGlobal] = useState<string>('40');

  // Modals state
  const [inspectingProduct, setInspectingProduct] = useState<Product | null>(null);
  const [hygieneProduct, setHygieneProduct] = useState<Product | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Cart & Orders state with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('stark_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('stark_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dryCleanOrders, setDryCleanOrders] = useState<DryCleanBooking[]>(() => {
    try {
      const saved = localStorage.getItem('stark_dryclean');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('stark_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('stark_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('stark_dryclean', JSON.stringify(dryCleanOrders));
  }, [dryCleanOrders]);

  // Add to cart helper
  const handleAddToCart = (
    product: Product,
    size: string,
    orderType: 'rental' | 'retail',
    rentalDays: number = 1,
    express: boolean = isExpressActive
  ) => {
    const isBlazer = product.category === 'blazer' || product.category === 'combo';
    let guaranteedSizes: string[] | undefined = undefined;

    if (orderType === 'rental' && isBlazer) {
      const num = parseInt(size, 10);
      if (!isNaN(num)) {
        guaranteedSizes = [(num - 2).toString(), num.toString(), (num + 2).toString()];
      } else {
        guaranteedSizes = [size];
      }
    }

    const price = orderType === 'rental' ? (product.rentPricePerDay * rentalDays) : (product.retailPrice || 0);

    const newItem: CartItem = {
      cartItemId: `${product.id}-${size}-${Date.now()}`,
      product,
      orderType,
      selectedSize: size,
      rentalDays: orderType === 'rental' ? rentalDays : undefined,
      expressDelivery: express,
      guaranteedSizes,
      price,
      quantity: 1
    };

    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleQuickRent = (product: Product, size: string) => {
    handleAddToCart(product, size, 'rental', 1, isExpressActive);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);
  };

  const handleDryCleanBooking = (booking: DryCleanBooking) => {
    setDryCleanOrders(prev => [booking, ...prev]);
  };

  const handleApplySizeFromScanner = (size: string) => {
    setSelectedSizeGlobal(size);
    setCurrentView('rent');
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#1a1a1c] font-serif relative selection:bg-neutral-900 selection:text-white">
      {/* Boot Animation on First Load */}
      {showBoot && (
        <BootAnimation onComplete={() => setShowBoot(false)} />
      )}

      {/* Top Telemetry & Main Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        selectedCampus={selectedCampus}
        onCampusChange={(c) => setSelectedCampus(c)}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        isExpressActive={isExpressActive}
        onToggleExpress={() => setIsExpressActive(!isExpressActive)}
        ordersCount={orders.length + dryCleanOrders.length}
      />

      {/* Main Content View Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {currentView === 'rent' && (
            <motion.div
              key="rent-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-10 sm:space-y-12"
            >
              {/* Emergency Interview SOS Banner */}
              <InterviewSosBar
                selectedCampus={selectedCampus}
                isExpressActive={isExpressActive}
                onToggleExpress={() => setIsExpressActive(!isExpressActive)}
                onSelectRentBlazer={() => {
                  const blazer = PRODUCTS.find(p => p.category === 'blazer');
                  if (blazer) setInspectingProduct(blazer);
                }}
              />

              {/* Comprehensive Rental & Return Process Guide */}
              <RentalProcessGuide
                onBrowseRentals={() => {
                  const el = document.getElementById('rental-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenFitScanner={() => setIsScannerOpen(true)}
              />

              {/* Perfect Fit Guarantee 3-Size Explainer */}
              <PerfectFitBanner
                onOpenScanner={() => setIsScannerOpen(true)}
                onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
              />

              {/* Rental vs Buy ROI Calculator */}
              <SavingsCalculator />

              {/* Core Rental Catalog */}
              <RentalCatalog
                onSelectProduct={(p) => setInspectingProduct(p)}
                onOpenHygieneModal={(p) => setHygieneProduct(p)}
                onQuickRent={handleQuickRent}
                selectedCampus={selectedCampus}
                isExpressActive={isExpressActive}
                selectedSizeGlobal={selectedSizeGlobal}
              />
            </motion.div>
          )}

          {currentView === 'buy' && (
            <motion.div
              key="buy-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <RetailCatalog
                onSelectProduct={(p) => setInspectingProduct(p)}
                onAddToCart={(p, size) => handleAddToCart(p, size, 'retail')}
              />
            </motion.div>
          )}

          {currentView === 'dryclean' && (
            <motion.div
              key="dryclean-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <DryCleanService
                selectedCampus={selectedCampus}
                onBookService={handleDryCleanBooking}
              />
            </motion.div>
          )}

          {currentView === 'scanner' && (
            <motion.div
              key="scanner-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <div className="py-8">
                <BiometricFitScanner
                  isOpen={true}
                  onClose={() => setCurrentView('rent')}
                  onApplySize={handleApplySizeFromScanner}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Apple Minimalist Footer with Luxury Contact Section */}
      <footer className="relative z-10 border-t border-black/[0.06] bg-white/90 backdrop-blur-md py-14 px-6 sm:px-10 text-sm text-neutral-500 font-serif">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Dedicated Contact & Concierge Card */}
          <div className="rounded-3xl bg-neutral-950 text-white p-8 sm:p-10 relative overflow-hidden shadow-2xl border border-neutral-800">
            {/* Subtle background monogram watermark */}
            <div className="absolute -right-8 -bottom-10 w-64 h-64 opacity-5 pointer-events-none">
              <img src="/blazer_bank_logo.svg" alt="" className="w-full h-full object-contain" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>24/7 Campus Support & Express Dispatch</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 font-serif">
                  Get in Touch with Blazer Bank
                </h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-serif">
                  Have questions about your fitting, hostel gate drop, deposit refund, or society bulk orders? Connect with our dedicated student concierge instantly.
                </p>
              </div>

              {/* Contact Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full lg:w-auto shrink-0">
                {/* WhatsApp / Phone */}
                <a
                  href="https://wa.me/917093545955?text=Hi%20Blazer%20Bank%2C%20I%20have%20an%20inquiry%20about%20formal%20wear%20rental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded-full">
                      Instant
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-serif">WhatsApp / Phone</span>
                  <span className="text-sm font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                    7093545955
                  </span>
                  <span className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1 font-serif">
                    WhatsApp or Call <ExternalLink className="w-3 h-3 opacity-60" />
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/blazerbankofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-pink-400 font-bold bg-pink-500/15 px-2 py-0.5 rounded-full">
                      Instagram
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-serif">Instagram ID</span>
                  <span className="text-sm font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                    @blazerbankofficial
                  </span>
                  <span className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1 font-serif">
                    DM & Updates <ExternalLink className="w-3 h-3 opacity-60" />
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:blazerbankofficial@gmail.com"
                  className="group flex flex-col p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold bg-amber-500/15 px-2 py-0.5 rounded-full">
                      Email
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400 font-serif">Official Mail</span>
                  <span className="text-sm font-bold text-white tracking-wide truncate group-hover:text-amber-300 transition-colors max-w-[160px]">
                    blazerbankofficial@gmail.com
                  </span>
                  <span className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1 font-serif">
                    Send Email <ExternalLink className="w-3 h-3 opacity-60" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-black/[0.06]">
            {/* Mission Statement */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-white border border-amber-600/30 ring-2 ring-amber-500/20 luxury-seal-imprint p-0.5 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                  <img
                    src="/blazer_bank_logo.svg"
                    alt="Blazer Bank"
                    className="w-full h-full object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-neutral-950 font-bold tracking-tight text-lg font-serif block">
                    Blazer Bank
                  </span>
                  <span className="text-[10px] tracking-widest text-amber-900 font-semibold uppercase block font-serif">
                    Formal Wear • Rental • Retail
                  </span>
                </div>
              </div>
              <p className="text-neutral-700 text-sm leading-relaxed max-w-sm font-serif">
                Empowering college students across Delhi NCR & Rohtak for interviews, GD rounds, and farewells. Rent authentic branded blazers @ ₹199/day, backed by our free 3-Size Fit Guarantee and transparent pre-damage prevention deposit refund.
              </p>
            </div>

            {/* Official Contact Details Column */}
            <div>
              <span className="text-neutral-950 font-bold block mb-3 text-sm font-serif">Contact & Concierge</span>
              <ul className="space-y-3 text-sm text-neutral-700 font-serif">
                <li>
                  <a
                    href="https://instagram.com/blazerbankofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-900 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-200/60 flex items-center justify-center shrink-0">
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Instagram</div>
                      <div className="font-semibold text-neutral-900 group-hover:underline">@blazerbankofficial</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/917093545955"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-amber-900 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">WhatsApp / Call</div>
                      <div className="font-semibold text-neutral-900 group-hover:underline">7093545955</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:blazerbankofficial@gmail.com"
                    className="flex items-center gap-2 hover:text-amber-900 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Official Email</div>
                      <div className="font-semibold text-neutral-900 text-xs sm:text-sm break-all group-hover:underline">
                        blazerbankofficial@gmail.com
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Campus Hubs */}
            <div>
              <span className="text-neutral-950 font-bold block mb-3 text-sm font-serif">Campus Delivery Hubs</span>
              <ul className="space-y-2 text-sm text-neutral-700 font-serif">
                <li>• DTU Rohini (Bawana Hub)</li>
                <li>• IIT Delhi (Hauz Khas Base)</li>
                <li>• DU North Campus (Hudson Lane)</li>
                <li>• IIM Rohtak (Sunaria Hub)</li>
                <li>• MDU & PGIMS Rohtak (Delhi Road)</li>
              </ul>
            </div>

            {/* Three Promises */}
            <div>
              <span className="text-neutral-950 font-bold block mb-3 text-sm font-serif">Student Guarantees</span>
              <ul className="space-y-2 text-sm text-neutral-700 font-serif">
                <li>• ₹199/day rental rate</li>
                <li>• Free 3-size delivery guarantee</li>
                <li>• 100% dry cleaned (₹150 bill proof)</li>
                <li>• Free 2-Hour Express gate drop</li>
                <li>• Transparent deposit refund on return</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500 font-serif">
            <div>
              © 2026 Blazer Bank. Branded formal wear for college students in Delhi & Rohtak.
            </div>
            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsHowItWorksOpen(true)}
                className="hover:text-neutral-900 transition-colors cursor-pointer font-medium"
              >
                How Rental Works
              </button>
              <span>•</span>
              <button
                onClick={() => setShowBoot(true)}
                className="hover:text-neutral-900 transition-colors cursor-pointer font-medium"
              >
                Welcome Splash
              </button>
              <span>•</span>
              <button
                onClick={() => setIsScannerOpen(true)}
                className="hover:text-neutral-900 transition-colors cursor-pointer font-medium"
              >
                Fit Assistant
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onBrowseRentals={() => {
          setCurrentView('rent');
          setTimeout(() => {
            const el = document.getElementById('rental-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenFitScanner={() => setIsScannerOpen(true)}
      />

      <ProductDetailModal
        product={inspectingProduct}
        onClose={() => setInspectingProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenHygieneModal={(p) => setHygieneProduct(p)}
        selectedCampus={selectedCampus}
        isExpressActiveGlobal={isExpressActive}
      />

      <HygieneCertificateModal
        product={hygieneProduct}
        onClose={() => setHygieneProduct(null)}
      />

      <BiometricFitScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onApplySize={handleApplySizeFromScanner}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        selectedCampus={selectedCampus}
        isExpressGlobal={isExpressActive}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderSuccessModal
        order={latestOrder}
        onClose={() => setLatestOrder(null)}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

      <OrdersTrackerModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        dryCleanOrders={dryCleanOrders}
      />
    </div>
  );
}
