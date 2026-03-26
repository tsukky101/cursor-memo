import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createEmptyMemo,
  loadMemos,
  type Memo,
  saveMemos,
} from "./memoStorage";

function formatTime(ts: number): string {
  return new Intl.DateTimeFormat("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(ts);
}

function displayTitle(m: Memo): string {
  const t = m.title.trim();
  if (t) return t;
  const first = m.body.trim().split(/\n/)[0];
  if (first) return first.slice(0, 48) + (first.length > 48 ? "…" : "");
  return "無題のメモ";
}

export default function App() {
  const [memos, setMemos] = useState<Memo[]>(() => loadMemos());
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const list = loadMemos();
    return list[0]?.id ?? null;
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    saveMemos(memos);
  }, [memos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return memos;
    return memos.filter(
      (m) =>
        m.title.toLowerCase().includes(q) || m.body.toLowerCase().includes(q)
    );
  }, [memos, query]);

  const selected = useMemo(
    () => memos.find((m) => m.id === selectedId) ?? null,
    [memos, selectedId]
  );

  const touchMemo = useCallback((id: string, patch: Partial<Memo>) => {
    setMemos((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, ...patch, updatedAt: Date.now() } : m
      )
    );
  }, []);

  const handleNew = useCallback(() => {
    const m = createEmptyMemo();
    setMemos((prev) => [m, ...prev]);
    setSelectedId(m.id);
    setQuery("");
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      const idx = memos.findIndex((m) => m.id === id);
      const next = memos.filter((m) => m.id !== id);
      setMemos(next);
      if (selectedId === id) {
        setSelectedId(next[idx]?.id ?? next[idx - 1]?.id ?? null);
      }
    },
    [memos, selectedId]
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>メモ</h1>
          <input
            type="search"
            className="search"
            placeholder="検索…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="メモを検索"
          />
          <button type="button" className="btn-new" onClick={handleNew}>
            新しいメモ
          </button>
        </div>
        {filtered.length === 0 ? (
          <p className="empty-sidebar">
            {memos.length === 0
              ? "メモがありません。「新しいメモ」で追加できます。"
              : "検索に一致するメモがありません。"}
          </p>
        ) : (
          <ul className="memo-list">
            {filtered.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  className={
                    "memo-item" + (m.id === selectedId ? " active" : "")
                  }
                  onClick={() => setSelectedId(m.id)}
                >
                  <div className="memo-item-title">{displayTitle(m)}</div>
                  <div className="memo-item-meta">{formatTime(m.updatedAt)}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="editor">
        {selected ? (
          <>
            <div className="editor-toolbar">
              <span className="memo-item-meta">
                更新: {formatTime(selected.updatedAt)}
              </span>
              <div className="editor-toolbar-spacer" />
              <button
                type="button"
                className="btn-delete"
                onClick={() => handleDelete(selected.id)}
              >
                削除
              </button>
            </div>
            <input
              className="title-input"
              placeholder="タイトル（任意）"
              value={selected.title}
              onChange={(e) =>
                touchMemo(selected.id, { title: e.target.value })
              }
              aria-label="タイトル"
            />
            <textarea
              className="body-input"
              placeholder="本文を入力…"
              value={selected.body}
              onChange={(e) =>
                touchMemo(selected.id, { body: e.target.value })
              }
              aria-label="本文"
            />
          </>
        ) : (
          <div className="editor-empty">
            左の一覧からメモを選ぶか、「新しいメモ」を押してください。
          </div>
        )}
      </main>
    </div>
  );
}
