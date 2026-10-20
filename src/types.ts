export type AppView = 'rent' | 'buy' | 'dryclean' | 'scanner';

export type FashionDepartment = 'ethnic' | 'formals' | 'all';

export type EthnicCategory = 
  | 'sarees' 
  | 'lehengas' 
  | 'kurtas' 
  | 'sherwanis' 
  | 'indo_western' 
  | 'dupattas_accessories';

export type FormalsCategory = 
  | 'mens_blazers' 
  | 'womens_blazers' 
  | 'formal_suits' 
  | 'shirts_trousers' 
  | 'dresses' 
  | 'shoes_accessories';

export type ProductCategory = EthnicCategory | FormalsCategory | 'blazer' | 'tie' | 'combo' | 'shirt' | 'trouser' | 'shoes';

export interface HygieneBatch {
  sanitizedDate: string;
  washCost: number; // dry clean bill proof
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
  department: 'ethnic' | 'formals';
  category: ProductCategory;
  type: 'rental' | 'retail' | 'both';
  rentPricePerDay: number; // e.g. 199, 299, 399
  retailPrice?: number; // for retail sale e.g. 4999
  cleanPrice?: number; // professional care price e.g. 149
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
  availability: 'In Stock' | 'Only 2 Left' | 'Express Ready (45m)' | 'Reserved';
  description: string;
}

export interface CampusLocation {
  id: string;
  city: 'Delhi NCR' | 'Rohtak' | 'Pan-India';
  name: string;
  shortName: string;
  code: string;
  hostels: string[];
  expressTimeMins: number;
  runnerStation: string;
  isCustom?: boolean;
}

export interface UserPreferences {
  department: 'ethnic' | 'formals';
  college: CampusLocation;
  hasCompletedOnboarding: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  orderType: 'rental' | 'retail' | 'dryclean';
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
  paymentMethod: 'UPI' | 'COD' | 'Card / NetBanking';
  expressDelivery: boolean;
  subtotal: number;
  expressCharge: number;
  depositAmount?: number;
  expectedRefund?: number;
  total: number;
  status: 'CONFIRMED' | 'DISPATCHED_RADAR' | 'OUT_FOR_CAMPUS' | 'ARRIVED_HOSTEL_GATE' | 'DELIVERED';
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
