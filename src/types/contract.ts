export type ContractData = {
    name: string;
    cpf: string;
    email: string;
    address: string;
}

export type Contract = {
  contractor: ContractData;
  hired: ContractData;
  service: { description: string; startDate: string; period: string };
  payment: {
    method: "pix" | "boleto" | "transferencia" | "cartao de credito";
    installment?: number;
  };
  itemContract: { terminationPenalty: number; notification: number, cityForum: string };
};
