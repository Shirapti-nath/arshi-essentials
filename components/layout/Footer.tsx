import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Logo } from "@/components/ui/Logo";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";
import { navItems } from "@/data/navigation";
import { contact } from "@/data/contact";
import { site } from "@/data/site";
import { href } from "@/lib/routes";

const socialLinks = [
  {
    id: "whatsapp",
    href: contact.whatsapp,
    label: `WhatsApp ${contact.phoneDisplay}`,
    icon: Phone,
    display: contact.whatsappDisplay,
  },
  {
    id: "email",
    href: contact.emailGmail,
    label: `Email ${contact.email}`,
    icon: Mail,
    display: "Email",
  },
  {
    id: "instagram",
    href: contact.instagram,
    label: "Instagram",
    icon: InstagramIcon,
    display: "Instagram",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-max section-padding">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={44} />
              <div>
                <p className="font-serif text-xl font-bold text-foreground">
                  Arshi Essentials
                </p>
                <p className="text-sm text-muted">
                  Elegant Clothing for Everyday
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Discover timeless ethnic fashion with our exclusive collection of
              sarees and traditional wear crafted with elegance, comfort, and
              tradition.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <SmoothScrollLink
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {item.label}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Follow Us
            </h3>
            <p className="mt-2 text-sm text-muted">
              Reach us anytime on WhatsApp, email, or Instagram.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-foreground transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary hover:shadow-md"
                >
                  <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-xs font-medium">{link.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 border-t border-border pt-6 text-center text-sm text-muted">
          <Link href={href("/shipping/")} className="hover:text-primary">
            Shipping
          </Link>
          <Link href={href("/returns/")} className="hover:text-primary">
            Returns
          </Link>
          <Link href={href("/privacy/")} className="hover:text-primary">
            Privacy
          </Link>
        </div>

        <div className="mt-4 pb-2 text-center text-sm text-muted">
          © 2026 Arshi Essentials ·{" "}
          <a
            href={site.url}
            className="hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.display}
          </a>
        </div>
      </div>
    </footer>
  );
}
