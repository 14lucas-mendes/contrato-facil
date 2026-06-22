import type { ContractData, ContractErrors } from "@/types/contract";
import { FormField } from "@/components/ui/FormField";

interface PartFieldsProps {
  data: ContractData;
  errors: ContractErrors["contractor"];
  title: string;
  updateData: (
    key: keyof ContractData,
    data: ContractData[keyof ContractData],
  ) => void;
}

export default function PartFields({
  data,
  errors,
  title,
  updateData,
}: PartFieldsProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">{title}</h2>
      <div className="form-section__grid">
        <div className="col-span-2">
          <FormField
            label="Nome completo"
            type="text"
            placeholder="Ex: João da Silva"
            value={data.name}
            error={errors.name}
            onChange={(e) => updateData("name", e.target.value)}
          />
        </div>
        <FormField
          label="CPF / CNPJ"
          type="text"
          placeholder="000.000.000-00"
          value={data.cpf}
          error={errors.cpf}
          onChange={(e) => updateData("cpf", e.target.value)}
        />
        <FormField
          label="E-mail"
          type="email"
          placeholder="email@exemplo.com"
          value={data.email}
          error={errors.email}
          onChange={(e) => updateData("email", e.target.value)}
        />
        <div className="col-span-2">
          <FormField
            label="Endereço"
            type="text"
            placeholder="Rua, número, bairro, cidade - UF"
            value={data.address}
            error={errors.address}
            onChange={(e) => updateData("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
