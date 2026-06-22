import type { ContractTemplate } from "../types/template";
import { formatCPF, formatDateBR, formatPaymentMethod } from "../utils/formatters";

export const prestacaoDeServicoTemplate: ContractTemplate = {
  id: "prestacao-servico",
  label: "Prestação de Serviços",
  description:
    "Contrato formal para prestação de serviços continuados ou pontuais entre empresa e prestador.",
  sections: ["service", "payment", "itemContract"],

  generateText(data) {
    const pagamento =
      data.payment.method === "cartao de credito" && data.payment.installment
        ? `${formatPaymentMethod(data.payment.method)} em ${data.payment.installment} parcelas`
        : formatPaymentMethod(data.payment.method);

    return [
      "CONTRATO DE PRESTAÇÃO DE SERVIÇOS",
      "",
      "CONTRATANTE e CONTRATADO, abaixo qualificados, celebram o presente Contrato de Prestação de Serviços:",
      "",
      `CONTRATANTE: ${data.contractor.name}, CPF ${formatCPF(data.contractor.cpf)}, e-mail ${data.contractor.email}, domiciliado(a) em ${data.contractor.address}.`,
      "",
      `CONTRATADO(A): ${data.hired.name}, CPF ${formatCPF(data.hired.cpf)}, e-mail ${data.hired.email}, domiciliado(a) em ${data.hired.address}.`,
      "",
      "CLÁUSULA 1ª — DO OBJETO",
      `Constitui objeto deste contrato a prestação dos seguintes serviços: ${data.service.description}.`,
      "",
      "CLÁUSULA 2ª — DA EXECUÇÃO",
      `Os serviços serão executados a partir de ${formatDateBR(data.service.startDate)}, com prazo de conclusão de ${data.service.period}.`,
      "",
      "CLÁUSULA 3ª — DA REMUNERAÇÃO",
      `O CONTRATANTE pagará ao(à) CONTRATADO(A) através de ${pagamento}.`,
      "",
      "CLÁUSULA 4ª — DA RESCISÃO CONTRATUAL",
      `A parte que rescindir o contrato sem justa causa arcará com multa de ${data.itemContract.terminationPenalty}% sobre o valor total ajustado.`,
      "",
      "CLÁUSULA 5ª — DAS COMUNICAÇÕES",
      `Toda comunicação relativa a este contrato deverá ser formalizada com ${data.itemContract.notification} dias de antecedência.`,
      "",
      "CLÁUSULA 6ª — DO FORO",
      `Fica eleito o foro de ${data.itemContract.cityForum} para dirimir eventuais litígios decorrentes deste contrato.`,
      "",
      "E assim, por estarem de acordo, firmam o presente.",
      "",
      "_________________________________",
      `CONTRATANTE: ${data.contractor.name}`,
      "",
      "_________________________________",
      `CONTRATADO(A): ${data.hired.name}`,
      "",
      `${data.itemContract.cityForum}, ${formatDateBR(data.service.startDate)}`,
    ].join("\n");
  },
};
