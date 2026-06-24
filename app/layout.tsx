import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { HashScrollManager } from "@/components/layout/HashScrollManager";
import { MobileScrollGuard } from "@/components/layout/MobileScrollGuard";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function r(){try{var h=location.hash;if(h&&h!=='#')return;if('scrollRestoration'in history)history.scrollRestoration='manual';window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;}catch(e){}}r();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',r);window.addEventListener('load',r);window.addEventListener('pageshow',r);[0,50,150,300,600,1000,2000].forEach(function(t){setTimeout(r,t);});})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider>
          <HashScrollManager />
          <MobileScrollGuard />
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
