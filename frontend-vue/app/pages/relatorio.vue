<script setup lang="ts">
import { ref, computed } from "vue";
import AreaMap, { type MapLayers } from "@/features/area-query/components/AreaMap.vue";

definePageMeta({ layout: "dashboard" });

useHead({
  title: "Relatório da área — Meu Garimpo",
  meta: [
    {
      name: "description",
      content: "Dados de mineração, terra indígena, embargo IBAMA, desmatamento e chuva do ponto consultado.",
    },
    { property: "og:title", content: "Relatório da área — Meu Garimpo" },
    { property: "og:description", content: "Ficha completa da área consultada com camadas oficiais." },
    { name: "robots", content: "noindex" },
  ],
});

const ficha = [
  ["Processo", "850.123/2019"],
  ["Situação / fase", "Autorização de pesquisa"],
  ["Titular", "Cooperativa Rio Novo"],
  ["Substância", "Ouro"],
  ["Área", "982,4 ha"],
  ["UF", "PA"],
  ["Último evento", "Relatório final aprovado — 03/2026"],
];

const chuva = [
  ["Hoje", "Pancadas à tarde · 12 mm"],
  ["Amanhã", "Parcialmente nublado · 3 mm"],
  ["Quinta", "Sol com nuvens · 0 mm"],
];

const timeline = [
  ["03/2026", "Relatório final de pesquisa aprovado"],
  ["11/2025", "Alerta DETER de 14,2 ha a 1,1 km do limite"],
  ["07/2024", "Renovação de licença ambiental estadual"],
  ["02/2019", "Requerimento de pesquisa protocolado na ANM"],
];

const camadas: { key: keyof MapLayers; label: string; dot: string }[] = [
  { key: "poligonal", label: "Poligonal ANM", dot: "bg-gold" },
  { key: "deter", label: "Alertas DETER", dot: "bg-orange-500" },
  { key: "ibama", label: "Embargos IBAMA", dot: "bg-destructive" },
  { key: "indigena", label: "Terra Indígena", dot: "bg-whats" },
];

const ponto = ref<[number, number]>([-6.0821, -56.339]);
const layers = ref<MapLayers>({ poligonal: true, deter: true, ibama: true, indigena: true });

const coords = computed(() => `${ponto.value[0].toFixed(4)}, ${ponto.value[1].toFixed(4)}`);
const score = 72;

function toggleLayer(key: keyof MapLayers) {
  layers.value = { ...layers.value, [key]: !layers.value[key] };
}

function copiarCoordenadas() {
  navigator.clipboard?.writeText(coords.value);
}
</script>

<template>
  <section>
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="font-display text-xs font-bold tracking-[0.2em] text-gold uppercase">Relatório da área</p>
        <h1 class="mt-2 font-display text-3xl font-extrabold md:text-4xl">Itaituba/PA · poligonal 850.123/2019</h1>
      </div>
      <div class="flex items-center gap-3">
        <span class="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
          {{ coords }}
        </span>
        <button @click="copiarCoordenadas" class="text-xs font-semibold text-muted-foreground hover:text-foreground">
          Copiar
        </button>
        <NuxtLink to="/relatorios" class="text-xs font-semibold text-gold">Ir para relatórios</NuxtLink>
      </div>
    </div>

    <div class="mt-6 flex min-h-0 flex-col gap-4 lg:h-[700px] lg:flex-row">
      <div class="relative h-[420px] overflow-hidden rounded-xl border border-border/80 bg-earth-soft shadow-soft lg:h-auto lg:flex-1">
        <ClientOnly>
          <AreaMap :center="ponto" :layers="layers" @pick="(a, b) => (ponto = [a, b])" />
          <template #fallback>
            <div class="grid h-full place-items-center text-sm text-cream/70">Carregando mapa…</div>
          </template>
        </ClientOnly>

        <div class="pointer-events-none absolute inset-x-0 top-3 z-[500] flex flex-wrap justify-center gap-2 px-3">
          <span class="pointer-events-auto rounded-full bg-earth/85 px-3 py-1.5 text-[11px] font-medium text-cream">
            Clique no mapa para consultar outro ponto
          </span>
          <button
            v-for="c in camadas"
            :key="c.key"
            @click="toggleLayer(c.key)"
            :class="[
              'pointer-events-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition',
              layers[c.key] ? 'bg-card text-foreground shadow-soft' : 'bg-earth/70 text-cream/60',
            ]"
          >
            <span :class="`h-2 w-2 rounded-full ${c.dot}`" />
            {{ c.label }}
          </button>
        </div>
      </div>

      <aside class="w-full shrink-0 space-y-3 overflow-y-auto rounded-xl border border-border/80 bg-secondary/40 p-4 shadow-soft lg:w-[392px]">
        <div class="rounded-lg border border-border/80 bg-card p-4 shadow-soft">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-muted-foreground">Índice de conformidade</p>
              <p class="font-display text-2xl font-extrabold">{{ score }}/100</p>
            </div>
            <span class="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-earth">Atenção média</span>
          </div>
          <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div class="h-full rounded-full bg-gradient-gold" :style="{ width: `${score}%` }" />
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            1 alerta de desmatamento próximo · 0 embargos no ponto · fora de TI
          </p>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div v-for="[v, l] in [['982,4', 'hectares'], ['1,1 km', 'do alerta'], ['4', 'camadas ok']]" :key="l" class="rounded-xl border border-border/80 bg-card p-3 text-center">
            <p class="font-display text-sm font-bold">{{ v }}</p>
            <p class="text-[11px] text-muted-foreground">{{ l }}</p>
          </div>
        </div>

        <div class="rounded-lg border border-whats/40 bg-whats/10 px-4 py-3 text-sm font-semibold text-earth">
          Fora de Terra Indígena
        </div>

        <section class="rounded-lg border border-border bg-card p-4">
          <div class="flex items-center justify-between gap-3">
            <h2 class="font-display text-sm font-bold">Mineração (ANM/SIGMINE)</h2>
            <span class="rounded-full bg-background/70 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">atualizado hoje</span>
          </div>
          <dl class="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            <div v-for="[k, v] in ficha" :key="k" class="flex justify-between gap-3">
              <dt>{{ k }}</dt>
              <dd class="text-right font-medium text-foreground">{{ v }}</dd>
            </div>
          </dl>
        </section>

        <section class="rounded-lg border border-border bg-secondary/60 p-4">
          <div class="flex items-center justify-between gap-3">
            <h2 class="font-display text-sm font-bold">Embargo IBAMA</h2>
            <span class="rounded-full bg-background/70 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">0 no ponto</span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            Nenhum embargo encontrado para este ponto. Existe 1 área embargada a 2,3 km ao sul.
          </p>
        </section>

        <section class="rounded-lg border border-gold/50 bg-gold/12 p-4">
          <div class="flex items-center justify-between gap-3">
            <h2 class="font-display text-sm font-bold">Desmatamento (DETER)</h2>
            <span class="rounded-full bg-background/70 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">14,2 ha</span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            Alerta de novembro/2025 próximo ao limite da poligonal — verificar em campo.
          </p>
        </section>

        <section class="rounded-lg border border-border bg-secondary/60 p-4">
          <h2 class="font-display text-sm font-bold">Camadas oficiais (INCRA/ICMBio/INPE)</h2>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sem assentamento, unidade de conservação ou auto de infração no ponto.
          </p>
        </section>

        <section class="rounded-lg border border-border bg-card p-4">
          <h2 class="font-display text-sm font-bold">Linha do tempo</h2>
          <ul class="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li v-for="[d, t] in timeline" :key="d" class="flex gap-3">
              <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
              <span><span class="font-medium text-foreground">{{ d }}</span> — {{ t }}</span>
            </li>
          </ul>
        </section>

        <section class="rounded-lg border border-border bg-card p-4">
          <h2 class="font-display text-sm font-bold">Município</h2>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">Itaituba — Pará</p>
        </section>

        <section class="rounded-lg border border-border bg-card p-4">
          <h2 class="font-display text-sm font-bold">Chuva (próximos dias)</h2>
          <ul class="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
            <li v-for="[d, p] in chuva" :key="d" class="flex justify-between gap-3">
              <span>{{ d }}</span>
              <span class="text-right font-medium text-foreground">{{ p }}</span>
            </li>
          </ul>
        </section>

        <div class="flex flex-wrap gap-2 pt-1">
          <button class="flex-1 rounded-xl bg-gradient-gold px-4 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold">
            Baixar PDF
          </button>
          <button class="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold">KMZ</button>
          <button class="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold">KML</button>
        </div>
      </aside>
    </div>
  </section>
</template>
