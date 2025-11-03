import React from "react";
import { auth, db } from "../lib/firebase";
import { getDoc, doc } from "firebase/firestore";

const checkUserLogin = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  const docRef = doc(db, "users", user.uid);
  const queryUser = await getDoc(docRef);
  // console.log("Current user in Comments:", user.email);
  console.log("queryUser:", queryUser.data());
  return queryUser.data();
};

export default checkUserLogin;
