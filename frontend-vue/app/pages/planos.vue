<script setup lang="ts">
import PageHero from "@/components/marketing/PageHero.vue";
import Pricing from "@/components/marketing/Pricing.vue";
import Faq from "@/components/marketing/Faq.vue";
import { useCheckout } from "@/composables/useCheckout";

definePageMeta({ layout: "marketing" });

useHead({
  title: "Planos e preços — Meu Garimpo",
  meta: [
    {
      name: "description",
      content:
        "Plano Básico a partir de R$ 59,90/mês e plano Full com monitoramento contínuo e alertas no WhatsApp. Anual com 20% de desconto.",
    },
    { property: "og:title", content: "Planos e preços — Meu Garimpo" },
    { property: "og:description", content: "Escolha o tamanho do seu garimpo: Básico ou Full, mensal ou anual." },
  ],
});

const openCheckout = useCheckout();
</script>

<template>
  <PageHero
    kicker="Planos"
    title="Assine e comece a consultar hoje"
    description="Sem fidelidade e sem taxa de instalação. Você pode trocar de plano ou cancelar quando quiser."
  />
  <Pricing @subscribe="openCheckout" />
  <Faq />
</template>
