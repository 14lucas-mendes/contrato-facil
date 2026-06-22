import type { Contract, ContractErrors } from "@/types/contract";
import { FormField } from "@/components/ui/FormField";

interface ClauseFieldsProps {
  data: Contract["itemContract"];
  errors: ContractErrors["itemContract"];
  updateData: (
    key: keyof Contract["itemContract"],
    data: Contract["itemContract"][keyof Contract["itemContract"]],
  ) => void;
}

export default function ClauseFields({ data, errors, updateData }: ClauseFieldsProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Cláusulas</h2>
      <div className="form-section__grid">
        <FormField
          label="Multa por rescisão (%)"
          type="number"
          min={0}
          max={100}
          placeholder="Ex: 10"
          value={data.terminationPenalty || ""}
          error={errors.terminationPenalty}
          helpText="Percentual aplicado em caso de quebra de contrato"
          onChange={(e) =>
            updateData("terminationPenalty", Number(e.target.value))
          }
        />
        <FormField
          label="Prazo de notificação (dias)"
          type="number"
          min={0}
          placeholder="Ex: 30"
          value={data.notification || ""}
          error={errors.notification}
          helpText="Antecedência mínima para notificações"
          onChange={(e) =>
            updateData("notification", Number(e.target.value))
          }
        />
        <div className="col-span-2">
          <FormField
            label="Foro da comarca"
            type="text"
            placeholder="Ex: São Paulo - SP"
            value={data.cityForum}
            error={errors.cityForum}
            helpText="Cidade onde eventuais disputas serão resolvidas"
            onChange={(e) => updateData("cityForum", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
