"use client";

import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  type Todo,
} from "@/lib/api";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Initial load
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function run(action: () => Promise<void>) {
    setError(null);
    try {
      await action();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    setAdding(true);
    await run(async () => {
      const created = await createTodo(title);
      setTodos((prev) => [...prev, created]);
      setNewTitle("");
    });
    setAdding(false);
  }

  async function handleToggle(todo: Todo) {
    await run(async () => {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    });
  }

  async function handleSaveEdit(id: number) {
    const title = editTitle.trim();
    if (!title) return;
    await run(async () => {
      const updated = await updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditingId(null);
      setEditTitle("");
    });
  }

  async function handleDelete(id: number) {
    await run(async () => {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    });
  }

  const remaining = todos.filter((t) => !t.completed).length;

  const total = todos.length;
  const progress = total === 0 ? 0 : Math.round(((total - remaining) / total) * 100);

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-14">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Your todos</h1>
        <p className="mt-1.5 text-sm text-muted">
          {loading ? "Loading…" : `${remaining} of ${total} remaining`}
        </p>
        {!loading && total > 0 && (
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-black/6 dark:bg-white/8">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-xl border border-(--border) bg-card px-4 py-2.5 text-sm shadow-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
        />
        <button
          type="submit"
          disabled={adding || !newTitle.trim()}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-accent/25 transition-all hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>

      {error && (
        <div className="animate-in mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      {/* List */}
      {!loading && total === 0 && !error && (
        <div className="rounded-2xl border border-dashed border-(--border) px-4 py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl text-accent">
            ✓
          </div>
          <p className="text-sm font-medium">All clear</p>
          <p className="mt-1 text-sm text-muted">
            No todos yet. Add your first one above.
          </p>
        </div>
      )}

      <ul className="flex flex-col gap-2.5">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="animate-in group flex items-center gap-3 rounded-xl border border-(--border) bg-card px-4 py-3 shadow-sm transition-all hover:shadow-md"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
              className="h-4.5 w-4.5 shrink-0 cursor-pointer rounded accent-accent"
            />

            {editingId === todo.id ? (
              <input
                type="text"
                value={editTitle}
                autoFocus
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit(todo.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                className="flex-1 rounded-lg border border-accent/60 bg-transparent px-2.5 py-1 text-sm outline-none"
              />
            ) : (
              <span
                className={`flex-1 text-sm transition-colors ${
                  todo.completed
                    ? "text-muted line-through"
                    : "text-foreground"
                }`}
              >
                {todo.title}
              </span>
            )}

            <div className="flex shrink-0 items-center gap-1 text-xs font-medium opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
              {editingId === todo.id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    className="rounded-md px-2 py-1 text-accent transition-colors hover:bg-accent/10"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-md px-2 py-1 text-muted transition-colors hover:bg-black/5 dark:hover:bg-white/6"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditTitle(todo.title);
                    }}
                    className="rounded-md px-2 py-1 text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/6"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="rounded-md px-2 py-1 text-red-600 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/40"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
