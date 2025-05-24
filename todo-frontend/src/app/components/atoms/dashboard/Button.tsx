"use client";

import React from "react";

const Button: React.FC<{
  label: string;
  handleClick: any;
  myClassname?: string;
}> = ({ label, handleClick, myClassname }) => {
  return (
    <div>
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${myClassname}`}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
