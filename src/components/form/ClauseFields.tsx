import type {Contract} from "../../types/contract";


type ClauseFieldsProps = {
    data: Contract['itemContract'];
    updateData: (key: keyof Contract['itemContract'], data: Contract['itemContract'][keyof Contract['itemContract']]) => void;
}


export default function ClauseFields({ data, updateData }: ClauseFieldsProps) {
    return (
        <div>
            <label>
                Cláusula de rescisão:
                <input
                    type="number"
                    value={data.terminationPenalty}
                    onChange={(e) => updateData('terminationPenalty', Number(e.target.value))}
                />
            </label>
            <label>
                Cláusula de notificação:
                <input
                    type="number"
                    value={data.notification}
                    onChange={(e) => updateData('notification', Number(e.target.value))}
                />
            </label>
            <label>
                Foro da cidade:
                <input
                    type="text"
                    value={data.cityForum}
                    onChange={(e) => updateData('cityForum', e.target.value)}
                />
            </label>
        </div> 
    )
}