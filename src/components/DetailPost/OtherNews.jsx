import React from "react";
import DetailOtherNews from "./OtherNewsComponent/DetailOtherNews";

const OtherNews = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="font-bold text-xl">Others News</h1>
      <div className="flex flex-col gap-5">
        <DetailOtherNews />
      </div>
    </div>
  );
};

export default OtherNews;
