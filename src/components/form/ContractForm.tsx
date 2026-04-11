import type {Contract} from "../../types/contract";

interface ContractFormProps {
    contract: Contract;
    onChange: (key: keyof Contract, data: Contract[keyof Contract]) => void;

}

export default function ContractForm({ contract, onChange }: ContractFormProps) {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}