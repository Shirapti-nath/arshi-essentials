import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "kanchipuram-silk",
    title: "Kanchipuram Silk Sarees",
    description:
      "Premium handwoven silk sarees with traditional temple designs and gold zari borders.",
    image: "/products/kanchipuram-collection.jpg",
    imageAlt:
      "Authentic Kanchipuram Kanjeevaram silk sarees with gold zari temple borders from Tamil Nadu",
    category: "silk",
  },
  {
    id: "madurai-sungudi",
    title: "Madurai Sungudi Cotton Sarees",
    description:
      "Comfortable and elegant cotton sarees for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1678705730064-a7ecbab4b3fb?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman in a classic white and red Madurai cotton saree",
    category: "cotton",
  },
  {
    id: "salwars",
    title: "Salwars",
    description: "Stylish and graceful ethnic salwar kameez sets.",
    image:
      "https://images.unsplash.com/photo-1742800764280-d51117b7eb0a?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman in a floral print salwar kameez ethnic set",
    category: "ethnic-sets",
  },
  {
    id: "kurti",
    title: "Kurti",
    description: "Modern and traditional block-print kurti collections.",
    image:
      "https://images.unsplash.com/photo-1742800786544-e935375035e3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman wearing a traditional block printed cotton kurta",
    category: "ethnic-sets",
  },
  {
    id: "frock-models",
    title: "Frock Models",
    description: "Beautiful frocks for casual and festive occasions.",
    image:
      "https://images.unsplash.com/photo-1732709470611-670308da8c5e?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman in an elegant pink ethnic frock saree style",
    category: "frocks",
  },
  {
    id: "couple-combos",
    title: "Couple Combos",
    description: "Matching traditional outfits for couples.",
    image:
      "https://images.unsplash.com/photo-1767333586077-9ebf5afcad3f?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Couple in matching traditional Indian wedding attire",
    category: "couples",
  },
  {
    id: "pregnancy-dresses",
    title: "Pregnancy Dresses for Women",
    description: "Comfortable and elegant maternity ethnic wear.",
    image: "/products/pregnancy.jpg",
    imageAlt: "Expecting mother in comfortable elegant maternity wear",
    category: "maternity",
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
