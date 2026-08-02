import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(8, "Senha precisa ter o mínimo 8 caracteres")
});

export type LoginFormValeus = z.infer<typeof loginSchema>;
