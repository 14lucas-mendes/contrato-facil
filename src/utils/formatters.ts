// ---------------------------------------------------------------------------
// Formatação de documentos
// ---------------------------------------------------------------------------

/** Formata string de 11 dígitos como CPF: `XXX.XXX.XXX-XX` */
export function formatCPF(value: string): string {
  const c = value.replace(/\D/g, "").slice(0, 11);
  if (c.length <= 3) return c;
  if (c.length <= 6) return `${c.slice(0, 3)}.${c.slice(3)}`;
  if (c.length <= 9)
    return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6)}`;
  return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9)}`;
}

/** Remove toda formatação, deixando apenas dígitos. */
export function unformat(value: string): string {
  return value.replace(/\D/g, "");
}

// ---------------------------------------------------------------------------
// Formatação de data
// ---------------------------------------------------------------------------

/** Converte `YYYY-MM-DD` → `DD/MM/YYYY`. Retorna a string original se inválida. */
export function formatDateBR(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${day}/${month}/${year}`;
}

// ---------------------------------------------------------------------------
// Formatação de moeda
// ---------------------------------------------------------------------------

/** Formata número como valor em Reais. */
export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ---------------------------------------------------------------------------
// Formatação de método de pagamento
// ---------------------------------------------------------------------------

const PAYMENT_LABELS: Record<string, string> = {
  pix: "PIX",
  boleto: "boleto bancário",
  transferencia: "transferência bancária",
  "cartao de credito": "cartão de crédito",
};

export function formatPaymentMethod(method: string): string {
  return PAYMENT_LABELS[method] ?? method;
}
