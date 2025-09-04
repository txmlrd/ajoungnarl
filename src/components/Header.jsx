import { Link } from "react-router-dom";
import { Rotate as Hamburger } from "hamburger-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="top-0 sticky z-[60]">
      <div className={`flex flex-row justify-between shadow-sm items-center text-black  py-5 transition-all  ${isOpen ? "backdrop-blur-none bg-white" : "backdrop-blur-sm"}`}>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 w-full items-center justify-items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="hidden lg:flex">Sun, 31 August 2025</p>
          <h1 className="font-cormorant text-2xl lg:text-[48px] font-bold">ajoungnarl</h1>
          <Link to="/signin" className="hover:underline transition-all duration-200 hidden lg:block">
            Sign in
          </Link>
          <div className="lg:hidden">
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 h-screen w-full bg-white shadow-lg p-5 
  flex flex-col items-center justify-between gap-5
  transform transition-transform duration-300 ease-in-out
  lg:hidden z-50
  ${isOpen ? "translate-x-0  pointer-events-auto" : "-translate-x-full  pointer-events-none"}`}
      >
        <div className={`flex flex-col gap-5 w-full transition-all  ${isOpen ? "opacity-100" : "opacity-0"}`}>
          <div className={`flex justify-between items-center transition-all`}>
            <h1 className={`font-cormorant text-2xl font-bold lg:hidden block `}>ajoungnarl</h1>
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
          </div>

          <Link to="/signin" className="flex text-center justify-center items-center py-2 text-lg underline transition-all duration-200" onClick={() => setIsOpen(false)}>
            Sign in
          </Link>
        </div>

        <p className="flex justify-center items-center">Sun, 31 August 2025</p>
      </div>
    </div>
  );
};

export default Header;
