import deleteTodo from "@/app/networking/todo/deleteTodo";
import React from "react";
import Dropdown from "../atoms/dashboard/Dropdown";
import putStatus from "@/app/networking/todo/putStatus";
import { useMediaQuery } from "react-responsive";

const TodoList: React.FC<{ todo: any; refreshTodo: Function }> = ({
  todo,
  refreshTodo,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  const options = ["In Progress", "Completed", "Pending"];

  const isAdmin = localStorage.getItem("isAdmin") || "false";
  const [selected, setSelected] = React.useState<string>(
    todo.status || "Pending"
  );

  const handleChange = (value: string) => {
    setSelected(value);
    const data = putStatus(todo.id, value);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteTodo(todo.id);
      if (data.deleted) {
        refreshTodo();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <tr className="hover:bg-gray-50">
      <td className={`p-3 border-b text-black whitespace-nowrap ${isSmallScreen?'max-w-[100px]':''} text-ellipsis overflow-hidden`}>{todo.text}</td>
      {(isAdmin == "true" || selected == "Completed") && (
        <td className={`p-3 border-b ${selected == 'Completed'? 'text-green-700':'text-yellow-600'}`}>{selected}</td>
      )}
      {isAdmin == "false" && selected != "Completed" && (
        <td className="p-3 border-b space-x-2">
          <Dropdown
            label={selected}
            options={options}
            selected={selected}
            onChange={handleChange}
          />
        </td>
      )}
      {isAdmin == "false" && (
        <td className="p-3 border-b space-x-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default TodoList;
