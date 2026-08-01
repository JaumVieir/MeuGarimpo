import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/shared/Logo";

const links = [
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/recursos", label: "O que você recebe" },
  { to: "/publico", label: "Para quem é" },
  { to: "/planos", label: "Planos" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header({ onLogin }: { onLogin: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`grain bg-gradient-earth fixed inset-x-0 top-0 z-50 text-cream transition-shadow ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Logo tone="light" />

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-cream/12 text-cream" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onLogin}
            className="bg-gradient-gold shadow-gold text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            Entrar
          </button>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="border-cream/25 grid size-10 place-items-center rounded-full border lg:hidden"
          >
            <span className="space-y-1">
              <span className="bg-cream block h-0.5 w-4" />
              <span className="bg-cream block h-0.5 w-4" />
              <span className="bg-cream block h-0.5 w-4" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-cream/15 border-t px-3 pb-3 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-cream/80 hover:bg-cream/10 hover:text-cream block rounded-lg px-4 py-3 text-sm font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
