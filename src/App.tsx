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

      {/* Apple Minimalist Footer */}
      <footer className="relative z-10 border-t border-black/[0.06] bg-white/80 backdrop-blur-md py-14 px-6 sm:px-10 text-sm text-neutral-500">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-black/[0.06]">
            {/* Mission Statement */}
            <div className="space-y-3.5 md:col-span-2">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-white border border-amber-600/30 ring-2 ring-amber-500/20 luxury-seal-imprint p-0.5 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                  <img
                    src="/blazer_bank_emblem.jpg"
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
              <p className="text-neutral-700 text-sm leading-relaxed max-w-md font-serif">
                Empowering college students across Delhi NCR & Rohtak for interviews, GD rounds, and farewells. Rent authentic branded blazers @ ₹199/day, backed by our free 3-Size Fit Guarantee and transparent pre-damage prevention deposit refund.
              </p>
            </div>

            {/* Campus Hubs */}
            <div>
              <span className="text-neutral-900 font-bold block mb-3 text-sm">Campus Delivery Hubs</span>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>• DTU Rohini (Bawana Hub)</li>
                <li>• IIT Delhi (Hauz Khas Base)</li>
                <li>• DU North Campus (Hudson Lane)</li>
                <li>• IIM Rohtak (Sunaria Hub)</li>
                <li>• MDU & PGIMS Rohtak (Delhi Road)</li>
              </ul>
            </div>

            {/* Three Promises */}
            <div>
              <span className="text-neutral-900 font-bold block mb-3 text-sm">Student Guarantees</span>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>• ₹199/day rental rate</li>
                <li>• Free 3-size delivery guarantee</li>
                <li>• 100% dry cleaned (₹150 bill proof)</li>
                <li>• Free 2-Hour Express gate drop (30m rush available)</li>
                <li>• Transparent deposit refund on zero-damage return</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500">
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
