import type {Contract} from "../../types/contract";

import PartFields from "./PartFields";
import PaymentFields from "./PaymentFields";
import ServiceFields from "./ServiceFields";
import ClauseFields from "./ClauseFields";

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

  const handlePaymentChange = <T extends keyof Contract['payment']>(campo: T, dadosNovos: Contract['payment'][T]) => {
    const newData = {
      ...contract.payment,
      [campo]: dadosNovos,
    };
    onChange('payment', newData);
  }

  const handleServiceChange = <T extends keyof Contract['service']>(campo: T, dadosNovos: Contract['service'][T]) => {
    const newData = {
      ...contract.service,
      [campo]: dadosNovos,
    };
    onChange('service', newData);
  }

  const handleItemContractChange = <T extends keyof Contract['itemContract']>(campo: T, dadosNovos: Contract['itemContract'][T]) => {
    const newData = {
      ...contract.itemContract,
      [campo]: dadosNovos,
    };
    onChange('itemContract', newData);
  }


  return (
    <div>
      <PartFields title="Parte Contratante" data={contract.contractor} updateData={handleContractorChange} />
      <PartFields title="Parte Contratada" data={contract.hired} updateData={handleHiredChange} />
      <PaymentFields data={contract.payment} updateData={handlePaymentChange} />
      <ServiceFields data={contract.service} updateData={handleServiceChange} />
      <ClauseFields data={contract.itemContract} updateData={handleItemContractChange} />
    </div>
  );
}