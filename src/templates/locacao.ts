import type { ContractTemplate } from "../types/template";
import { formatCPF, formatDateBR, formatPaymentMethod } from "../utils/formatters";

export const locacaoTemplate: ContractTemplate = {
  id: "locacao",
  label: "Contrato de Locação",
  description:
    "Para locação de bens móveis ou imóveis. Inclui descrição do bem, prazo, valor e condições.",
  sections: ["service", "payment", "itemContract"],

  generateText(data) {
    const pagamento =
      data.payment.method === "cartao de credito" && data.payment.installment
        ? `${formatPaymentMethod(data.payment.method)} em ${data.payment.installment}x`
        : formatPaymentMethod(data.payment.method);

    return [
      "CONTRATO DE LOCAÇÃO",
      "",
      "LOCADOR e LOCATÁRIO, devidamente qualificados, celebram o presente Contrato de Locação:",
      "",
      `LOCADOR(A): ${data.contractor.name}, CPF ${formatCPF(data.contractor.cpf)}, e-mail ${data.contractor.email}, residente em ${data.contractor.address}.`,
      "",
      `LOCATÁRIO(A): ${data.hired.name}, CPF ${formatCPF(data.hired.cpf)}, e-mail ${data.hired.email}, residente em ${data.hired.address}.`,
      "",
      "CLÁUSULA 1ª — DO OBJETO",
      `Constitui objeto deste contrato a locação do seguinte bem: ${data.service.description}.`,
      "",
      "CLÁUSULA 2ª — DO PRAZO",
      `A locação terá início em ${formatDateBR(data.service.startDate)}, com vigência de ${data.service.period}.`,
      "",
      "CLÁUSULA 3ª — DO PAGAMENTO",
      `O LOCATÁRIO pagará ao LOCADOR através de ${pagamento}, conforme acordado entre as partes.`,
      "",
      "CLÁUSULA 4ª — DA RESCISÃO",
      `Em caso de rescisão contratual sem justa causa, a parte que der causa pagará à outra multa de ${data.itemContract.terminationPenalty}% sobre o valor remanescente do contrato.`,
      "",
      "CLÁUSULA 5ª — DAS NOTIFICAÇÕES",
      `As notificações entre as partes deverão ser feitas com ${data.itemContract.notification} dias de antecedência.`,
      "",
      "CLÁUSULA 6ª — DO FORO",
      `As partes elegem o foro da comarca de ${data.itemContract.cityForum} para dirimir quaisquer litígios decorrentes deste contrato.`,
      "",
      "E, por estarem de acordo, assinam este instrumento em duas vias.",
      "",
      "_________________________________",
      `LOCADOR(A): ${data.contractor.name}`,
      "",
      "_________________________________",
      `LOCATÁRIO(A): ${data.hired.name}`,
      "",
      `${data.itemContract.cityForum}, ${formatDateBR(data.service.startDate)}`,
    ].join("\n");
  },
};
