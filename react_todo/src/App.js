import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import List from "./components/List/List";

function App() {
  const [text, setText] = useState("");
  const [todolist, setTodolist] = useState([]);

  useEffect(() => {
    // Load todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodos) {
      setTodolist(savedTodos);
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }, [todolist]);

  const Additem = () => {
    if (text.trim()) {
      const newTodoitem = {
        id: uuidv4(),
        item: text,
        Done: false,
      };
      setTodolist([...todolist, newTodoitem]);
      setText("");
    }
  };

 

  const deleteItem = (itemid) => {
    const newtodolist = todolist.filter(listitem => listitem.id !== itemid);
    setTodolist(newtodolist);
  };

  const editItem = (itemid, newText) => {
    const newtodolist = todolist.map((listitem) => {
      if (listitem.id === itemid) {
        return { ...listitem, item: newText };
      }
      return listitem;
    });
    setTodolist(newtodolist);
  };

  return (
    <div className="App">
    
      <h1>To Do List</h1>
      <div className="adder">
        <input type="text" placeholder="Add items" value={text} onChange={(e) => setText(e.target.value)} />
        <span onClick={Additem}>+</span>
      </div>
      <List todolist={todolist}  deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}

export default App;
