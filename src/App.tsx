import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import "./App.css";

function useTodoList() {
  const [todos, setTodos] = useState([
    {
      title: "Learn React",
      description: "",
      priority: 0,
      dueDate: new Date(),
      completed: false,
    },
  ]);

  const addTodo = (
    title: string,
    dueDate: Date,
    priority: number,
    description: string,
    completed = false,
  ) => {
    setTodos((prev) => [
      ...prev,
      { title, description, completed, dueDate, priority },
    ]);
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return { todos, addTodo, toggleTodo, removeTodo };
}

function Todo({ todo, index, toggleTodo, removeTodo }: any) {
  return (
    <li className="todo">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(index)}
      />
      <header>{todo.title}</header>
      <p>{todo.description}</p>
      <p>Priority: {todo.priority}</p>
      <p>Due {(todo.dueDate as Date).toUTCString()}</p>
      <button onClick={removeTodo}>Remove</button>
    </li>
  );
}

function App() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoList();
  const [parent] = useAutoAnimate();
  console.log(todos);

  function onSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const priority = parseInt(formData.get("priority") as string) as number;
    const dueDate = new Date(formData.get("dueDate") as string) as Date;
    console.log(title, description, priority, dueDate);

    addTodo(title, dueDate, priority, description);
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col my-12 gap-8">
      <form
        onSubmit={onSubmit}
        className="flex flex-row gap-4 justify-center items-center"
      >
        <label htmlFor="">Title</label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="border-2 p-[1]"
          required
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          placeholder="Description"
          name="description"
          className="border-2 p-[1]"
          required
        />
        <label htmlFor="">Priority</label>
        <input
          type="number"
          placeholder="Priority"
          name="priority"
          className="border-2 p-[1]"
          min={0}
          max={10}
          required
        />
        <label htmlFor="">Due date</label>
        <input
          type="date"
          placeholder="Due Date"
          name="dueDate"
          className="border-2 p-[1]"
          required
        />
        <button className="border-2 p-2 bg-slate-600 text-white" type="submit">
          Add
        </button>
      </form>
      {/* @ts-ignore */}
      <ul ref={parent}>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            index={index}
            toggleTodo={toggleTodo}
            removeTodo={() => removeTodo(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
