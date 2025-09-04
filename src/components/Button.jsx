import { Link } from "react-router-dom";

const Button = ({ text, className, wFull = false, path, withGoogle = false }) => {
  return (
    <div className="w-full flex justify-center ">
      <Link to={path || "#"} className={`justify-center items-center flex ${wFull ? "w-full" : ""}`}>
        <button className={`flex flex-row items-center justify-center gap-2 px-[20px] py-[8px] outline-1 outline-black hover:bg-[#BCBCBC] transition-all w-full ${className}`}>
          {withGoogle && <img src="/google.svg" alt="Google logo" className="w-[20px] h-[20px]" />}
          <span>{text}</span>
        </button>
      </Link>
    </div>
  );
};

export default Button;
