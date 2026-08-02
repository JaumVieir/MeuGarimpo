<script setup lang="ts">
import PageHero from "@/components/marketing/PageHero.vue";

definePageMeta({ layout: "marketing" });

useHead({
  title: "Termos de Uso — Meu Garimpo",
  meta: [
    {
      name: "description",
      content: "Condições de uso do serviço de consulta e monitoramento de áreas minerárias Meu Garimpo.",
    },
    { property: "og:title", content: "Termos de Uso — Meu Garimpo" },
    { property: "og:description", content: "Condições de uso do serviço Meu Garimpo." },
  ],
});

const blocks = [
  ["1. Sobre o serviço", "O Meu Garimpo disponibiliza consultas e monitoramento de áreas minerárias com base em dados públicos da ANM e de órgãos ambientais, entregues por WhatsApp."],
  ["2. Assinatura", "O acesso é concedido mediante assinatura ativa. Os valores e recursos de cada plano são os informados na página de planos no momento da contratação."],
  ["3. Cancelamento", "O cancelamento pode ser solicitado a qualquer momento e produz efeito ao final do ciclo já pago, sem multa."],
  ["4. Uso das informações", "Os dados fornecidos têm caráter informativo e não substituem certidões oficiais nem parecer jurídico ou técnico."],
  ["5. Responsabilidades", "O usuário é responsável pelo uso que faz das informações. Não nos responsabilizamos por decisões de investimento ou operação tomadas com base nas consultas."],
  ["6. Alterações", "Estes termos podem ser atualizados. Mudanças relevantes serão comunicadas pelo WhatsApp ou e-mail cadastrado."],
];
</script>

<template>
  <PageHero kicker="Legal" title="Termos de Uso" description="Condições que regem a contratação e o uso da plataforma Meu Garimpo." />
  <section class="mx-auto max-w-3xl space-y-6 px-5 pb-20">
    <article v-for="[t, d] in blocks" :key="t" class="rounded-xl border border-border bg-card p-6 shadow-soft">
      <h2 class="font-display text-lg font-bold">{{ t }}</h2>
      <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ d }}</p>
    </article>
  </section>
</template>
