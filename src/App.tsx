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

  const handleChange = <K extends keyof Contract>(
    key: K,
    data: Contract[K],
  ) => {
    const newState = {
      ...contract,
      [key]: {
        ...contract[key],
        ...data,
      },
    };
    setContract(newState);
  };

  return (
    <div className="app-shell">
      <div className="layout-two-columns">
        <div className="left-panel panel">
          <ContractForm contract={contract} onChange={handleChange} />
        </div>
        <div className="right-panel panel">
          <h2>Dados do contrato:</h2>
          <p>
            Use este espaço para mostrar resumo, status ou informações
            adicionais.
          </p>
        </div>
      </div>
    </div>
  );
}
