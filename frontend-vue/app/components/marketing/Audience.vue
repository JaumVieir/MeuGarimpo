<script setup lang="ts">
import SectionTitle from "@/components/marketing/SectionTitle.vue";
import IconGlyph from "@/components/marketing/IconGlyph.vue";
import { P } from "@/components/marketing/icons";

const items = [
  { icon: P.gem, t: "Garimpeiros", d: "Saiba se a área é livre antes de gastar diesel e maquinário." },
  { icon: P.scale, t: "Advogados minerários", d: "Documentação e poligonal do processo em segundos." },
  { icon: P.pin, t: "Corretores e consultores", d: "Valide áreas com o cliente ainda na conversa." },
  { icon: P.radar, t: "Investidores", d: "Due diligence rápida antes de entrar em um projeto." },
];
</script>

<template>
  <section id="publico" class="mx-auto max-w-6xl scroll-mt-28 px-5 py-20">
    <SectionTitle kicker="Para quem é" title="Feito para quem vive de mineração" />
    <div class="mt-12 grid gap-5 md:grid-cols-2">
      <article
        v-for="i in items"
        :key="i.t"
        class="rounded-xl bg-gradient-gold p-7 text-primary-foreground shadow-gold transition-transform hover:-translate-y-1"
      >
        <span class="grid size-11 place-items-center rounded-lg bg-earth/15">
          <IconGlyph :path="i.icon" />
        </span>
        <h3 class="mt-4 font-display text-xl font-extrabold">{{ i.t }}</h3>
        <p class="mt-1.5 text-sm leading-relaxed opacity-80">{{ i.d }}</p>
      </article>
    </div>
  </section>
</template>
