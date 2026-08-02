<script setup lang="ts">
import Hero from "@/components/marketing/Hero.vue";
import Steps from "@/components/marketing/Steps.vue";
import Features from "@/components/marketing/Features.vue";
import Audience from "@/components/marketing/Audience.vue";
import Pricing from "@/components/marketing/Pricing.vue";
import Faq from "@/components/marketing/Faq.vue";
import { useCheckout } from "@/composables/useCheckout";

definePageMeta({ layout: "marketing" });

useHead({
  title: "Meu Garimpo — Consulta de áreas minerárias no WhatsApp",
  meta: [
    {
      name: "description",
      content:
        "Consulte processos ANM, poligonais em KML e alertas ambientais de qualquer área de garimpo do Brasil direto no WhatsApp.",
    },
    { property: "og:title", content: "Meu Garimpo — Consulta de áreas minerárias no WhatsApp" },
    {
      property: "og:description",
      content:
        "Dados ANM, título minerário, poligonal KML e monitoramento contínuo das suas áreas, entregues no WhatsApp.",
    },
  ],
});

const openCheckout = useCheckout();
</script>

<template>
  <Hero />
  <Steps />
  <Features />
  <Audience />
  <Pricing @subscribe="openCheckout" />
  <Faq />
</template>
