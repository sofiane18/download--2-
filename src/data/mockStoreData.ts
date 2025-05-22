
import type { StoreItem, StoreProfile, Customer, NotificationItem } from "@/types";

export const mockStoreProfile: StoreProfile = {
  id: "store_001",
  name: "AutoServe Central Hub - Algiers",
  phone: "+213 555 123 456",
  workingHours: "Sat-Thu: 8:30 AM - 6:30 PM, Fri: Closed",
  storeCategory: "Both",
  bio: "Your one-stop destination for premium automotive parts and expert car services in the heart of Algiers. We pride ourselves on quality, reliability, and customer satisfaction. From routine maintenance to specialized repairs and top-tier products, AutoServe has you covered.",
  logoUrl: "https://placehold.co/200x200.png",
  locationAddress: "123 Rue Didouche Mourad, Alger Centre, Algiers, 16000, Algeria",
  mapCoordinates: "36.7753° N, 3.0590° E", // More precise example
  deliveryZones: ["Alger Centre", "Hydra", "El Biar", "Kouba", "Bab Ezzouar (Select Areas)", "Ben Aknoun"],
  simulatedProximityVisible: true,
};

export const mockProductsServices: StoreItem[] = [
  {
    id: "item_001",
    title: "Premium Synthetic Engine Oil (5L Mobil1)",
    category: "Product",
    subcategory: "Engine Lubricants",
    price: 6200, // DZD
    description: "Mobil1 advanced full synthetic 5W-30 engine oil. Provides outstanding wear protection, cleaning power, and overall performance. Suitable for modern gasoline and diesel engines.",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    availableStock: 75,
    isFeatured: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "item_002",
    title: "Comprehensive Oil Change Service",
    category: "Service",
    subcategory: "Routine Maintenance",
    price: 4800, // DZD
    description: "Includes up to 5L of premium synthetic oil, OEM-spec oil filter replacement, fluid top-ups, tire pressure check, and a multi-point vehicle inspection.",
    images: ["https://placehold.co/600x400.png"],
    serviceDuration: "Approx. 1 hour",
    isFeatured: true,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "item_003",
    title: "Michelin Pilot Sport 5 Tire (225/45R17)",
    category: "Product",
    subcategory: "Performance Tires",
    price: 21500, // DZD per tire
    description: "The latest generation Michelin Pilot Sport tire, offering exceptional grip, longevity, and driving precision. Size: 225/45 R17 94Y XL.",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    availableStock: 24,
    isFeatured: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "item_004",
    title: "Full Brake System Check & Pad Replacement (Front)",
    category: "Service",
    subcategory: "Brake Services",
    price: 9500, // DZD (parts and labor for front)
    description: "Comprehensive inspection of brake discs, calipers, and fluid. Includes replacement of front brake pads with high-quality ceramic pads. Labor included.",
    images: ["https://placehold.co/600x400.png"],
    serviceDuration: "Approx. 1.5 - 2 hours",
    isFeatured: true,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
   {
    id: "item_005",
    title: "Varta Silver Dynamic Car Battery (74Ah)",
    category: "Product",
    subcategory: "Automotive Batteries",
    price: 11500, // DZD
    description: "High-performance Varta Silver Dynamic AGM battery. 74Ah, 750A CCA. Ideal for vehicles with high energy demands. 3-year warranty.",
    images: ["https://placehold.co/600x400.png"],
    availableStock: 8, // Low stock example
    isFeatured: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "item_006",
    title: "Air Conditioning System Recharge & Check",
    category: "Service",
    subcategory: "Climate Control",
    price: 6000, // DZD
    description: "Full AC system check for leaks, refrigerant recharge (R134a), and performance test. Ensures optimal cooling.",
    images: ["https://placehold.co/600x400.png"],
    serviceDuration: "Approx. 1 hour",
    isFeatured: false,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "item_007",
    title: "Bosch Aerotwin Wiper Blades (Pair)",
    category: "Product",
    subcategory: "Wipers & Vision",
    price: 3800, // DZD
    description: "Set of two Bosch Aerotwin flat wiper blades. Provides consistent, streak-free wiping performance. Various sizes available.",
    images: ["https://placehold.co/600x400.png"],
    availableStock: 40,
    isFeatured: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "item_008",
    title: "Wheel Alignment Service (4 Wheels)",
    category: "Service",
    subcategory: "Suspension & Steering",
    price: 4500, // DZD
    description: "Precision four-wheel alignment using advanced laser equipment. Improves handling, tire life, and fuel efficiency.",
    images: ["https://placehold.co/600x400.png"],
    serviceDuration: "Approx. 45-60 minutes",
    isFeatured: true,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "item_009",
    title: "Mann-Filter Air Filter C27009",
    category: "Product",
    subcategory: "Filters",
    price: 2200, // DZD
    description: "High-quality Mann-Filter engine air filter. Traps harmful particles to protect your engine. Check compatibility for your vehicle.",
    images: ["https://placehold.co/600x400.png"],
    availableStock: 60,
    isFeatured: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "item_010",
    title: "Full Interior & Exterior Detailing",
    category: "Service",
    subcategory: "Car Care & Detailing",
    price: 15000, // DZD
    description: "Complete car spa: thorough interior vacuuming, upholstery cleaning, dashboard polishing, exterior wash, wax, and tire shine. Restores showroom look.",
    images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    serviceDuration: "Approx. 3-4 hours",
    isFeatured: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const mockCustomers: Customer[] = [
  {
    id: "cust_001",
    name: "Amina Z.",
    phone: "+213 661 000 111",
    email: "amina.z@example.dz",
    totalSpent: 8500, // 3500 (Oil Change) + 5000 (Inspection)
    orderCount: 2,
    lastOrderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    reviews: [
      { orderId: "ORDER-001-XYZ", itemId: "item_002", rating: 5, text: "Great service, very quick!", createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cust_002",
    name: "Karim B.",
    phone: "+213 772 222 333",
    email: "karim.b@example.dz",
    totalSpent: 8200,
    orderCount: 1,
    lastOrderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reviews: [
       { orderId: "ORDER-002-ABC", itemId: "item_003", rating: 4, text: "Good quality parts, but delivery was a bit late.", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
    ],
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cust_003",
    name: "Fatima L.",
    phone: "+213 550 444 555",
    email: "fatima.l@example.dz",
    totalSpent: 12000,
    orderCount: 1,
    lastOrderDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // Assuming this order was for item_010 or similar high price service
    reviews: [],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cust_004",
    name: "Mehdi S.",
    phone: "+213 790 111 222",
    email: "mehdi.s@example.dz",
    totalSpent: 2500, // From mockData.ts order "ORDER-004-GHI"
    orderCount: 1,
    lastOrderDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    reviews: [
      { orderId: "ORDER-004-GHI", itemId: "item_008", rating: 5, text: "Wheel alignment was perfect!", createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()}
    ],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cust_005",
    name: "Sara K.",
    phone: "+213 541 888 999",
    email: "sara.k@example.dz",
    totalSpent: 4500, // From mockData.ts order "ORDER-005-JKL"
    orderCount: 1,
    lastOrderDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    reviews: [],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  }
];


export const mockNotifications: NotificationItem[] = [
  {
    id: "notif_001",
    message: "New order #ORDER-008-NEW received from Yacine G. for Tire Replacement.",
    type: "new_order",
    relatedId: "ORDER-008-NEW",
    read: false,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
  },
  {
    id: "notif_002",
    message: "Low stock alert: Varta Silver Dynamic Car Battery (74Ah) has only 8 units left.",
    type: "low_stock",
    relatedId: "item_005",
    read: false,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: "notif_003",
    message: "Amina Z. left a 5-star review for Comprehensive Oil Change Service.",
    type: "new_review",
    relatedId: "ORDER-001-XYZ", 
    read: true,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
   {
    id: "notif_004",
    message: "Scheduled maintenance for the POS system tonight at 2 AM.",
    type: "general_update",
    read: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: "notif_005",
    message: "Order ORDER-004-GHI (Tire Rotation) marked as Delivered.",
    type: "general_update",
    relatedId: "ORDER-004-GHI",
    read: true,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
  }
];
// Note: Placeholder images in a real app should have data-ai-hint attributes
// e.g. <Image src="https://placehold.co/600x400.png" data-ai-hint="engine oil bottle" ... />
// For this mock data, I've just used the URLs. The actual Image components in JSX should get the hints.
// I will ensure image tags in components that *use* this mock data will have the data-ai-hint.
// For the logoUrl, the component using it would add the hint.
// For StoreItem images, the component displaying them (e.g., in ManageItemsPage or a product detail view) would add the hint.
// Example structure of how image data would be used with hints:
// mockProductsServices[0].images = [
// { url: "https://placehold.co/600x400.png", hint: "engine oil bottle" },
// { url: "https://placehold.co/600x400.png", hint: "car engine" }
// ];
// However, the current `StoreItem` type defines `images: string[]`.
// To align with guidelines, the `data-ai-hint` should be added where the `next/image` component is used.
// The mock data for images will remain as string URLs.
// The component rendering these images will be responsible for adding the `data-ai-hint`.

// For instance, if displaying mockProductsServices[0].images[0]:
// <Image src={mockProductsServices[0].images[0]} data-ai-hint="engine oil" ... />

// For the store profile logo:
// <Image src={mockStoreProfile.logoUrl} data-ai-hint="store logo" ... />

mockStoreProfile.logoUrl = "https://placehold.co/200x200.png"; // data-ai-hint="store logo" will be in component

mockProductsServices.forEach(item => {
  item.images = item.images.map(imgUrl => {
    // Here, we are just ensuring they are valid placeholder URLs.
    // The `data-ai-hint` will be added in the component that renders these.
    // For example, `data-ai-hint="car part"` or `data-ai-hint="auto service"`.
    // A more specific hint would be better if known, e.g., "tire" or "oil change".
    // For now, the mock data just provides the URL.
    return imgUrl.startsWith("https://placehold.co/") ? imgUrl : "https://placehold.co/600x400.png";
  });
});
