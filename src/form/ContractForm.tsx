import type { Contract, ContractErrors } from "../types/contract";
import type { TemplateSection } from "../types/template";

import PartFields from "./PartFields";
import PaymentFields from "./PaymentFields";
import ServiceFields from "./ServiceFields";
import ClauseFields from "./ClauseFields";

interface ContractFormProps {
  contract: Contract;
  errors: ContractErrors;
  /** Seções visíveis — controlado pelo template selecionado. */
  visibleSections: TemplateSection[];
  onChange: (key: keyof Contract, data: Contract[keyof Contract]) => void;
}

export default function ContractForm({
  contract,
  errors,
  visibleSections,
  onChange,
}: ContractFormProps) {
  const handlePartChange =
    (section: "contractor" | "hired") =>
    <T extends keyof Contract[typeof section]>(
      campo: T,
      valor: Contract[typeof section][T],
    ) => {
      onChange(section, {
        ...contract[section],
        [campo]: valor,
      });
    };

  const handleSectionChange =
    <K extends keyof Contract>(key: K) =>
    <T extends keyof Contract[K]>(campo: T, valor: Contract[K][T]) => {
      onChange(key, {
        ...contract[key],
        [campo]: valor,
      });
    };

  return (
    <div className="contract-form">
      <PartFields
        title="Parte Contratante"
        data={contract.contractor}
        errors={errors.contractor}
        updateData={handlePartChange("contractor")}
      />

      <PartFields
        title="Parte Contratada"
        data={contract.hired}
        errors={errors.hired}
        updateData={handlePartChange("hired")}
      />

      {visibleSections.includes("service") && (
        <ServiceFields
          data={contract.service}
          errors={errors.service}
          updateData={handleSectionChange("service")}
        />
      )}

      {visibleSections.includes("itemContract") && (
        <ClauseFields
          data={contract.itemContract}
          errors={errors.itemContract}
          updateData={handleSectionChange("itemContract")}
        />
      )}

      {visibleSections.includes("payment") && (
        <PaymentFields
          data={contract.payment}
          errors={errors.payment}
          updateData={handleSectionChange("payment")}
        />
      )}
    </div>
  );
}
