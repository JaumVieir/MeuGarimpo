import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/marketing/PageShell";
import { Audience } from "@/components/marketing/Sections";
import { CtaBand } from "@/components/marketing/CtaBand";

export const Route = createFileRoute("/_marketing/publico")({
  head: () => ({
    meta: [
      { title: "Para quem é — Meu Garimpo" },
      {
        name: "description",
        content:
          "Garimpeiros, advogados minerários, corretores, consultores e investidores usam o Meu Garimpo para validar áreas em segundos.",
      },
      { property: "og:title", content: "Para quem é — Meu Garimpo" },
      {
        property: "og:description",
        content: "Feito para quem vive de mineração no Brasil.",
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
        kicker="Para quem é"
        title="Feito para quem vive de mineração"
        description="Da beira do barranco ao escritório de advocacia: quem precisa saber a situação de uma área antes de decidir."
      />
      <Audience />
      <CtaBand />
    </>
  );
}
