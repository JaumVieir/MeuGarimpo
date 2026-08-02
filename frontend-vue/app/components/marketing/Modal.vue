<script setup lang="ts">
withDefaults(defineProps<{ open: boolean; wide?: boolean }>(), { wide: false });
const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-earth/60 backdrop-blur-sm" @click="emit('close')" />
    <div
      :class="[
        'relative w-full max-h-[90vh] overflow-y-auto rounded-xl bg-card shadow-soft',
        wide ? 'max-w-lg' : 'max-w-md',
      ]"
    >
      <button
        @click="emit('close')"
        aria-label="Fechar"
        class="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full bg-secondary text-earth"
      >
        ×
      </button>
      <slot />
    </div>
  </div>
</template>
