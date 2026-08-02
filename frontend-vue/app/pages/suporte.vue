<script setup lang="ts">
import { computed, ref } from "vue";
import Logo from "@/components/shared/Logo.vue";

definePageMeta({ layout: false });

useHead({
  title: "Painel do dono — Meu Garimpo",
  meta: [
    { name: "description", content: "Área interna de gestão de assinaturas, cadastros e atendimento do Meu Garimpo." },
    { property: "og:title", content: "Painel do dono — Meu Garimpo" },
    { property: "og:description", content: "Gestão de assinaturas, registro e suporte." },
    { name: "robots", content: "noindex" },
  ],
});

type Cliente = { nome: string; plano: string; status: string; contato: string; venc: string };
type Conversa = { nome: string; tag: string; hora: string; previa: string; nao: number };
type Tab = "assinaturas" | "registro" | "suporte";

const clientes: Cliente[] = [
  { nome: "Joel Ribeiro", plano: "Full", status: "ativo", contato: "(93) 98123-4567", venc: "14/08/2026" },
  { nome: "Marta Souza", plano: "Básico", status: "ativo", contato: "(91) 99777-1122", venc: "02/08/2026" },
  { nome: "Cleber Andrade", plano: "Full", status: "vencido", contato: "(94) 98444-9090", venc: "28/06/2026" },
  { nome: "Ana Paula Lima", plano: "Básico", status: "bloqueado", contato: "ana@escritorio.com", venc: "10/05/2026" },
];

const conversas: Conversa[] = [
  { nome: "Joel Ribeiro", tag: "Full", hora: "14:22", previa: "Você: mandei o KML atualizado", nao: 0 },
  { nome: "(96) 98111-2233", tag: "visitante", hora: "13:04", previa: "Vocês atendem no Amapá?", nao: 2 },
  { nome: "Marta Souza", tag: "Básico", hora: "11:47", previa: "Consegui, obrigada!", nao: 0 },
];

function iniciais(n: string) {
  return (
    n
      .replace(/[^A-Za-zÀ-ú ]/g, "")
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((p) => p[0] ?? "")
      .join("")
      .toUpperCase() || "MG"
  );
}

const statusTone: Record<string, string> = {
  ativo: "bg-whats/15 text-earth",
  vencido: "bg-gold/20 text-earth",
  bloqueado: "bg-destructive/15 text-destructive",
};

const logged = ref(false);
const senha = ref("");
const erro = ref("");
const tab = ref<Tab>("assinaturas");
const conversa = ref<number | null>(null);
const conversaAtual = computed(() => (conversa.value === null ? null : conversas[conversa.value]));

function entrar() {
  if (!senha.value) {
    erro.value = "Informe a senha.";
    return;
  }
  erro.value = "";
  logged.value = true;
}

const tabs: [Tab, string][] = [
  ["assinaturas", "Assinaturas"],
  ["registro", "Registro"],
  ["suporte", "Suporte"],
];
</script>

<template>
  <div v-if="!logged" class="grid min-h-screen place-items-center bg-background px-5">
    <form @submit.prevent="entrar" class="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-soft">
      <Logo />
      <h1 class="mt-6 font-display text-xl font-extrabold">Painel do Dono</h1>
      <input
        v-model="senha"
        type="password"
        placeholder="Senha"
        class="mt-4 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold"
      />
      <p v-if="erro" class="mt-2 text-xs font-medium text-destructive">{{ erro }}</p>
      <button class="mt-4 w-full rounded-xl bg-earth py-3 font-display text-sm font-bold text-cream">Entrar</button>
    </form>
  </div>

  <div v-else class="min-h-screen bg-background">
    <header class="grain flex flex-wrap items-center justify-between gap-4 bg-gradient-earth px-5 py-4 text-cream">
      <Logo tone="light" />
      <div class="flex gap-2">
        <button
          v-for="[k, l] in tabs"
          :key="k"
          @click="tab = k"
          :class="[
            'rounded-full px-4 py-2 text-sm font-semibold',
            tab === k ? 'bg-gradient-gold text-primary-foreground' : 'bg-cream/10 text-cream',
          ]"
        >
          {{ l }}
        </button>
      </div>
      <button
        @click="logged = false"
        class="rounded-full border border-cream/25 px-4 py-2 text-sm font-medium hover:bg-cream/10"
      >
        Sair
      </button>
    </header>

    <main class="mx-auto max-w-6xl px-5 py-8">
      <template v-if="tab === 'assinaturas'">
        <div class="grain rounded-xl bg-gradient-earth px-7 py-8 text-cream shadow-soft">
          <p class="text-xs tracking-[0.18em] uppercase opacity-60">Receita recorrente</p>
          <p class="mt-2 font-display text-4xl font-extrabold text-gold-glow">R$ 319,60</p>
          <div class="mt-6 grid gap-4 text-sm sm:grid-cols-3">
            <p class="opacity-70">2 × Básico — R$ 119,80</p>
            <p class="opacity-70">2 × Full — R$ 199,80</p>
            <p class="opacity-70">2 ativas de 4 no total</p>
          </div>
        </div>

        <ul class="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          <li v-for="c in clientes" :key="c.nome" class="flex flex-wrap items-center gap-4 px-5 py-4">
            <span class="grid size-10 place-items-center rounded-full bg-secondary font-display text-xs font-bold">
              {{ iniciais(c.nome) }}
            </span>
            <div class="min-w-40 flex-1">
              <p class="flex flex-wrap items-center gap-2 text-sm font-semibold">
                {{ c.nome }}
                <span class="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-bold">{{ c.plano }}</span>
                <span :class="`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${statusTone[c.status]}`">
                  {{ c.status }}
                </span>
              </p>
              <p class="text-xs text-muted-foreground">{{ c.contato }}</p>
            </div>
            <p class="text-xs text-muted-foreground">Vence {{ c.venc }}</p>
          </li>
        </ul>
      </template>

      <template v-else-if="tab === 'registro'">
        <form class="grid gap-3 rounded-lg border border-border bg-card p-5 shadow-soft sm:grid-cols-4">
          <input placeholder="WhatsApp" class="rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold" />
          <input placeholder="Nome (opcional)" class="rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold" />
          <select class="rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold">
            <option>Full</option>
            <option>Básico</option>
          </select>
          <input :value="30" type="number" class="rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold" />
          <button
            type="button"
            class="rounded-xl bg-gradient-gold px-6 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold sm:col-span-1"
          >
            Adicionar número
          </button>
        </form>

        <ul class="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          <li v-for="c in clientes" :key="c.nome" class="flex flex-wrap items-center gap-4 px-5 py-4">
            <span class="grid size-10 place-items-center rounded-full bg-secondary font-display text-xs font-bold">
              {{ iniciais(c.nome) }}
            </span>
            <div class="min-w-40 flex-1">
              <p class="flex flex-wrap items-center gap-2 text-sm font-semibold">
                {{ c.nome }}
                <span class="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-bold">{{ c.plano }}</span>
                <span :class="`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${statusTone[c.status]}`">
                  {{ c.status }}
                </span>
              </p>
              <p class="text-xs text-muted-foreground">{{ c.contato }}</p>
            </div>
            <p class="text-xs text-muted-foreground">Vence {{ c.venc }}</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="a in ['Ver', 'Renovar', 'Senha', 'Bloquear']"
                :key="a"
                class="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
              >
                {{ a }}
              </button>
            </div>
          </li>
        </ul>
      </template>

      <div v-else class="grid gap-4 lg:grid-cols-[320px_1fr]">
        <ul class="space-y-2">
          <li v-for="(c, i) in conversas" :key="c.nome">
            <button
              @click="conversa = i"
              :class="[
                'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                conversa === i ? 'border-gold bg-gold/10' : 'border-border bg-card',
              ]"
            >
              <span class="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-display text-xs font-bold">
                {{ iniciais(c.nome) }}
              </span>
              <span class="min-w-0 flex-1">
                <span class="flex items-baseline justify-between gap-2">
                  <span class="truncate text-sm font-semibold">{{ c.nome }}</span>
                  <span class="text-xs text-muted-foreground">{{ c.hora }}</span>
                </span>
                <span class="block truncate text-xs text-muted-foreground">{{ c.previa }}</span>
                <span class="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold">
                  {{ c.tag }}
                </span>
              </span>
              <span
                v-if="c.nao > 0"
                class="grid size-5 place-items-center rounded-full bg-destructive text-[0.65rem] font-bold text-destructive-foreground"
              >
                {{ c.nao }}
              </span>
            </button>
          </li>
        </ul>

        <div class="flex min-h-[26rem] flex-col rounded-lg border border-border bg-card">
          <p v-if="!conversaAtual" class="m-auto text-sm text-muted-foreground">
            Selecione uma conversa à esquerda
          </p>
          <template v-else>
            <div class="border-b border-border px-5 py-3">
              <p class="font-display text-sm font-bold">{{ conversaAtual.nome }}</p>
              <p class="text-xs text-muted-foreground">{{ conversaAtual.tag }}</p>
            </div>
            <div class="flex-1 space-y-3 overflow-y-auto p-5">
              <p class="max-w-[75%] rounded-lg bg-secondary px-4 py-2.5 text-sm">
                {{ conversaAtual.previa }}
              </p>
              <p class="ml-auto max-w-[75%] rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-medium text-primary-foreground">
                Claro, posso te ajudar com isso.
              </p>
            </div>
            <div class="flex gap-2 border-t border-border p-3">
              <input
                placeholder="Escreva uma resposta..."
                class="flex-1 rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <button class="rounded-xl bg-earth px-5 py-3 text-sm font-semibold text-cream">Enviar</button>
            </div>
          </template>
        </div>
      </div>
    </main>
  </div>
</template>
