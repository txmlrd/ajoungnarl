import HomePost from "./HomePost";
import { motion } from "motion/react";
const LeftSideHome = () => {
  return (
    <div>
      <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "anticipate" }} className="font-cormorant lg:text-[36px] text-3xl font-bold">
        Featured Article
      </motion.h1>
      <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 2, ease: "anticipate" }} className="flex flex-col gap-10 mt-5 lg:mt-10 lg:ml-10">
        <HomePost />
      </motion.div>
    </div>
  );
};

export default LeftSideHome;
