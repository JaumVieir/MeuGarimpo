import { createFileRoute } from "@tanstack/react-router";
import { PageHero, useCheckout } from "@/components/marketing/PageShell";
import { Pricing } from "@/components/marketing/Pricing";
import { Faq } from "@/components/marketing/Sections";

export const Route = createFileRoute("/_marketing/planos")({
  head: () => ({
    meta: [
      { title: "Planos e preços — Meu Garimpo" },
      {
        name: "description",
        content:
          "Plano Básico a partir de R$ 59,90/mês e plano Full com monitoramento contínuo e alertas no WhatsApp. Anual com 20% de desconto.",
      },
      { property: "og:title", content: "Planos e preços — Meu Garimpo" },
      {
        property: "og:description",
        content: "Escolha o tamanho do seu garimpo: Básico ou Full, mensal ou anual.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function PlansSection() {
  const openCheckout = useCheckout();
  return <Pricing onSubscribe={openCheckout} />;
}

function Page() {
  return (
    <>
      <PageHero
        kicker="Planos"
        title="Assine e comece a consultar hoje"
        description="Sem fidelidade e sem taxa de instalação. Você pode trocar de plano ou cancelar quando quiser."
      />
      <PlansSection />
      <Faq />
    </>
  );
}
