<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    className?: string;
  }>(),
  { className: "" },
);
</script>

<template>
  <section :class="`overflow-hidden rounded-xl border border-border/80 bg-card shadow-soft ${className}`">
    <header
      v-if="title || $slots.right"
      class="flex items-center justify-between gap-3 border-b border-border/70 bg-secondary/60 px-5 py-3.5"
    >
      <div class="min-w-0">
        <h2 v-if="title" class="truncate font-display text-sm font-bold">{{ title }}</h2>
        <p v-if="subtitle" class="truncate text-xs text-muted-foreground">{{ subtitle }}</p>
      </div>
      <slot name="right" />
    </header>
    <div class="p-5">
      <slot />
    </div>
  </section>
</template>
