<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "@vueuse/core";
import Logo from "@/components/shared/Logo.vue";

const emit = defineEmits<{ login: [] }>();

const links = [
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/recursos", label: "O que você recebe" },
  { to: "/publico", label: "Para quem é" },
  { to: "/planos", label: "Planos" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
] as const;

const open = ref(false);
const scrolled = ref(false);

useEventListener(
  "scroll",
  () => {
    scrolled.value = window.scrollY > 12;
  },
  { passive: true },
);
</script>

<template>
  <header
    :class="[
      'grain bg-gradient-earth fixed inset-x-0 top-0 z-50 text-cream transition-shadow',
      scrolled ? 'shadow-soft' : '',
    ]"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
      <Logo tone="light" />

      <div class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          active-class="bg-cream/12 text-cream"
          class="rounded-full px-3 py-2 text-sm font-medium text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
        >
          {{ l.label }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="emit('login')"
          class="bg-gradient-gold shadow-gold text-primary-foreground rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
        >
          Entrar
        </button>
        <button
          aria-label="Abrir menu"
          @click="open = !open"
          class="border-cream/25 grid size-10 place-items-center rounded-full border lg:hidden"
        >
          <span class="space-y-1">
            <span class="bg-cream block h-0.5 w-4" />
            <span class="bg-cream block h-0.5 w-4" />
            <span class="bg-cream block h-0.5 w-4" />
          </span>
        </button>
      </div>
    </nav>

    <div v-if="open" class="border-cream/15 border-t px-3 pb-3 lg:hidden">
      <NuxtLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        @click="open = false"
        class="text-cream/80 hover:bg-cream/10 hover:text-cream block rounded-lg px-4 py-3 text-sm font-medium"
      >
        {{ l.label }}
      </NuxtLink>
    </div>
  </header>
</template>
