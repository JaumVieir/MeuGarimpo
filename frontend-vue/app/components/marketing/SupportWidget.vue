<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

type Msg = { from: "visitor" | "support"; text: string };

const open = ref(false);
const greet = ref(false);
const msgs = ref<Msg[]>([]);
const draft = ref("");
const nome = ref("");
const zap = ref("");

let greetTimer: ReturnType<typeof setTimeout>;
onMounted(() => {
  greetTimer = setTimeout(() => (greet.value = true), 3200);
});
onUnmounted(() => clearTimeout(greetTimer));

function send() {
  if (!draft.value.trim()) return;
  msgs.value.push({ from: "visitor", text: draft.value.trim() });
  draft.value = "";
  setTimeout(() => {
    msgs.value.push({ from: "support", text: "Recebemos sua mensagem! Já te respondemos por aqui." });
  }, 800);
}
</script>

<template>
  <div class="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
    <div v-if="open" class="w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <div class="grain flex items-center gap-3 bg-gradient-earth px-4 py-3 text-cream">
        <span class="grid size-9 place-items-center rounded-full bg-gradient-gold font-display text-xs font-bold text-primary-foreground">
          MG
        </span>
        <div class="flex-1">
          <p class="font-display text-sm font-bold">Suporte Meu Garimpo</p>
          <p class="flex items-center gap-1.5 text-xs opacity-70">
            <span class="size-1.5 rounded-full bg-whats" /> online · responde rápido
          </p>
        </div>
        <button aria-label="Fechar chat" @click="open = false" class="text-lg opacity-70">×</button>
      </div>

      <form v-if="msgs.length === 0" @submit.prevent="send" class="space-y-3 p-4">
        <input
          v-model="nome"
          placeholder="Seu nome (opcional)"
          class="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
        <input
          v-model="zap"
          placeholder="WhatsApp com DDD (opcional)"
          class="w-full rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
        <textarea
          v-model="draft"
          rows="3"
          placeholder="Escreva sua mensagem..."
          class="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
        <button class="w-full rounded-xl bg-gradient-gold py-3 font-display text-sm font-bold text-primary-foreground shadow-gold">
          Enviar mensagem
        </button>
      </form>
      <template v-else>
        <div class="max-h-72 space-y-2 overflow-y-auto p-4">
          <p
            v-for="(m, i) in msgs"
            :key="i"
            :class="[
              'max-w-[80%] rounded-lg px-3.5 py-2 text-sm',
              m.from === 'visitor' ? 'ml-auto bg-gradient-gold font-medium text-primary-foreground' : 'bg-secondary',
            ]"
          >
            {{ m.text }}
          </p>
        </div>
        <form @submit.prevent="send" class="flex gap-2 border-t border-border p-3">
          <input
            v-model="draft"
            placeholder="Mensagem"
            class="flex-1 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
          <button aria-label="Enviar" class="rounded-xl bg-earth px-4 text-sm font-bold text-cream">➤</button>
        </form>
      </template>
    </div>

    <div v-if="greet && !open" class="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium shadow-soft">
      Precisa de ajuda? Fala com a gente
      <button aria-label="Fechar aviso" @click="greet = false" class="opacity-50">×</button>
    </div>

    <button
      aria-label="Abrir suporte"
      @click="
        open = !open;
        greet = false;
      "
      class="grid size-14 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" class="size-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l2-4.6a8.4 8.4 0 0 1-1-4A8.38 8.38 0 0 1 12.5 4 8.38 8.38 0 0 1 21 11.5z" />
      </svg>
    </button>
  </div>
</template>
