<script setup lang="ts">
import SectionTitle from "@/components/marketing/SectionTitle.vue";
import IconGlyph from "@/components/marketing/IconGlyph.vue";
import { P } from "@/components/marketing/icons";

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
</script>

<template>
  <section id="como-funciona" class="mx-auto max-w-6xl scroll-mt-28 px-5 py-20">
    <SectionTitle kicker="Como funciona" title="Três passos, nenhuma burocracia" />
    <div class="mt-12 grid gap-5 md:grid-cols-3">
      <article
        v-for="s in steps"
        :key="s.n"
        class="group relative rounded-xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1"
      >
        <span class="font-display text-5xl font-extrabold text-accent">{{ s.n }}</span>
        <span class="mt-4 grid size-11 place-items-center rounded-lg bg-secondary text-earth-soft">
          <IconGlyph :path="s.icon" />
        </span>
        <h3 class="mt-4 text-xl font-bold">{{ s.t }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ s.d }}</p>
      </article>
    </div>
  </section>
</template>
