export type ContractData = {
  name: string;
  cpf: string;
  email: string;
  address: string;
};

export type PaymentMethod =
  | "pix"
  | "boleto"
  | "transferencia"
  | "cartao de credito";

export type Contract = {
  contractor: ContractData;
  hired: ContractData;
  service: { description: string; startDate: string; period: string };
  payment: {
    method: PaymentMethod;
    installment?: number;
  };
  itemContract: {
    terminationPenalty: number;
    notification: number;
    cityForum: string;
  };
};

/** Erros de validação espelhando a estrutura de Contract.
 *  Cada sub-objeto mapeia nome do campo → mensagem de erro (ou undefined se válido). */
export type ContractErrors = {
  contractor: Partial<Record<keyof ContractData, string>>;
  hired: Partial<Record<keyof ContractData, string>>;
  service: Partial<Record<keyof Contract["service"], string>>;
  payment: Partial<Record<keyof Contract["payment"], string>>;
  itemContract: Partial<Record<keyof Contract["itemContract"], string>>;
};

/** Estado inicial vazio de um contrato. */
export const EMPTY_CONTRACT: Contract = {
  contractor: { name: "", cpf: "", email: "", address: "" },
  hired: { name: "", cpf: "", email: "", address: "" },
  service: { description: "", startDate: "", period: "" },
  payment: { method: "pix" },
  itemContract: { terminationPenalty: 0, notification: 0, cityForum: "" },
};

/** Estado inicial de erros (todos os campos válidos). */
export const EMPTY_ERRORS: ContractErrors = {
  contractor: {},
  hired: {},
  service: {},
  payment: {},
  itemContract: {},
};
