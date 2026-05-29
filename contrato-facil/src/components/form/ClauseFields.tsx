import type { Contract } from "../../types/contract";

import Input from "../../components/ui/Input";

interface ClauseFieldsProps {
  data: Contract["itemContract"];
  updateData: (
    key: keyof Contract["itemContract"],
    data: Contract["itemContract"][keyof Contract["itemContract"]],
  ) => void;
}

export default function ClauseFields({ data, updateData }: ClauseFieldsProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Cláusulas</h2>
      <div className="form-section__grid">
        <Input
          label="Cláusula de rescisão"
          type="number"
          value={data.terminationPenalty}
          onChange={(e) =>
            updateData("terminationPenalty", Number(e.target.value))
          }
        />
        <Input
          label="Cláusula de notificação"
          type="number"
          value={data.notification}
          onChange={(e) => updateData("notification", Number(e.target.value))}
        />
        <Input
          label="Foro da cidade"
          type="text"
          value={data.cityForum}
          onChange={(e) => updateData("cityForum", e.target.value)}
        />
      </div>
    </div>
  );
}
