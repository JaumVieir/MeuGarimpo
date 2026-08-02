import { defineStore } from "pinia";
import { usuarioService, type LoginUsuario, type UsuarioCriado } from "@/features/auth/api/usuarios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    usuario: null as UsuarioCriado | null,
  }),

  actions: {
    hydrate() {
      if (import.meta.server) return;
      this.token = localStorage.getItem("token");
      const usuario = localStorage.getItem("usuario");
      this.usuario = usuario ? JSON.parse(usuario) : null;
    },

    async login(dto: LoginUsuario) {
      const resposta = await usuarioService.login(dto);
      this.token = resposta.token;
      this.usuario = resposta.usuario;
      localStorage.setItem("token", resposta.token);
      localStorage.setItem("usuario", JSON.stringify(resposta.usuario));
      return resposta;
    },

    logout() {
      this.token = null;
      this.usuario = null;
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    },
  },
});
