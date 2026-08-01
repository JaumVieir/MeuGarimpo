import { useState, type ReactNode } from "react";
import { plans, type PlanKey } from "./Pricing";
import { fieldClass, labelClass } from "./formStyles";

function Modal({
  open,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-earth/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full ${wide ? "max-w-lg" : "max-w-md"} max-h-[90vh] overflow-y-auto rounded-xl bg-card shadow-soft`}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full bg-secondary text-earth"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

const field = fieldClass;
const label = labelClass;

export function LoginModal({
  open,
  onClose,
  onRecover,
}: {
  open: boolean;
  onClose: () => void;
  onRecover: () => void;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Modal open={open} onClose={onClose}>
      <form
        className="p-8"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => setLoading(false), 1200);
        }}
      >
        <h3 className="font-display text-2xl font-extrabold">Entrar na plataforma</h3>
        <p className="mt-1 text-sm text-muted-foreground">Acesse o painel da sua assinatura.</p>

        <div className="mt-6 space-y-4">
          <div>
            <span className={label}>E-mail ou WhatsApp</span>
            <input className={field} placeholder="voce@email.com" />
          </div>
          <div>
            <span className={label}>Senha</span>
            <input type="password" className={field} placeholder="••••••" />
          </div>
        </div>

        <button
          type="button"
          onClick={onRecover}
          className="mt-3 text-xs font-semibold text-gold hover:underline"
        >
          Esqueci minha senha
        </button>

        <button
          disabled={loading}
          className="mt-6 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground disabled:opacity-70"
        >
          {loading ? "Entrando..." : "Entrar na plataforma"}
        </button>
      </form>
    </Modal>
  );
}

export function RecoverModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <Modal
      open={open}
      onClose={() => {
        setSent(false);
        onClose();
      }}
    >
      <div className="p-8">
        {sent ? (
          <>
            <h3 className="font-display text-2xl font-extrabold">Verifique seu e-mail</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Se esse e-mail estiver cadastrado, enviamos um link para redefinir a senha.
            </p>
            <button
              onClick={() => {
                setSent(false);
                onClose();
              }}
              className="mt-6 w-full rounded-full bg-earth py-3.5 font-display text-sm font-bold text-cream"
            >
              Entendi
            </button>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h3 className="font-display text-2xl font-extrabold">Recuperar senha</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Enviamos um link de redefinição para o seu e-mail.
            </p>
            <div className="mt-6">
              <span className={label}>E-mail</span>
              <input type="email" className={field} placeholder="voce@email.com" />
            </div>
            <button className="mt-6 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground">
              Enviar link de redefinição
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
}

const methods = [
  { k: "pix", l: "PIX", icon: "⚡", help: "Na próxima tela você recebe o QR Code e o copia-e-cola." },
  { k: "credito", l: "Crédito", icon: "💳", help: "Você será levado ao pagamento seguro do cartão." },
  { k: "debito", l: "Débito", icon: "🏦", help: "Você será levado ao pagamento seguro do débito." },
] as const;

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function maskCpf(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

export function CheckoutModal({
  open,
  onClose,
  plan,
}: {
  open: boolean;
  onClose: () => void;
  plan: PlanKey;
}) {
  const [method, setMethod] = useState<(typeof methods)[number]["k"]>("pix");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const p = plans[plan];

  return (
    <Modal open={open} onClose={onClose} wide>
      <div className="grain bg-gradient-earth px-8 py-6 text-cream">
        <p className="text-xs font-semibold tracking-widest uppercase opacity-60">Assinatura</p>
        <p className="mt-1 font-display text-xl font-extrabold">
          Plano {p.name} ·{" "}
          <span className="text-gold-glow">
            R$ {p.monthly.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
          </span>
        </p>
      </div>

      <form className="p-8" onSubmit={(e) => e.preventDefault()}>
        <span className={label}>Forma de pagamento</span>
        <div className="grid grid-cols-3 gap-2">
          {methods.map((m) => (
            <button
              key={m.k}
              type="button"
              onClick={() => setMethod(m.k)}
              className={`rounded-lg border px-3 py-3 text-sm font-semibold transition-colors ${
                method === m.k
                  ? "border-gold bg-accent text-earth"
                  : "border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              <span className="block text-lg">{m.icon}</span>
              {m.l}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {methods.find((m) => m.k === method)!.help}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <span className={label}>Nome completo</span>
            <input className={field} placeholder="Seu nome" />
          </div>
          <div>
            <span className={label}>WhatsApp</span>
            <input
              className={field}
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              placeholder="(00) 00000-0000"
              inputMode="numeric"
            />
          </div>
          <div>
            <span className={label}>E-mail</span>
            <input type="email" className={field} placeholder="voce@email.com" />
          </div>
          <div>
            <span className={label}>CPF</span>
            <input
              className={field}
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              placeholder="000.000.000-00"
              inputMode="numeric"
            />
          </div>
        </div>

        <button className="mt-6 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground">
          {method === "pix" ? "Gerar PIX" : "Ir para o pagamento"}
        </button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          🔒 Pagamento processado com segurança. Não armazenamos dados do cartão.
        </p>
      </form>
    </Modal>
  );
}
