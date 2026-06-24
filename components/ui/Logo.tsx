import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  className?: string;
  variant?: "default" | "light" | "dark";
};

/** Brand logo — maroon & brown AS monogram in a centered circular badge */
export function Logo({ size = 40, className, variant = "default" }: LogoProps) {
  const isLight = variant === "light";

  const ringBg = isLight
    ? "bg-white/15 ring-white/25"
    : "bg-primary/10 ring-primary/15";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full ring-1",
        ringBg,
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[58%] w-[58%]"
      >
        <path
          d="M8 82 L28 82 L42 52 L32 52 Z"
          fill={isLight ? "#F7E7CE" : "#7B4B3A"}
        />
        <path
          d="M92 82 L72 82 L58 52 L68 52 Z"
          fill={isLight ? "#F7E7CE" : "#7B4B3A"}
        />
        <path
          d="M50 10 L68 52 L58 52 L50 38 L42 52 L32 52 Z"
          fill={isLight ? "#FFF8F5" : "#8B3A3A"}
        />
        <path
          d="M38 68 L50 52 L62 68 L54 68 L50 60 L46 68 Z"
          fill={isLight ? "#D4AF37" : "#A84F4F"}
        />
        <path
          d="M50 10 L88 82 M50 10 L12 82"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
