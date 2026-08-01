import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/marketing/PageShell";
import { Faq } from "@/components/marketing/Sections";
import { CtaBand } from "@/components/marketing/CtaBand";

export const Route = createFileRoute("/_marketing/faq")({
  head: () => ({
    meta: [
      { title: "Perguntas frequentes — Meu Garimpo" },
      {
        name: "description",
        content:
          "Tire dúvidas sobre consultas ANM, arquivos KML, monitoramento de áreas, pagamento e cancelamento do Meu Garimpo.",
      },
      { property: "og:title", content: "Perguntas frequentes — Meu Garimpo" },
      {
        property: "og:description",
        content: "Respostas sobre consultas, monitoramento, pagamento e cancelamento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const extra = [
  {
    q: "Preciso instalar algum aplicativo?",
    a: "Não. Tudo acontece dentro do WhatsApp que você já usa.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "PIX, cartão de crédito e cartão de débito. No plano anual há 20% de desconto.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Não há fidelidade: o cancelamento vale para o próximo ciclo de cobrança.",
  },
  {
    q: "Quantas consultas posso fazer?",
    a: "As consultas são ilimitadas dentro do uso normal da assinatura.",
  },
];

function Page() {
  return (
    <>
      <PageHero
        kicker="FAQ"
        title="Perguntas frequentes"
        description="Se ainda ficar alguma dúvida, é só chamar a gente no WhatsApp."
      />
      <Faq />
      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="font-display text-3xl font-extrabold">Mais dúvidas</h2>
        <div className="mt-8 space-y-3">
          {extra.map((it) => (
            <div key={it.q} className="rounded-lg border border-border bg-card px-6 py-5">
              <p className="font-display font-bold">{it.q}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.a}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
