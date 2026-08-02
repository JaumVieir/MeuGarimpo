<script setup lang="ts">
import Logo from "@/components/shared/Logo.vue";

const quick = [
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/recursos", label: "O que você recebe" },
  { to: "/publico", label: "Para quem é" },
  { to: "/planos", label: "Planos" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
] as const;

const year = new Date().getFullYear();
</script>

<template>
  <footer class="grain bg-gradient-earth text-cream">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <Logo tone="light" />
        <p class="mt-4 max-w-sm text-sm leading-relaxed opacity-70">
          Consulta e monitoramento de áreas minerárias do Brasil, entregues no seu WhatsApp.
        </p>
        <NuxtLink
          to="/planos"
          class="mt-6 inline-flex rounded-full bg-whats px-6 py-3 font-display text-sm font-bold text-earth transition-transform hover:-translate-y-0.5"
        >
          Ver planos e assinar
        </NuxtLink>
      </div>

      <div>
        <p class="font-display text-sm font-bold">Links rápidos</p>
        <ul class="mt-4 space-y-2.5 text-sm opacity-70">
          <li v-for="q in quick" :key="q.to">
            <NuxtLink :to="q.to" class="hover:text-gold-glow">{{ q.label }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <p class="font-display text-sm font-bold">Legal</p>
        <ul class="mt-4 space-y-2.5 text-sm opacity-70">
          <li>
            <NuxtLink to="/termos" class="hover:text-gold-glow">Termos de Uso</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacidade" class="hover:text-gold-glow">Política de Privacidade</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-cream/10 py-6 text-center text-xs opacity-60">
      © {{ year }} Meu Garimpo. Todos os direitos reservados.
    </div>
  </footer>
</template>
