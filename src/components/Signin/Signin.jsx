import React from "react";
import Form from "../Form";
import Button from "../Button";
import { Link } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      navigate("/");
      alert(`Login berhasil: ${userCredential.user.email}`);
    } catch (err) {
      alert("Login gagal: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:h-[70vh] h-[80vh] flex flex-col justify-center items-center w-full">
      <h1 className="font-cormorant font-bold lg:text-5xl text-3xl text-center">Sign in</h1>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col lg:w-96 w-full justify-center items-center ">
          <Form placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <Form placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <Button onClick={handleSignin} text={loading ? "Signing in..." : "Sign in"} wFull className={"bg-black text-white hover:text-black lg:w-96 w-full"} />
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
