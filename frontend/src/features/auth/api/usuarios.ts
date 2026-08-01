import { apiClient } from '@/features/auth/api/client';

export interface CadastroUsuario{
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    plano: string;
    status: string;
}

export interface UsuarioCriado{
    id: number;
    nome: string;
    email: string;
}

export const usuarioService = {
    cadastro: (dto: CadastroUsuario) =>
        apiClient.post<UsuarioCriado>("/api/usuarios", dto),
}