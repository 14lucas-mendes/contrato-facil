import { useState, useCallback } from "react";
import type { Contract, ContractErrors } from "../types/contract";
import { EMPTY_CONTRACT, EMPTY_ERRORS } from "../types/contract";
import { validateContract, hasErrors } from "../utils/validators";

export function useContractForm(initial?: Contract) {
  const [contract, setContract] = useState<Contract>(
    initial ?? EMPTY_CONTRACT,
  );
  const [errors, setErrors] = useState<ContractErrors>(EMPTY_ERRORS);

  /** Atualiza uma seção inteira do contrato (spread merge). */
  const handleChange = useCallback(
    <K extends keyof Contract>(key: K, data: Contract[K]) => {
      setContract((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...data },
      }));
    },
    [],
  );

  /** Valida todos os campos e popula o estado de erros. Retorna true se válido. */
  const validate = useCallback((): boolean => {
    const newErrors = validateContract(contract);
    setErrors(newErrors);
    return !hasErrors(newErrors);
  }, [contract]);

  /** Substitui todo o contrato (ex: ao carregar rascunho) e limpa os erros.
   *  Se chamado sem argumentos, reseta para o estado inicial vazio. */
  const resetForm = useCallback((newContract?: Contract) => {
    setContract(newContract ?? EMPTY_CONTRACT);
    setErrors(EMPTY_ERRORS);
  }, []);

  /** Limpa os erros de um campo específico. */
  const clearFieldError = useCallback(
    <K extends keyof ContractErrors>(
      section: K,
      field: keyof ContractErrors[K],
    ) => {
      setErrors((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: undefined },
      }));
    },
    [],
  );

  return { contract, errors, handleChange, validate, resetForm, clearFieldError };
}
