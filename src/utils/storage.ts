const PREFIX = "cf:";

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    console.error("Falha ao salvar no localStorage");
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(PREFIX + key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    console.error("Falha ao remover do localStorage");
  }
}
