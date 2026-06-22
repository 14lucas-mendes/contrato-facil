import type { ContractTemplate } from "../types/template";
import { freelanceTemplate } from "./freelance";
import { prestacaoDeServicoTemplate } from "./prestacaoDeServico";
import { ndaTemplate } from "./nda";
import { locacaoTemplate } from "./locacao";

/** Todos os templates disponíveis na aplicação. */
export const templates: ContractTemplate[] = [
  freelanceTemplate,
  prestacaoDeServicoTemplate,
  ndaTemplate,
  locacaoTemplate,
];

/** Busca um template pelo id. Retorna o primeiro (freelance) como fallback. */
export function getTemplateById(id: string): ContractTemplate {
  return templates.find((t) => t.id === id) ?? templates[0];
}
