import React from "react";

const Form = ({ placeholder, type }) => {
  return (
    <div className="flex flex-col gap-1 my-4 w-full justify-center items-center">
      <div className="flex flex-col gap-1 w-full">
        <p className="text-black text-sm font-bold items-start">{placeholder}</p>
        <input type={type} placeholder={placeholder} className="border border-gray-700  p-2 max-w-96 focus:outline-none focus:ring-2 focus:ring-black" />
      </div>
    </div>
  );
};

export default Form;
