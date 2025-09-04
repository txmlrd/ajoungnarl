import { Link } from "react-router-dom";

const Button = ({ text, className, path }) => {
  return (
    <div className="flex justify-center w-full">
      <button className={`px-[20px] py-[8px] outline-1 outline-black hover:bg-[#BCBCBC] transition-all ${className}`}>
        <Link to={path}>{text}</Link>
      </button>
    </div>
  );
};

export default Button;
