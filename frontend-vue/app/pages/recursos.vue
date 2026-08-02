<script setup lang="ts">
import PageHero from "@/components/marketing/PageHero.vue";
import Features from "@/components/marketing/Features.vue";
import CtaBand from "@/components/marketing/CtaBand.vue";

definePageMeta({ layout: "marketing" });

useHead({
  title: "O que você recebe — Meu Garimpo",
  meta: [
    {
      name: "description",
      content:
        "Dados ANM, título minerário, poligonal em KML, substância mineral, monitoramento contínuo e relatório mensal em PDF.",
    },
    { property: "og:title", content: "O que você recebe — Meu Garimpo" },
    { property: "og:description", content: "Todos os recursos da consulta minerária pelo WhatsApp." },
  ],
});
</script>

<template>
  <PageHero
    kicker="O que você recebe"
    title="Informação oficial, organizada e pronta para usar"
    description="Cada consulta devolve um pacote completo sobre a área: quem é o titular, o que pode ser lavrado e onde exatamente ficam os limites."
  />
  <Features />
  <CtaBand />
</template>
