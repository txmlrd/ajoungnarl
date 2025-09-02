import React from "react";
import Button from "../Button";

const TopHome = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col text-center">
        <h1 className="text-[96px] font-bold font-cormorant">Stories that matter, told with clarity.</h1>
        <p className="text-lg mt-4">Discover thoughtful perspectives on technology, culture, and the ideas shaping our world.</p>
        <Button />
      </div>
    </div>
  );
};

export default TopHome;
