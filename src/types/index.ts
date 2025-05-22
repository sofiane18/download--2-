
export type OrderStatus = "Pending" | "Confirmed" | "In-process" | "Picked Up" | "Delivered" | "Cancelled";
export type ItemCategory = "Product" | "Service";
export type StoreCategory = "Car Parts" | "Car Services" | "Both";
export type PaymentType = "Full Payment" | "Installment Plan";
export type InstallmentPlanOption = "3 Months" | "6 Months" | "12 Months" | "24 Months";

export interface InstallmentDetails {
  plan: InstallmentPlanOption;
  monthlyAmount: number;
  installmentsPaid: number;
  totalInstallments: number;
  nextDueDate?: string; // ISO date string
}

export interface Order {
  id: string;
  buyerName: string; 
  productName: string; 
  price: number; // DZD - This would be the total price
  storeName: string; 
  status: OrderStatus;
  itemCategory: ItemCategory; 
  location: string; 
  verificationCode: string; 
  pickupTimestamp?: string; 
  createdAt: string; 
  customerId?: string; 
  items?: { itemId: string, quantity: number, name: string, unitPrice: number }[]; // Enhanced for multi-item potential
  notes?: string;
  paymentType: PaymentType;
  installmentDetails?: InstallmentDetails;
}

// Renaming PurchaseRequest to Order for clarity in new context
export type PurchaseRequest = Order;
export type PurchaseRequestStatus = OrderStatus;
export type PurchaseRequestCategory = ItemCategory;


export interface StoreItem {
  id: string;
  title: string;
  category: ItemCategory;
  subcategory: string; 
  price: number; // DZD
  description: string;
  images: string[]; 
  availableStock?: number; 
  serviceDuration?: string; 
  isFeatured: boolean;
  createdAt: string; 
  updatedAt?: string; 
}

export interface StoreProfile {
  id: string;
  name: string;
  phone: string;
  workingHours: string; 
  storeCategory: StoreCategory;
  bio: string;
  logoUrl: string; 
  locationAddress: string; 
  mapCoordinates?: string; 
  deliveryZones: string[]; 
  simulatedProximityVisible: boolean; 
}

export interface CustomerReview {
  orderId: string;
  itemId?: string; 
  rating: number; // 1-5
  text: string;
  createdAt: string; 
}
export interface Customer {
  id: string;
  name: string;
  phone: string; 
  email: string; 
  totalSpent: number; // DZD
  orderCount: number;
  lastOrderDate?: string; 
  reviews: CustomerReview[];
  createdAt: string; 
}

export type NotificationType = 'new_order' | 'low_stock' | 'new_review' | 'general_update';

export interface NotificationItem {
  id: string;
  message: string;
  type: NotificationType;
  relatedId?: string; 
  read: boolean;
  timestamp: string; 
}