import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arshi Essentials | Elegant Clothing for Everyday",
  description:
    "Discover timeless ethnic fashion with our exclusive collection of sarees and traditional wear. Premium Kanchipuram silk, Madurai Sungudi cotton, kurtis, and more.",
  keywords: [
    "sarees",
    "ethnic wear",
    "Kanchipuram silk",
    "Madurai Sungudi",
    "Arshi Essentials",
    "Indian fashion",
  ],
  openGraph: {
    title: "Arshi Essentials | Elegant Clothing for Everyday",
    description:
      "Premium sarees and ethnic wear crafted with elegance, comfort, and tradition.",
    type: "website",
    locale: "en_IN",
    siteName: "Arshi Essentials",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
