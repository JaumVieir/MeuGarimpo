import { createContext, useContext, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoginModal, RecoverModal, CheckoutModal } from "./Modals";
import { SupportWidget } from "./SupportWidget";
import type { PlanKey } from "./Pricing";

const CheckoutContext = createContext<(plan: PlanKey) => void>(() => {});
export const useCheckout = () => useContext(CheckoutContext);

export function PageShell({ children }: { children: ReactNode }) {
  const [login, setLogin] = useState(false);
  const [recover, setRecover] = useState(false);
  const [checkout, setCheckout] = useState<PlanKey | null>(null);

  return (
    <CheckoutContext.Provider value={setCheckout}>
      <div className="min-h-screen bg-background">
        <Header onLogin={() => setLogin(true)} />
        <main>{children}</main>
        <Footer />

        <LoginModal
          open={login}
          onClose={() => setLogin(false)}
          onRecover={() => {
            setLogin(false);
            setRecover(true);
          }}
        />
        <RecoverModal open={recover} onClose={() => setRecover(false)} />
        <CheckoutModal
          open={checkout !== null}
          onClose={() => setCheckout(null)}
          plan={checkout ?? "full"}
        />
        <SupportWidget />
      </div>
    </CheckoutContext.Provider>
  );
}

export function PageHero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 size-[32rem] rounded-full bg-gradient-gold opacity-20 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-display text-xs font-bold tracking-[0.2em] text-gold uppercase">
          {kicker}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold text-balance-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
