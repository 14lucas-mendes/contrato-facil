import type {ContractData} from "../../types/contract";

interface PartFieldsProps {
    data: ContractData,
    title: string;
    updateData: (key: keyof ContractData, data: ContractData[keyof ContractData]) => void;
}

export default function PartFields({ data, title, updateData }: PartFieldsProps) {
    return (
        <div>
            <h2>{title}</h2>
            <label>
                Nome:
                <input type="text"  
                onChange={(e) => updateData && updateData('name', e.target.value)}
                value={data.name} />
            </label>
            <label>
                CPF:
                <input type="text" 
                onChange={(e) => updateData && updateData('cpf', e.target.value)}
                value={data.cpf} />
            </label>
            <label>
                Email:
                <input type="email" 
                onChange={(e) => updateData && updateData('email', e.target.value)}
                value={data.email} />
            </label>
            <label>
                Endereço:
                <input type="text" 
                onChange={(e) => updateData && updateData('address', e.target.value)}
                value={data.address} />
            </label>
        </div>
    )
}