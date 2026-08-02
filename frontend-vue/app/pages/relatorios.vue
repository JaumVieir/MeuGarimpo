<script setup lang="ts">
definePageMeta({ layout: "dashboard" });

useHead({
  title: "Meus relatórios — Meu Garimpo",
  meta: [
    { name: "description", content: "Histórico de áreas consultadas e relatórios gerados na sua conta." },
    { property: "og:title", content: "Meus relatórios — Meu Garimpo" },
    { property: "og:description", content: "Todas as áreas que você já consultou." },
    { name: "robots", content: "noindex" },
  ],
});

const relatorios = [
  { lat: "-6.08210", lon: "-56.33900", local: "Itaituba / PA", data: "12/07/2026 14:22", status: "Atenção média" },
  { lat: "-5.91140", lon: "-56.12070", local: "Jacareacanga / PA", data: "09/07/2026 08:41", status: "Regular" },
  { lat: "-9.90000", lon: "-63.00000", local: "Ariquemes / RO", data: "02/07/2026 17:05", status: "Regular" },
];
</script>

<template>
  <div class="flex flex-wrap items-end justify-between gap-3">
    <div>
      <h1 class="font-display text-3xl font-extrabold md:text-4xl">Meus relatórios</h1>
      <p class="mt-2 text-muted-foreground">Áreas já consultadas na sua conta — abra novamente quando precisar.</p>
    </div>
    <NuxtLink
      to="/nova-consulta"
      class="rounded-full bg-gradient-gold px-5 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold"
    >
      Nova consulta
    </NuxtLink>
  </div>

  <ul class="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="r in relatorios"
      :key="r.data"
      class="group overflow-hidden rounded-xl border border-border/80 bg-card shadow-soft transition-transform hover:-translate-y-0.5"
    >
      <div class="grain bg-gradient-earth px-5 py-4 text-cream">
        <p class="font-display text-sm font-bold">{{ r.local }}</p>
        <p class="font-mono text-xs text-gold/85">{{ r.lat }}, {{ r.lon }}</p>
      </div>
      <div class="space-y-3 p-5">
        <div class="flex items-center justify-between gap-3">
          <span class="text-xs text-muted-foreground">{{ r.data }}</span>
          <span class="rounded-full border border-gold/35 bg-gold/10 px-2.5 py-0.5 text-[11px] font-bold">
            {{ r.status }}
          </span>
        </div>
        <NuxtLink
          to="/relatorio"
          class="block rounded-xl border border-border bg-secondary/50 py-2.5 text-center text-xs font-semibold hover:bg-secondary"
        >
          Abrir relatório
        </NuxtLink>
      </div>
    </li>
  </ul>

  <p class="pt-6 text-xs text-muted-foreground">
    O histórico fica salvo neste navegador. Os relatórios continuam disponíveis pelo link.
  </p>
</template>
