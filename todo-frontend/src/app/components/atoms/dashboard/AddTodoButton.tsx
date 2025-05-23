import React from 'react';

const AddTodoButton: React.FC<{handleAddTodo:any}> = ({handleAddTodo}) => {
    return (
        <div>
           <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddTodo}>
               Add
           </button>
        </div>
    );
};

export default AddTodoButton;