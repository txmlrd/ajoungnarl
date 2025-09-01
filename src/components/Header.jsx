import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row justify-between shadow-sm items-center  text-black px-10 py-5">
      <p>Sun, 31 August 2025</p>
      <h1 className="font-cormorant text-[48px] font-bold">ajoungnarl</h1>
      <Link to="/signin" className="hover:underline transition-all duration-200">Sign in</Link>
    </div>
  );
};

export default Header;
