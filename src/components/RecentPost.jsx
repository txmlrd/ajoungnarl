import React from "react";

const RecentPost = () => {
  return (
    <div className="flex flex-col gap-5 border border-black rounded-sm lg:p-10 p-5">
      <h1 className="font-cormorant text-3xl font-bold">Recent Posts</h1>
      <div className="flex flex-col gap-2">
        <NewPost />
        <NewPost />
        <NewPost />
        <NewPost />
      </div>
    </div>
  );
};

const NewPost = () => {
  return (
    <div className="flex flex-col gap-1 ">
      <h1 className="text-md font-bold line-clamp-1">The Future of AI in 2025</h1>
      <p className="text-sm">May 15, 2025</p>
    </div>
  );
};

export default RecentPost;
