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

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Your todos</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {loading
            ? "Loading…"
            : `${remaining} of ${todos.length} remaining`}
        </p>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-lg border border-black/[.12] bg-white px-4 py-2 text-sm outline-none focus:border-black/[.4] dark:border-white/[.18] dark:bg-zinc-900 dark:focus:border-white/[.5]"
        />
        <button
          type="submit"
          disabled={adding || !newTitle.trim()}
          className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      {/* List */}
      {!loading && todos.length === 0 && !error && (
        <p className="rounded-lg border border-dashed border-black/[.12] px-4 py-8 text-center text-sm text-zinc-500 dark:border-white/[.18]">
          No todos yet. Add your first one above.
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 rounded-lg border border-black/[.08] bg-white px-4 py-3 dark:border-white/[.145] dark:bg-zinc-900"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
              className="h-4 w-4 shrink-0 cursor-pointer accent-black dark:accent-white"
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
                className="flex-1 rounded border border-black/[.2] bg-transparent px-2 py-1 text-sm outline-none dark:border-white/[.3]"
              />
            ) : (
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? "text-zinc-400 line-through dark:text-zinc-600"
                    : "text-black dark:text-zinc-100"
                }`}
              >
                {todo.title}
              </span>
            )}

            <div className="flex shrink-0 gap-2 text-xs font-medium">
              {editingId === todo.id ? (
                <>
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    className="text-green-600 hover:underline dark:text-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-zinc-500 hover:underline"
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
                    className="text-zinc-600 hover:underline dark:text-zinc-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-600 hover:underline dark:text-red-500"
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
