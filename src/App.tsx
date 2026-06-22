import { useState } from "react";
import { FileText, Save } from "lucide-react";
import { useContractForm } from "@/hooks/useContractForm";
import { useDrafts } from "@/hooks/useDrafts";
import { getTemplateById } from "@/templates";
import ContractForm from "@/form/ContractForm";
import TemplateSelector from "@/form/TemplateSelector";
import ContractPreview from "@/preview/ContractPreview";
import PrintButton from "@/preview/PrintButton";
import DraftList from "@/drafts/DraftList";
import { Button } from "@/ui/Button";

export default function App() {
  const { contract, errors, handleChange, validate, resetForm } =
    useContractForm();
  const { drafts, saveDraft, deleteDraft } = useDrafts();

  const [templateId, setTemplateId] = useState("freelance");
  const template = getTemplateById(templateId);

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------

  const handleSaveDraft = () => {
    const suggestion =
      contract.contractor.name && contract.hired.name
        ? `Contrato ${contract.contractor.name} x ${contract.hired.name}`
        : contract.contractor.name
          ? `Contrato ${contract.contractor.name}`
          : "Novo rascunho";

    const name = prompt("Nome do rascunho:", suggestion);
    if (!name?.trim()) return;

    saveDraft(name.trim(), templateId, contract);
  };

  const handleLoadDraft = (id: string) => {
    const draft = drafts.find((d) => d.id === id);
    if (!draft) return;

    if (
      contract.contractor.name ||
      contract.hired.name ||
      contract.service.description
    ) {
      const confirmed = confirm(
        "Carregar rascunho substituirá os dados atuais. Deseja continuar?",
      );
      if (!confirmed) return;
    }

    resetForm(draft.dados);
    setTemplateId(draft.templateId);
  };

  const handleDeleteDraft = (id: string) => {
    const confirmed = confirm("Excluir este rascunho permanentemente?");
    if (!confirmed) return;
    deleteDraft(id);
  };

  const handleNewContract = () => {
    if (
      contract.contractor.name ||
      contract.hired.name ||
      contract.service.description
    ) {
      const confirmed = confirm(
        "Criar novo contrato descartará os dados atuais. Deseja continuar?",
      );
      if (!confirmed) return;
    }
    resetForm(); // sem argumentos → reseta para EMPTY_CONTRACT
    setTemplateId("freelance");
  };

  // Pré-valida ao salvar
  const handleSaveWithValidation = () => {
    if (!validate()) {
      alert(
        "Existem campos com erro. Corrija-os antes de salvar o rascunho.",
      );
      return;
    }
    handleSaveDraft();
  };

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="no-print border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              <FileText className="inline-block w-5 h-5 mr-1.5" /> Contrato Fácil
            </h1>
            <p className="text-sm text-slate-500">
              Gerador de contratos para freelancers
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PrintButton />
            <Button variant="ghost" size="sm" onClick={handleNewContract}>
              Novo contrato
            </Button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Template selector */}
        <div className="no-print mb-6">
          <TemplateSelector value={templateId} onChange={setTemplateId} />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
          {/* Left — Form */}
          <div className="no-print w-full xl:w-1/2">
            <div className="panel">
              <ContractForm
                contract={contract}
                errors={errors}
                visibleSections={template.sections}
                onChange={handleChange}
              />

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <Button variant="default" size="default" onClick={handleSaveWithValidation}>
                  <Save className="w-4 h-4" /> Salvar rascunho
                </Button>
                <span className="text-xs text-slate-400">
                  Os rascunhos ficam salvos no seu navegador.
                </span>
              </div>
            </div>
          </div>

          {/* Right — Preview */}
          <div className="w-full xl:w-1/2">
            <div className="panel print-only">
              <div className="mb-4 flex items-center justify-between no-print">
                <h2 className="text-lg font-semibold text-slate-800">
                  Pré-visualização
                </h2>
                <PrintButton />
              </div>
              <ContractPreview text={template.generateText(contract)} />
            </div>
          </div>
        </div>

        {/* Drafts section */}
        <section className="no-print mt-10">
          <div className="panel">
            <DraftList
              drafts={drafts}
              onLoad={handleLoadDraft}
              onDelete={handleDeleteDraft}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-400">
        Contrato Fácil — Os contratos gerados são modelos de referência.
        Recomenda-se revisão por profissional jurídico.
      </footer>
    </div>
  );
}
