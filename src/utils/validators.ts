import type { Contract, ContractErrors } from "../types/contract";

// ---------------------------------------------------------------------------
// Validadores de campos individuais
// ---------------------------------------------------------------------------

/** Valida um CPF (dígitos verificadores). Retorna null se válido. */
export function validateCPF(cpf: string): string | undefined {
  const cleaned = cpf.replace(/\D/g, "");

  if (!cleaned) return "CPF é obrigatório";
  if (cleaned.length !== 11) return "CPF deve ter 11 dígitos";
  if (/^(\d)\1{10}$/.test(cleaned)) return "CPF inválido";

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(cleaned[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== Number(cleaned[9])) return "CPF inválido";

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(cleaned[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== Number(cleaned[10])) return "CPF inválido";

  return undefined;
}

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "E-mail é obrigatório";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido";
  return undefined;
}

export function validateRequired(
  value: string | number,
  fieldName: string,
): string | undefined {
  if (typeof value === "string" && !value.trim())
    return `${fieldName} é obrigatório`;
  if (typeof value === "number" && value <= 0)
    return `${fieldName} deve ser maior que zero`;
  return undefined;
}

// ---------------------------------------------------------------------------
// Validador completo do contrato
// ---------------------------------------------------------------------------

export function validateContract(contract: Contract): ContractErrors {
  const errors: ContractErrors = {
    contractor: {},
    hired: {},
    service: {},
    payment: {},
    itemContract: {},
  };

  // Parte Contratante
  errors.contractor.name = validateRequired(
    contract.contractor.name,
    "Nome do contratante",
  );
  errors.contractor.cpf = validateCPF(contract.contractor.cpf);
  errors.contractor.email = validateEmail(contract.contractor.email);
  errors.contractor.address = validateRequired(
    contract.contractor.address,
    "Endereço do contratante",
  );

  // Parte Contratada
  errors.hired.name = validateRequired(
    contract.hired.name,
    "Nome do contratado",
  );
  errors.hired.cpf = validateCPF(contract.hired.cpf);
  errors.hired.email = validateEmail(contract.hired.email);
  errors.hired.address = validateRequired(
    contract.hired.address,
    "Endereço do contratado",
  );

  // Serviço
  errors.service.description = validateRequired(
    contract.service.description,
    "Descrição do serviço",
  );
  errors.service.startDate = validateRequired(
    contract.service.startDate,
    "Data de início",
  );
  errors.service.period = validateRequired(contract.service.period, "Prazo");

  // Pagamento — method sempre tem valor default, nada obrigatório aqui

  // Cláusulas
  errors.itemContract.terminationPenalty = validateRequired(
    contract.itemContract.terminationPenalty,
    "Multa por rescisão",
  );
  errors.itemContract.notification = validateRequired(
    contract.itemContract.notification,
    "Prazo de notificação",
  );
  errors.itemContract.cityForum = validateRequired(
    contract.itemContract.cityForum,
    "Foro da cidade",
  );

  return errors;
}

/** Retorna true se houver pelo menos um erro em qualquer seção. */
export function hasErrors(errors: ContractErrors): boolean {
  const sections = [
    errors.contractor,
    errors.hired,
    errors.service,
    errors.payment,
    errors.itemContract,
  ];
  return sections.some((s) => Object.values(s).some(Boolean));
}
