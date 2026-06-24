import { Logo } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="animate-pulse">
        <Logo size={64} />
      </div>
      <p className="mt-6 font-serif text-xl text-primary">Arshi Essentials</p>
      <p className="mt-2 text-sm text-muted">Loading...</p>
    </div>
  );
}
