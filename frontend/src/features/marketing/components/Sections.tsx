import { useState } from "react";

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d={path} />
    </svg>
  );
}

const P = {
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z M12 10.5v.01",
  doc: "M14 3v5h5 M7 3h8l5 5v13H7z M10 13h7 M10 17h7",
  radar: "M12 12 19 5 M12 21a9 9 0 1 0-9-9 M12 12h.01 M7.5 16.5A6.4 6.4 0 0 1 12 5.6",
  layers: "m12 3 9 5-9 5-9-5 9-5Z m-9 9 9 5 9-5 M3 16l9 5 9-5",
  scale: "M12 4v16 M6 8l-3 6h6zM18 8l-3 6h6z M7 8h10",
  gem: "m6 4h12l3 5-9 11L3 9z M3 9h18 M9 4l-3 5 6 11 6-11-3-5",
  bell: "M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7 M10.5 20a2 2 0 0 0 3 0",
  file: "M14 3v5h5 M7 3h8l5 5v13H7z M9.5 14l2 2 3.5-4",
};

export function Steps() {
  const steps = [
    {
      n: "01",
      icon: P.pin,
      t: "Envie a localização",
      d: "Manda o pino no WhatsApp ou o número do processo ANM. Sem app, sem cadastro complicado.",
    },
    {
      n: "02",
      icon: P.doc,
      t: "Receba os dados",
      d: "Ficha do processo, titular, substância e a poligonal em KML chegam na hora na conversa.",
    },
    {
      n: "03",
      icon: P.radar,
      t: "Monitore suas áreas",
      d: "A gente vigia suas áreas e te avisa quando algo muda — fase, embargo ou queimada.",
    },
  ];

  return (
    <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-20">
      <SectionTitle kicker="Como funciona" title="Três passos, nenhuma burocracia" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <article
            key={s.n}
            className="group relative rounded-xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
          >
            <span className="font-display text-5xl font-extrabold text-accent">{s.n}</span>
            <span className="mt-4 grid size-11 place-items-center rounded-lg bg-secondary text-earth-soft">
              <Icon path={s.icon} />
            </span>
            <h3 className="mt-4 text-xl font-bold">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    { icon: P.doc, t: "Dados ANM", d: "Número, fase e situação do processo, direto da base oficial." },
    { icon: P.scale, t: "Títulos minerários", d: "Titular, CPF/CNPJ e histórico do direito mineral." },
    { icon: P.layers, t: "Poligonal e limites", d: "Arquivo KML pronto para abrir no Google Earth." },
    { icon: P.gem, t: "Substância mineral", d: "O que pode ser lavrado na área e sob qual regime." },
    { icon: P.radar, t: "Monitoramento contínuo", d: "Suas áreas acompanhadas todos os dias." },
    { icon: P.file, t: "Arquivo mensal", d: "Relatório em PDF + KML consolidado, todo mês." },
  ];

  return (
    <section id="recursos" className="scroll-mt-28 bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle kicker="O que você recebe" title="Tudo o que o garimpo precisa saber" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((i) => (
            <article
              key={i.t}
              className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-gold text-primary-foreground">
                <Icon path={i.icon} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{i.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Audience() {
  const items = [
    { icon: P.gem, t: "Garimpeiros", d: "Saiba se a área é livre antes de gastar diesel e maquinário." },
    { icon: P.scale, t: "Advogados minerários", d: "Documentação e poligonal do processo em segundos." },
    { icon: P.pin, t: "Corretores e consultores", d: "Valide áreas com o cliente ainda na conversa." },
    { icon: P.radar, t: "Investidores", d: "Due diligence rápida antes de entrar em um projeto." },
  ];

  return (
    <section id="publico" className="mx-auto max-w-6xl scroll-mt-28 px-5 py-20">
      <SectionTitle kicker="Para quem é" title="Feito para quem vive de mineração" />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {items.map((i) => (
          <article
            key={i.t}
            className="rounded-xl bg-gradient-gold p-7 text-primary-foreground shadow-gold transition-transform hover:-translate-y-1"
          >
            <span className="grid size-11 place-items-center rounded-lg bg-earth/15">
              <Icon path={i.icon} />
            </span>
            <h3 className="mt-4 font-display text-xl font-extrabold">{i.t}</h3>
            <p className="mt-1.5 text-sm leading-relaxed opacity-80">{i.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  const items = [
    {
      q: "Como recebo os dados da consulta?",
      a: "Tudo chega na própria conversa do WhatsApp: a ficha em texto, o PDF e o arquivo KML da poligonal.",
    },
    {
      q: "Os dados são atualizados direto da ANM?",
      a: "Sim. As consultas usam a base pública da ANM, com atualização contínua dos processos e fases.",
    },
    {
      q: "Como funciona o monitoramento de áreas?",
      a: "Você cadastra as áreas que quer acompanhar e recebe um alerta no WhatsApp sempre que houver mudança de fase, embargo ou foco de queimada.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 bg-secondary/50 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle kicker="FAQ" title="Perguntas frequentes" />
        <div className="mt-10 space-y-3">
          {items.map((it, idx) => (
            <div key={it.q} className="overflow-hidden rounded-lg border border-border bg-card">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display font-bold"
              >
                {it.q}
                <svg
                  viewBox="0 0 24 24"
                  className={`size-5 shrink-0 transition-transform ${open === idx ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {open === idx && (
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{it.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-display text-xs font-bold tracking-[0.2em] text-gold uppercase">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight font-extrabold text-balance-tight md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
