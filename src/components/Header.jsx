import { Link } from "react-router-dom";
import { Rotate as Hamburger } from "hamburger-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="top-0 sticky z-50">
      <div className={`flex flex-row justify-between shadow-sm items-center text-black px-10 py-5 transition-all  ${isOpen ? "backdrop-blur-none bg-white" : "backdrop-blur-sm"}`}>
        <p className="hidden md:flex">Sun, 31 August 2025</p>
        <h1 className="font-cormorant text-2xl md:text-[48px] font-bold">ajoungnarl</h1>
        <Link to="/signin" className="hover:underline transition-all duration-200 hidden md:block">
          Sign in
        </Link>
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>
      </div>
      <div
        className={`h-screen w-full bg-white shadow-lg p-5 items-center justify-between flex flex-col
        transform transition-transform duration-300 ease-in-out  md:hidden gap-5 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link to="/signin" className="flex text-center justify-center items-center py-2 text-lg underline transition-all duration-200" onClick={() => setIsOpen(false)}>
          Sign in
        </Link>
        <p className="flex justify-center items-center">Sun, 31 August 2025</p>
      </div>
    </div>
  );
};

export default Header;
