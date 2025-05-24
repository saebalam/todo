"use client";

import React, { useEffect } from "react";
import AddTodoInput from "../atoms/dashboard/AddTodoInput";
import TodoLists from "./TodoLists";
import getTodos from "@/app/networking/todo/getTodos";
import addTodo from "@/app/networking/todo/addTodo";
import Button from "../atoms/dashboard/Button";
import Header from "../header/Header";

const TodoDashboard: React.FC = () => {
  const [todos, setTodos] = React.useState<any>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const isAdmin = localStorage.getItem("isAdmin") || "false";
  const [token, setToken] = React.useState<string>();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("token")
        : null;
    if (token) {
      setToken(token);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (!inputValue) {
      alert("Please enter a todo item");
      return;
    }

    const data = await addTodo(token!, inputValue, "Pending");
    setTodos(data);
    setTimeout(() => {
      setInputValue("");
    }, 500);
  };

  const fetchTodos = async () => {
    try {
      const data = await getTodos();

      if (data) {
        setTodos(data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <Header />
      <h1 className="text-[32px] p-2 text-[#000000b3]">Todo List</h1>
      {isAdmin == "false" && (
        <div className="flex items-center justify-between p-4 gap-2">
          <AddTodoInput
            handleInputChange={handleInputChange}
            value={inputValue}
          />
          <Button label="Add" handleClick={handleAddTodo} />
        </div>
      )}

      {loading && <p className="text-[22px] text-center mt-12">Loading...</p>}

      {!loading && todos.length === 0 && (
        <p className="text-[22px] text-center mt-12">Start Adding Items</p>
      )}

      {!loading && todos.length > 0 && (
        <div className="h-[500px] overflow-y-auto">
          <TodoLists todoLists={todos} refreshTodo={fetchTodos} />
        </div>
      )}
    </div>
  );
};

export default TodoDashboard;
