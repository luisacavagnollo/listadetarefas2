import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Fazer compras", category: "Pessoal", isCompleted: false },
    {
      id: 2,
      text: "Estudar para a faculdade",
      category: "Estudos",
      isCompleted: false,
    },
    { id: 3, text: "Pagar contas", category: "Financeiro", isCompleted: false },
  ]);

  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const addTodo = (text, category) => {
    const newTodo = {
      id: Date.now(),
      text,
      category,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "" || category.trim() === "") return;

    addTodo(value, category);
    setValue("");
    setCategory("");
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.isCompleted - b.isCompleted);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl">

        <h1 className="text-3xl text-white text-center mb-6 font-semibold">
          Lista de Tarefas
        </h1>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tarefas..."
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3">
          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-400">
              Nenhuma tarefa encontrada 😢
            </p>
          )}

          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow"
            >
              <div>
                <p
                  className={`text-white ${
                    todo.isCompleted
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {todo.text}
                </p>
                <p className="text-sm text-gray-400">
                  {todo.category}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => completeTodo(todo.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition"
                >
                  ✔
                </button>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-gray-800 p-4 rounded-lg shadow"
        >
          <input
            type="text"
            placeholder="Digite uma tarefa..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Estudos">Estudos</option>
            <option value="Financeiro">Financeiro</option>
          </select>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
            Adicionar
          </button>
        </form>

      </div>
    </div>
  );
}

export default App;