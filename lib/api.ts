// Base URL for the Express backend. Override with NEXT_PUBLIC_API_URL if needed.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  // 204 No Content has no body to parse.
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

export function getTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/api/todos`).then((r) => handle<Todo[]>(r));
}

export function createTodo(title: string): Promise<Todo> {
  return fetch(`${API_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((r) => handle<Todo>(r));
}

export function updateTodo(
  id: number,
  patch: Partial<Pick<Todo, "title" | "completed">>
): Promise<Todo> {
  return fetch(`${API_URL}/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  }).then((r) => handle<Todo>(r));
}

export function deleteTodo(id: number): Promise<void> {
  return fetch(`${API_URL}/api/todos/${id}`, { method: "DELETE" }).then((r) =>
    handle<void>(r)
  );
}
