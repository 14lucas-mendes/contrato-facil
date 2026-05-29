import type { Contract } from "./contract";

export type Draft = {
    id: string;
    name: string;
    templateId: string;
    dados: Contract;
    atualizadoEm: string;
}