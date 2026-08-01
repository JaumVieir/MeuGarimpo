import { Link } from "@tanstack/react-router";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-gold shadow-gold">
        <span className="block size-3.5 rotate-45 rounded-[3px] bg-earth" />
      </span>
      <span
        className={`font-display text-lg font-extrabold tracking-tight ${
          tone === "light" ? "text-cream" : "text-earth"
        }`}
      >
        Meu Garimpo
      </span>
    </Link>
  );
}
