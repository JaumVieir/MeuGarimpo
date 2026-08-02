<script setup lang="ts">
import SectionTitle from "@/components/marketing/SectionTitle.vue";
import IconGlyph from "@/components/marketing/IconGlyph.vue";
import { P } from "@/components/marketing/icons";

const items = [
  { icon: P.doc, t: "Dados ANM", d: "Número, fase e situação do processo, direto da base oficial." },
  { icon: P.scale, t: "Títulos minerários", d: "Titular, CPF/CNPJ e histórico do direito mineral." },
  { icon: P.layers, t: "Poligonal e limites", d: "Arquivo KML pronto para abrir no Google Earth." },
  { icon: P.gem, t: "Substância mineral", d: "O que pode ser lavrado na área e sob qual regime." },
  { icon: P.radar, t: "Monitoramento contínuo", d: "Suas áreas acompanhadas todos os dias." },
  { icon: P.file, t: "Arquivo mensal", d: "Relatório em PDF + KML consolidado, todo mês." },
];
</script>

<template>
  <section id="recursos" class="scroll-mt-28 bg-secondary/50 py-20">
    <div class="mx-auto max-w-6xl px-5">
      <SectionTitle kicker="O que você recebe" title="Tudo o que o garimpo precisa saber" />
      <div class="mt-12 grid gap-5 md:grid-cols-2">
        <article
          v-for="i in items"
          :key="i.t"
          class="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
        >
          <span class="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-gold text-primary-foreground">
            <IconGlyph :path="i.icon" />
          </span>
          <div>
            <h3 class="font-display text-lg font-bold">{{ i.t }}</h3>
            <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{{ i.d }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
