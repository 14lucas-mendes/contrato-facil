import type { Contract } from "../../types/contract";
import Input from "../../components/ui/Input";

interface PaymentProps {
  data: Contract["payment"];
  updateData: (
    key: keyof Contract["payment"],
    data: Contract["payment"][keyof Contract["payment"]],
  ) => void;
}

export default function PaymentFields({ data, updateData }: PaymentProps) {
  return (
    <div className="form-section">
      <h2 className="form-section__title">Pagamento</h2>
      <div className="form-section__grid payment-grid">
        <div className="input-group">
          <label>Forma de pagamento</label>
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
        </div>
        {data.method === "cartao de credito" && (
          <Input
            label="Parcelas"
            type="number"
            value={data.installment}
            onChange={(e) =>
              updateData("installment", parseInt(e.target.value) || 0)
            }
          />
        )}
      </div>
    </div>
  );
}
