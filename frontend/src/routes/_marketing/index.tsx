import { createFileRoute } from "@tanstack/react-router";
import { useCheckout } from "@/components/marketing/PageShell";
import { Hero } from "@/components/marketing/Hero";
import { Steps, Features, Audience, Faq } from "@/components/marketing/Sections";
import { Pricing } from "@/components/marketing/Pricing";

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
