import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const { todos, loading, error, addTodo, toggleTodo, removeTodo } = useTodos();
  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="app">
      <h1>Todo</h1>
      <TodoInput onAdd={addTodo} />
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="empty-state">불러오는 중...</p>
      ) : (
        <>
          <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
          <p className="remaining">{remaining}개 남음</p>
        </>
      )}
    </main>
  );
}

export default App;
