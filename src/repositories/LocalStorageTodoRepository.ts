import type { NewTodo, Todo } from "../types/todo";
import type { TodoRepository } from "./TodoRepository";

const STORAGE_KEY = "todos";

function readAll(): Todo[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeAll(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export class LocalStorageTodoRepository implements TodoRepository {
  async getAll(): Promise<Todo[]> {
    return readAll().sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async add(todo: NewTodo): Promise<Todo> {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: todo.title,
      completed: false,
      created_at: new Date().toISOString(),
    };
    writeAll([...readAll(), newTodo]);
    return newTodo;
  }

  async toggle(id: string, completed: boolean): Promise<Todo> {
    const todos = readAll();
    const target = todos.find((t) => t.id === id);
    if (!target) throw new Error(`Todo not found: ${id}`);
    target.completed = completed;
    writeAll(todos);
    return target;
  }

  async remove(id: string): Promise<void> {
    writeAll(readAll().filter((t) => t.id !== id));
  }
}
