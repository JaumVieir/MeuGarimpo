<script setup lang="ts">
withDefaults(defineProps<{ tone?: "dark" | "light" }>(), { tone: "dark" });
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2.5">
    <span class="grid size-9 place-items-center rounded-xl bg-gradient-gold shadow-gold">
      <span class="block size-3.5 rotate-45 rounded-[3px] bg-earth" />
    </span>
    <span
      :class="[
        'font-display text-lg font-extrabold tracking-tight',
        tone === 'light' ? 'text-cream' : 'text-earth',
      ]"
    >
      Meu Garimpo
    </span>
  </NuxtLink>
</template>
