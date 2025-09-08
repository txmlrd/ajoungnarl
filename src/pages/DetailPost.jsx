import React from "react";
import TopPost from "../components/DetailPost/TopPost";
import Comments from "../components/DetailPost/Comments";
import OtherNews from "../components/DetailPost/OtherNews";

const DetailPost = () => {
  return (
    <div className="flex flex-col gap-5 max-w-[500px] mx-auto my-10">
      <TopPost />
      <Comments />
      <OtherNews />
    </div>
  );
};

export default DetailPost;
