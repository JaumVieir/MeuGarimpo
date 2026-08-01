import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/shared/Logo";

export const Route = createFileRoute("/acesso")({
  head: () => ({
    meta: [
      { title: "Criar acesso ao painel — Meu Garimpo" },
      {
        name: "description",
        content: "Configure sua senha e libere o acesso ao painel do assinante Meu Garimpo.",
      },
      { property: "og:title", content: "Criar acesso ao painel — Meu Garimpo" },
      { property: "og:description", content: "Defina sua senha de primeiro acesso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

const field =
  "mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold";

function Page() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass.length < 6) return setError("A senha precisa ter pelo menos 6 caracteres.");
    if (pass !== repeat) return setError("As senhas não coincidem.");
    setError("");
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setDone(true);
    }, 900);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-5 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-soft">
        <Logo />

        {done ? (
          <div className="mt-8 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-whats/15 font-display text-xl font-bold text-whats">
              ✓
            </span>
            <h1 className="mt-4 font-display text-xl font-extrabold">Acesso criado!</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sua senha foi salva. Agora é só entrar no painel.
            </p>
            <Link
              to="/painel"
              className="mt-6 inline-flex rounded-full bg-gradient-gold px-6 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold"
            >
              Ir para o painel
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mt-7 font-display text-2xl font-extrabold">Configure seu acesso</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Crie uma senha para entrar no painel do assinante.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  E-mail (opcional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className={field}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Crie uma senha</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className={field}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Repita a senha</label>
                <input
                  type="password"
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                  placeholder="Repita a senha"
                  className={field}
                />
              </div>

              {error && (
                <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive">
                  {error}
                </p>
              )}

              <button
                disabled={saving}
                className="w-full rounded-xl bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground shadow-gold disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Criar meu acesso"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
