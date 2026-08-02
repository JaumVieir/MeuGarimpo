<script setup lang="ts">
import { ref } from "vue";
import PageHero from "@/components/marketing/PageHero.vue";
import { fieldClass as field, labelClass as label } from "@/components/marketing/formStyles";

definePageMeta({ layout: "marketing" });

useHead({
  title: "Contato — Meu Garimpo",
  meta: [
    {
      name: "description",
      content:
        "Fale com o time do Meu Garimpo pelo WhatsApp ou e-mail e tire dúvidas sobre consultas de áreas minerárias.",
    },
    { property: "og:title", content: "Contato — Meu Garimpo" },
    { property: "og:description", content: "Atendimento por WhatsApp e e-mail, de segunda a sexta." },
  ],
});

const canais = [
  ["WhatsApp", "(00) 00000-0000", "Seg a sex, 8h às 18h"],
  ["E-mail", "contato@meugarimpo.com.br", "Resposta em até 1 dia útil"],
  ["Suporte a assinantes", "Direto na conversa", "Prioridade para plano Full"],
];

const sent = ref(false);
</script>

<template>
  <PageHero
    kicker="Contato"
    title="Fale com quem entende de garimpo"
    description="Dúvidas sobre planos, consultas ou monitoramento? Nosso time responde rápido."
  />

  <section class="mx-auto grid max-w-6xl gap-8 px-5 pb-20 lg:grid-cols-[1fr_1.1fr]">
    <div class="space-y-4">
      <div v-for="[t, v, d] in canais" :key="t" class="rounded-xl border border-border bg-card p-6 shadow-soft">
        <p class="font-display text-xs font-bold tracking-[0.2em] text-gold uppercase">{{ t }}</p>
        <p class="mt-2 font-display text-lg font-bold">{{ v }}</p>
        <p class="mt-1 text-sm text-muted-foreground">{{ d }}</p>
      </div>
    </div>

    <form @submit.prevent="sent = true" class="rounded-xl border border-border bg-card p-8 shadow-soft">
      <h2 class="font-display text-2xl font-extrabold">Envie uma mensagem</h2>
      <div class="mt-6 space-y-4">
        <div>
          <span :class="label">Nome</span>
          <input :class="field" placeholder="Seu nome" required />
        </div>
        <div>
          <span :class="label">E-mail</span>
          <input type="email" :class="field" placeholder="voce@email.com" required />
        </div>
        <div>
          <span :class="label">WhatsApp</span>
          <input :class="field" placeholder="(00) 00000-0000" inputmode="numeric" />
        </div>
        <div>
          <span :class="label">Mensagem</span>
          <textarea :class="`${field} min-h-32`" placeholder="Como podemos ajudar?" />
        </div>
      </div>
      <button class="mt-6 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground">
        {{ sent ? "Mensagem enviada!" : "Enviar mensagem" }}
      </button>
      <p v-if="sent" class="mt-3 text-center text-xs text-muted-foreground">
        Recebemos seu contato. Responderemos em breve.
      </p>
    </form>
  </section>
</template>
