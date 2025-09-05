// components/CurrentDate.jsx
import { useState, useEffect } from "react";

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

  return <p className="flex">{currentDate}</p>;
};

export default CurrentDate;
