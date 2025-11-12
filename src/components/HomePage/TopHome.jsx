import React from "react";
import Button from "../Button";
import { motion } from "framer-motion";

const TopHome = () => {
  const transition = {
    duration: 2,
    delay: 0.2,
    ease: [0, 0.71, 0.2, 1.01],
  };
  return (
    <div className="flex justify-center items-center ">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={transition} className="flex flex-col text-center max-w-4xl my-10  h-[60vh] justify-center">
        <h1 className="md:text-[96px] text-6xl font-bold font-cormorant">Stories that matter, told with clarity.</h1>
        <p className="md:text-lg text-md mt-5 md:mx-40 ">Discover thoughtful perspectives on technology, culture, and the ideas shaping our world.</p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }} className="flex justify-center">
          <Button text={"Start Reading"} className={"mt-4"} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TopHome;
