export type Memo = {
  id: string;
  title: string;
  body: string;
  updatedAt: number;
};

const KEY = "memo-app:v1";

function uid(): string {
  return crypto.randomUUID();
}

export function loadMemos(): Memo[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isMemo);
  } catch {
    return [];
  }
}

function isMemo(x: unknown): x is Memo {
  if (x === null || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.body === "string" &&
    typeof o.updatedAt === "number"
  );
}

export function saveMemos(memos: Memo[]): void {
  localStorage.setItem(KEY, JSON.stringify(memos));
}

export function createEmptyMemo(): Memo {
  const now = Date.now();
  return {
    id: uid(),
    title: "",
    body: "",
    updatedAt: now,
  };
}
