import {z} from 'zod';

export const cadastroSchema = z.object({
    nome: z.string().min(3, "Informe seu nome completo"),
    telefone: z.string().min(10, "Numero inválido!"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(8, "Senha precisa ter o mínimo 8 caracteres")
});

export type CadastroFormValeus = z.infer<typeof cadastroSchema>;
