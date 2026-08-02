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

export interface LoginUsuario{
    email: string;
    senha: string;
}

export interface LoginResposta{
    token: string;
    usuario: UsuarioCriado;
}

export const usuarioService = {
    cadastro: (dto: CadastroUsuario) =>
        apiClient.post<UsuarioCriado>("/api/usuarios", dto),
    login: (dto: LoginUsuario) =>
        apiClient.post<LoginResposta>("/api/usuarios/login", dto),
}
