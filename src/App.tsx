import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Fazer compras", category: "Pessoal", isCompleted: false },
    { id: 2, text: "Estudar para a faculdade", category: "Estudos", isCompleted: false },
    { id: 3, text: "Pagar contas", category: "Financeiro", isCompleted: false },
  ]);

  return (
    <div className=''>
      <h1 className='font-normal px-4 font-2xl text-center mt-4 text-4xl'>
        Lista de tarefas
      </h1>
      <div>
        {todos.map((todo) => (
          <div>
            <div>
              <div>
                <p>{todo.text}</p>
                <p>Categoria: {todo.category}</p>
              </div>
              <div>
                <button className='bg-green-500 text-white p-2 rounded border hover:bg-green-600 text-center'>Concluido</button>
                <button className='bg-red-500 text-white p-2 rounded border hover:bg-red-600'>X</button>
              </div>
            </div>
          
          </div>
        ))}
      <form action="{setTodos}" className='mt-4'>
          <input type="text" placeholder='Digite sua tarefa' className='border p-2 rounded w-full mb-4' />
      </form>
      </div>
    </div>
    
  )
}

export default App
