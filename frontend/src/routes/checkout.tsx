import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/shared/Logo";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Pagamento PIX — Meu Garimpo" },
      {
        name: "description",
        content: "Finalize sua assinatura do Meu Garimpo pagando com PIX em poucos segundos.",
      },
      { property: "og:title", content: "Pagamento PIX — Meu Garimpo" },
      { property: "og:description", content: "Conclua o pagamento da sua assinatura via PIX." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const PIX_CODE =
  "00020126580014BR.GOV.BCB.PIX0136meu-garimpo-demo-0001-pix5204000053039865802BR5910MEUGARIMPO6009SAO PAULO62070503***6304A1B2";

function Page() {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_CODE);
    } catch {
      /* fallback silencioso */
    }
    setCopied(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between gap-4 px-5 py-5">
        <Logo />
        <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
          Pagamento processado com segurança
        </span>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-5 pb-16">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="grain flex items-center justify-between bg-gradient-earth px-6 py-5 text-cream">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase opacity-60">Plano</p>
              <p className="font-display text-lg font-extrabold">Full</p>
            </div>
            <p className="font-display text-xl font-extrabold text-gold-glow">R$ 99,90</p>
          </div>

          {confirmed ? (
            <div className="px-6 py-14 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-whats/15 font-display text-2xl font-bold text-whats">
                ✓
              </span>
              <h1 className="mt-5 font-display text-2xl font-extrabold">Pagamento confirmado!</h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Enviamos seu acesso no WhatsApp cadastrado. Pode conferir por lá.
              </p>
            </div>
          ) : (
            <div className="px-6 py-7">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="size-2 animate-pulse rounded-full bg-gold" />
                Aguardando pagamento
              </div>

              <h1 className="mt-5 text-center font-display text-xl font-extrabold">
                Pague com PIX para liberar seu acesso
              </h1>

              <div className="mx-auto mt-6 grid size-56 place-items-center rounded-lg border border-border bg-secondary p-4">
                <div
                  aria-label="QR Code PIX"
                  role="img"
                  className="size-full rounded-lg bg-earth"
                  style={{
                    maskImage:
                      "repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 0 0/16px 16px",
                    WebkitMaskImage:
                      "repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 0 0/16px 16px",
                  }}
                />
              </div>

              <label className="mt-6 block text-xs font-semibold text-muted-foreground">
                Código copia e cola
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  readOnly
                  value={PIX_CODE}
                  className="min-w-0 flex-1 rounded-xl border border-border bg-secondary px-3 py-3 font-mono text-xs text-muted-foreground"
                />
                <button
                  onClick={copy}
                  className={`shrink-0 rounded-xl px-4 py-3 font-display text-sm font-bold transition-colors ${
                    copied ? "bg-whats text-earth" : "bg-earth text-cream"
                  }`}
                >
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Confirmamos automaticamente assim que o pagamento cair.
              </p>

              <button
                onClick={() => setConfirmed(true)}
                className="mt-6 w-full rounded-xl border border-border py-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary"
              >
                Simular pagamento confirmado
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          Nenhum dado de pagamento fica armazenado em nossos servidores.
        </p>
      </main>
    </div>
  );
}
