const Button = ({ text, className }) => {
  return (
    <div className="flex justify-center">
      <button className={`px-[20px] py-[8px] outline-1 outline-black hover:bg-[#BCBCBC] transition-all ${className}`}>{text}</button>
    </div>
  );
};

export default Button;
