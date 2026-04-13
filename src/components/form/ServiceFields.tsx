import type {Contract} from "../../types/contract";

type ServiceFieldsProps = {
    data: Contract['service'];
    updateData: (key: keyof Contract['service'], data: Contract['service'][keyof Contract['service']]) => void;
}

export default function ServiceFields({ data, updateData }: ServiceFieldsProps) {
        return (
            <div>
                <label>
                    Descrição do serviço:
                    <input
                        type="text"
                        value={data.description}
                        onChange={(e) => updateData('description', e.target.value)}
                    />
                </label>
                <label>
                    Data de início:
                    <input
                        type="date"
                        value={data.startDate}
                        onChange={(e) => updateData('startDate', e.target.value)}
                    />
                </label>
                <label>
                    Período:
                    <input
                        type="text"
                        value={data.period}
                        onChange={(e) => updateData('period', e.target.value )}
                    />
                </label>
            </div>
        )
}