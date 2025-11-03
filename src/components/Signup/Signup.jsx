import Form from "../Form";
import Button from "../Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { firebaseErrorMessages } from "../../lib/firebaseErrorMessage";
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // pastikan db dari getFirestore
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

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
  const [errorMessage, setErrorMessage] = useState("");

  const [fileList, setFileList] = useState([]);
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

  const handleNullForm = () => {
    const newErrors = {};
    // setError(true);
    if (!name) {
      newErrors.name = "Name cannot be empty";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number cannot be empty";
    }
    if (!password) {
      newErrors.password = "Password cannot be empty";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const validationTrigger = async () => {
    const validationError = handleNullForm();
    console.log("Validation Errorsasd:", Object.keys(validationError).length);
    if (Object.keys(validationError).length !== 0) {
      setLoading(false);
      setErrorMessage(validationError);
      console.log("Validation Error:", validationError);
      return false;
    }
    console.log("No Validation Errors");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isValid = await validationTrigger();
    if (!isValid) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await auth.signOut();
      const user = userCredential.user;

      // Simpan data user ke Firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: name,
          phoneNumber: phoneNumber,
          createdAt: new Date(),
          role: "free-member",
          pictureProfile: fileList[0]?.thumbUrl || "",
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

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const thumbUrl = fileList[0]?.thumbUrl;
    console.log("Thumb URL:", thumbUrl);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    validationTrigger();
  }, [email, name, phoneNumber, password]);

  return (
    <div className="lg:h-[70vh] h-[80vh] flex flex-col justify-center items-center w-full my-28">
      <h1 className="font-cormorant font-bold lg:text-5xl text-3xl text-center">Create an account</h1>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex justify-center items-center">
            <Form disabled={loading || nextStep} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {nextStep && (
            <>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                  <Form error={errorMessage.name} placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col">
                  {" "}
                  <Form error={errorMessage.phoneNumber} placeholder="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <Form placeholder="Instagram" type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                <Form  placeholder="LinkedIn" type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div className="flex flex-row gap-2">
                <Form placeholder="TikTok" type="text" value={tiktok} onChange={(e) => setTiktok(e.target.value)} />
                <Form error={errorMessage.password} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1 my-4 w-full justify-center items-center *:transition-all">
                <p className="text-black text-sm font-bold items-start">Upload Profile Picture</p>
                <ImgCrop rotationSlider>
                  <Upload action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload" listType="picture-circle" fileList={fileList} onChange={onChange} onPreview={onPreview}>
                    {fileList.length < 1 && "Upload Profile Picture"}
                  </Upload>
                </ImgCrop>
              </div>
            </>
          )}
        </div>
        {!nextStep && <Button loading={loading} onClick={() => handleCheckEmail(email)} text={"Next"} />}
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
