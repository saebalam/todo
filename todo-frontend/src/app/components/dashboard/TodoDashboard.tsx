'use client'

import React from 'react';
import AddTodoInput from '../atoms/dashboard/AddTodoInput';
import AddTodoButton from '../atoms/dashboard/AddTodoButton';
import TodoLists from './TodoLists';

const TodoDashboard: React.FC = () => {
    const [todos, setTodos] = React.useState<any>([]);
    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        console.log(event.target.value);
    };

    const handleAddTodo = () => {
        setTodos([...todos, { id: Date.now(), text: inputValue, status: 'In Progress' }]);
        setTimeout(() => {
            setInputValue('');
        }
        , 500);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <div className='flex items-center justify-between p-4'>
            <AddTodoInput handleInputChange={handleInputChange} value={inputValue} />
            <AddTodoButton handleAddTodo={handleAddTodo} />
            </div>
            <TodoLists todoLists={todos} />
        </div>
    );
};

export default TodoDashboard;