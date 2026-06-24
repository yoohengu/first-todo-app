import type { NewTodo, Todo } from "../types/todo";

// 백엔드 구현체(localStorage, Supabase 등)를 갈아끼울 수 있도록 만든 인터페이스.
export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  add(todo: NewTodo): Promise<Todo>;
  toggle(id: string, completed: boolean): Promise<Todo>;
  remove(id: string): Promise<void>;
}
