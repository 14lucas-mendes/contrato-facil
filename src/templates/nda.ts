import type { ContractTemplate } from "../types/template";
import { formatCPF, formatDateBR } from "../utils/formatters";

export const ndaTemplate: ContractTemplate = {
  id: "nda",
  label: "Acordo de Confidencialidade (NDA)",
  description:
    "Protege informações sensíveis compartilhadas entre as partes. Focado em cláusulas de sigilo e penalidades.",
  sections: ["itemContract"],

  generateText(data) {
    return [
      "ACORDO DE CONFIDENCIALIDADE (NDA)",
      "",
      "As partes abaixo assinadas celebram o presente Acordo de Confidencialidade:",
      "",
      `DIVULGADOR: ${data.contractor.name}, CPF ${formatCPF(data.contractor.cpf)}, e-mail ${data.contractor.email}, domiciliado(a) em ${data.contractor.address}.`,
      "",
      `RECEPTOR: ${data.hired.name}, CPF ${formatCPF(data.hired.cpf)}, e-mail ${data.hired.email}, domiciliado(a) em ${data.hired.address}.`,
      "",
      "CLÁUSULA 1ª — DO OBJETO",
      "O presente acordo tem por objetivo regular a confidencialidade de informações trocadas entre as partes, sejam elas técnicas, comerciais, financeiras ou estratégicas.",
      "",
      "CLÁUSULA 2ª — DAS OBRIGAÇÕES",
      "O RECEPTOR se obriga a manter absoluto sigilo sobre todas as informações recebidas do DIVULGADOR, não podendo divulgá-las, reproduzi-las ou utilizá-las para qualquer fim diverso do acordado entre as partes.",
      "",
      "CLÁUSULA 3ª — DO PRAZO",
      `A obrigação de confidencialidade vigorará por prazo indeterminado a partir de ${formatDateBR(data.service.startDate) || "da data de assinatura"}, mesmo após o término da relação entre as partes.`,
      "",
      "CLÁUSULA 4ª — DA PENALIDADE",
      `O descumprimento de qualquer cláusula deste acordo sujeitará a parte infratora ao pagamento de multa de ${data.itemContract.terminationPenalty}% sobre o valor estimado da operação, sem prejuízo de indenização por perdas e danos.`,
      "",
      "CLÁUSULA 5ª — DAS NOTIFICAÇÕES",
      `Qualquer notificação decorrente deste acordo deverá ser realizada com ${data.itemContract.notification} dias de antecedência.`,
      "",
      "CLÁUSULA 6ª — DO FORO",
      `Fica eleito o foro de ${data.itemContract.cityForum} para dirimir eventuais controvérsias oriundas deste acordo.`,
      "",
      "Estando assim justas e acordadas, assinam o presente em duas vias.",
      "",
      "_________________________________",
      `DIVULGADOR: ${data.contractor.name}`,
      "",
      "_________________________________",
      `RECEPTOR: ${data.hired.name}`,
      "",
      `${data.itemContract.cityForum}, ${formatDateBR(data.service.startDate) || "__/__/____"}`,
    ].join("\n");
  },
};
