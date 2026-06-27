import Link from "next/link";
import { href } from "@/lib/routes";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-max max-w-2xl px-4 sm:px-6">
        <Link
          href={href("/")}
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>
            Arshi Essentials respects your privacy. We collect only the
            information needed to process your order: name, phone number,
            delivery address, and optional email.
          </p>
          <p>
            This information is used solely to fulfil your order and communicate
            with you via WhatsApp or phone. We do not sell or share your data
            with third parties.
          </p>
          <p>
            Cart data is stored locally in your browser. Order details are
            shared with us only when you confirm via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
