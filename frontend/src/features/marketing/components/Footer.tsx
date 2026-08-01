import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/shared/Logo";

const quick = [
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/recursos", label: "O que você recebe" },
  { to: "/publico", label: "Para quem é" },
  { to: "/planos", label: "Planos" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
] as const;

export function Footer() {
  return (
    <footer className="grain bg-gradient-earth text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-70">
            Consulta e monitoramento de áreas minerárias do Brasil, entregues no seu WhatsApp.
          </p>
          <Link
            to="/planos"
            className="mt-6 inline-flex rounded-full bg-whats px-6 py-3 font-display text-sm font-bold text-earth transition-transform hover:-translate-y-0.5"
          >
            Ver planos e assinar
          </Link>
        </div>

        <div>
          <p className="font-display text-sm font-bold">Links rápidos</p>
          <ul className="mt-4 space-y-2.5 text-sm opacity-70">
            {quick.map((q) => (
              <li key={q.to}>
                <Link to={q.to} className="hover:text-gold-glow">
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm opacity-70">
            <li>
              <Link to="/termos" className="hover:text-gold-glow">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/privacidade" className="hover:text-gold-glow">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Meu Garimpo. Todos os direitos reservados.
      </div>
    </footer>
  );
}
