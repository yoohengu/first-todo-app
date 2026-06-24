// Supabase의 todos 테이블 스키마와 1:1로 맞춰둔 타입.
// create table todos (
//   id uuid primary key default gen_random_uuid(),
//   title text not null,
//   completed boolean not null default false,
//   created_at timestamptz not null default now()
// );
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

export type NewTodo = Pick<Todo, "title">;
