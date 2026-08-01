import { Link } from "@tanstack/react-router";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="grain rounded-xl bg-gradient-earth px-8 py-14 text-center text-cream shadow-soft">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-balance-tight md:text-4xl">
          Pronto para garimpar com informação na mão?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed opacity-70">
          Assine em minutos e comece a consultar áreas no WhatsApp hoje mesmo.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/planos"
            className="rounded-full bg-gradient-gold px-7 py-3.5 font-display text-sm font-bold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
          >
            Ver planos
          </Link>
          <Link
            to="/contato"
            className="rounded-full border border-cream/30 px-7 py-3.5 font-display text-sm font-bold text-cream transition-colors hover:bg-cream/10"
          >
            Falar com a gente
          </Link>
        </div>
      </div>
    </section>
  );
}
