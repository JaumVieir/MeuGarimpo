import { useEffect, useState } from "react";

type Msg = { from: "visitor" | "support"; text: string };

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [greet, setGreet] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [nome, setNome] = useState("");
  const [zap, setZap] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setGreet(true), 3200);
    return () => clearTimeout(t);
  }, []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMsgs((m) => [...m, { from: "visitor", text: draft.trim() }]);
    setDraft("");
    setTimeout(
      () =>
        setMsgs((m) => [
          ...m,
          { from: "support", text: "Recebemos sua mensagem! Já te respondemos por aqui." },
        ]),
      800,
    );
  };

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          <div className="grain flex items-center gap-3 bg-gradient-earth px-4 py-3 text-cream">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-gold font-display text-xs font-bold text-primary-foreground">
              MG
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-bold">Suporte Meu Garimpo</p>
              <p className="flex items-center gap-1.5 text-xs opacity-70">
                <span className="size-1.5 rounded-full bg-whats" /> online · responde rápido
              </p>
            </div>
            <button aria-label="Fechar chat" onClick={() => setOpen(false)} className="text-lg opacity-70">
              ×
            </button>
          </div>

          {msgs.length === 0 ? (
            <form onSubmit={send} className="space-y-3 p-4">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome (opcional)"
                className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
              <input
                value={zap}
                onChange={(e) => setZap(e.target.value)}
                placeholder="WhatsApp com DDD (opcional)"
                className="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                placeholder="Escreva sua mensagem..."
                className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
              <button className="w-full rounded-xl bg-gradient-gold py-3 font-display text-sm font-bold text-primary-foreground shadow-gold">
                Enviar mensagem
              </button>
            </form>
          ) : (
            <>
              <div className="max-h-72 space-y-2 overflow-y-auto p-4">
                {msgs.map((m, i) => (
                  <p
                    key={i}
                    className={`max-w-[80%] rounded-lg px-3.5 py-2 text-sm ${
                      m.from === "visitor"
                        ? "ml-auto bg-gradient-gold font-medium text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    {m.text}
                  </p>
                ))}
              </div>
              <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Mensagem"
                  className="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-gold"
                />
                <button
                  aria-label="Enviar"
                  className="rounded-xl bg-earth px-4 text-sm font-bold text-cream"
                >
                  ➤
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {greet && !open && (
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium shadow-soft">
          Precisa de ajuda? Fala com a gente
          <button aria-label="Fechar aviso" onClick={() => setGreet(false)} className="opacity-50">
            ×
          </button>
        </div>
      )}

      <button
        aria-label="Abrir suporte"
        onClick={() => {
          setOpen((v) => !v);
          setGreet(false);
        }}
        className="grid size-14 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l2-4.6a8.4 8.4 0 0 1-1-4A8.38 8.38 0 0 1 12.5 4 8.38 8.38 0 0 1 21 11.5z" />
        </svg>
      </button>
    </div>
  );
}
