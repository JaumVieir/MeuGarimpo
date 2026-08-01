import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import type { MapLayers } from "@/features/area-query/components/AreaMap";

const AreaMap = lazy(() => import("@/features/area-query/components/AreaMap"));

export const Route = createFileRoute("/_dashboard/relatorio")({
  head: () => ({
    meta: [
      { title: "Relatório da área — Meu Garimpo" },
      {
        name: "description",
        content:
          "Dados de mineração, terra indígena, embargo IBAMA, desmatamento e chuva do ponto consultado.",
      },
      { property: "og:title", content: "Relatório da área — Meu Garimpo" },
      {
        property: "og:description",
        content: "Ficha completa da área consultada com camadas oficiais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const ficha = [
  ["Processo", "850.123/2019"],
  ["Situação / fase", "Autorização de pesquisa"],
  ["Titular", "Cooperativa Rio Novo"],
  ["Substância", "Ouro"],
  ["Área", "982,4 ha"],
  ["UF", "PA"],
  ["Último evento", "Relatório final aprovado — 03/2026"],
];

const chuva = [
  ["Hoje", "Pancadas à tarde · 12 mm"],
  ["Amanhã", "Parcialmente nublado · 3 mm"],
  ["Quinta", "Sol com nuvens · 0 mm"],
];

const timeline = [
  ["03/2026", "Relatório final de pesquisa aprovado"],
  ["11/2025", "Alerta DETER de 14,2 ha a 1,1 km do limite"],
  ["07/2024", "Renovação de licença ambiental estadual"],
  ["02/2019", "Requerimento de pesquisa protocolado na ANM"],
];

const camadas: { key: keyof MapLayers; label: string; dot: string }[] = [
  { key: "poligonal", label: "Poligonal ANM", dot: "bg-gold" },
  { key: "deter", label: "Alertas DETER", dot: "bg-orange-500" },
  { key: "ibama", label: "Embargos IBAMA", dot: "bg-destructive" },
  { key: "indigena", label: "Terra Indígena", dot: "bg-whats" },
];

function Bloco({
  titulo,
  badge,
  tone = "neutral",
  children,
}: {
  titulo: string;
  badge?: string;
  tone?: "neutral" | "ok" | "warn" | "bad";
  children: React.ReactNode;
}) {
  const ring =
    tone === "ok"
      ? "border-border bg-secondary/60"
      : tone === "warn"
        ? "border-gold/50 bg-gold/12"
        : tone === "bad"
          ? "border-destructive/30 bg-destructive/8"
          : "border-border bg-card";
  const titleColor =
    tone === "ok"
      ? "text-foreground"
      : tone === "warn"
        ? "text-foreground"
        : tone === "bad"
          ? "text-destructive"
          : "text-foreground";
  return (
    <section className={`rounded-lg border p-4 ${ring}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className={`font-display text-sm font-bold ${titleColor}`}>{titulo}</h2>
        {badge && (
          <span className="rounded-full bg-background/70 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function Page() {
  const [mounted, setMounted] = useState(false);
  const [ponto, setPonto] = useState<[number, number]>([-6.0821, -56.339]);
  const [layers, setLayers] = useState<MapLayers>({
    poligonal: true,
    deter: true,
    ibama: true,
    indigena: true,
  });

  useEffect(() => setMounted(true), []);

  const coords = useMemo(
    () => `${ponto[0].toFixed(4)}, ${ponto[1].toFixed(4)}`,
    [ponto],
  );

  const score = 72;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-xs font-bold tracking-[0.2em] text-gold uppercase">
            Relatório da área
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">
            Itaituba/PA · poligonal 850.123/2019
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
            {coords}
          </span>
          <button
            onClick={() => navigator.clipboard?.writeText(coords)}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Copiar
          </button>
          <Link to="/painel" className="text-xs font-semibold text-gold">
            Ir para o painel
          </Link>
        </div>
      </div>

      <div className="mt-6 flex min-h-0 flex-col gap-4 lg:h-[700px] lg:flex-row">
        <div className="relative h-[420px] overflow-hidden rounded-xl border border-border/80 bg-earth-soft shadow-soft lg:h-auto lg:flex-1">

          {mounted ? (
            <Suspense
              fallback={
                <div className="grid h-full place-items-center text-sm text-cream/70">
                  Carregando mapa…
                </div>
              }
            >
              <AreaMap
                center={ponto}
                layers={layers}
                onPick={(lat, lng) => setPonto([lat, lng])}
              />
            </Suspense>
          ) : (
            <div className="grid h-full place-items-center text-sm text-cream/70">
              Carregando mapa…
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 top-3 z-[500] flex flex-wrap justify-center gap-2 px-3">
            <span className="pointer-events-auto rounded-full bg-earth/85 px-3 py-1.5 text-[11px] font-medium text-cream">
              Clique no mapa para consultar outro ponto
            </span>
            {camadas.map((c) => (
              <button
                key={c.key}
                onClick={() => setLayers((l) => ({ ...l, [c.key]: !l[c.key] }))}
                className={`pointer-events-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                  layers[c.key]
                    ? "bg-card text-foreground shadow-soft"
                    : "bg-earth/70 text-cream/60"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="w-full shrink-0 space-y-3 overflow-y-auto rounded-xl border border-border/80 bg-secondary/40 p-4 shadow-soft lg:w-[392px]">
          <div className="rounded-lg border border-border/80 bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Índice de conformidade</p>
                <p className="font-display text-2xl font-extrabold">{score}/100</p>
              </div>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-earth">
                Atenção média
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-gold" style={{ width: `${score}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              1 alerta de desmatamento próximo · 0 embargos no ponto · fora de TI
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              ["982,4", "hectares"],
              ["1,1 km", "do alerta"],
              ["4", "camadas ok"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl border border-border/80 bg-card p-3 text-center">
                <p className="font-display text-sm font-bold">{v}</p>
                <p className="text-[11px] text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-whats/40 bg-whats/10 px-4 py-3 text-sm font-semibold text-earth">
            Fora de Terra Indígena
          </div>

          <Bloco titulo="Mineração (ANM/SIGMINE)" badge="atualizado hoje">
            <dl className="space-y-1.5">
              {ficha.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt>{k}</dt>
                  <dd className="text-right font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Bloco>

          <Bloco titulo="Embargo IBAMA" tone="ok" badge="0 no ponto">
            Nenhum embargo encontrado para este ponto. Existe 1 área embargada a 2,3 km ao sul.
          </Bloco>

          <Bloco titulo="Desmatamento (DETER)" tone="warn" badge="14,2 ha">
            Alerta de novembro/2025 próximo ao limite da poligonal — verificar em campo.
          </Bloco>

          <Bloco titulo="Camadas oficiais (INCRA/ICMBio/INPE)" tone="ok">
            Sem assentamento, unidade de conservação ou auto de infração no ponto.
          </Bloco>

          <Bloco titulo="Linha do tempo">
            <ul className="space-y-2">
              {timeline.map(([d, t]) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <span>
                    <span className="font-medium text-foreground">{d}</span> — {t}
                  </span>
                </li>
              ))}
            </ul>
          </Bloco>

          <Bloco titulo="Município">Itaituba — Pará</Bloco>

          <Bloco titulo="Chuva (próximos dias)">
            <ul className="space-y-1">
              {chuva.map(([d, p]) => (
                <li key={d} className="flex justify-between gap-3">
                  <span>{d}</span>
                  <span className="text-right font-medium text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </Bloco>

          <div className="flex flex-wrap gap-2 pt-1">
            <button className="flex-1 rounded-xl bg-gradient-gold px-4 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold">
              Baixar PDF
            </button>
            <button className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold">
              KMZ
            </button>
            <button className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold">
              KML
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
