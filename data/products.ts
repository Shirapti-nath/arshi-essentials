import type { Product } from "@/types";
import { assetPath } from "@/lib/assetPath";

export const products: Product[] = [
  {
    id: "kanchipuram-silk",
    slug: "kanchipuram-silk",
    title: "Kanchipuram Silk Sarees",
    description:
      "Premium handwoven silk sarees with traditional temple designs and gold zari borders.",
    image: assetPath("/products/kanchipuram-collection.jpg"),
    imageAlt:
      "Authentic Kanchipuram Kanjeevaram silk sarees with gold zari temple borders from Tamil Nadu",
    category: "silk",
    price: 4999,
    mrp: 6499,
    fabric: "Pure Silk",
    occasion: "Wedding & Festive",
    badge: "bestseller",
  },
  {
    id: "madurai-sungudi",
    slug: "madurai-sungudi",
    title: "Madurai Sungudi Cotton Sarees",
    description:
      "Comfortable and elegant cotton sarees for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1678705730064-a7ecbab4b3fb?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman in a classic white and red Madurai cotton saree",
    category: "cotton",
    price: 1299,
    mrp: 1699,
    fabric: "Cotton",
    occasion: "Daily Wear",
  },
  {
    id: "salwars",
    slug: "salwars",
    title: "Salwars",
    description: "Stylish and graceful ethnic salwar kameez sets.",
    image:
      "https://images.unsplash.com/photo-1742800764280-d51117b7eb0a?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman in a floral print salwar kameez ethnic set",
    category: "ethnic-sets",
    price: 1899,
    mrp: 2499,
    fabric: "Cotton Blend",
    occasion: "Casual & Festive",
    badge: "new",
  },
  {
    id: "kurti",
    slug: "kurti",
    title: "Kurti",
    description: "Modern and traditional block-print kurti collections.",
    image:
      "https://images.unsplash.com/photo-1742800786544-e935375035e3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman wearing a traditional block printed cotton kurta",
    category: "ethnic-sets",
    price: 999,
    mrp: 1299,
    fabric: "Cotton",
    occasion: "Daily Wear",
  },
  {
    id: "frock-models",
    slug: "frock-models",
    title: "Frock Models",
    description: "Beautiful frocks for casual and festive occasions.",
    image:
      "https://images.unsplash.com/photo-1732709470611-670308da8c5e?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman in an elegant pink ethnic frock saree style",
    category: "frocks",
    price: 1499,
    mrp: 1999,
    fabric: "Georgette",
    occasion: "Party & Festive",
    badge: "sale",
  },
  {
    id: "couple-combos",
    slug: "couple-combos",
    title: "Couple Combos",
    description: "Matching traditional outfits for couples.",
    image:
      "https://images.unsplash.com/photo-1767333586077-9ebf5afcad3f?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Couple in matching traditional Indian wedding attire",
    category: "couples",
    price: 3999,
    mrp: 5499,
    fabric: "Silk Blend",
    occasion: "Wedding",
  },
  {
    id: "pregnancy-dresses",
    slug: "pregnancy-dresses",
    title: "Pregnancy Dresses for Women",
    description: "Comfortable and elegant maternity ethnic wear.",
    image: assetPath("/products/pregnancy.jpg"),
    imageAlt: "Expecting mother in comfortable elegant maternity wear",
    category: "maternity",
    price: 1599,
    mrp: 2099,
    fabric: "Soft Cotton",
    occasion: "Maternity & Daily",
    badge: "new",
  },
];

export const filterCategories = [
  { id: "all", label: "All" },
  { id: "silk", label: "Silk" },
  { id: "cotton", label: "Cotton" },
  { id: "ethnic-sets", label: "Ethnic Sets" },
  { id: "frocks", label: "Frocks" },
  { id: "couples", label: "Couples" },
  { id: "maternity", label: "Maternity" },
];
