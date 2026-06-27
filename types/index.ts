export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductTag =
  | "trending"
  | "wedding"
  | "festival"
  | "new-arrival"
  | "bestseller";

export type ProductStory = {
  fabric?: string;
  craftsmanship?: string;
  weaving?: string;
  significance?: string;
  occasions?: string[];
  accessories?: string[];
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  images: ProductImage[];
  category: string;
  price: number;
  priceMax: number;
  fabric?: string;
  occasion?: string;
  badge?: "sale" | "new" | "bestseller";
  colors?: string[];
  borderType?: string;
  length?: string;
  blouseIncluded?: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: ProductTag[];
  story?: ProductStory;
  relatedSlugs?: string[];
  inStock?: boolean;
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

export type ToastType = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
};

export type ProductFilters = {
  categories: string[];
  fabrics: string[];
  occasions: string[];
  colors: string[];
  tags: ProductTag[];
  priceMin: number;
  priceMax: number;
  inStockOnly: boolean;
  search: string;
  sort: "default" | "price-asc" | "price-desc";
};
