<script setup lang="ts">
defineProps<{ path: string }>();
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="size-5"
  >
    <path :d="path" />
  </svg>
</template>
