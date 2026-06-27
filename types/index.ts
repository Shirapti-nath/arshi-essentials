export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  price: number;
  mrp?: number;
  fabric?: string;
  occasion?: string;
  badge?: "sale" | "new" | "bestseller";
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CheckoutDetails = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: "upi" | "cod";
};

export type Review = {
  id: string;
  rating: number;
  text: string;
  author: string;
  image: string;
  productTag: string;
  source: "whatsapp" | "instagram";
  imagePosition?: string;
};

export type Location = {
  id: string;
  city: string;
  state: string;
  mapUrl: string;
};

export type NavItem = {
  label: string;
  href: string;
};
