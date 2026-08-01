import { createFileRoute } from "@tanstack/react-router";
import { useCheckout } from "@/features/marketing/components/PageShell";
import { Hero } from "@/features/marketing/components/Hero";
import { Steps, Features, Audience, Faq } from "@/features/marketing/components/Sections";
import { Pricing } from "@/features/marketing/components/Pricing";

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: [
      { title: "Meu Garimpo — Consulta de áreas minerárias no WhatsApp" },
      {
        name: "description",
        content:
          "Consulte processos ANM, poligonais em KML e alertas ambientais de qualquer área de garimpo do Brasil direto no WhatsApp.",
      },
      { property: "og:title", content: "Meu Garimpo — Consulta de áreas minerárias no WhatsApp" },
      {
        property: "og:description",
        content:
          "Dados ANM, título minerário, poligonal KML e monitoramento contínuo das suas áreas, entregues no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function PlansSection() {
  const openCheckout = useCheckout();
  return <Pricing onSubscribe={openCheckout} />;
}

function Index() {
  return (
    <>
      <Hero />
      <Steps />
      <Features />
      <Audience />
      <PlansSection />
      <Faq />
    </>
  );
}
