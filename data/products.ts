import type { Product, ProductImage } from "@/types";
import { assetPath } from "@/lib/assetPath";

function imgs(...entries: { path: string; alt: string }[]): ProductImage[] {
  return entries.map(({ path, alt }) => ({
    src: path.startsWith("http") ? path : assetPath(path),
    alt,
  }));
}

export const products: Product[] = [
  {
    id: "kanchipuram-silk",
    slug: "kanchipuram-silk",
    title: "Kanchipuram Silk Sarees",
    description:
      "Premium handwoven silk sarees with traditional temple designs and gold zari borders.",
    image: assetPath("/products/kanchipuram-silk.png"),
    imageAlt:
      "Woman in a green and pink Kanchipuram silk saree with gold zari border",
    images: imgs(
      {
        path: "/products/kanchipuram-silk.png",
        alt: "Green and pink Kanchipuram silk saree with gold zari border",
      },
      {
        path: "/products/kanchipuram-collection.jpg",
        alt: "Kanchipuram silk saree collection display",
      }
    ),
    category: "silk",
    price: 1200,
    priceMax: 15000,
    fabric: "Pure Silk",
    occasion: "Wedding & Festive",
    badge: "bestseller",
    colors: ["Green", "Pink", "Maroon", "Gold"],
    borderType: "Temple Zari",
    length: "5.5 meters",
    blouseIncluded: false,
    rating: 4.9,
    reviewCount: 128,
    tags: ["bestseller", "wedding", "trending"],
    inStock: true,
    relatedSlugs: ["madurai-sungudi", "couple-combos"],
    story: {
      fabric:
        "Pure mulberry silk woven in Kanchipuram, known for its lustrous drape and durability that improves with every wear.",
      craftsmanship:
        "Handwoven by master weavers using traditional pit looms, each saree carries intricate temple motifs and contrast pallu work.",
      weaving:
        "The body, border, and pallu are woven separately and interlocked using the korvai technique — a hallmark of authentic Kanjeevaram.",
      significance:
        "Kanchipuram silk has been treasured for centuries in South Indian weddings and temple festivals as a symbol of grace and prosperity.",
      occasions: ["Weddings", "Receptions", "Temple visits", "Festive celebrations"],
      accessories: ["Gold temple jewellery", "Fresh jasmine gajra", "Traditional bangles"],
    },
  },
  {
    id: "madurai-sungudi",
    slug: "madurai-sungudi",
    title: "Madurai Sungudi Cotton Sarees",
    description:
      "Comfortable and elegant cotton sarees for everyday wear.",
    image: assetPath("/products/madurai-sungudi.png"),
    imageAlt:
      "Woman in a green and pink Madurai Sungudi zari kattam cotton saree",
    images: imgs(
      {
        path: "/products/madurai-sungudi.png",
        alt: "Green and pink Madurai Sungudi zari kattam saree",
      },
      {
        path: "/products/hero-saree.png",
        alt: "Red and gold striped cotton saree in natural setting",
      }
    ),
    category: "cotton",
    price: 650,
    priceMax: 2500,
    fabric: "Cotton",
    occasion: "Daily Wear",
    colors: ["Green", "Pink", "Red", "White"],
    borderType: "Zari Kattam",
    length: "5.5 meters",
    blouseIncluded: false,
    rating: 4.7,
    reviewCount: 86,
    tags: ["trending", "festival"],
    inStock: true,
    relatedSlugs: ["kanchipuram-silk", "kurtis"],
    story: {
      fabric:
        "Soft, breathable Madurai cotton tie-dyed using the ancient Sungudi technique for all-day comfort.",
      craftsmanship:
        "Each dot pattern is created by skilled artisans through a meticulous tying and dyeing process passed down generations.",
      weaving:
        "Lightweight cotton base is prepared, tied in precise patterns, and dip-dyed to create the signature Sungudi look.",
      significance:
        "Madurai Sungudi sarees are a Geographical Indication craft of Tamil Nadu, celebrated for everyday elegance.",
      occasions: ["Daily wear", "Office", "Casual outings", "Small poojas"],
      accessories: ["Simple silver jewellery", "Cotton blouses", "Kolhapuri sandals"],
    },
  },
  {
    id: "salwars",
    slug: "salwar-sets",
    title: "Salwar Sets",
    description: "Stylish and graceful ethnic salwar kameez sets.",
    image:
      "https://images.unsplash.com/photo-1742800764280-d51117b7eb0a?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman in a floral print salwar kameez ethnic set",
    images: imgs({
      path: "https://images.unsplash.com/photo-1742800764280-d51117b7eb0a?auto=format&fit=crop&w=1200&q=85",
      alt: "Woman in a floral print salwar kameez ethnic set",
    }),
    category: "ethnic-sets",
    price: 799,
    priceMax: 2999,
    fabric: "Cotton Blend",
    occasion: "Casual & Festive",
    badge: "new",
    colors: ["Floral Multi", "Pastel", "Navy"],
    borderType: "Embroidered",
    length: "Full set",
    blouseIncluded: true,
    rating: 4.6,
    reviewCount: 42,
    tags: ["new-arrival", "festival"],
    inStock: true,
    relatedSlugs: ["kurtis", "frock-models"],
    story: {
      fabric: "Soft cotton blend with breathable lining for all-day comfort.",
      craftsmanship: "Delicate embroidery and precise tailoring for a flattering fit.",
      occasions: ["Festivals", "Family gatherings", "Casual outings"],
      accessories: ["Matching dupatta", "Juttis", "Statement earrings"],
    },
  },
  {
    id: "kurti",
    slug: "kurtis",
    title: "Kurtis",
    description: "Modern and traditional block-print kurti collections.",
    image:
      "https://images.unsplash.com/photo-1742800786544-e935375035e3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Woman wearing a traditional block printed cotton kurta",
    images: imgs({
      path: "https://images.unsplash.com/photo-1742800786544-e935375035e3?auto=format&fit=crop&w=1200&q=85",
      alt: "Woman wearing a traditional block printed cotton kurta",
    }),
    category: "ethnic-sets",
    price: 299,
    priceMax: 1599,
    fabric: "Cotton",
    occasion: "Daily Wear",
    colors: ["Indigo", "White", "Mustard"],
    borderType: "Block Print",
    length: "Knee length",
    blouseIncluded: false,
    rating: 4.5,
    reviewCount: 64,
    tags: ["trending"],
    inStock: true,
    relatedSlugs: ["salwar-sets", "madurai-sungudi"],
    story: {
      fabric: "Pure cotton with hand block-printed motifs.",
      craftsmanship: "Artisan block printing using natural dyes.",
      occasions: ["Daily wear", "Office", "College"],
      accessories: ["Leggings", "Minimal jewellery"],
    },
  },
  {
    id: "frock-models",
    slug: "frock-models",
    title: "Frock Models",
    description: "Beautiful frocks for casual and festive occasions.",
    image: assetPath("/products/frock-models.jpg"),
    imageAlt: "Woman in an elegant purple eyelet frock dress",
    images: imgs({
      path: "/products/frock-models.jpg",
      alt: "Woman in an elegant purple eyelet frock dress",
    }),
    category: "frocks",
    price: 599,
    priceMax: 1999,
    fabric: "Eyelet Cotton",
    occasion: "Party & Festive",
    badge: "sale",
    colors: ["Purple", "Pastel"],
    borderType: "Eyelet trim",
    length: "Midi",
    blouseIncluded: true,
    rating: 4.4,
    reviewCount: 31,
    tags: ["festival"],
    inStock: true,
    relatedSlugs: ["salwar-sets", "pregnancy-dresses"],
    story: {
      fabric: "Lightweight eyelet cotton with breathable structure.",
      craftsmanship: "Fine eyelet detailing and comfortable lining.",
      occasions: ["Parties", "Brunches", "Festive gatherings"],
      accessories: ["Heels", "Clutch bag", "Delicate necklace"],
    },
  },
  {
    id: "couple-combos",
    slug: "couple-combos",
    title: "Couple Combos",
    description: "Matching traditional outfits for couples.",
    image: assetPath("/products/couple-combo.jpg"),
    imageAlt: "Couple in coordinated beach ethnic wear outfits",
    images: imgs({
      path: "/products/couple-combo.jpg",
      alt: "Couple in coordinated beach ethnic wear outfits",
    }),
    category: "couples",
    price: 999,
    priceMax: 4999,
    fabric: "Silk Blend",
    occasion: "Wedding & Festive",
    colors: ["Coordinated sets"],
    borderType: "Matching embroidery",
    length: "Full set (pair)",
    blouseIncluded: true,
    rating: 4.8,
    reviewCount: 55,
    tags: ["wedding", "bestseller"],
    inStock: true,
    relatedSlugs: ["kanchipuram-silk", "frock-models"],
    story: {
      fabric: "Premium silk blend with coordinated colour palettes for couples.",
      craftsmanship: "Matching embroidery and tailored fits for both partners.",
      occasions: ["Engagements", "Receptions", "Couple photoshoots"],
      accessories: ["Matching stoles", "Coordinated jewellery sets"],
    },
  },
  {
    id: "pregnancy-dresses",
    slug: "pregnancy-dresses",
    title: "Pregnancy Dresses for Women",
    description: "Comfortable and elegant maternity ethnic wear.",
    image: assetPath("/products/pregnancy.jpg"),
    imageAlt: "Pregnant woman in a tie-dye maternity maxi dress",
    images: imgs({
      path: "/products/pregnancy.jpg",
      alt: "Pregnant woman in a tie-dye maternity maxi dress",
    }),
    category: "maternity",
    price: 599,
    priceMax: 1999,
    fabric: "Soft Cotton",
    occasion: "Maternity & Daily",
    badge: "new",
    colors: ["Tie-dye Multi", "Pastel"],
    borderType: "Soft hem",
    length: "Maxi",
    blouseIncluded: false,
    rating: 4.7,
    reviewCount: 38,
    tags: ["new-arrival"],
    inStock: true,
    relatedSlugs: ["frock-models", "kurtis"],
    story: {
      fabric: "Ultra-soft stretch cotton designed for comfort through every trimester.",
      craftsmanship: "Adjustable fit with elegant drape that flatters the silhouette.",
      occasions: ["Daily wear", "Baby showers", "Casual outings"],
      accessories: ["Comfort flats", "Light scarf"],
    },
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

export const fabricFilters = ["Pure Silk", "Cotton", "Cotton Blend", "Silk Blend", "Eyelet Cotton", "Soft Cotton"];

export const occasionFilters = [
  "Wedding & Festive",
  "Daily Wear",
  "Casual & Festive",
  "Party & Festive",
  "Maternity & Daily",
];

export const colorFilters = [
  "Green",
  "Pink",
  "Red",
  "Maroon",
  "Gold",
  "Floral Multi",
  "Purple",
  "Indigo",
];

export const PRICE_RANGE = { min: 0, max: 16000 };
