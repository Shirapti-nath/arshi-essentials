export type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  localImage?: boolean;
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
