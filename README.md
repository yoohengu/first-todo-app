# Todo App

React + TypeScript + Vite로 만든 Todo 앱. 현재는 `localStorage`에 저장하지만, Supabase로 바로 전환할 수 있도록 데이터 레이어를 분리해뒀다.

## 시작하기

```bash
npm install
npm run dev
```

## 구조

- `src/types/todo.ts` — Supabase `todos` 테이블 스키마와 맞춘 `Todo` 타입.
- `src/repositories/TodoRepository.ts` — CRUD 인터페이스.
- `src/repositories/LocalStorageTodoRepository.ts` — 현재 기본으로 쓰는 구현체.
- `src/repositories/SupabaseTodoRepository.ts` — Supabase용 구현체 (이미 작성되어 있음).
- `src/repositories/index.ts` — 환경변수 설정 여부에 따라 자동으로 구현체를 선택.
- `src/hooks/useTodos.ts` — UI에서 쓰는 상태 관리 훅. 구현체가 바뀌어도 수정할 필요 없음.

## Supabase로 전환하기

1. Supabase 프로젝트를 만들고 아래 SQL로 테이블을 생성한다.

   ```sql
   create table todos (
     id uuid primary key default gen_random_uuid(),
     title text not null,
     completed boolean not null default false,
     created_at timestamptz not null default now()
   );
   ```

2. `.env.example`을 `.env`로 복사하고 Supabase 프로젝트의 URL/anon key를 채운다.

   ```bash
   cp .env.example .env
   ```

3. 다시 `npm run dev`로 실행하면 `src/repositories/index.ts`가 자동으로 `SupabaseTodoRepository`를 사용한다. 코드 변경은 필요 없다.
