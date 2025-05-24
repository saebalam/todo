import Image from "next/image";
import { useState } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block w-48">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between px-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-left"
      >
        {selected || label}
        <span>
            <Image
              src="/images/ic_chevron.svg"
              alt="Arrow"
              width={16}
              height={16}
            className="inline-block ml-2"
            />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
