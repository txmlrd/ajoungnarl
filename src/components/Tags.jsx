import React from "react";

const Tags = () => {
  return (
    <div className="flex flex-col gap-5 border border-black rounded-sm lg:p-10 p-5">
      <h1 className="font-cormorant text-3xl font-bold">Tags</h1>
      <div className="flex flex-wrap gap-2">
        <NewTags text={"#UI/UX"} />
        <NewTags text={"#WebDevelopment"} />
        <NewTags text={"#React"} />
        <NewTags text={"#JavaScript"} />
      </div>
    </div>
  );
};

const NewTags = ({ text }) => {
  return <div className="rounded-lg text-white bg-black w-fit px-2 py-1 text-[14px]">{text}</div>;
};

export default Tags;
