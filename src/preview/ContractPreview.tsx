interface ContractPreviewProps {
  text: string;
}

export default function ContractPreview({ text }: ContractPreviewProps) {
  if (!text) {
    return (
      <div className="contract-preview contract-preview--empty">
        <p className="text-slate-400 text-center py-12">
          Preencha os dados do formulário para visualizar o contrato.
        </p>
      </div>
    );
  }

  return (
    <div className="contract-preview" id="contract-preview">
      <pre className="contract-preview__text">{text}</pre>
    </div>
  );
}
