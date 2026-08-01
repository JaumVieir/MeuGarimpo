import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { plans, type PlanKey } from "./Pricing";
import { fieldClass, labelClass } from "./formStyles";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { CadastroFormValeus, cadastroSchema } from "@/features/auth/schema/cadastroSchema";
import { useMutation } from "@tanstack/react-query";
import { usuarioService } from "@/features/auth/api/usuarios";

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

function CheckoutForm({ plan, onDone }: { plan: PlanKey; onDone: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroFormValeus>({ resolver: zodResolver(cadastroSchema) });

  const cadastroMutation = useMutation({
    mutationFn: (values: CadastroFormValeus) =>
      usuarioService.cadastro({
        nome: values.nome,
        telefone: values.telefone,
        email: values.email,
        senha: values.senha,
        plano: plan,
        status: "pendente",
      }),
    onSuccess: () => {
      toast.success("Cadastro realizado!", {
        description: "Enviamos os próximos passos para o seu WhatsApp.",
      });
      onDone();
    },
    onError: (error) => {
      toast.error("Não foi possível concluir o cadastro", {
        description: error.message,
      });
    },
  });

  const onSubmit = handleSubmit((values) => cadastroMutation.mutate(values));

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <div>
        <span className={label}>Nome completo</span>
        <input className={field} placeholder="Seu nome" {...register("nome")} />
        {errors.nome && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.nome.message}</p>}
      </div>

      <div>
        <span className={label}>WhatsApp</span>
        <input className={field} placeholder="(00) 00000-0000" {...register("telefone")} />
        {errors.telefone && (
          <p className="mt-1.5 text-xs font-medium text-destructive">{errors.telefone.message}</p>
        )}
      </div>

      <div>
        <span className={label}>E-mail</span>
        <input type="email" className={field} placeholder="voce@email.com" {...register("email")} />
        {errors.email && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <span className={label}>Senha</span>
        <input
          type="password"
          className={field}
          placeholder="Mínimo 8 caracteres"
          {...register("senha")}
        />
        {errors.senha && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.senha.message}</p>}
      </div>

      <button
        disabled={cadastroMutation.isPending}
        className="mt-2 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground disabled:opacity-70"
      >
        {cadastroMutation.isPending ? "Enviando..." : "Cadastrar"}
      </button>
    </form>
  );
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
  return (
    <Modal open={open} onClose={onClose} wide>
      <div className="p-8">
        <h3 className="font-display text-2xl font-extrabold">
          Assinar plano {plans[plan].name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          R${" "}
          {plans[plan].monthly.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          /mês
        </p>
        <CheckoutForm plan={plan} onDone={onClose} />
      </div>
    </Modal>
  );
}