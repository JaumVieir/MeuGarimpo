import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/marketing/PageShell";
import { Features } from "@/components/marketing/Sections";
import { CtaBand } from "@/components/marketing/CtaBand";

export const Route = createFileRoute("/_marketing/recursos")({
  head: () => ({
    meta: [
      { title: "O que você recebe — Meu Garimpo" },
      {
        name: "description",
        content:
          "Dados ANM, título minerário, poligonal em KML, substância mineral, monitoramento contínuo e relatório mensal em PDF.",
      },
      { property: "og:title", content: "O que você recebe — Meu Garimpo" },
      {
        property: "og:description",
        content: "Todos os recursos da consulta minerária pelo WhatsApp.",
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
        kicker="O que você recebe"
        title="Informação oficial, organizada e pronta para usar"
        description="Cada consulta devolve um pacote completo sobre a área: quem é o titular, o que pode ser lavrado e onde exatamente ficam os limites."
      />
      <Features />
      <CtaBand />
    </>
  );
}
