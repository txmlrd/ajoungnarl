import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col gap-5 border border-black rounded-sm lg:p-10 p-5">
      <h1 className="font-cormorant text-3xl font-bold">Search</h1>
      <div className="flex items-center border border-gray-300  p-2">
        <input type="text" placeholder="Search..." className="flex-grow outline-none border-none" />
      </div>
    </div>
  );
};

export default Search;
