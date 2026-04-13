import type { Contract } from "../../types/contract";

type PaymentProps = {
    data: Contract['payment'];
    updateData: (key: keyof Contract['payment'], data: Contract['payment'][keyof Contract['payment']]) => void;
}

export default function PaymentFields({ data, updateData }: PaymentProps) {
    return (
        <div>
            <select value={data.method} onChange={(e) => updateData('method', e.target.value as Contract['payment']['method'])}>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
                <option value="transferencia">Transferência</option>
                <option value="cartao de credito">Cartão de Crédito</option>
            </select>
            {data.method ==='cartao de credito' && (
                <label>
                    Parcelas:
                    <input type="number" value={data.installment} onChange={(e) => updateData('installment', parseInt(e.target.value) || 0)} />
                </label>
            )}
        </div>
    )
}