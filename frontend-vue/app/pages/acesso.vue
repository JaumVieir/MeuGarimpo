<script setup lang="ts">
import { ref } from "vue";
import Logo from "@/components/shared/Logo.vue";

definePageMeta({ layout: false });

useHead({
  title: "Criar acesso ao painel — Meu Garimpo",
  meta: [
    {
      name: "description",
      content: "Configure sua senha e libere o acesso ao painel do assinante Meu Garimpo.",
    },
    { property: "og:title", content: "Criar acesso ao painel — Meu Garimpo" },
    { property: "og:description", content: "Defina sua senha de primeiro acesso." },
    { name: "robots", content: "noindex" },
  ],
});

const field =
  "mt-1.5 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-gold";

const email = ref("");
const pass = ref("");
const repeat = ref("");
const error = ref("");
const saving = ref(false);
const done = ref(false);

function submit() {
  if (pass.value.length < 6) {
    error.value = "A senha precisa ter pelo menos 6 caracteres.";
    return;
  }
  if (pass.value !== repeat.value) {
    error.value = "As senhas não coincidem.";
    return;
  }
  error.value = "";
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    done.value = true;
  }, 900);
}
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-background px-5 py-12">
    <div class="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-soft">
      <Logo />

      <div v-if="done" class="mt-8 text-center">
        <span class="mx-auto grid size-12 place-items-center rounded-full bg-whats/15 font-display text-xl font-bold text-whats">
          ✓
        </span>
        <h1 class="mt-4 font-display text-xl font-extrabold">Acesso criado!</h1>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
          Sua senha foi salva. Agora é só entrar no painel.
        </p>
        <NuxtLink
          to="/nova-consulta"
          class="mt-6 inline-flex rounded-full bg-gradient-gold px-6 py-3 font-display text-sm font-bold text-primary-foreground shadow-gold"
        >
          Ir para nova consulta
        </NuxtLink>
      </div>

      <template v-else>
        <h1 class="mt-7 font-display text-2xl font-extrabold">Configure seu acesso</h1>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
          Crie uma senha para entrar no painel do assinante.
        </p>

        <form @submit.prevent="submit" class="mt-6 space-y-4">
          <div>
            <label class="text-xs font-semibold text-muted-foreground">E-mail (opcional)</label>
            <input v-model="email" type="email" placeholder="voce@email.com" :class="field" />
          </div>
          <div>
            <label class="text-xs font-semibold text-muted-foreground">Crie uma senha</label>
            <input v-model="pass" type="password" placeholder="Mínimo 6 caracteres" :class="field" />
          </div>
          <div>
            <label class="text-xs font-semibold text-muted-foreground">Repita a senha</label>
            <input v-model="repeat" type="password" placeholder="Repita a senha" :class="field" />
          </div>

          <p v-if="error" class="rounded-xl bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive">
            {{ error }}
          </p>

          <button
            :disabled="saving"
            class="w-full rounded-xl bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground shadow-gold disabled:opacity-60"
          >
            {{ saving ? "Salvando..." : "Criar meu acesso" }}
          </button>
        </form>
      </template>
    </div>
  </div>
</template>
