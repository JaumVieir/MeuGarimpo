import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/features/marketing/components/PageShell";
import { Steps } from "@/features/marketing/components/Sections";
import { CtaBand } from "@/features/marketing/components/CtaBand";

export const Route = createFileRoute("/_marketing/como-funciona")({
  head: () => ({
    meta: [
      { title: "Como funciona — Meu Garimpo" },
      {
        name: "description",
        content:
          "Envie o pino de localização ou o número do processo ANM no WhatsApp e receba a ficha completa da área em segundos.",
      },
      { property: "og:title", content: "Como funciona — Meu Garimpo" },
      {
        property: "og:description",
        content: "Três passos para consultar e monitorar áreas minerárias pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        kicker="Como funciona"
        title="Do pino no mapa ao relatório completo, sem sair da conversa"
        description="Nada de sistema complicado. Você usa o WhatsApp que já tem no bolso e recebe dados oficiais da ANM em segundos."
      />
      <Steps />
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-3xl font-extrabold">O que você pode enviar</h2>
          <ul className="mt-8 space-y-4">
            {[
              ["Pino de localização", "Compartilhe a localização e identificamos os processos que incidem no ponto."],
              ["Número do processo ANM", "Ex.: 850.123/2021 — devolvemos a ficha completa e a poligonal."],
              ["Coordenadas", "Latitude e longitude em graus decimais ou GMS."],
              ["Arquivo KML", "Enviamos o cruzamento da sua poligonal com os processos existentes."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <p className="font-display text-lg font-bold">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
