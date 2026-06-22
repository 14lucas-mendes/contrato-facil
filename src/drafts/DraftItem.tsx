import type { Draft } from "@/types/draft";
import { Button } from "@/components/ui/Button";

interface DraftItemProps {
  draft: Draft;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DraftItem({ draft, onLoad, onDelete }: DraftItemProps) {
  const formattedDate = new Date(draft.atualizadoEm).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div className="draft-item">
      <div className="draft-item__info">
        <span className="draft-item__name">{draft.name}</span>
        <span className="draft-item__meta">
          Atualizado em {formattedDate}
        </span>
      </div>
      <div className="draft-item__actions">
        <Button variant="ghost" size="sm" onClick={() => onLoad(draft.id)}>
          Carregar
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(draft.id)}>
          Excluir
        </Button>
      </div>
    </div>
  );
}
