import type { Contract } from "./contract";

export type TemplateSection = "service" | "payment" | "itemContract";

export type ContractTemplate = {
  id: string;
  label: string;
  description: string;
  /** Seções do formulário que este template exibe (contractor/hired sempre aparecem). */
  sections: TemplateSection[];
  /** Gera o texto completo do contrato a partir dos dados preenchidos. */
  generateText: (data: Contract) => string;
};
