<script setup lang="ts">
import PageHero from "@/components/marketing/PageHero.vue";

definePageMeta({ layout: "marketing" });

useHead({
  title: "Política de Privacidade — Meu Garimpo",
  meta: [
    {
      name: "description",
      content: "Como o Meu Garimpo coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
    },
    { property: "og:title", content: "Política de Privacidade — Meu Garimpo" },
    { property: "og:description", content: "Tratamento de dados pessoais conforme a LGPD." },
  ],
});

const blocks = [
  ["Dados que coletamos", "Nome, e-mail, WhatsApp e CPF informados na contratação, além do histórico de consultas realizadas."],
  ["Como usamos", "Para autenticar seu acesso, entregar as consultas solicitadas, emitir cobranças e enviar alertas das áreas monitoradas."],
  ["Pagamentos", "Os pagamentos são processados por parceiros certificados. Não armazenamos dados de cartão em nossos servidores."],
  ["Compartilhamento", "Não vendemos seus dados. Compartilhamos apenas o necessário com processadores de pagamento e provedores de infraestrutura."],
  ["Seus direitos", "Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo nosso canal de contato."],
  ["Retenção", "Mantemos os dados enquanto durar a assinatura e pelo prazo legal exigido após o encerramento."],
];
</script>

<template>
  <PageHero kicker="Legal" title="Política de Privacidade" description="Transparência sobre quais dados tratamos e para quê." />
  <section class="mx-auto max-w-3xl space-y-6 px-5 pb-20">
    <article v-for="[t, d] in blocks" :key="t" class="rounded-xl border border-border bg-card p-6 shadow-soft">
      <h2 class="font-display text-lg font-bold">{{ t }}</h2>
      <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ d }}</p>
    </article>
  </section>
</template>
