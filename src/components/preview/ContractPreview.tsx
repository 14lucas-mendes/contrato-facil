import type { Contract } from "../../types/contract";

interface ContractPreviewProps {
    contract: Contract;
 }


export default function ContractPreview({ contract }: ContractPreviewProps) {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}