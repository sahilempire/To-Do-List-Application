import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  // Fetch the todos from the backend
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  // Handle adding or updating a todo
  const handleSubmit = () => {
    if (!title) {
      alert("Please enter a title for the todo!");
      return;
    }

    const todoData = { title, description };
    
    const method = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:5000/todos/${editTodoId}`
      : "http://localhost:5000/todos";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoData),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        if (editMode) {
          setTodos(
            todos.map((todo) =>
              todo.id === newTodo.id ? newTodo : todo
            )
          );
        } else {
          setTodos([...todos, newTodo]);
        }
        resetForm();
      });
  };

  // Handle deleting a todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  // Handle completing a todo
  const toggleCompletion = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, done: !todo.done }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        );
      });
  };

  // Handle editing a todo
  const startEdit = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setTitle(todo.title);
    setDescription(todo.description);
    setEditMode(true);
    setEditTodoId(id);
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditMode(false);
    setEditTodoId(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Enter Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>
          {editMode ? "Update Todo" : "Add Todo"}
        </button>
        {editMode && <button onClick={resetForm}>Cancel Edit</button>}
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleCompletion(todo.id)}
            />
            <span className="todo-title">{todo.title}</span>
            <p className="todo-description">{todo.description}</p>
            <button className="edit-btn" onClick={() => startEdit(todo.id)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
