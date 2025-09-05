import React from "react";

const LoadingFallback = () => {
  return (
    <div className="flex justify-center items-center lg:h-[70vh] h-[80vh] w-full py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default LoadingFallback;
