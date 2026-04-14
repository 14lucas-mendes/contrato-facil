import type { ContractData } from "../../types/contract";

import Input from "../../components/ui/Input";

interface PartFieldsProps {
  data: ContractData;
  title: string;
  updateData: (
    key: keyof ContractData,
    data: ContractData[keyof ContractData],
  ) => void;
}

export default function PartFields({
  data,
  title,
  updateData,
}: PartFieldsProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">{title}</h2>
      <div className="form-section__grid">
        <div className="input-group span-two">
          <Input
            label="Nome completo"
            type="text"
            value={data.name}
            onChange={(e) => updateData("name", e.target.value)}
          />
        </div>
        <Input
          label="CPF / CNPJ"
          type="text"
          value={data.cpf}
          onChange={(e) => updateData("cpf", e.target.value)}
        />
        <Input
          label="E-mail"
          type="email"
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
        />
        <div className="input-group span-two">
          <Input
            label="Endereço"
            type="text"
            value={data.address}
            onChange={(e) => updateData("address", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
