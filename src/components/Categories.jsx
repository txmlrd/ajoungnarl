import React from "react";

const Categories = () => {
  return (
    <div className="flex flex-col gap-5 border border-black rounded-sm lg:p-10 p-5">
      <h1 className="font-cormorant text-3xl font-bold">Categories</h1>
      <div className="flex flex-col gap-2">
        <NewCategory />
        <NewCategory />
        <NewCategory />
      </div>
    </div>
  );
};

const NewCategory = () => {
  return (
    <div className="flex flex-row w-full justify-between">
      <h1 className="text-md font-bold line-clamp-1">Technology</h1>
      <div className="rounded-lg text-white bg-black w-fit px-2 py-1 text-[14px]">100</div>
    </div>
  );
};

export default Categories;
