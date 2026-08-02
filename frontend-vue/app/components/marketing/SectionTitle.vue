<script setup lang="ts">
defineProps<{ kicker: string; title: string }>();
</script>

<template>
  <div class="max-w-2xl">
    <p class="font-display text-xs font-bold tracking-[0.2em] text-gold uppercase">{{ kicker }}</p>
    <h2 class="mt-3 font-display text-3xl leading-tight font-extrabold text-balance-tight md:text-4xl">
      {{ title }}
    </h2>
  </div>
</template>
