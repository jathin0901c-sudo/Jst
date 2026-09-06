export type AppView = 'rent' | 'buy' | 'dryclean' | 'scanner';

export type Category = 'all' | 'blazer' | 'tie' | 'combo' | 'shirt' | 'trouser' | 'shoes';

export interface HygieneBatch {
  sanitizedDate: string;
  washCost: number; // ₹150 dry clean bill proof
  facility: string;
  method: string;
  inspectorId: string;
  certificateId: string;
  billProofNumber: string;
  labRating: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  brand: string;
  category: 'blazer' | 'tie' | 'combo' | 'shirt' | 'trouser' | 'shoes';
  type: 'rental' | 'retail' | 'both';
  rentPricePerDay: number; // 199 for blazers, 39 for ties, 209 for combo
  retailPrice?: number; // for retail sale
  mrp: number; // retail MRP comparison
  image: string;
  sizes: string[];
  color: string;
  fabric: string;
  rating: number;
  reviewsCount: number;
  seniorDonated?: boolean;
  donorCollege?: string;
  dryCleanCertified: boolean;
  hygieneBatch: HygieneBatch;
  tags: string[];
  expressReady: boolean;
  description: string;
}

export interface CampusLocation {
  id: string;
  city: 'Delhi NCR' | 'Rohtak';
  name: string;
  code: string;
  hostels: string[];
  expressTimeMins: number;
  runnerStation: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  orderType: 'rental' | 'retail';
  selectedSize: string;
  rentalDays?: number;
  startDate?: string;
  endDate?: string;
  guaranteedSizes?: string[]; // [selected, selected - 1, selected + 1]
  expressDelivery?: boolean;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  campus: string;
  hostel: string;
  roomNumber: string;
  studentName: string;
  studentPhone: string;
  paymentMethod: 'UPI' | 'COD';
  expressDelivery: boolean;
  subtotal: number;
  expressCharge: number;
  total: number;
  status: 'DISPATCHED_RADAR' | 'OUT_FOR_CAMPUS' | 'ARRIVED_HOSTEL_GATE' | 'DELIVERED';
  etaMinutes: number;
  pickupScheduledDate?: string;
}

export interface DryCleanBooking {
  id: string;
  garments: { name: string; count: number; pricePerPiece: number }[];
  campus: string;
  hostel: string;
  roomNumber: string;
  studentName: string;
  studentPhone: string;
  pickupSlot: string;
  isUrgent24h: boolean;
  totalCost: number;
  status: 'PENDING_PICKUP' | 'CLEANING_ACTIVE' | 'READY_DELIVERY';
}
