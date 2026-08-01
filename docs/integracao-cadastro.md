# Ligando o cadastro (frontend ↔ backend)

Contrato atual do backend: `POST /api/usuarios` espera
`{ nome, telefone, email, senha_hash, plano, status }`
(ver `backend/src/routes/usuarios.js`).

## 1. Variável de ambiente do frontend

`frontend/.env`
```
VITE_API_URL=http://localhost:3000
```

E no `backend/.env`, o `FRONTEND_URL` precisa apontar pra URL onde o Vite roda.

## 2. Adapter — cliente HTTP genérico

`frontend/src/features/auth/api/client.ts`
```ts
const BASE_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(res.status, data?.error ?? "Erro inesperado");
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
};
```

## 3. DTO + Service — o contrato com o backend

`frontend/src/features/auth/api/usuarios.ts`
```ts
import { apiClient } from "@/features/auth/api/client";

export interface CadastroUsuario {
  nome: string;
  telefone: string;
  email: string;
  senha: string; // vira "senha_hash" no payload — nome de campo do backend, mas aqui é texto puro
  plano: string;
  status: string;
}

export interface UsuarioCriado {
  id: number;
  nome: string;
  email: string;
}

export const usuarioService = {
  cadastro: (dto: CadastroUsuario) =>
    apiClient.post<UsuarioCriado>("/api/usuarios", dto),
};
```

## 4. Validação — Zod schema

`frontend/src/features/auth/schema/cadastroSchema.ts`
```ts
import { z } from "zod";

export const cadastroSchema = z.object({
  nome: z.string().min(3, "Informe seu nome completo"),
  telefone: z.string().min(10, "Número inválido!"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
});

export type CadastroFormValues = z.infer<typeof cadastroSchema>;
```

## 5. Componente — `useForm` + `useMutation`

Substitui o `onSubmit` vazio do `CheckoutModal` (`frontend/src/components/marketing/Modals.tsx`).

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { cadastroSchema, type CadastroFormValues } from "@/features/auth/schema/cadastroSchema";
import { usuarioService } from "@/features/auth/api/usuarios";

function CheckoutForm({ plan }: { plan: PlanKey }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroFormValues>({ resolver: zodResolver(cadastroSchema) });

  const cadastroMutation = useMutation({
    mutationFn: (values: CadastroFormValues) =>
      usuarioService.cadastro({
        nome: values.nome,
        telefone: values.telefone,
        email: values.email,
        senha: values.senha,
        plano: plan,
        status: "pendente",
      }),
    onSuccess: (usuario) => {
      // redireciona, mostra toast, etc.
    },
  });

  const onSubmit = handleSubmit((values) => cadastroMutation.mutate(values));

  return (
    <form onSubmit={onSubmit}>
      <input {...register("nome")} placeholder="Seu nome" />
      {errors.nome && <p>{errors.nome.message}</p>}

      <input {...register("telefone")} placeholder="(00) 00000-0000" />
      {errors.telefone && <p>{errors.telefone.message}</p>}

      <input {...register("email")} type="email" placeholder="voce@email.com" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("senha")} type="password" placeholder="Mínimo 8 caracteres" />
      {errors.senha && <p>{errors.senha.message}</p>}

      {cadastroMutation.isError && <p>{cadastroMutation.error.message}</p>}

      <button disabled={cadastroMutation.isPending}>
        {cadastroMutation.isPending ? "Enviando..." : "Cadastrar"}
      </button>
    </form>
  );
}
```