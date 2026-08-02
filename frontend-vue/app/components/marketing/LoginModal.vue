<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import Modal from "@/components/marketing/Modal.vue";
import { loginSchema, type LoginFormValeus } from "@/features/auth/schema/loginSchema";
import { useAuthStore } from "@/stores/auth";
import { fieldClass as field, labelClass as label } from "@/components/marketing/formStyles";

defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: []; recover: [] }>();

const authStore = useAuthStore();
const router = useRouter();

const { defineField, handleSubmit, errors, isSubmitting } = useForm<LoginFormValeus>({
  validationSchema: toTypedSchema(loginSchema),
});

const [email, emailAttrs] = defineField("email");
const [senha, senhaAttrs] = defineField("senha");

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values);
    emit("close");
    await router.push("/nova-consulta");
  } catch (err) {
    toast.error("Não foi possível entrar", {
      description: err instanceof Error ? err.message : undefined,
    });
  }
});
</script>

<template>
  <Modal :open="open" @close="emit('close')">
    <form class="p-8" @submit="onSubmit">
      <h3 class="font-display text-2xl font-extrabold">Entrar na plataforma</h3>
      <p class="mt-1 text-sm text-muted-foreground">Acesse o painel da sua assinatura.</p>

      <div class="mt-6 space-y-4">
        <div>
          <span :class="label">E-mail</span>
          <input v-model="email" v-bind="emailAttrs" :class="field" placeholder="voce@email.com" />
          <p v-if="errors.email" class="mt-1.5 text-xs font-medium text-destructive">{{ errors.email }}</p>
        </div>
        <div>
          <span :class="label">Senha</span>
          <input v-model="senha" v-bind="senhaAttrs" type="password" :class="field" placeholder="••••••" />
          <p v-if="errors.senha" class="mt-1.5 text-xs font-medium text-destructive">{{ errors.senha }}</p>
        </div>
      </div>

      <button
        type="button"
        @click="emit('recover')"
        class="mt-3 text-xs font-semibold text-gold hover:underline"
      >
        Esqueci minha senha
      </button>

      <button
        :disabled="isSubmitting"
        class="mt-6 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground disabled:opacity-70"
      >
        {{ isSubmitting ? "Entrando..." : "Entrar na plataforma" }}
      </button>
    </form>
  </Modal>
</template>
