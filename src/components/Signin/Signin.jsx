import React from "react";
import Form from "../Form";
import Button from "../Button";

const Signin = () => {
  return (
    <div className="lg:h-[50vh] h-[80vh] flex flex-col justify-center items-center w-full">
      <h1 className="font-cormorant font-bold lg:text-5xl text-3xl text-center">Log in or create new account</h1>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <Form placeholder="Username" type="text" />
        <Form placeholder="Password" type="password" />
        <Button text={"Sign In"} className={"bg-black text-white hover:text-black lg:w-96 w-full"} />
      </div>
    </div>
  );
};

export default Signin;
