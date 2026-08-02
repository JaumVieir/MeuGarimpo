<script setup lang="ts">
import { ref } from "vue";
import PanelCard from "@/components/layout/PanelCard.vue";
import AreaMap, { type MapLayers } from "@/features/area-query/components/AreaMap.vue";

definePageMeta({ layout: "dashboard" });

useHead({
  title: "Nova consulta de área — Meu Garimpo",
  meta: [
    {
      name: "description",
      content: "Clique no mapa ou informe latitude e longitude para gerar o relatório completo da área.",
    },
    { property: "og:title", content: "Nova consulta de área — Meu Garimpo" },
    { property: "og:description", content: "Consulte mineração, terra indígena, IBAMA e desmatamento de qualquer ponto." },
    { name: "robots", content: "noindex" },
  ],
});

const router = useRouter();
const mapHandleRef = ref<InstanceType<typeof AreaMap> | null>(null);
const lat = ref("");
const lon = ref("");
const erro = ref("");
const base = ref<"satelite" | "rua">("rua");
const ponto = ref<[number, number]>([-9.9, -63.0]);
const layers = ref<MapLayers>({ poligonal: true, deter: true, ibama: true, indigena: true });

function gerar() {
  const a = Number(lat.value.replace(",", "."));
  const b = Number(lon.value.replace(",", "."));
  if (!lat.value || !lon.value || Number.isNaN(a) || Number.isNaN(b)) {
    erro.value = "Informe latitude e longitude válidas.";
    return;
  }
  erro.value = "";
  router.push("/relatorio");
}

function onPick(a: number, b: number) {
  ponto.value = [a, b];
  lat.value = a.toFixed(5);
  lon.value = b.toFixed(5);
}

function copiarCoordenadas() {
  navigator.clipboard?.writeText(`${ponto.value[0].toFixed(5)}, ${ponto.value[1].toFixed(5)}`);
}
</script>

<template>
  <h1 class="font-display text-3xl font-extrabold md:text-4xl">Nova consulta</h1>
  <p class="mt-2 max-w-3xl text-muted-foreground">
    Clique em qualquer ponto do mapa abaixo, ou digite a latitude e longitude (pode copiar do
    Google Maps, segurando o dedo no pino e copiando as coordenadas).
  </p>

  <form @submit.prevent="gerar" class="mt-6 max-w-xl rounded-xl border border-border/80 bg-card p-6 shadow-soft">
    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">Latitude</span>
        <input
          v-model="lat"
          placeholder="-9.90000"
          inputmode="decimal"
          class="mt-2 w-full rounded-lg border border-border bg-secondary/50 px-4 py-3.5 text-sm outline-none transition focus:border-gold focus:bg-card focus:ring-4 focus:ring-gold/15"
        />
      </label>
      <label class="block">
        <span class="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">Longitude</span>
        <input
          v-model="lon"
          placeholder="-63.00000"
          inputmode="decimal"
          class="mt-2 w-full rounded-lg border border-border bg-secondary/50 px-4 py-3.5 text-sm outline-none transition focus:border-gold focus:bg-card focus:ring-4 focus:ring-gold/15"
        />
      </label>
    </div>

    <p v-if="erro" class="mt-3 text-xs font-semibold text-destructive">{{ erro }}</p>

    <button class="mt-5 w-full rounded-lg bg-gradient-gold px-6 py-4 font-display text-base font-bold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5">
      Gerar relatório
    </button>
  </form>

  <section class="mt-8 overflow-hidden rounded-xl border border-border/80 bg-card shadow-soft">
    <header class="grain flex flex-wrap items-center justify-between gap-3 bg-gradient-earth px-5 py-3.5 text-cream">
      <p class="font-display text-sm font-bold">
        Meu Garimpo <span class="text-gold">· dados da área</span>
      </p>
      <span class="text-xs text-gold/80">Clique no mapa para consultar</span>
    </header>

    <div class="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div class="relative h-[420px] border-b border-border/70 lg:h-[520px] lg:border-r lg:border-b-0">
        <ClientOnly>
          <AreaMap ref="mapHandleRef" :center="ponto" :layers="layers" :base="base" @pick="onPick" />
          <template #fallback>
            <div class="grid h-full place-items-center text-sm text-muted-foreground">Carregando mapa…</div>
          </template>
        </ClientOnly>

        <div class="pointer-events-none absolute inset-x-0 top-3 z-[500] flex flex-wrap items-start justify-between gap-2 px-3">
          <span class="ml-12 rounded-full bg-earth/85 px-3 py-1.5 text-[11px] font-medium text-cream backdrop-blur">
            Clique no mapa para consultar um ponto
          </span>
          <div class="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              @click="mapHandleRef?.locate()"
              class="rounded-full border border-border/70 bg-card/95 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground shadow-soft backdrop-blur transition hover:text-foreground"
            >
              📍 Minha localização
            </button>
            <div class="flex gap-1 rounded-full border border-border/70 bg-card/95 p-1 shadow-soft backdrop-blur">
              <button
                v-for="[k, l] in [['satelite', 'Satélite'], ['rua', 'Rua']] as const"
                :key="k"
                type="button"
                @click="base = k"
                :class="[
                  'rounded-full px-3 py-1.5 text-[11px] font-semibold transition',
                  base === k ? 'bg-gradient-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                ]"
              >
                {{ l }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-3 bg-secondary/40 p-5">
        <div class="rounded-lg border border-gold/35 bg-gold/10 p-4">
          <p class="flex items-center gap-2 font-display text-sm font-bold">
            <span class="size-2 rounded-full bg-gold" /> Como usar
          </p>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
            Clique em qualquer ponto do mapa para consultar mineração, terra indígena, IBAMA,
            desmatamento, camadas oficiais e previsão de chuva daquele local.
          </p>
        </div>

        <PanelCard title="Ponto selecionado" class-name="shadow-none">
          <p class="font-mono text-sm">{{ ponto[0].toFixed(5) }}, {{ ponto[1].toFixed(5) }}</p>
          <button
            type="button"
            @click="copiarCoordenadas"
            class="mt-3 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold hover:bg-secondary"
          >
            Copiar coordenadas
          </button>
        </PanelCard>
      </aside>
    </div>
  </section>
</template>
