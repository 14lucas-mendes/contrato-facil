import type { Contract, ContractErrors } from "@/types/contract";
import { FormField } from "@/ui/FormField";

interface ServiceFieldsProps {
  data: Contract["service"];
  errors: ContractErrors["service"];
  updateData: (
    key: keyof Contract["service"],
    data: Contract["service"][keyof Contract["service"]],
  ) => void;
}

export default function ServiceFields({
  data,
  errors,
  updateData,
}: ServiceFieldsProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Serviço</h2>
      <div className="form-section__grid">
        <div className="col-span-2">
          <FormField
            label="Descrição do serviço"
            type="text"
            placeholder="Descreva o escopo do serviço a ser prestado..."
            value={data.description}
            error={errors.description}
            onChange={(e) => updateData("description", e.target.value)}
          />
        </div>
        <FormField
          label="Data de início"
          type="date"
          value={data.startDate}
          error={errors.startDate}
          onChange={(e) => updateData("startDate", e.target.value)}
        />
        <FormField
          label="Prazo de entrega / vigência"
          type="text"
          placeholder="Ex: 30 dias, 3 meses, indeterminado"
          value={data.period}
          error={errors.period}
          onChange={(e) => updateData("period", e.target.value)}
        />
      </div>
    </div>
  );
}
