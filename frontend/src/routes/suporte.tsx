import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/shared/Logo";

export const Route = createFileRoute("/suporte")({
  head: () => ({
    meta: [
      { title: "Painel do dono — Meu Garimpo" },
      {
        name: "description",
        content: "Área interna de gestão de assinaturas, cadastros e atendimento do Meu Garimpo.",
      },
      { property: "og:title", content: "Painel do dono — Meu Garimpo" },
      { property: "og:description", content: "Gestão de assinaturas, registro e suporte." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const clientes = [
  { nome: "Joel Ribeiro", plano: "Full", status: "ativo", contato: "(93) 98123-4567", venc: "14/08/2026" },
  { nome: "Marta Souza", plano: "Básico", status: "ativo", contato: "(91) 99777-1122", venc: "02/08/2026" },
  { nome: "Cleber Andrade", plano: "Full", status: "vencido", contato: "(94) 98444-9090", venc: "28/06/2026" },
  { nome: "Ana Paula Lima", plano: "Básico", status: "bloqueado", contato: "ana@escritorio.com", venc: "10/05/2026" },
];

const conversas = [
  { nome: "Joel Ribeiro", tag: "Full", hora: "14:22", previa: "Você: mandei o KML atualizado", nao: 0 },
  { nome: "(96) 98111-2233", tag: "visitante", hora: "13:04", previa: "Vocês atendem no Amapá?", nao: 2 },
  { nome: "Marta Souza", tag: "Básico", hora: "11:47", previa: "Consegui, obrigada!", nao: 0 },
];

const iniciais = (n: string) =>
  n.replace(/[^A-Za-zÀ-ú ]/g, "").trim().split(" ").slice(0, 2).map((p) => p[0] ?? "").join("").toUpperCase() || "MG";

const statusTone: Record<string, string> = {
  ativo: "bg-whats/15 text-earth",
  vencido: "bg-gold/20 text-earth",
  bloqueado: "bg-destructive/15 text-destructive",
};

type Tab = "assinaturas" | "registro" | "suporte";

function Page() {
  const [logged, setLogged] = useState(false);
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [tab, setTab] = useState<Tab>("assinaturas");
  const [conversa, setConversa] = useState<number | null>(null);

  if (!logged) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!senha) return setErro("Informe a senha.");
            setErro("");
            setLogged(true);
          }}
          className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-soft"
        >
          <Logo />
          <h1 className="mt-6 font-display text-xl font-extrabold">Painel do Dono</h1>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="mt-4 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold"
          />
          {erro && <p className="mt-2 text-xs font-medium text-destructive">{erro}</p>}
          <button className="mt-4 w-full rounded-xl bg-earth py-3 font-display text-sm font-bold text-cream">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="grain flex flex-wrap items-center justify-between gap-4 bg-gradient-earth px-5 py-4 text-cream">
        <Logo tone="light" />
        <div className="flex gap-2">
          {(
            [
              ["assinaturas", "Assinaturas"],
              ["registro", "Registro"],
              ["suporte", "Suporte"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                tab === k ? "bg-gradient-gold text-primary-foreground" : "bg-cream/10 text-cream"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={() => setLogged(false)}
          className="rounded-full border border-cream/25 px-4 py-2 text-sm font-medium hover:bg-cream/10"
        >
          Sair
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {tab === "assinaturas" && (
          <>
            <div className="grain rounded-xl bg-gradient-earth px-7 py-8 text-cream shadow-soft">
              <p className="text-xs tracking-[0.18em] uppercase opacity-60">Receita recorrente</p>
              <p className="mt-2 font-display text-4xl font-extrabold text-gold-glow">R$ 319,60</p>
              <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                <p className="opacity-70">2 × Básico — R$ 119,80</p>
                <p className="opacity-70">2 × Full — R$ 199,80</p>
                <p className="opacity-70">2 ativas de 4 no total</p>
              </div>
            </div>
            <Lista />
          </>
        )}

        {tab === "registro" && (
          <>
            <form className="grid gap-3 rounded-lg border border-border bg-card p-5 shadow-soft sm:grid-cols-4">
              <input placeholder="WhatsApp" className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold" />
              <input placeholder="Nome (opcional)" className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold" />
              <select className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold">
                <option>Full</option>
                <option>Básico</option>
              </select>
              <input defaultValue={30} type="number" className="rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold" />
              <button
                type="button"
                className="rounded-xl bg-gradient-gold px-6 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold sm:col-span-1"
              >
                Adicionar número
              </button>
            </form>
            <Lista acoes />
          </>
        )}

        {tab === "suporte" && (
          <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
            <ul className="space-y-2">
              {conversas.map((c, i) => (
                <li key={c.nome}>
                  <button
                    onClick={() => setConversa(i)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                      conversa === i ? "border-gold bg-gold/10" : "border-border bg-card"
                    }`}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-display text-xs font-bold">
                      {iniciais(c.nome)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-sm font-semibold">{c.nome}</span>
                        <span className="text-xs text-muted-foreground">{c.hora}</span>
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{c.previa}</span>
                      <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold">
                        {c.tag}
                      </span>
                    </span>
                    {c.nao > 0 && (
                      <span className="grid size-5 place-items-center rounded-full bg-destructive text-[0.65rem] font-bold text-destructive-foreground">
                        {c.nao}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex min-h-[26rem] flex-col rounded-lg border border-border bg-card">
              {conversa === null ? (
                <p className="m-auto text-sm text-muted-foreground">
                  Selecione uma conversa à esquerda
                </p>
              ) : (
                <>
                  <div className="border-b border-border px-5 py-3">
                    <p className="font-display text-sm font-bold">{conversas[conversa].nome}</p>
                    <p className="text-xs text-muted-foreground">{conversas[conversa].tag}</p>
                  </div>
                  <div className="flex-1 space-y-3 overflow-y-auto p-5">
                    <p className="max-w-[75%] rounded-lg bg-secondary px-4 py-2.5 text-sm">
                      {conversas[conversa].previa}
                    </p>
                    <p className="ml-auto max-w-[75%] rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-medium text-primary-foreground">
                      Claro, posso te ajudar com isso.
                    </p>
                  </div>
                  <div className="flex gap-2 border-t border-border p-3">
                    <input
                      placeholder="Escreva uma resposta..."
                      className="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold"
                    />
                    <button className="rounded-xl bg-earth px-5 py-3 text-sm font-semibold text-cream">
                      Enviar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Lista({ acoes = false }: { acoes?: boolean }) {
  return (
    <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
      {clientes.map((c) => (
        <li key={c.nome} className="flex flex-wrap items-center gap-4 px-5 py-4">
          <span className="grid size-10 place-items-center rounded-full bg-secondary font-display text-xs font-bold">
            {iniciais(c.nome)}
          </span>
          <div className="min-w-40 flex-1">
            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
              {c.nome}
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-bold">
                {c.plano}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${statusTone[c.status]}`}>
                {c.status}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{c.contato}</p>
          </div>
          <p className="text-xs text-muted-foreground">Vence {c.venc}</p>
          {acoes && (
            <div className="flex flex-wrap gap-2">
              {["Ver", "Renovar", "Senha", "Bloquear"].map((a) => (
                <button
                  key={a}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
                >
                  {a}
                </button>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
