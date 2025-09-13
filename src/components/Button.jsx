import { Link } from "react-router-dom";

const Button = ({ text, className, wFull = false, path, withGoogle = false, onClick, disabled }) => {
  const baseClass = `flex flex-row items-center justify-center gap-2 px-[20px] py-[8px] outline-1 outline-black hover:bg-[#BCBCBC] transition-all ${wFull ? "w-full" : ""} ${className} ${
    disabled ? "cursor-not-allowed opacity-75" : "hover:bg-[#BCBCBC] cursor-pointer"
  }`;

  const content = (
    <>
      {withGoogle && <img src="/google.svg" alt="Google logo" className="w-[20px] h-[20px]" />}
      <span>{text}</span>
    </>
  );

  return (
    <div className="w-full flex justify-center">
      {path ? (
        <Link to={path} className={`justify-center items-center flex ${wFull ? "w-full" : ""}`}>
          <button className={baseClass}>{content}</button>
        </Link>
      ) : (
        <button onClick={onClick} className={baseClass} disabled={disabled}>
          {content}
        </button>
      )}
    </div>
  );
};

export default Button;
