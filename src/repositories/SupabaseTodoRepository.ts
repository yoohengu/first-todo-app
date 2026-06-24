import { supabase } from "../lib/supabaseClient";
import type { NewTodo, Todo } from "../types/todo";
import type { TodoRepository } from "./TodoRepository";

const TABLE = "todos";

export class SupabaseTodoRepository implements TodoRepository {
  async getAll(): Promise<Todo[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async add(todo: NewTodo): Promise<Todo> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({ title: todo.title })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async toggle(id: string, completed: boolean): Promise<Todo> {
    const { data, error } = await supabase
      .from(TABLE)
      .update({ completed })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE).delete().eq("id", id);
    if (error) throw error;
  }
}
