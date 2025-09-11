import React from "react";
import DetailOtherNews from "./OtherNewsComponent/DetailOtherNews";

const OtherNews = ({ currentPostId, posts }) => {
  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="font-bold text-xl">Others News</h1>
      <div>
        <DetailOtherNews currentPostId={currentPostId} posts={posts} />
      </div>
    </div>
  );
};

export default OtherNews;
