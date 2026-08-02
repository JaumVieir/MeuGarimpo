<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useMutation } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import Modal from "@/components/marketing/Modal.vue";
import { cadastroSchema, type CadastroFormValeus } from "@/features/auth/schema/cadastroSchema";
import { usuarioService } from "@/features/auth/api/usuarios";
import { plans, type PlanKey } from "@/components/marketing/plans";
import { fieldClass as field, labelClass as label } from "@/components/marketing/formStyles";
import { useAuthStore } from "@/stores/auth";

const props = defineProps<{ open: boolean; plan: PlanKey }>();
const emit = defineEmits<{ close: [] }>();

const authStore = useAuthStore();
const router = useRouter();

const { defineField, handleSubmit, errors } = useForm<CadastroFormValeus>({
  validationSchema: toTypedSchema(cadastroSchema),
});

const [nome, nomeAttrs] = defineField("nome");
const [telefone, telefoneAttrs] = defineField("telefone");
const [email, emailAttrs] = defineField("email");
const [senha, senhaAttrs] = defineField("senha");

const cadastroMutation = useMutation({
  mutationFn: (values: CadastroFormValeus) =>
    usuarioService.cadastro({
      nome: values.nome,
      telefone: values.telefone,
      email: values.email,
      senha: values.senha,
      plano: props.plan,
      status: "pendente",
    }),
  onSuccess: async (data, values) => {
    emit("close");
    try {
      await authStore.login({ email: values.email, senha: values.senha });
      toast.success(`Bem-vindo(a), ${data.nome}!`, {
        description: "Cadastro realizado. Enviamos os próximos passos para o seu WhatsApp.",
      });
      router.push("/nova-consulta");
    } catch {
      toast.success(`Cadastro realizado, ${data.nome}!`, {
        description: "Enviamos os próximos passos para o seu WhatsApp. Faça login para acessar o painel.",
      });
    }
  },
  onError: (error: Error) => {
    toast.error("Não foi possível concluir o cadastro", {
      description: error.message,
    });
  },
});

const onSubmit = handleSubmit((values) => cadastroMutation.mutate(values));
</script>

<template>
  <Modal :open="open" wide @close="emit('close')">
    <div class="p-8">
      <h3 class="font-display text-2xl font-extrabold">Assinar plano {{ plans[plan].name }}</h3>
      <p class="mt-1 text-sm text-muted-foreground">
        R$
        {{
          plans[plan].monthly.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        }}
        /mês
      </p>

      <form class="mt-6 space-y-4" @submit="onSubmit">
        <div>
          <span :class="label">Nome completo</span>
          <input v-model="nome" v-bind="nomeAttrs" :class="field" placeholder="Seu nome" />
          <p v-if="errors.nome" class="mt-1.5 text-xs font-medium text-destructive">{{ errors.nome }}</p>
        </div>

        <div>
          <span :class="label">WhatsApp</span>
          <input v-model="telefone" v-bind="telefoneAttrs" :class="field" placeholder="(00) 00000-0000" />
          <p v-if="errors.telefone" class="mt-1.5 text-xs font-medium text-destructive">{{ errors.telefone }}</p>
        </div>

        <div>
          <span :class="label">E-mail</span>
          <input v-model="email" v-bind="emailAttrs" type="email" :class="field" placeholder="voce@email.com" />
          <p v-if="errors.email" class="mt-1.5 text-xs font-medium text-destructive">{{ errors.email }}</p>
        </div>

        <div>
          <span :class="label">Senha</span>
          <input
            v-model="senha"
            v-bind="senhaAttrs"
            type="password"
            :class="field"
            placeholder="Mínimo 8 caracteres"
          />
          <p v-if="errors.senha" class="mt-1.5 text-xs font-medium text-destructive">{{ errors.senha }}</p>
        </div>

        <button
          :disabled="cadastroMutation.isPending.value"
          class="mt-2 w-full rounded-full bg-gradient-gold py-3.5 font-display text-sm font-bold text-primary-foreground disabled:opacity-70"
        >
          {{ cadastroMutation.isPending.value ? "Enviando..." : "Cadastrar" }}
        </button>
      </form>
    </div>
  </Modal>
</template>
