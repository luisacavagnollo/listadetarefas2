import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Fazer compras", category: "Pessoal", isCompleted: false },
    { id: 2, text: "Estudar para a faculdade", category: "Estudos", isCompleted: false },
    { id: 3, text: "Pagar contas", category: "Financeiro", isCompleted: false },
  ]);

    const [value, setValue] = useState('');
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');

  const addTodo = (text, category) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text,
      category,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  
  };
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id ? todo : null));
    
  }
  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === '' || category.trim() === '') return;

    addTodo(value, category);

    setValue('');
    setCategory('');
  };
  

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <h1 className="font-normal px-4 font-2xl text-center mt-4 text-4xl">
        Lista de tarefas
      </h1>
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden border focus-within:ring-2 focus-within:ring-blue-400">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Digite para pesquisar"
            className="w-full p-3 outline-none text-gray-700"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 transition">
            Pesquisar
          </button>
        </div>
      </div>
      <div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            removeTodo={removeTodo}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <div>
              <div>
                <div>
                  <p
                    className={
                      todo.isCompleted ? "line-through text-gray-400" : ""
                    }
                  >
                    {todo.text}
                  </p>
                  <p>Categoria: {todo.category}</p>
                </div>
                <div>
                  <button
                    onClick={() => completeTodo(todo.id)}
                    className="bg-green-500 text-white p-2 rounded border hover:bg-green-600 text-center"
                  >
                    Concluido
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="bg-red-500 text-white p-2 rounded border hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite sua tarefa"
            value={value}
            className="border p-2 rounded w-full mb-4"
            onChange={(e) => setValue(e.target.value)}
          />
          <select
            value={category}
            className="border p-2 rounded w-full mb-4"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione a categoria</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Estudos">Estudos</option>
            <option value="Financeiro">Financeiro</option>
          </select>
          <button className="bg-blue-500 text-white p-2 rounded border hover:bg-blue-600 mt-4">
            Adicionar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
}

export default App
