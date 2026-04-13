import type { Contract } from "./types/contract";
import { useState } from "react";
import ContractForm from "./components/form/ContractForm";

export default function App() {
   const [contract, setContract] = useState<Contract>({
    contractor: {
      name: "",
      cpf: "",
      email: "",
      address: "",
    },
    hired: {
      name: "",
      cpf: "",
      email: "",
      address: "",
    },
    service: {
      description: "",
      startDate: "",
      period: "",
    },
    payment: {
      method: "pix",
    },
    itemContract: {
      terminationPenalty: 0,
      notification: 0,
      cityForum: "",
    },
  });

  const handleChange = <K extends keyof Contract>(key: K, data: Contract[K]) => {
    const newState = {
        ...contract,
        [key]: {
        ...contract[key],
          ...data,
        },
      };
      setContract(newState);    
    }

    console.log(contract);

    return (
      <div>
        <ContractForm contract={contract} onChange={handleChange} />
      </div>
    );
  }
