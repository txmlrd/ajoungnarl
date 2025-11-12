import React from "react";
import Search from "../Search";
import RecentPost from "../RecentPost";
import Categories from "../Categories";
import Tags from "../Tags";
import { motion } from "motion/react";

const RightSideHome = () => {
  return (
    <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 2, ease: "anticipate" }} className="flex flex-col gap-5">
      {/* <Search /> */}
      <RecentPost />
      {/* <Categories /> */}
      {/* <Tags /> */}
    </motion.div>
  );
};

export default RightSideHome;
