import type { Contract, ContractErrors } from "@/types/contract";
import { FormField } from "@/components/ui/FormField";

interface PaymentProps {
  data: Contract["payment"];
  errors: ContractErrors["payment"];
  updateData: (
    key: keyof Contract["payment"],
    data: Contract["payment"][keyof Contract["payment"]],
  ) => void;
}

export default function PaymentFields({ data, errors, updateData }: PaymentProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Pagamento</h2>
      <div className="form-section__grid payment-grid">
        <div className="grid gap-1.5">
          <label className="text-sm font-semibold leading-none text-slate-700">Forma de pagamento</label>
          <select
            className="payment-select"
            value={data.method}
            onChange={(e) =>
              updateData(
                "method",
                e.target.value as Contract["payment"]["method"],
              )
            }
          >
            <option value="pix">Pix</option>
            <option value="boleto">Boleto</option>
            <option value="transferencia">Transferência</option>
            <option value="cartao de credito">Cartão de Crédito</option>
          </select>
          {errors.method && <span className="error-text">{errors.method}</span>}
        </div>

        {data.method === "cartao de credito" && (
          <FormField
            label="Parcelas"
            type="number"
            min={1}
            max={48}
            value={data.installment ?? ""}
            error={errors.installment}
            onChange={(e) =>
              updateData("installment", parseInt(e.target.value) || 0)
            }
          />
        )}
      </div>
    </div>
  );
}
