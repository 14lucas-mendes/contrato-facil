import { useCallback } from "react";
import type { Draft } from "../types/draft";
import type { Contract } from "../types/contract";
import useLocalStorage from "./useLocalStorage";

const DRAFTS_KEY = "drafts";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function useDrafts() {
  const [drafts, setDrafts] = useLocalStorage<Draft[]>(DRAFTS_KEY, []);

  const saveDraft = useCallback(
    (name: string, templateId: string, dados: Contract) => {
      const draft: Draft = {
        id: generateId(),
        name,
        templateId,
        dados,
        atualizadoEm: new Date().toISOString(),
      };
      setDrafts((prev) => [draft, ...prev]);
      return draft;
    },
    [setDrafts],
  );

  const loadDraft = useCallback(
    (id: string): Draft | undefined => {
      return drafts.find((d) => d.id === id);
    },
    [drafts],
  );

  const deleteDraft = useCallback(
    (id: string) => {
      setDrafts((prev) => prev.filter((d) => d.id !== id));
    },
    [setDrafts],
  );

  const updateDraft = useCallback(
    (id: string, dados: Contract) => {
      setDrafts((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, dados, atualizadoEm: new Date().toISOString() }
            : d,
        ),
      );
    },
    [setDrafts],
  );

  return { drafts, saveDraft, loadDraft, deleteDraft, updateDraft };
}
