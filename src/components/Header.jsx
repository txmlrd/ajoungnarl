import { Link } from "react-router-dom";
import { Rotate as Hamburger } from "hamburger-react";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState as useLocalState } from "react";
import CurrentDate from "./CurrentDate";
import { signOut } from "firebase/auth";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useLocalState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      // redirect misal ke home / signin
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="top-0 sticky z-[60]">
      <div className={`flex flex-row justify-between shadow-sm items-center text-black  py-5 transition-all  ${isOpen ? "backdrop-blur-none bg-white" : "backdrop-blur-sm"}`}>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 w-full items-center justify-items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" lg:block hidden">
            <CurrentDate />
          </div>
          <Link to="/">
            <h1 className="font-cormorant text-2xl lg:text-[48px] font-bold cursor-pointer">ajoungnarl</h1>
          </Link>
          <div className="flex justify-end items-center gap-5 w-full">
            <Link to={user ? "/" : "/signin"} className="hover:underline transition-all duration-200 hidden lg:block">
              {user ? `Hi, ${user.email}` : "Sign in"}
            </Link>
            {user ? (
              <button onClick={handleLogout} className="hover:underline transition-all duration-200 hidden lg:block">
                Sign out
              </button>
            ) : null}{" "}
          </div>

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

          <Link to={user ? "/" : "/signin"} className="flex text-center justify-center items-center py-2 text-lg hover:underline transition-all duration-200" onClick={() => setIsOpen(false)}>
            {user ? `Hi, ${user.email}` : "Sign in"}
          </Link>
        </div>

        <CurrentDate />
      </div>
    </div>
  );
};

export default Header;
