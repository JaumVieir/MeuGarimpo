<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message?: string } }>();

function tryAgain() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <div v-if="props.error.statusCode === 404" class="flex min-h-screen items-center justify-center bg-background px-4">
    <div class="max-w-md text-center">
      <h1 class="text-7xl font-bold text-foreground">404</h1>
      <h2 class="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
      <p class="mt-2 text-sm text-muted-foreground">
        A página que você procura não existe ou foi movida.
      </p>
      <div class="mt-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Voltar ao início
        </NuxtLink>
      </div>
    </div>
  </div>

  <div v-else class="flex min-h-screen items-center justify-center bg-background px-4">
    <div class="max-w-md text-center">
      <h1 class="text-xl font-semibold tracking-tight text-foreground">Esta página não carregou</h1>
      <p class="mt-2 text-sm text-muted-foreground">
        Algo deu errado do nosso lado. Você pode tentar novamente ou voltar ao início.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-2">
        <button
          @click="tryAgain"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Tentar novamente
        </button>
        <a
          href="/"
          class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Início
        </a>
      </div>
    </div>
  </div>
</template>
