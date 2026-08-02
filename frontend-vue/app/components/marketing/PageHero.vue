<script setup lang="ts">
defineProps<{ kicker: string; title: string; description: string }>();
</script>

<template>
  <section class="relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 -right-32 size-[32rem] rounded-full bg-gradient-gold opacity-20 blur-3xl"
    />
    <div class="mx-auto max-w-6xl px-5">
      <p class="font-display text-xs font-bold tracking-[0.2em] text-gold uppercase">{{ kicker }}</p>
      <h1 class="mt-3 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold text-balance-tight md:text-5xl">
        {{ title }}
      </h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{{ description }}</p>
    </div>
  </section>
</template>
