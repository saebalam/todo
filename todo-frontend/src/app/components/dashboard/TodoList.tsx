import React from 'react';

const TodoList: React.FC<{todo:any}> = ({todo}) => {
    console.log(todo);
    return (
        <tr className="hover:bg-gray-50">
            <td className="p-3 border-b text-black">{todo.text}</td>
            <td className="p-3 border-b text-yellow-600">In Progress</td>
            <td className="p-3 border-b space-x-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
        </tr>
    );
};

export default TodoList;