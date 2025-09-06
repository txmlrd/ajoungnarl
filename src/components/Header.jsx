import { Link } from "react-router-dom";
import { Rotate as Hamburger } from "hamburger-react";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState as useLocalState } from "react";
import CurrentDate from "./CurrentDate";
import { signOut } from "firebase/auth";
import { useAlert } from "../context/AlertContext";
import { Modal } from "antd";
import Button from "./Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useLocalState(null);
  const { showAlert } = useAlert();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleLogout();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      showAlert("Sign out successful!", "success");
      setIsMenuOpen(false);
    } catch (err) {
      showAlert("Sign out failed: " + err.message, "error");
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
      <Modal
        title="Confirm Logout"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div className="flex justify-end gap-2 p-0">
            <Button wFull text="No" className="text-black font-merriweather" onClick={handleCancel} />
            <Button wFull text="Yes" className="text-white bg-black hover:text-black font-merriweather" onClick={handleOk} />
          </div>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
      <div className={`flex flex-row justify-between shadow-sm items-center text-black  py-5 transition-all  ${isMenuOpen ? "backdrop-blur-none bg-white" : "backdrop-blur-sm"}`}>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 w-full items-center justify-items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" lg:block hidden">
            <CurrentDate />
          </div>
          <Link to="/">
            <h1 className="font-cormorant text-2xl lg:text-[48px] font-bold cursor-pointer">ajoungnarl</h1>
          </Link>
          <div className="justify-end lg:justify-center items-center gap-5 w-full hidden lg:flex">
            <Link to={user ? "/" : "/signin"} className="hover:underline transition-all duration-200 ">
              {user ? `Hi, ${user.email}` : "Sign in"}
            </Link>
            {user ? (
              <button onClick={showModal} className="hover:underline cursor-pointer transition-all duration-200 ">
                Sign out
              </button>
            ) : null}{" "}
          </div>

          <div className="lg:hidden">
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 h-screen w-full bg-white shadow-lg p-5 
  flex flex-col items-center justify-between gap-5
  transform transition-transform duration-300 ease-in-out
  lg:hidden z-50
  ${isMenuOpen ? "translate-x-0  pointer-events-auto" : "-translate-x-full  pointer-events-none"}`}
      >
        <div className={`flex flex-col gap-5 w-full transition-all  ${isMenuOpen ? "opacity-100" : "opacity-0"}`}>
          <div className={`flex justify-between items-center transition-all`}>
            <h1 className={`font-cormorant text-2xl font-bold lg:hidden block `}>ajoungnarl</h1>
            <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
          </div>
          <Link to={user ? "/" : "/signin"} className="flex text-center justify-center items-center py-2 text-lg hover:underline transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
            {user ? `Hi, ${user.email}` : "Sign in"}
          </Link>
          {user ? (
            <button onClick={showModal} className="hover:underline cursor-pointer transition-all duration-200 ">
              Sign out
            </button>
          ) : null}{" "}
        </div>

        <CurrentDate />
      </div>
    </div>
  );
};

export default Header;
