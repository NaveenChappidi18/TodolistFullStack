import './App.css';
import { useState } from 'react';
import List from './List';

function App() {
  let arr = [];
  const [todos, UpdateTodos] = useState(arr);

  const AddTodo = () => {
    let input = document.querySelector('input');
    let value = input.value;
    UpdateTodos([...todos, [value,false]]);
    input.value = "";
    // console.log(todos);
  }

  const updateTodo = (arr) => {
    UpdateTodos(arr);
    
  }
  
  return (
    <div>
      <div className="card">
        <input type="text" placeholder='Enter your work' />
        <button onClick={AddTodo}>Add</button>
      </div>
      <List children={todos} func={updateTodo}/>
    </div>
    
  );
}

export default App;
