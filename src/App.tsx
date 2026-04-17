import { useState, useEffect } from "react";
import "./App.css";
import api from "./services/api";

interface Todo {
  id: number;
  tarefa: string;
  hora: string;
  categoria: string;
  isCompleted: boolean;
}
  // o componente `App` é a estrutura principal da aplicação, responsável por gerenciar o estado das tarefas, interagir com a API para buscar, adicionar, remover e completar tarefas, e renderizar a interface do usuário. Ele utiliza hooks como `useState` para gerenciar o estado local e `useEffect` para realizar a busca inicial das tarefas quando o componente é montado. A interface do usuário inclui um campo de busca, uma lista de tarefas filtrada e um formulário para adicionar novas tarefas.
function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    api
      .get<Todo[]>("/TodoList")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error: unknown) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }, []);

  const [value, setValue] = useState("");
  const [hora, setHora] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");


  //adicionar uma nova tarefa, enviando os dados para a API e atualizando o estado local com a nova tarefa retornada pela API. Se ocorrer um erro durante a adição, ele será registrado no console.
  const addTodo = async (text: string, category: string, hora: string) => {
    try {
      const response = await api.post("/TodoList", {
        tarefa: text,
        hora: hora,
        categoria: category,
      });

      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };
  //remove uma tarefa específica, enviando uma solicitação de exclusão para a API e atualizando o estado local para refletir a remoção. Se ocorrer um erro durante a exclusão, ele será registrado no console.
  const removeTodo = async (id: number) => {
    try {
      await api.delete(`/TodoList/${id}`);

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };
  //marca uma tarefa como concluída ou não concluída, atualizando o estado local para refletir a mudança. Ele percorre a lista de tarefas e inverte o valor de `isCompleted` para a tarefa com o ID correspondente. Essa função não faz uma chamada à API, então a mudança é apenas local e não persistente.
  const completeTodo = async (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };
  //manipula o envio do formulário para adicionar uma nova tarefa. Ele previne o comportamento padrão do formulário, verifica se os campos de tarefa, categoria e hora não estão vazios, e então chama a função `addTodo` para adicionar a nova tarefa. Após a adição, ele limpa os campos de entrada para permitir a adição de uma nova tarefa.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "" || category.trim() === "" || hora.trim() === "")
      return;

    addTodo(value, category, hora);
    setValue("");
    setCategory("");
    setHora("");
  };
  //filtra as tarefas com base no termo de busca, comparando o texto da tarefa com o valor do campo de busca. Ele converte ambos para minúsculas para garantir que a busca de certo. O resultado é uma lista de tarefas que correspondem ao termo de busca, que é então renderizada na interface do usuário.
  const filteredTodos = todos.filter((todo) =>
    todo.tarefa.toLowerCase().includes(search.toLowerCase()),
  );

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
            <p className="text-gray-400 text-center">
              Nenhuma tarefa encontrada.
            </p>
          )}

          //renderiza a lista de tarefas filtradase e exibe cada tarefa
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow"
            >
              <div>
                <p
                  className={`text-white ${
                    todo.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.tarefa}
                </p>
                <p className="text-sm text-gray-400">{todo.hora}</p>
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

          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
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
