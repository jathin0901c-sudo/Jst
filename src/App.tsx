import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Product, 
  CampusLocation, 
  CartItem, 
  Order, 
  DryCleanBooking,
  FashionDepartment,
  UserPreferences
} from './types';
import { CAMPUSES } from './data/campuses';
import { PRODUCTS } from './data/mockProducts';
import { sound } from './utils/soundEffects';

// Core Components
import { BootAnimation } from './components/BootAnimation';
import { WelcomeExperience } from './components/WelcomeExperience';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceExplanation } from './components/ServiceExplanation';
import { EthnicWearCollection } from './components/EthnicWearCollection';
import { FormalsCollection } from './components/FormalsCollection';
import { CollegePopularSection } from './components/CollegePopularSection';
import { GarmentCareSection } from './components/GarmentCareSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

// Modals & Interactive Overlays
import { RentalBookingModal } from './components/RentalBookingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HygieneCertificateModal } from './components/HygieneCertificateModal';
import { BiometricFitScanner } from './components/BiometricFitScanner';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrdersTrackerModal } from './components/OrdersTrackerModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { DryCleanService } from './components/DryCleanService';
import { ChangePreferenceModal } from './components/ChangePreferenceModal';
import { FlyToCartAnimation, FlyItemData } from './components/FlyToCartAnimation';

export default function App() {
  const [showBoot, setShowBoot] = useState(true);

  // User Preferences State (Department & Campus)
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('bb_preferences');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      department: 'ethnic',
      college: CAMPUSES[0],
      hasCompletedOnboarding: false
    };
  });

  const [showWelcome, setShowWelcome] = useState<boolean>(() => !preferences.hasCompletedOnboarding);
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

  // Modals state
  const [rentalModalProduct, setRentalModalProduct] = useState<{ product: Product; size: string } | null>(null);
  const [inspectingProduct, setInspectingProduct] = useState<Product | null>(null);
  const [hygieneProduct, setHygieneProduct] = useState<Product | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isCareModalOpen, setIsCareModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Flying items animation state
  const [flyingItems, setFlyingItems] = useState<FlyItemData[]>([]);

  // Cart & Orders state with LocalStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bb_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dryCleanOrders, setDryCleanOrders] = useState<DryCleanBooking[]>(() => {
    try {
      const saved = localStorage.getItem('bb_dryclean');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bb_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('bb_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('bb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bb_dryclean', JSON.stringify(dryCleanOrders));
  }, [dryCleanOrders]);

  // Onboarding completion handler
  const handleCompleteOnboarding = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs);
    setShowWelcome(false);
  };

  // Fly to Cart Animation Trigger
  const triggerFlyToCart = (clientX: number, clientY: number, imageSrc: string) => {
    const newItem: FlyItemData = {
      id: `fly-${Date.now()}-${Math.random()}`,
      image: imageSrc,
      startX: clientX,
      startY: clientY
    };
    setFlyingItems(prev => [...prev, newItem]);
  };

  const handleFlyAnimationEnd = (id: string) => {
    setFlyingItems(prev => prev.filter(item => item.id !== id));
  };

  // Add to cart helper
  const handleAddToCart = (
    product: Product,
    size: string,
    orderType: 'rental' | 'retail',
    rentalDays: number = 1,
    express: boolean = false
  ) => {
    const num = parseInt(size, 10);
    const guaranteedSizes = !isNaN(num)
      ? [(num - 2).toString(), num.toString(), (num + 2).toString()]
      : [size];

    const price = orderType === 'rental' 
      ? (product.rentPricePerDay * rentalDays) 
      : (product.retailPrice || 0);

    const newItem: CartItem = {
      cartItemId: `${product.id}-${size}-${orderType}-${Date.now()}`,
      product,
      orderType,
      selectedSize: size,
      rentalDays: orderType === 'rental' ? rentalDays : undefined,
      expressDelivery: express,
      guaranteedSizes: orderType === 'rental' ? guaranteedSizes : undefined,
      price,
      quantity: 1
    };

    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  // Direct Rent button handler (opens Rental Booking Modal with animated dates & prices)
  const handleOpenRentalModal = (product: Product, size: string) => {
    sound.playSelectTone();
    setRentalModalProduct({ product, size });
  };

  // Direct Buy button handler (adds to bag with flying animation)
  const handleQuickBuy = (product: Product, size: string, e: React.MouseEvent) => {
    sound.playSelectTone();
    triggerFlyToCart(e.clientX, e.clientY, product.image);
    handleAddToCart(product, size, 'retail', 1, false);
  };

  // Direct Clean button handler
  const handleQuickClean = (product: Product) => {
    sound.playSelectTone();
    setIsCareModalOpen(true);
  };

  const handleConfirmRentalFromModal = (
    product: Product,
    size: string,
    days: number,
    startDate: string,
    endDate: string,
    isExpress: boolean
  ) => {
    setRentalModalProduct(null);
    handleAddToCart(product, size, 'rental', days, isExpress);
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

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ea] text-[#0b162c] flex flex-col font-sans selection:bg-[#4a0e17] selection:text-[#faf5ea]">
      {/* 1. Stitched Logo Boot Animation */}
      {showBoot && <BootAnimation onComplete={() => setShowBoot(false)} />}

      {/* 2. Full-Screen Welcome Onboarding Experience (On First Visit) */}
      {showWelcome && (
        <WelcomeExperience
          initialPreferences={preferences}
          onComplete={handleCompleteOnboarding}
        />
      )}

      {/* Flying Cart Image Animation Overlay */}
      <FlyToCartAnimation
        items={flyingItems}
        onAnimationEnd={handleFlyAnimationEnd}
      />

      {/* Main Luxury Navigation */}
      <Navbar
        preferences={preferences}
        onChangePreferences={() => setIsPreferenceModalOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        ordersCount={orders.length}
        onNavigateSection={handleScrollToSection}
      />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        {/* Section 1: Hero Section */}
        <HeroSection
          department={preferences.department}
          campus={preferences.college}
          onChangePreferences={() => setIsPreferenceModalOpen(true)}
          onExploreDepartment={(dept) => {
            sound.playSelectTone();
            setPreferences(prev => ({ ...prev, department: dept }));
            handleScrollToSection(dept === 'ethnic' ? 'ethnic-section' : 'formals-section');
          }}
          onScrollToCare={() => handleScrollToSection('garment-care-section')}
        />

        {/* Section 2: "Rent, Buy, or Clean" Service Explanation */}
        <ServiceExplanation
          onRentClick={() => handleScrollToSection(preferences.department === 'ethnic' ? 'ethnic-section' : 'formals-section')}
          onBuyClick={() => handleScrollToSection(preferences.department === 'ethnic' ? 'ethnic-section' : 'formals-section')}
          onCleanClick={() => setIsCareModalOpen(true)}
        />

        {/* Dynamic Prioritization: Show user's preferred department first! */}
        {preferences.department === 'ethnic' ? (
          <>
            {/* Section 3: Ethnic Wear Collection */}
            <EthnicWearCollection
              products={PRODUCTS}
              onRentClick={handleOpenRentalModal}
              onBuyClick={handleQuickBuy}
              onCleanClick={handleQuickClean}
              onInspectClick={(p) => setInspectingProduct(p)}
              onHygieneClick={(p) => setHygieneProduct(p)}
            />

            {/* Section 4: Blazers & Formals Collection */}
            <FormalsCollection
              products={PRODUCTS}
              onRentClick={handleOpenRentalModal}
              onBuyClick={handleQuickBuy}
              onCleanClick={handleQuickClean}
              onInspectClick={(p) => setInspectingProduct(p)}
              onHygieneClick={(p) => setHygieneProduct(p)}
            />
          </>
        ) : (
          <>
            {/* Section 3: Blazers & Formals Collection */}
            <FormalsCollection
              products={PRODUCTS}
              onRentClick={handleOpenRentalModal}
              onBuyClick={handleQuickBuy}
              onCleanClick={handleQuickClean}
              onInspectClick={(p) => setInspectingProduct(p)}
              onHygieneClick={(p) => setHygieneProduct(p)}
            />

            {/* Section 4: Ethnic Wear Collection */}
            <EthnicWearCollection
              products={PRODUCTS}
              onRentClick={handleOpenRentalModal}
              onBuyClick={handleQuickBuy}
              onCleanClick={handleQuickClean}
              onInspectClick={(p) => setInspectingProduct(p)}
              onHygieneClick={(p) => setHygieneProduct(p)}
            />
          </>
        )}

        {/* Section 5: Popular Near Your College */}
        <CollegePopularSection
          products={PRODUCTS}
          campus={preferences.college}
          onRentClick={handleOpenRentalModal}
          onBuyClick={handleQuickBuy}
          onCleanClick={handleQuickClean}
          onInspectClick={(p) => setInspectingProduct(p)}
          onHygieneClick={(p) => setHygieneProduct(p)}
        />

        {/* Section 6: Garment Care & Cleaning with Draggable Before/After Slider */}
        <GarmentCareSection
          campusName={preferences.college.shortName}
          onOpenBooking={() => setIsCareModalOpen(true)}
        />

        {/* Section 7: Verified Student Customer Reviews */}
        <CustomerReviewsSection />

        {/* Section 8: Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Section 9: Luxury Footer */}
      <Footer
        currentCampus={preferences.college}
        onChangeCampus={() => setIsPreferenceModalOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenFitScanner={() => setIsScannerOpen(true)}
      />

      {/* ======================================================== */}
      {/* MODALS & DRAWERS */}
      {/* ======================================================== */}

      {/* Rental Booking Modal with Animated Dates & Price */}
      {rentalModalProduct && (
        <RentalBookingModal
          product={rentalModalProduct.product}
          selectedSize={rentalModalProduct.size}
          campus={preferences.college}
          isExpressDefault={false}
          onClose={() => setRentalModalProduct(null)}
          onConfirmRental={handleConfirmRentalFromModal}
        />
      )}

      {/* Change College & Department Modal */}
      <ChangePreferenceModal
        isOpen={isPreferenceModalOpen}
        onClose={() => setIsPreferenceModalOpen(false)}
        currentPreferences={preferences}
        onSavePreferences={(newPrefs) => setPreferences(newPrefs)}
      />

      {/* Product Deep Inspection Modal */}
      {inspectingProduct && (
        <ProductDetailModal
          product={inspectingProduct}
          onClose={() => setInspectingProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenHygieneModal={(p) => setHygieneProduct(p)}
          selectedCampus={preferences.college}
          isExpressActiveGlobal={false}
        />
      )}

      {/* Hygiene Certificate Proof Modal */}
      {hygieneProduct && (
        <HygieneCertificateModal
          product={hygieneProduct}
          onClose={() => setHygieneProduct(null)}
        />
      )}

      {/* AI Biometric Fit Scanner Modal */}
      {isScannerOpen && (
        <BiometricFitScanner
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onApplySize={() => {}}
        />
      )}

      {/* How It Works (3-Size Backup Guide) Modal */}
      {isHowItWorksOpen && (
        <HowItWorksModal
          isOpen={isHowItWorksOpen}
          onClose={() => setIsHowItWorksOpen(false)}
        />
      )}

      {/* Personal Garment Care & Dry Cleaning Booking Modal */}
      {isCareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#fdf9f1] border border-amber-600/30 shadow-2xl relative">
            <div className="p-4 flex justify-end sticky top-0 bg-[#fdf9f1]/90 backdrop-blur-md z-10 border-b border-amber-600/15">
              <button
                type="button"
                onClick={() => setIsCareModalOpen(false)}
                className="px-4 py-2 rounded-full bg-[#f4ebd9] hover:bg-[#eae0cb] text-xs font-bold text-[#0b162c] cursor-pointer"
              >
                Close Care Desk
              </button>
            </div>
            <DryCleanService
              selectedCampus={preferences.college}
              onBookingSuccess={(booking) => {
                setDryCleanOrders(prev => [booking, ...prev]);
                setIsCareModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        selectedCampus={preferences.college}
        isExpressGlobal={false}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmed Success Modal */}
      {latestOrder && (
        <OrderSuccessModal
          order={latestOrder}
          onClose={() => setLatestOrder(null)}
          onOpenTracker={() => {
            setLatestOrder(null);
            setIsOrdersOpen(true);
          }}
        />
      )}

      {/* Live Orders Tracker Modal */}
      <OrdersTrackerModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />
    </div>
  );
}
