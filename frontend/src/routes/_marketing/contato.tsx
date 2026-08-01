import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/features/marketing/components/PageShell";
import { fieldClass, labelClass } from "@/features/marketing/components/formStyles";

export const Route = createFileRoute("/_marketing/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Meu Garimpo" },
      {
        name: "description",
        content:
          "Fale com o time do Meu Garimpo pelo WhatsApp ou e-mail e tire dúvidas sobre consultas de áreas minerárias.",
      },
      { property: "og:title", content: "Contato — Meu Garimpo" },
      {
        property: "og:description",
        content: "Atendimento por WhatsApp e e-mail, de segunda a sexta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const field = fieldClass;
const label = labelClass;

function Page() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        kicker="Contato"
        title="Fale com quem entende de garimpo"
        description="Dúvidas sobre planos, consultas ou monitoramento? Nosso time responde rápido."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          {[
            ["WhatsApp", "(00) 00000-0000", "Seg a sex, 8h às 18h"],
            ["E-mail", "contato@meugarimpo.com.br", "Resposta em até 1 dia útil"],
            ["Suporte a assinantes", "Direto na conversa", "Prioridade para plano Full"],
          ].map(([t, v, d]) => (
            <div key={t} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <p className="font-display text-xs font-bold tracking-[0.2em] text-gold uppercase">
                {t}
              </p>
              <p className="mt-2 font-display text-lg font-bold">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-xl border border-border bg-card p-8 shadow-soft"
        >
          <h2 className="font-display text-2xl font-extrabold">Envie uma mensagem</h2>
          <div className="mt-6 space-y-4">
            <div>
              <span className={label}>Nome</span>
              <input className={field} placeholder="Seu nome" required />
            </div>
            <div>
              <span className={label}>E-mail</span>
              <input type="email" className={field} placeholder="voce@email.com" required />
            </div>
            <div>
              <span className={label}>WhatsApp</span>
              <input className={field} placeholder="(00) 00000-0000" inputMode="numeric" />
            </div>
            <div>
              <span className={label}>Mensagem</span>
              <textarea className={`${field} min-h-32`} placeholder="Como podemos ajudar?" />
            </div>
          </div>
          <button className="mt-6 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground">
            {sent ? "Mensagem enviada!" : "Enviar mensagem"}
          </button>
          {sent && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Recebemos seu contato. Responderemos em breve.
            </p>
          )}
        </form>
      </section>
    </>
  );
}
