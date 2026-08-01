import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/relatorios")({
  head: () => ({
    meta: [
      { title: "Meus relatórios — Meu Garimpo" },
      {
        name: "description",
        content: "Histórico de áreas consultadas e relatórios gerados na sua conta.",
      },
      { property: "og:title", content: "Meus relatórios — Meu Garimpo" },
      { property: "og:description", content: "Todas as áreas que você já consultou." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const relatorios = [
  { lat: "-6.08210", lon: "-56.33900", local: "Itaituba / PA", data: "12/07/2026 14:22", status: "Atenção média" },
  { lat: "-5.91140", lon: "-56.12070", local: "Jacareacanga / PA", data: "09/07/2026 08:41", status: "Regular" },
  { lat: "-9.90000", lon: "-63.00000", local: "Ariquemes / RO", data: "02/07/2026 17:05", status: "Regular" },
];

function Page() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">Meus relatórios</h1>
          <p className="mt-2 text-muted-foreground">
            Áreas já consultadas na sua conta — abra novamente quando precisar.
          </p>
        </div>
        <Link
          to="/nova-consulta"
          className="rounded-full bg-gradient-gold px-5 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold"
        >
          Nova consulta
        </Link>
      </div>

      <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatorios.map((r) => (
          <li
            key={r.data}
            className="group overflow-hidden rounded-xl border border-border/80 bg-card shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <div className="grain bg-gradient-earth px-5 py-4 text-cream">
              <p className="font-display text-sm font-bold">{r.local}</p>
              <p className="font-mono text-xs text-gold/85">
                {r.lat}, {r.lon}
              </p>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">{r.data}</span>
                <span className="rounded-full border border-gold/35 bg-gold/10 px-2.5 py-0.5 text-[11px] font-bold">
                  {r.status}
                </span>
              </div>
              <Link
                to="/relatorio"
                className="block rounded-xl border border-border bg-secondary/50 py-2.5 text-center text-xs font-semibold hover:bg-secondary"
              >
                Abrir relatório
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <p className="pt-6 text-xs text-muted-foreground">
        O histórico fica salvo neste navegador. Os relatórios continuam disponíveis pelo link.
      </p>
    </>
  );
}
