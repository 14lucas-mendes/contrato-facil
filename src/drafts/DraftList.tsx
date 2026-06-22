import type { Draft } from "../types/draft";
import DraftItem from "./DraftItem";

interface DraftListProps {
  drafts: Draft[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DraftList({ drafts, onLoad, onDelete }: DraftListProps) {
  if (drafts.length === 0) {
    return (
      <div className="draft-list draft-list--empty">
        <p className="text-sm text-slate-400 text-center py-4">
          Nenhum rascunho salvo. Preencha o formulário e clique em "Salvar
          rascunho".
        </p>
      </div>
    );
  }

  return (
    <div className="draft-list">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">
        Rascunhos salvos
      </h3>
      <div className="draft-list__items">
        {drafts.map((draft) => (
          <DraftItem
            key={draft.id}
            draft={draft}
            onLoad={onLoad}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
