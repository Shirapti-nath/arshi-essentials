import { MessageCircle } from "lucide-react";
import { contact } from "@/data/contact";

export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 max-md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] max-md:right-4"
      aria-label={`Chat on WhatsApp at ${contact.whatsappDisplay}`}
    >
      <MessageCircle className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-white" />
      </span>
    </a>
  );
}
