<script setup lang="ts">
import PageHero from "@/components/marketing/PageHero.vue";
import Faq from "@/components/marketing/Faq.vue";
import CtaBand from "@/components/marketing/CtaBand.vue";

definePageMeta({ layout: "marketing" });

useHead({
  title: "Perguntas frequentes — Meu Garimpo",
  meta: [
    {
      name: "description",
      content:
        "Tire dúvidas sobre consultas ANM, arquivos KML, monitoramento de áreas, pagamento e cancelamento do Meu Garimpo.",
    },
    { property: "og:title", content: "Perguntas frequentes — Meu Garimpo" },
    { property: "og:description", content: "Respostas sobre consultas, monitoramento, pagamento e cancelamento." },
  ],
});

const extra = [
  { q: "Preciso instalar algum aplicativo?", a: "Não. Tudo acontece dentro do WhatsApp que você já usa." },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "PIX, cartão de crédito e cartão de débito. No plano anual há 20% de desconto.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Não há fidelidade: o cancelamento vale para o próximo ciclo de cobrança.",
  },
  { q: "Quantas consultas posso fazer?", a: "As consultas são ilimitadas dentro do uso normal da assinatura." },
];
</script>

<template>
  <PageHero
    kicker="FAQ"
    title="Perguntas frequentes"
    description="Se ainda ficar alguma dúvida, é só chamar a gente no WhatsApp."
  />
  <Faq />
  <section class="mx-auto max-w-3xl px-5 py-20">
    <h2 class="font-display text-3xl font-extrabold">Mais dúvidas</h2>
    <div class="mt-8 space-y-3">
      <div v-for="it in extra" :key="it.q" class="rounded-lg border border-border bg-card px-6 py-5">
        <p class="font-display font-bold">{{ it.q }}</p>
        <p class="mt-1.5 text-sm leading-relaxed text-muted-foreground">{{ it.a }}</p>
      </div>
    </div>
  </section>
  <CtaBand />
</template>
