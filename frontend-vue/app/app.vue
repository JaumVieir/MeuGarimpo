<script setup lang="ts">
import { Toaster } from "vue-sonner";
import { useAuthStore } from "@/stores/auth";

useAuthStore().hydrate();
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster position="top-center" rich-colors />
  </div>
</template>
