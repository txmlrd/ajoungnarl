import React from "react";
import Search from "../Search";
import RecentPost from "../RecentPost";
import Categories from "../Categories";
import Tags from "../Tags";

const RightSideHome = () => {
  return (
    <div className="flex flex-col gap-5">
      <Search />
      <RecentPost />
      <Categories />
      <Tags />
    </div>
  );
};

export default RightSideHome;
