"use client";

import React from "react";

const AddTodoInput: React.FC<{ handleInputChange: any; value: string }> = ({
  handleInputChange,
  value,
}) => {
  return (
    <input
      type="text"
      placeholder="Add a new todo"
      className="border rounded-sm w-full p-2"
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default AddTodoInput;
