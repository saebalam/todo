'use client';
import React from 'react';

const AddTodoInput: React.FC<{handleInputChange:any,value:string}> = ({handleInputChange,value}) => {
    
    return (
        <div>
          <input type="text" placeholder="Add a new todo" value={value} onChange={handleInputChange} />
        </div>
    );
};

export default AddTodoInput;