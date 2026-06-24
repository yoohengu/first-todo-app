import { useCallback, useEffect, useState } from "react";
import { todoRepository } from "../repositories";
import type { Todo } from "../types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    todoRepository
      .getAll()
      .then(setTodos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addTodo = useCallback(async (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const created = await todoRepository.add({ title: trimmed });
    setTodos((prev) => [created, ...prev]);
  }, []);

  const toggleTodo = useCallback(async (id: string, completed: boolean) => {
    const updated = await todoRepository.toggle(id, completed);
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const removeTodo = useCallback(async (id: string) => {
    await todoRepository.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { todos, loading, error, addTodo, toggleTodo, removeTodo };
}
