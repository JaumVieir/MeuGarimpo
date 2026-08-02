<script setup lang="ts">
import PageHero from "@/components/marketing/PageHero.vue";
import Steps from "@/components/marketing/Steps.vue";
import CtaBand from "@/components/marketing/CtaBand.vue";

definePageMeta({ layout: "marketing" });

useHead({
  title: "Como funciona — Meu Garimpo",
  meta: [
    {
      name: "description",
      content:
        "Envie o pino de localização ou o número do processo ANM no WhatsApp e receba a ficha completa da área em segundos.",
    },
    { property: "og:title", content: "Como funciona — Meu Garimpo" },
    { property: "og:description", content: "Três passos para consultar e monitorar áreas minerárias pelo WhatsApp." },
  ],
});

const itens = [
  ["Pino de localização", "Compartilhe a localização e identificamos os processos que incidem no ponto."],
  ["Número do processo ANM", "Ex.: 850.123/2021 — devolvemos a ficha completa e a poligonal."],
  ["Coordenadas", "Latitude e longitude em graus decimais ou GMS."],
  ["Arquivo KML", "Enviamos o cruzamento da sua poligonal com os processos existentes."],
];
</script>

<template>
  <PageHero
    kicker="Como funciona"
    title="Do pino no mapa ao relatório completo, sem sair da conversa"
    description="Nada de sistema complicado. Você usa o WhatsApp que já tem no bolso e recebe dados oficiais da ANM em segundos."
  />
  <Steps />
  <section class="bg-secondary/50 py-20">
    <div class="mx-auto max-w-3xl px-5">
      <h2 class="font-display text-3xl font-extrabold">O que você pode enviar</h2>
      <ul class="mt-8 space-y-4">
        <li v-for="[t, d] in itens" :key="t" class="rounded-xl border border-border bg-card p-6 shadow-soft">
          <p class="font-display text-lg font-bold">{{ t }}</p>
          <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{{ d }}</p>
        </li>
      </ul>
    </div>
  </section>
  <CtaBand />
</template>
