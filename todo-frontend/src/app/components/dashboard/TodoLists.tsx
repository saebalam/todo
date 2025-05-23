import React from 'react';
import TodoList from './TodoList';

const TodoLists: React.FC<{todoLists:any}> = ({todoLists}) => {
    return (
        <div className="p-4">
            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3 border-b">Task</th>
                        <th className="p-3 border-b">Status</th>
                        <th className="p-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todoLists.map((todo:any) => (
                        <TodoList key={todo.id} todo={todo} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoLists;