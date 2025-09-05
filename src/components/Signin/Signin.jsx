import React from "react";
import Form from "../Form";
import Button from "../Button";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="lg:h-[70vh] h-[80vh] flex flex-col justify-center items-center w-full">
      <h1 className="font-cormorant font-bold lg:text-5xl text-3xl text-center">Sign in</h1>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col lg:w-96 w-full justify-center items-center ">
          <Form placeholder="Email" type="email" />
          <Form placeholder="Password" type="password" />
        </div>

        <Button text={"Sign In"} wFull className={"bg-black text-white hover:text-black lg:w-96 w-full"} />
      </div>
      <h1 className="my-2">or</h1>

      <Button text={"Sign in with Google"} wFull withGoogle className={"bg-black text-white hover:text-black lg:w-96 w-full"} />
      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="underline font-bold">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Signin;
