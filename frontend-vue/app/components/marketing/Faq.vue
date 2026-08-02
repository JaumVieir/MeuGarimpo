<script setup lang="ts">
import { ref } from "vue";
import SectionTitle from "@/components/marketing/SectionTitle.vue";

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

const open = ref<number | null>(0);
</script>

<template>
  <section id="faq" class="scroll-mt-28 bg-secondary/50 py-20">
    <div class="mx-auto max-w-3xl px-5">
      <SectionTitle kicker="FAQ" title="Perguntas frequentes" />
      <div class="mt-10 space-y-3">
        <div v-for="(it, idx) in items" :key="it.q" class="overflow-hidden rounded-lg border border-border bg-card">
          <button
            @click="open = open === idx ? null : idx"
            class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display font-bold"
          >
            {{ it.q }}
            <svg
              viewBox="0 0 24 24"
              :class="['size-5 shrink-0 transition-transform', open === idx ? 'rotate-180' : '']"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <p v-if="open === idx" class="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{{ it.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
