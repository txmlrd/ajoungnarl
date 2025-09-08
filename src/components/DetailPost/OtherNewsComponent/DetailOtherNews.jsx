import React from "react";
import { Link } from "react-router-dom";

const DetailOtherNews = () => {
  return (
    <Link to={"/signin"} className="w-full">
    <div className="flex flex-col lg:flex-row gap-3 items-center  group hover:cursor-pointer">
      <div className="lg:w-1/3 w-full h-24 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-all"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="news"
        />
      </div>
      <h1 className="lg:w-2/3 w-full text-[16px] break-words line-clamp-4 group-hover:underline">This post woulda blow up yo mind, go check this shi</h1>
    </div>
    </Link>
  );
};

export default DetailOtherNews;
