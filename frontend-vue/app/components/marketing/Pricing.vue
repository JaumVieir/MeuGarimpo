<script setup lang="ts">
import { ref } from "vue";
import SectionTitle from "@/components/marketing/SectionTitle.vue";
import { plans, type PlanKey } from "@/components/marketing/plans";

const emit = defineEmits<{ subscribe: [plan: PlanKey] }>();

const anual = ref(false);

function price(v: number) {
  const value = anual.value ? v * 0.8 : v;
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
</script>

<template>
  <section id="planos" class="mx-auto max-w-6xl scroll-mt-28 px-5 py-20">
    <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <SectionTitle kicker="Planos" title="Escolha o tamanho do seu garimpo" />
      <div class="inline-flex rounded-full border border-border bg-card p-1">
        <button
          v-for="o in [{ k: false, l: 'Mensal' }, { k: true, l: 'Anual −20%' }]"
          :key="o.l"
          @click="anual = o.k"
          :class="[
            'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
            anual === o.k ? 'bg-gradient-gold text-primary-foreground' : 'text-muted-foreground',
          ]"
        >
          {{ o.l }}
        </button>
      </div>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-2">
      <article class="rounded-xl border border-border bg-card p-8 shadow-soft">
        <h3 class="font-display text-2xl font-extrabold">{{ plans.basico.name }}</h3>
        <p class="mt-4 font-display text-4xl font-extrabold">
          R$ {{ price(plans.basico.monthly) }}
          <span class="text-base font-semibold text-muted-foreground">/mês</span>
        </p>
        <ul class="mt-6 space-y-3 text-sm">
          <li v-for="f in plans.basico.features" :key="f" class="flex gap-2.5">
            <svg viewBox="0 0 24 24" class="mt-0.5 size-4 shrink-0 text-whats" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="m5 12 5 5L19 7" />
            </svg>
            {{ f }}
          </li>
        </ul>
        <button
          @click="emit('subscribe', 'basico')"
          class="mt-8 w-full rounded-full border border-earth px-6 py-3.5 font-display text-sm font-bold text-earth transition-colors hover:bg-earth hover:text-cream"
        >
          Assinar Plano Básico
        </button>
      </article>

      <article class="grain relative rounded-xl border-2 border-gold bg-gradient-earth p-8 text-cream shadow-gold">
        <span class="absolute -top-3 left-8 rounded-full bg-gradient-gold px-4 py-1 font-display text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
          Melhor custo-benefício
        </span>
        <h3 class="font-display text-2xl font-extrabold">{{ plans.full.name }}</h3>
        <p class="mt-4 font-display text-4xl font-extrabold">
          R$ {{ price(plans.full.monthly) }}
          <span class="text-base font-semibold opacity-60">/mês</span>
        </p>
        <p class="mt-2 text-sm opacity-70">Tudo do Básico, mais:</p>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="f in plans.full.features" :key="f" class="flex gap-2.5">
            <svg viewBox="0 0 24 24" class="mt-0.5 size-4 shrink-0 text-whats" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="m5 12 5 5L19 7" />
            </svg>
            {{ f }}
          </li>
        </ul>
        <button
          @click="emit('subscribe', 'full')"
          class="mt-8 w-full rounded-full bg-gradient-gold px-6 py-3.5 font-display text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Assinar Plano Full
        </button>
      </article>
    </div>
  </section>
</template>
