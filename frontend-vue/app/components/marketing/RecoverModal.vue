<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/marketing/Modal.vue";
import { fieldClass as field, labelClass as label } from "@/components/marketing/formStyles";

defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: [] }>();

const sent = ref(false);

function close() {
  sent.value = false;
  emit("close");
}
</script>

<template>
  <Modal :open="open" @close="close">
    <div class="p-8">
      <template v-if="sent">
        <h3 class="font-display text-2xl font-extrabold">Verifique seu e-mail</h3>
        <p class="mt-2 text-sm text-muted-foreground">
          Se esse e-mail estiver cadastrado, enviamos um link para redefinir a senha.
        </p>
        <button
          @click="close"
          class="mt-6 w-full rounded-full bg-earth py-3.5 font-display text-sm font-bold text-cream"
        >
          Entendi
        </button>
      </template>
      <form v-else @submit.prevent="sent = true">
        <h3 class="font-display text-2xl font-extrabold">Recuperar senha</h3>
        <p class="mt-1 text-sm text-muted-foreground">
          Enviamos um link de redefinição para o seu e-mail.
        </p>
        <div class="mt-6">
          <span :class="label">E-mail</span>
          <input type="email" :class="field" placeholder="voce@email.com" />
        </div>
        <button class="mt-6 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground">
          Enviar link de redefinição
        </button>
      </form>
    </div>
  </Modal>
</template>
