import Link from "next/link";
import { href } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 pt-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-secondary">
        404
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        This page doesn&apos;t exist. Go back to our homepage to browse sarees
        and ethnic wear.
      </p>
      <Link
        href={href("/")}
        className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-light"
      >
        Back to Homepage
      </Link>
      <p className="mt-6 text-xs text-muted">
        Live site:{" "}
        <a
          href="https://shirapti-nath.github.io/arshi-essentials/"
          className="text-primary hover:underline"
        >
          shirapti-nath.github.io/arshi-essentials
        </a>
      </p>
    </div>
  );
}
