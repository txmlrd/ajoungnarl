import { useEffect, useState, useCallback } from "react";
import { db } from "../lib/firebase";
import { doc, getDoc, collection, getDocs, updateDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export function useUserProfile() {
  const { user } = useAuth();
  const userId = user?.uid;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);

      // 🔹 Ambil data user
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      // 🔹 Ambil data social media (subcollection)
      const socialmediaRef = collection(db, "users", userId, "socialmedia");
      const socialmediaSnap = await getDocs(socialmediaRef);

      const socialmediaData = {};
      socialmediaSnap.forEach((doc) => {
        Object.assign(socialmediaData, doc.data());
      });

      if (userSnap.exists()) {
        setProfile({
          id: userSnap.id,
          ...userSnap.data(),
          socialmedia: socialmediaData,
        });
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 🔹 Fungsi update user profile
  const updateProfile = useCallback(
    async (data) => {
      if (!userId) return;
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          ...data,
          updatedAt: new Date(),
        });

        // update local state biar ga perlu fetch ulang
        setProfile((prev) => ({
          ...prev,
          ...data,
          updatedAt: new Date(),
        }));
      } catch (err) {
        console.error("Error updating profile:", err);
      }
    },
    [userId]
  );

  // 🔹 Fungsi update social media
  const updateSocialMedia = useCallback(
    async (data) => {
      if (!userId) return;
      try {
        const socialRef = doc(db, "users", userId, "socialmedia", "default"); 
        await setDoc(socialRef, data, { merge: true });

        // update local state
        setProfile((prev) => ({
          ...prev,
          socialmedia: {
            ...prev?.socialmedia,
            ...data,
          },
        }));
      } catch (err) {
        console.error("Error updating social media:", err);
      }
    },
    [userId]
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, fetchProfile, updateProfile, updateSocialMedia };
}
