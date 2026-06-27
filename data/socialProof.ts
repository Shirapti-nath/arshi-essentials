export type SocialProofMessage = {
  id: string;
  type: "purchase" | "views";
  message: string;
};

/** Fixed live-update messages — Tamil Nadu, Maharashtra & Bangalore cities only */
export const socialProofMessages: SocialProofMessage[] = [
  {
    id: "karthick-kaviya",
    type: "purchase",
    message:
      "Karthick and Kaviya purchased Couple Combo 45 minutes ago from Chennai.",
  },
  {
    id: "malavika",
    type: "purchase",
    message:
      "Malavika recently bought Pregnancy Dresses from Coimbatore, Tamil Nadu.",
  },
  {
    id: "keerthana",
    type: "views",
    message:
      "Keerthana recently viewed this website 5 minutes ago from Pune, Maharashtra.",
  },
  {
    id: "aarudhra",
    type: "purchase",
    message: "Aarudhra recently bought Couple Combo from Bangalore.",
  },
  {
    id: "soundarya",
    type: "purchase",
    message:
      "Soundarya recently bought Salwar Sets from Madurai, Tamil Nadu.",
  },
  {
    id: "hema",
    type: "purchase",
    message: "Hema recently bought Kurtis from Madurai, Tamil Nadu.",
  },
  {
    id: "selva-shreya",
    type: "purchase",
    message:
      "Selva and Shreya recently bought Couple Combo 10 days ago from Mumbai, Maharashtra.",
  },
  {
    id: "priyanka",
    type: "views",
    message:
      "Priyanka recently viewed this website 12 minutes ago from Bangalore.",
  },
  {
    id: "deepa-trichy",
    type: "purchase",
    message:
      "Deepa from Trichy, Tamil Nadu purchased a Kanchipuram Silk saree 20 minutes ago.",
  },
  {
    id: "meera-nagpur",
    type: "purchase",
    message:
      "Meera recently bought a Madurai Sungudi saree from Nagpur, Maharashtra.",
  },
  {
    id: "anitha-salem",
    type: "views",
    message:
      "Anitha recently viewed this website 8 minutes ago from Salem, Tamil Nadu.",
  },
  {
    id: "lakshmi-nashik",
    type: "purchase",
    message:
      "Lakshmi recently bought Frock Models from Nashik, Maharashtra.",
  },
  {
    id: "kavya-bangalore",
    type: "purchase",
    message:
      "Kavya recently bought Kurtis from Bangalore.",
  },
  {
    id: "ramesh-coimbatore",
    type: "purchase",
    message:
      "Ramesh from Coimbatore, Tamil Nadu purchased Salwar Sets 30 minutes ago.",
  },
  {
    id: "sneha-aurangabad",
    type: "views",
    message:
      "Sneha recently viewed this website 3 minutes ago from Aurangabad, Maharashtra.",
  },
];

/** Shown on product detail pages in addition to the main rotation */
export function getProductViewMessage(productTitle: string): SocialProofMessage {
  const day = new Date().toDateString();
  let hash = 0;
  for (const char of productTitle + day) {
    hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  }
  const count = 12 + (hash % 34);
  return {
    id: "product-views",
    type: "views",
    message: `${count} people viewed ${productTitle} today.`,
  };
}
