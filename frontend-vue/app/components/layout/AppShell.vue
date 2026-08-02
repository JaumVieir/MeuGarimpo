<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside, onKeyStroke } from "@vueuse/core";
import { ChevronDown, LogOut, User, CreditCard } from "@lucide/vue";
import Logo from "@/components/shared/Logo.vue";

const nav = [
  { to: "/nova-consulta", label: "Nova consulta" },
  { to: "/relatorios", label: "Meus relatórios" },
] as const;

const conta = ref(false);
const menuRef = ref<HTMLElement | null>(null);

onClickOutside(menuRef, () => (conta.value = false));
onKeyStroke("Escape", () => (conta.value = false));
</script>

<template>
  <div class="min-h-screen bg-background">
    <div
      v-if="conta"
      aria-hidden="true"
      class="fixed inset-0 z-20 bg-earth/20 backdrop-blur-[2px]"
      @click="conta = false"
    />

    <header class="grain bg-gradient-earth text-cream relative z-30">
      <div class="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 pt-6">
        <div class="flex min-w-0 items-center gap-3">
          <Logo tone="light" />
          <span class="hidden truncate text-sm text-cream/60 sm:block">Olá, Joel</span>
        </div>

        <div class="relative shrink-0" ref="menuRef">
          <button
            @click="conta = !conta"
            aria-haspopup="menu"
            :aria-expanded="conta"
            :class="[
              'flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all',
              conta
                ? 'border-gold/60 bg-cream/15 text-cream'
                : 'border-cream/20 bg-cream/5 text-cream hover:bg-cream/12',
            ]"
          >
            <span class="grid size-6 place-items-center rounded-full bg-cream/10 text-xs text-gold">
              <User :size="14" />
            </span>
            <span class="hidden sm:inline">Minha conta</span>
            <span class="sm:hidden">Conta</span>
            <ChevronDown :size="14" :class="['transition-transform duration-200', conta ? 'rotate-180' : '']" />
          </button>

          <div
            v-if="conta"
            class="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-xl border border-cream/20 bg-cream shadow-xl shadow-earth/20"
          >
            <div class="bg-earth px-4 py-3">
              <div class="flex items-center gap-3">
                <span class="grid size-10 place-items-center rounded-full bg-cream/15 text-gold">
                  <User :size="18" />
                </span>
                <div>
                  <p class="font-display text-sm font-bold text-cream">Joel</p>
                  <p class="text-xs text-cream/70">joel@email.com</p>
                </div>
              </div>
            </div>

            <div class="space-y-3 p-4">
              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-lg bg-earth/5 px-3 py-2">
                  <p class="text-xs text-muted-foreground">Plano</p>
                  <p class="font-display text-sm font-semibold text-earth">Full</p>
                </div>
                <div class="rounded-lg bg-earth/5 px-3 py-2">
                  <p class="text-xs text-muted-foreground">Vencimento</p>
                  <p class="text-sm font-medium text-earth">14/08/2026</p>
                </div>
              </div>

              <div class="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2.5">
                <CreditCard :size="16" class="text-gold" />
                <div class="min-w-0">
                  <p class="text-xs text-muted-foreground">WhatsApp</p>
                  <p class="text-sm font-medium text-foreground">(93) 98123-4567</p>
                </div>
              </div>

              <NuxtLink
                to="/"
                @click="conta = false"
                class="flex items-center justify-center gap-2 rounded-xl bg-earth py-2.5 text-center text-sm font-semibold text-cream transition-colors hover:bg-earth-soft"
              >
                <LogOut :size="16" />
                Sair
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <nav class="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-5">
        <NuxtLink
          v-for="n in nav"
          :key="n.to"
          :to="n.to"
          active-class="bg-cream/15 text-cream ring-1 ring-gold/40"
          class="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
        >
          {{ n.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-5 py-8">
      <slot />
    </main>
  </div>
</template>
