import React from "react";
import TopHome from "../components/HomePage/TopHome";
import HomePost from "../components/HomePage/HomePost";
import LeftSideHome from "../components/HomePage/LeftSideHome";
import RightSideHome from "../components/HomePage/RightSideHome";

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopHome />
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="lg:w-2/3">
          <LeftSideHome />
        </div>
        <div className="lg:w-1/3">
          <RightSideHome />
        </div>
      </div>
    </div>
  );
};

export default Home;
