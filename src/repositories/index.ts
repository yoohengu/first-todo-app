import { isSupabaseConfigured } from "../lib/supabaseClient";
import { LocalStorageTodoRepository } from "./LocalStorageTodoRepository";
import { SupabaseTodoRepository } from "./SupabaseTodoRepository";
import type { TodoRepository } from "./TodoRepository";

// .env에 Supabase 키가 설정되면 자동으로 Supabase 구현체를 사용한다.
export const todoRepository: TodoRepository = isSupabaseConfigured
  ? new SupabaseTodoRepository()
  : new LocalStorageTodoRepository();
