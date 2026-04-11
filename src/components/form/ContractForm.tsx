import type {Contract} from "../../types/contract";

import PartFields from "./PartFields";

interface ContractFormProps {
    contract: Contract;
    onChange: (key: keyof Contract, data: Contract[keyof Contract]) => void;

}

export default function ContractForm({ contract, onChange }: ContractFormProps) {
  
  const handleContractorChange = <T extends keyof Contract['contractor']>(campo: T, dadosNovos: Contract['contractor'][T]) => {
    const newData = {
      ...contract.contractor,
      [campo]: dadosNovos,
    };
    onChange('contractor', newData);
  }

  const handleHiredChange = <T extends keyof Contract['hired']>(campo: T, dadosNovos: Contract['hired'][T]) => {
    const newData = {
      ...contract.hired,
      [campo]: dadosNovos,
    };
    onChange('hired', newData);
  }


  return (
    <div>
      <PartFields title="Parte Contratante" data={contract.contractor} updateData={handleContractorChange} />
      <PartFields title="Parte Contratada" data={contract.hired} updateData={handleHiredChange} />
    </div>
  );
}