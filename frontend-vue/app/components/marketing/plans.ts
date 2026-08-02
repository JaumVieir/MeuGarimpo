export const plans = {
  basico: {
    name: "Básico",
    monthly: 59.9,
    features: [
      "Dados ANM",
      "Título minerário",
      "Substância mineral",
      "Poligonal e limites",
      "Fase do processo",
      "CPF/CNPJ do titular",
    ],
  },
  full: {
    name: "Full",
    monthly: 99.9,
    features: [
      "Monitoramento contínuo",
      "Alertas no WhatsApp",
      "Garimpo Scan — relatório mensal em PDF",
      "Área de Queimadas",
    ],
  },
} as const;

export type PlanKey = keyof typeof plans;
