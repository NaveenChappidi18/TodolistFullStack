import './App.css';
import { useState,useEffect } from 'react';
import List from './List';

function App() {
  const [currentTodo, setCurrentTodo] = useState([]);
  const [change, setChange] = useState(0);
  
  const UpdateTodos = () => {
    let val = document.querySelector('#work').value;
    let temp = [val, false];
    setCurrentTodo(temp);
    document.querySelector('#work').value = "";
  }


  const postDataToDb = async () => {
    console.log("Current item ", currentTodo);
    //write a post request with body {"todo":currentTodo,"email":"kasasunil344@gmail.com"} and url : http://localhost:3000/putList
    try {
      const response = await fetch('http://localhost:3000/putList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: currentTodo,
          email: "kasasunil344@gmail.com"
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    if (currentTodo.length > 0) {
      postDataToDb();
    }
    setChange(1 - change);
  }, [currentTodo])
  

  let [fetchedData, setTotData] = useState([]);
  const email = "kasasunil344@gmail.com";
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/list/${email}`);
      const data = await response.json();
      setTotData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData();

    return () => {
      console.log("Clean up function");
      setTotData([]);
    }
  }, [change]);

  const changeFunc = () => {
    setChange(1 - change);
  }
  
  return (
    <div>
      <div className="card">
        <input type="text" placeholder='Enter your work' id="work" />
        <button onClick={() => { UpdateTodos();setChange(1 - change) }}>Add</button>
      </div>
      <List totData={fetchedData} setChanged={changeFunc}/>
    </div>
    
  );
}

export default App;
