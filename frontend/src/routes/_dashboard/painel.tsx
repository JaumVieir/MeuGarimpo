import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/painel")({
  head: () => ({
    meta: [
      { title: "Painel do assinante — Meu Garimpo" },
      {
        name: "description",
        content: "Acompanhe gastos, gere novas consultas de área e veja seus relatórios.",
      },
      { property: "og:title", content: "Painel do assinante — Meu Garimpo" },
      { property: "og:description", content: "Gastos, consultas e relatórios em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const categorias = [
  { nome: "Combustível", valor: 4820.5, qtd: 12 },
  { nome: "Manutenção", valor: 2310.0, qtd: 7 },
  { nome: "Peças", valor: 1690.9, qtd: 5 },
  { nome: "Alimentação", valor: 980.4, qtd: 14 },
  { nome: "Mão de obra", valor: 3200.0, qtd: 4 },
  { nome: "Transporte", valor: 740.0, qtd: 3 },
];

const extrato = [
  { titulo: "Diesel S10 — 200L", cat: "Combustível", origem: "via foto do comprovante", valor: 1420.0, data: "12/07" },
  { titulo: "Troca de mangueira", cat: "Manutenção", origem: "via áudio", valor: 380.0, data: "11/07" },
  { titulo: "Rancho da semana", cat: "Alimentação", origem: "via digitado", valor: 265.4, data: "10/07" },
  { titulo: "Diária equipe", cat: "Mão de obra", origem: "via áudio", valor: 800.0, data: "09/07" },
  { titulo: "Correia da bomba", cat: "Peças", origem: "via foto do comprovante", valor: 219.9, data: "08/07" },
];

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function useCountUp(target: number) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return v;
}

function Page() {
  const total = categorias.reduce((s, c) => s + c.valor, 0);
  const animado = useCountUp(total);
  const maior = Math.max(...categorias.map((c) => c.valor));

  return (
    <>
      <div className="grain flex flex-wrap items-end justify-between gap-5 rounded-xl bg-gradient-earth px-7 py-8 text-cream shadow-soft">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-cream/55 uppercase">
            Gasto do período
          </p>
          <p className="mt-2 font-display text-4xl font-extrabold text-gold-glow">
            {brl(animado)}
          </p>
        </div>
        <Link
          to="/nova-consulta"
          className="rounded-full bg-gradient-gold px-5 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold"
        >
          Nova consulta de área
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categorias.map((c) => (
          <article
            key={c.nome}
            className="rounded-xl border border-border/80 bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-sm font-bold">{c.nome}</h3>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                {Math.round((c.valor / total) * 100)}%
              </span>
            </div>
            <p className="mt-2 font-display text-xl font-extrabold">{brl(c.valor)}</p>
            <p className="text-xs text-muted-foreground">{c.qtd} lançamentos</p>
            <div className="mt-3 h-1.5 rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-gold"
                style={{ width: `${(c.valor / maior) * 100}%` }}
              />
            </div>
          </article>
        ))}
      </div>

      <h2 className="mt-10 font-display text-lg font-bold">Extrato de lançamentos</h2>
      <ul className="mt-4 divide-y divide-border/70 overflow-hidden rounded-xl border border-border/80 bg-card shadow-soft">
        {extrato.map((e) => (
          <li key={e.titulo} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-sm font-semibold">{e.titulo}</p>
              <p className="text-xs text-muted-foreground">
                {e.cat} · {e.origem}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-destructive">-{brl(e.valor)}</p>
              <p className="text-xs text-muted-foreground">{e.data}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
