import './App.css';
import { useState,useEffect } from 'react';
import List from './List';

function App() {
  const [currentTodo, setCurrentTodo] = useState([]);
  
  const UpdateTodos = (val) => {
    setCurrentTodo([val, false]);
  }

  // const AddTodo = () => {
  //   let input = document.querySelector('input');
  //   let value = input.value;
  //   UpdateTodos([...todos, [value,false]]);
  //   input.value = "";
  //   // console.log(todos);
  // }
  useEffect(()=>{
    const fetchData = async() => {
      await fetch("http://localhost:3000/putList",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ json'
          },
          body: {
            "email": "kasasunil344@gmail.com",
            "todo":  currentTodo 
          }
        }
      )
    }
    fetchData();
  },[currentTodo])


  
  return (
    <div>
      <div className="card">
        <input type="text" placeholder='Enter your work' id="work" />
        <button onClick={() => { UpdateTodos(document.querySelector('#work').value) }}>Add</button>
      </div>
      <List />
    </div>
    
  );
}

export default App;
