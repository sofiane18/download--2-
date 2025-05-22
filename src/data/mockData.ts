
import type { Order, InstallmentDetails } from "@/types";

const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateInstallmentDetails = (totalPrice: number, planMonths: 3 | 6 | 12 | 24): InstallmentDetails => {
  const monthlyAmount = Math.round(totalPrice / planMonths);
  const planMap = {
    3: "3 Months",
    6: "6 Months",
    12: "12 Months",
    24: "24 Months",
  } as const;

  return {
    plan: planMap[planMonths],
    monthlyAmount: monthlyAmount,
    installmentsPaid: Math.floor(Math.random() * planMonths), // Random number of paid installments
    totalInstallments: planMonths,
    nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Approx 1 month from now
  };
};


export const mockPurchaseRequests: Order[] = [
  {
    id: "ORDER-001-XYZ",
    buyerName: "Amina Z.",
    customerId: "cust_001",
    productName: "Oil Change Service",
    price: 3500,
    storeName: "Rapid Auto Service - Algiers Center",
    status: "Pending",
    itemCategory: "Service",
    location: "Algiers",
    verificationCode: generateVerificationCode(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), 
    paymentType: "Full Payment",
  },
  {
    id: "ORDER-002-ABC",
    buyerName: "Karim B.",
    customerId: "cust_002",
    productName: "Brake Pads (Set of 4)",
    price: 8200,
    storeName: "Global Auto Parts - Oran",
    status: "Confirmed",
    itemCategory: "Product",
    location: "Oran",
    verificationCode: generateVerificationCode(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
    paymentType: "Installment Plan",
    installmentDetails: generateInstallmentDetails(8200, 6),
  },
  {
    id: "ORDER-003-DEF",
    buyerName: "Fatima L.",
    customerId: "cust_003",
    productName: "Full Car Detailing",
    price: 12000,
    storeName: "Shine Bright Detailing - Constantine",
    status: "In-process",
    itemCategory: "Service",
    location: "Constantine",
    verificationCode: generateVerificationCode(),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), 
    paymentType: "Full Payment",
  },
  {
    id: "ORDER-004-GHI",
    buyerName: "Mehdi S.",
    customerId: "cust_004",
    productName: "Tire Rotation & Balancing",
    price: 2500,
    storeName: "Tire Pro - Algiers",
    status: "Delivered", 
    itemCategory: "Service",
    location: "Algiers",
    verificationCode: generateVerificationCode(),
    pickupTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), 
    paymentType: "Full Payment",
  },
  {
    id: "ORDER-005-JKL",
    buyerName: "Sara K.",
    customerId: "cust_005",
    productName: "Spark Plugs (NGK)",
    price: 4500,
    storeName: "Algiers Auto Spares",
    status: "Picked Up",
    itemCategory: "Product",
    location: "Algiers",
    verificationCode: generateVerificationCode(),
    pickupTimestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), 
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), 
    paymentType: "Installment Plan",
    installmentDetails: generateInstallmentDetails(4500, 3),
  },
  {
    id: "ORDER-006-MNO",
    buyerName: "Youssef M.",
    customerId: "cust_006",
    productName: "Air Filter",
    price: 1800,
    storeName: "Global Auto Parts - Oran",
    status: "Cancelled", 
    itemCategory: "Product",
    location: "Oran",
    verificationCode: generateVerificationCode(),
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), 
    paymentType: "Full Payment", 
  },
  {
    id: "ORDER-007-PQR",
    buyerName: "Leila H.",
    customerId: "cust_001", 
    productName: "Used Car Inspection",
    price: 5000,
    storeName: "Dealership Plus - Algiers",
    status: "Confirmed",
    itemCategory: "Service",
    location: "Algiers",
    verificationCode: generateVerificationCode(),
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), 
    paymentType: "Full Payment",
  },
];
