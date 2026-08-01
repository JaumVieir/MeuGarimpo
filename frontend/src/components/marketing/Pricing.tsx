import { useState } from "react";
import { SectionTitle } from "./Sections";

const plans = {
  basico: {
    name: "Básico",
    monthly: 59.9,
    features: [
      "Dados ANM",
      "Título minerário",
      "Substância mineral",
      "Poligonal e limites",
      "Fase do processo",
      "CPF/CNPJ do titular",
    ],
  },
  full: {
    name: "Full",
    monthly: 99.9,
    features: [
      "Monitoramento contínuo",
      "Alertas no WhatsApp",
      "Garimpo Scan — relatório mensal em PDF",
      "Área de Queimadas",
    ],
  },
};

export type PlanKey = keyof typeof plans;

function price(v: number, anual: boolean) {
  const value = anual ? v * 0.8 : v;
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-whats" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L19 7" />
    </svg>
  );
}

export function Pricing({ onSubscribe }: { onSubscribe: (plan: PlanKey) => void }) {
  const [anual, setAnual] = useState(false);

  return (
    <section id="planos" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-20">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionTitle kicker="Planos" title="Escolha o tamanho do seu garimpo" />
        <div className="inline-flex rounded-full border border-border bg-card p-1">
          {[
            { k: false, l: "Mensal" },
            { k: true, l: "Anual −20%" },
          ].map((o) => (
            <button
              key={o.l}
              onClick={() => setAnual(o.k)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                anual === o.k ? "bg-gradient-gold text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-8 shadow-soft">
          <h3 className="font-display text-2xl font-extrabold">{plans.basico.name}</h3>
          <p className="mt-4 font-display text-4xl font-extrabold">
            R$ {price(plans.basico.monthly, anual)}
            <span className="text-base font-semibold text-muted-foreground">/mês</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {plans.basico.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onSubscribe("basico")}
            className="mt-8 w-full rounded-full border border-earth px-6 py-3.5 font-display text-sm font-bold text-earth transition-colors hover:bg-earth hover:text-cream"
          >
            Assinar Plano Básico
          </button>
        </article>

        <article className="grain relative rounded-xl border-2 border-gold bg-gradient-earth p-8 text-cream shadow-gold">
          <span className="absolute -top-3 left-8 rounded-full bg-gradient-gold px-4 py-1 font-display text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
            Melhor custo-benefício
          </span>
          <h3 className="font-display text-2xl font-extrabold">{plans.full.name}</h3>
          <p className="mt-4 font-display text-4xl font-extrabold">
            R$ {price(plans.full.monthly, anual)}
            <span className="text-base font-semibold opacity-60">/mês</span>
          </p>
          <p className="mt-2 text-sm opacity-70">Tudo do Básico, mais:</p>
          <ul className="mt-4 space-y-3 text-sm">
            {plans.full.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <Check /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onSubscribe("full")}
            className="mt-8 w-full rounded-full bg-gradient-gold px-6 py-3.5 font-display text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Assinar Plano Full
          </button>
        </article>
      </div>
    </section>
  );
}

export { plans };
