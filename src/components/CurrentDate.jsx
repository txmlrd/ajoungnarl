// components/CurrentDate.jsx
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { weekday: "short", day: "2-digit", month: "long", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDate(); // set pertama
    const interval = setInterval(updateDate, 60 * 1000); // update tiap menit
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.p initial={{ filter: "blur(4px)", opacity: 0, y: 10 }} animate={{ filter: "blur(0px)", opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 2, ease: "anticipate" }} className="flex">
      {currentDate}
    </motion.p>
  );
};

export default CurrentDate;
