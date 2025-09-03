import React from "react";
import { Linkedin } from "lucide-react";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-10 ">
      <div className=" justify-between w-full py-10 border-y border-gray-300 ">
        <div className="max-w-7xl mx-auto flex lg:flex-row flex-col gap-5 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-1 lg:w-2/3 max-w-7xl mx-auto">
            <h1 className="font-cormorant text-2xl md:text-[32px] font-bold ">ajoungnarl</h1>
            <p className="md:text-lg text-md max-w-2xl">A modern minimalist blog focused on thoughtful content and clean design. Stories that matter, told with clarity.</p>
            <div className="flex flex-row gap-2 pt-3 ">
              <Link to="https://github.com/txmlrd" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-all" />
              </Link>
              <Link to="https://linkedin.com/in/gungadhisanjaya" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-all" />
              </Link>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col justify-between lg:w-1/3 gap-5 ">
            <div className="flex flex-col gap-4">
              <h1 className="font-cormorant text-2xl md:text-[32px] font-bold">Navigation</h1>
              <div className="flex flex-col gap-2 *:hover:underline *:w-fit">
                <Link to="/about" className="md:text-lg text-md">
                  About
                </Link>
                <Link to="/blog" className="md:text-lg text-md">
                  Blog
                </Link>
                <Link to="/contact" className="md:text-lg text-md">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-cormorant text-2xl md:text-[32px] font-bold">Legal</h1>
              <div className="flex flex-col gap-2 *:hover:underline *:w-fit">
                <Link to="/about" className="md:text-lg text-md">
                  Privacy Policy
                </Link>
                <Link to="/blog" className="md:text-lg text-md">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 my-10">© 2025 ajoungnarl. All rights reserved.</p>
    </div>
  );
};

export default Footer;
