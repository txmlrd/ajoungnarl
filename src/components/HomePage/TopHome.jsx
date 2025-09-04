import React from "react";
import Button from "../Button";

const TopHome = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col text-center max-w-4xl my-10  h-[60vh] justify-center">
        <h1 className="md:text-[96px] text-6xl font-bold font-cormorant">Stories that matter, told with clarity.</h1>
        <p className="md:text-lg text-md mt-5 md:mx-40 ">Discover thoughtful perspectives on technology, culture, and the ideas shaping our world.</p>
        <Button text={"Start Reading"} className={"mt-4"} />
      </div>
    </div>
  );
};

export default TopHome;
