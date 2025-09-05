import Form from "../Form";
import Button from "../Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/signin");
      alert(`Register berhasil: ${email}`);
    } catch (err) {
      alert("Register gagal, silakan coba lagi. : " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:h-[70vh] h-[80vh] flex flex-col justify-center items-center w-full">
      <h1 className="font-cormorant font-bold lg:text-5xl text-3xl text-center">Create an account</h1>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col lg:w-96 w-full justify-center items-center">
          <Form disabled={loading} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Form disabled={loading} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <Button onClick={handleSignup} text={loading ? "Signing up..." : "Sign up"} wFull className={"bg-black text-white hover:text-black lg:w-96 w-full"} disabled={loading} />
      </div>
      <h1 className="my-2">or</h1>
      <Button text={"Sign up with Google"} wFull withGoogle className={"bg-black text-white hover:text-black lg:w-96 w-full"} disabled={loading} />
    </div>
  );
};

export default Signup;
