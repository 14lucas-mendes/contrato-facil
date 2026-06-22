import type { ContractTemplate } from "../types/template";
import { formatCPF, formatDateBR, formatPaymentMethod } from "../utils/formatters";

export const freelanceTemplate: ContractTemplate = {
  id: "freelance",
  label: "Contrato Freelance",
  description:
    "Ideal para projetos pontuais entre contratante e freelancer. Inclui escopo, prazo, pagamento e cláusulas padrão.",
  sections: ["service", "payment", "itemContract"],

  generateText(data) {
    const pagamento =
      data.payment.method === "cartao de credito" && data.payment.installment
        ? `${formatPaymentMethod(data.payment.method)} em ${data.payment.installment}x`
        : formatPaymentMethod(data.payment.method);

    return [
      "CONTRATO DE PRESTAÇÃO DE SERVIÇOS FREELANCE",
      "",
      "Pelo presente instrumento particular, as partes:",
      "",
      `CONTRATANTE: ${data.contractor.name}, CPF ${formatCPF(data.contractor.cpf)}, e-mail ${data.contractor.email}, residente em ${data.contractor.address};`,
      "",
      `CONTRATADO(A): ${data.hired.name}, CPF ${formatCPF(data.hired.cpf)}, e-mail ${data.hired.email}, residente em ${data.hired.address};`,
      "",
      "têm entre si justo e acordado o presente Contrato de Prestação de Serviços Freelance, regido pelas cláusulas seguintes:",
      "",
      "CLÁUSULA 1ª — DO OBJETO",
      `O(A) CONTRATADO(A) se compromete a prestar os seguintes serviços: ${data.service.description}.`,
      "",
      "CLÁUSULA 2ª — DO PRAZO",
      `Os serviços terão início em ${formatDateBR(data.service.startDate)}, com prazo de execução de ${data.service.period}.`,
      "",
      "CLÁUSULA 3ª — DO PAGAMENTO",
      `O valor acordado será pago via ${pagamento}, conforme negociação entre as partes.`,
      "",
      "CLÁUSULA 4ª — DA RESCISÃO",
      `Em caso de rescisão sem justa causa, a parte que der causa pagará à outra multa de ${data.itemContract.terminationPenalty}% sobre o valor total do contrato.`,
      "",
      "CLÁUSULA 5ª — DA NOTIFICAÇÃO",
      `Qualquer notificação entre as partes deverá ser feita com antecedência mínima de ${data.itemContract.notification} dias.`,
      "",
      "CLÁUSULA 6ª — DO FORO",
      `As partes elegem o foro da comarca de ${data.itemContract.cityForum} para dirimir quaisquer dúvidas oriundas deste contrato.`,
      "",
      "E por estarem assim justas e contratadas, assinam o presente em duas vias de igual teor.",
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
