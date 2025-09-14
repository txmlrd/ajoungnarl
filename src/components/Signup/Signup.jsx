import Form from "../Form";
import Button from "../Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { firebaseErrorMessages } from "../../lib/firebaseErrorMessage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // pastikan db dari getFirestore

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        role : "free-member",
      });

      navigate("/signin");
      showAlert(`Register success: ${email}`, "success");
    } catch (err) {
      const message = firebaseErrorMessages[err.code] || "Register failed, please try again.";
      showAlert(message, "error");
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
