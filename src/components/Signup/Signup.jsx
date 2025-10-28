import Form from "../Form";
import Button from "../Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { firebaseErrorMessages } from "../../lib/firebaseErrorMessage";
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // pastikan db dari getFirestore

const Signup = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleCheckEmail = async (email) => {
    const checkEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!checkEmailFormat.test(email)) {
      showAlert("Please enter a valid email address.", "error");
      return;
    }
    try {
      console.log("Checking email:", email);
      setLoading(true);
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      console.log("Query snapshot:", querySnapshot);
      if (!querySnapshot.empty) {
        showAlert("Email already in use, please use another email.", "error");
      } else {
        showAlert("Email is available, please proceed to the next step.", "success");
        setNextStep(true);
      }
    } catch (err) {
      console.error("Error checking email:", err);
      showAlert("Failed to check email, please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simpan data user ke Firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: name,
          phoneNumber: phoneNumber,
          createdAt: new Date(),
          role: "free-member",
        });
        await setDoc(
          doc(db, "users", user.uid, "socialmedia", "default"),
          {
            instagram: instagram,
            linkedin: linkedin,
            tiktok: tiktok,
          },
          { merge: true }
        );
      } catch (firestoreError) {
        console.error("Error saving user to Firestore:", firestoreError);
        showAlert("Failed to save user data, please try again.", "error");
      }

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
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex justify-center items-center">
            <Form disabled={loading || nextStep} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {nextStep && (
            <>
              <div className="flex flex-row gap-2">
                <Form  placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <Form  placeholder="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>

              <div className="flex flex-row gap-2">
                <Form  placeholder="Instagram" type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                <Form  placeholder="LinkedIn" type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div className="flex flex-row gap-2">
                <Form  placeholder="TikTok" type="text" value={tiktok} onChange={(e) => setTiktok(e.target.value)} />
                <Form  placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </>
          )}
        </div>
        {!nextStep && <Button onClick={() => handleCheckEmail(email)} text={"Next"} />}
        {nextStep && <Button onClick={handleSignup} text={loading ? "Signing up..." : "Sign up"} wFull className={"bg-black text-white hover:text-black lg:w-96 w-full"} disabled={loading} />}
      </div>

      {!nextStep && (
        <>
          <h1 className="my-2">or</h1>
          <Button text={"Sign up with Google"} wFull withGoogle className={"bg-black text-white hover:text-black lg:w-96 w-full"} disabled={loading} />
        </>
      )}
    </div>
  );
};

export default Signup;
