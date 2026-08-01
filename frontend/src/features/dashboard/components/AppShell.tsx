import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, LogOut, User, CreditCard } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const nav = [
  { to: "/painel", label: "Início" },
  { to: "/nova-consulta", label: "Nova consulta" },
  { to: "/relatorios", label: "Meus relatórios" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [conta, setConta] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conta) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setConta(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setConta(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [conta]);

  return (
    <div className="min-h-screen bg-background">
      {conta && (
        <div
          aria-hidden
          className="fixed inset-0 z-20 bg-earth/20 backdrop-blur-[2px]"
          onClick={() => setConta(false)}
        />
      )}

      <header className="grain bg-gradient-earth text-cream relative z-30">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 pt-6">
          <div className="flex min-w-0 items-center gap-3">
            <Logo tone="light" />
            <span className="hidden truncate text-sm text-cream/60 sm:block">
              Olá, Joel
            </span>
          </div>

          <div className="relative shrink-0" ref={menuRef}>
            <button
              onClick={() => setConta((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={conta}
              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
                conta
                  ? "border-gold/60 bg-cream/15 text-cream"
                  : "border-cream/20 bg-cream/5 text-cream hover:bg-cream/12"
              }`}
            >
              <span className="grid size-6 place-items-center rounded-full bg-cream/10 text-xs text-gold">
                <User size={14} />
              </span>
              <span className="hidden sm:inline">Minha conta</span>
              <span className="sm:hidden">Conta</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  conta ? "rotate-180" : ""
                }`}
              />
            </button>

            {conta && (
              <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-xl border border-cream/20 bg-cream shadow-xl shadow-earth/20">
                <div className="bg-earth px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-cream/15 text-gold">
                      <User size={18} />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-cream">
                        Joel
                      </p>
                      <p className="text-xs text-cream/70">joel@email.com</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-earth/5 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Plano</p>
                      <p className="font-display text-sm font-semibold text-earth">
                        Full
                      </p>
                    </div>
                    <div className="rounded-lg bg-earth/5 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Vencimento</p>
                      <p className="text-sm font-medium text-earth">14/08/2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2.5">
                    <CreditCard size={16} className="text-gold" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                      <p className="text-sm font-medium text-foreground">
                        (93) 98123-4567
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/"
                    onClick={() => setConta(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-earth py-2.5 text-center text-sm font-semibold text-cream transition-colors hover:bg-earth-soft"
                  >
                    <LogOut size={16} />
                    Sair
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-5">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{
                className: "bg-cream/15 text-cream ring-1 ring-gold/40",
              }}
              inactiveProps={{ className: "text-cream/70 hover:bg-cream/10" }}
              className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}

export function PanelCard({
  title,
  subtitle,
  right,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`overflow-hidden rounded-xl border border-border/80 bg-card shadow-soft ${className}`}
    >
      {(title || right) && (
        <header className="flex items-center justify-between gap-3 border-b border-border/70 bg-secondary/60 px-5 py-3.5">
          <div className="min-w-0">
            {title && (
              <h2 className="truncate font-display text-sm font-bold">{title}</h2>
            )}
            {subtitle && (
              <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {right}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

