import React from "react";
import TagButton from "./TagButton";
const Tags = () => {
  return (
    <div className="flex flex-col gap-5 border border-black rounded-sm lg:p-10 p-5">
      <h1 className="font-cormorant text-3xl font-bold">Tags</h1>
      <div className="flex flex-wrap gap-2">
        <TagButton text={"#UI/UX"} />
        <TagButton text={"#WebDevelopment"} />
        <TagButton text={"#React"} />
        <TagButton text={"#JavaScript"} />
      </div>
    </div>
  );
};

export default Tags;
