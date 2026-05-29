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
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
        <div className="w-full xl:w-1/2">
          <div className="panel">
            <ContractForm contract={contract} onChange={handleChange} />
          </div>
        </div>
        <div className="w-full xl:w-1/2">
          <div className="panel">
            <h2 className="text-2xl font-semibold mb-4">Dados do contrato</h2>
            <p>
              Use este espaço para mostrar resumo, status ou informações
              adicionais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
