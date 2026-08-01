import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { PanelCard } from "@/components/layout/AppShell";
import type { AreaMapHandle, MapLayers } from "@/features/area-query/components/AreaMap";

const AreaMap = lazy(() => import("@/features/area-query/components/AreaMap"));

export const Route = createFileRoute("/_dashboard/nova-consulta")({
  head: () => ({
    meta: [
      { title: "Nova consulta de área — Meu Garimpo" },
      {
        name: "description",
        content:
          "Clique no mapa ou informe latitude e longitude para gerar o relatório completo da área.",
      },
      { property: "og:title", content: "Nova consulta de área — Meu Garimpo" },
      {
        property: "og:description",
        content: "Consulte mineração, terra indígena, IBAMA e desmatamento de qualquer ponto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const mapHandleRef = useRef<AreaMapHandle>(null);
  const [mounted, setMounted] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [erro, setErro] = useState("");
  const [base, setBase] = useState<"satelite" | "rua">("rua");
  const [ponto, setPonto] = useState<[number, number]>([-9.9, -63.0]);
  const [layers] = useState<MapLayers>({
    poligonal: true,
    deter: true,
    ibama: true,
    indigena: true,
  });

  useEffect(() => setMounted(true), []);

  const gerar = (e: React.FormEvent) => {
    e.preventDefault();
    const a = Number(lat.replace(",", "."));
    const b = Number(lon.replace(",", "."));
    if (!lat || !lon || Number.isNaN(a) || Number.isNaN(b)) {
      return setErro("Informe latitude e longitude válidas.");
    }
    setErro("");
    navigate({ to: "/relatorio" });
  };

  return (
    <>
      <h1 className="font-display text-3xl font-extrabold md:text-4xl">Nova consulta</h1>
      <p className="mt-2 max-w-3xl text-muted-foreground">
        Clique em qualquer ponto do mapa abaixo, ou digite a latitude e longitude (pode copiar
        do Google Maps, segurando o dedo no pino e copiando as coordenadas).
      </p>

      <form
        onSubmit={gerar}
        className="mt-6 max-w-xl rounded-xl border border-border/80 bg-card p-6 shadow-soft"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["Latitude", lat, setLat, "-9.90000"],
              ["Longitude", lon, setLon, "-63.00000"],
            ] as const
          ).map(([label, value, set, ph]) => (
            <label key={label} className="block">
              <span className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                {label}
              </span>
              <input
                value={value}
                onChange={(e) => (set as (v: string) => void)(e.target.value)}
                placeholder={ph}
                inputMode="decimal"
                className="mt-2 w-full rounded-lg border border-border bg-secondary/50 px-4 py-3.5 text-sm outline-none transition focus:border-gold focus:bg-card focus:ring-4 focus:ring-gold/15"
              />
            </label>
          ))}
        </div>

        {erro && <p className="mt-3 text-xs font-semibold text-destructive">{erro}</p>}

        <button className="mt-5 w-full rounded-lg bg-gradient-gold px-6 py-4 font-display text-base font-bold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5">
          Gerar relatório
        </button>
      </form>

      <section className="mt-8 overflow-hidden rounded-xl border border-border/80 bg-card shadow-soft">
        <header className="grain flex flex-wrap items-center justify-between gap-3 bg-gradient-earth px-5 py-3.5 text-cream">
          <p className="font-display text-sm font-bold">
            Meu Garimpo <span className="text-gold">· dados da área</span>
          </p>
          <span className="text-xs text-gold/80">Clique no mapa para consultar</span>
        </header>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="relative h-[420px] border-b border-border/70 lg:h-[520px] lg:border-r lg:border-b-0">
            {mounted ? (
              <Suspense
                fallback={
                  <div className="grid h-full place-items-center text-sm text-muted-foreground">
                    Carregando mapa…
                  </div>
                }
              >
                <AreaMap
                  ref={mapHandleRef}
                  center={ponto}
                  layers={layers}
                  base={base}
                  onPick={(a, b) => {
                    setPonto([a, b]);
                    setLat(a.toFixed(5));
                    setLon(b.toFixed(5));
                  }}
                />
              </Suspense>
            ) : (
              <div className="grid h-full place-items-center text-sm text-muted-foreground">
                Carregando mapa…
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 top-3 z-[500] flex flex-wrap items-start justify-between gap-2 px-3">
              <span className="ml-12 rounded-full bg-earth/85 px-3 py-1.5 text-[11px] font-medium text-cream backdrop-blur">
                Clique no mapa para consultar um ponto
              </span>
              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => mapHandleRef.current?.locate()}
                  className="rounded-full border border-border/70 bg-card/95 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground shadow-soft backdrop-blur transition hover:text-foreground"
                >
                  📍 Minha localização
                </button>
                <div className="flex gap-1 rounded-full border border-border/70 bg-card/95 p-1 shadow-soft backdrop-blur">
                  {(
                    [
                      ["satelite", "Satélite"],
                      ["rua", "Rua"],
                    ] as const
                  ).map(([k, l]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setBase(k)}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                        base === k
                          ? "bg-gradient-gold text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-3 bg-secondary/40 p-5">
            <div className="rounded-lg border border-gold/35 bg-gold/10 p-4">
              <p className="flex items-center gap-2 font-display text-sm font-bold">
                <span className="size-2 rounded-full bg-gold" /> Como usar
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Clique em qualquer ponto do mapa para consultar mineração, terra indígena,
                IBAMA, desmatamento, camadas oficiais e previsão de chuva daquele local.
              </p>
            </div>

            <PanelCard title="Ponto selecionado" className="shadow-none">
              <p className="font-mono text-sm">
                {ponto[0].toFixed(5)}, {ponto[1].toFixed(5)}
              </p>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    `${ponto[0].toFixed(5)}, ${ponto[1].toFixed(5)}`,
                  )
                }
                className="mt-3 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold hover:bg-secondary"
              >
                Copiar coordenadas
              </button>
            </PanelCard>
          </aside>
        </div>
      </section>
    </>
  );
}
