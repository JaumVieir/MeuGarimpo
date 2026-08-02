<script setup lang="ts">
import PageHero from "@/components/marketing/PageHero.vue";
import Audience from "@/components/marketing/Audience.vue";
import CtaBand from "@/components/marketing/CtaBand.vue";

definePageMeta({ layout: "marketing" });

useHead({
  title: "Para quem é — Meu Garimpo",
  meta: [
    {
      name: "description",
      content:
        "Garimpeiros, advogados minerários, corretores, consultores e investidores usam o Meu Garimpo para validar áreas em segundos.",
    },
    { property: "og:title", content: "Para quem é — Meu Garimpo" },
    { property: "og:description", content: "Feito para quem vive de mineração no Brasil." },
  ],
});
</script>

<template>
  <PageHero
    kicker="Para quem é"
    title="Feito para quem vive de mineração"
    description="Da beira do barranco ao escritório de advocacia: quem precisa saber a situação de uma área antes de decidir."
  />
  <Audience />
  <CtaBand />
</template>
