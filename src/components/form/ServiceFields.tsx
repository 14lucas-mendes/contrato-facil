import type { Contract } from "../../types/contract";

import Input from "../../components/ui/Input";

interface ServiceFieldsProps {
  data: Contract["service"];
  updateData: (
    key: keyof Contract["service"],
    data: Contract["service"][keyof Contract["service"]],
  ) => void;
}

export default function ServiceFields({
  data,
  updateData,
}: ServiceFieldsProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Serviço</h2>
      <div className="form-section__grid">
        <div className="input-group span-two">
          <Input
            label="Descrição do serviço"
            type="text"
            value={data.description}
            onChange={(e) => updateData("description", e.target.value)}
          />
        </div>
        <Input
          label="Data de início"
          type="date"
          value={data.startDate}
          onChange={(e) => updateData("startDate", e.target.value)}
        />
        <Input
          label="Prazo de entrega"
          type="text"
          value={data.period}
          onChange={(e) => updateData("period", e.target.value)}
        />
      </div>
    </div>
  );
}
