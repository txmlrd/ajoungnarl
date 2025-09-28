import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "../lib/firebase";

export const useUserProfileWithPosts = ({ userSlug, postsPerPage }) => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);

  // Cari userId dari slug
  useEffect(() => {
    if (!userSlug) return;

    const fetchUserId = async () => {
      try {
        const q = query(collection(db, "users"), where("userSlug", "==", userSlug));
        const snap = await getDocs(q);

        if (!snap.empty) {
          setUserId(snap.docs[0].id);
        } else {
          setUserId(null);
        }
      } catch (err) {
        console.error("Error fetch userId by slug", err);
        setUserId(null);
      }
    };

    fetchUserId();
  }, [userSlug]);

  // Fetch profile
  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const ref = doc(db, "users", userId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          let userData = { id: snap.id, ...snap.data() };

          // ambil subcollection socialMedia
          const socialRef = collection(db, "users", userId, "socialmedia");
          const socialSnap = await getDocs(socialRef);
          let socialMedia = [];
          if (!socialSnap.empty) {
            const firstDoc = socialSnap.docs[0];
            socialMedia = { id: firstDoc.id, ...firstDoc.data() };
          }

          userData = { ...userData, socialMedia };
          setProfile(userData);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetch profile", err);
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Fetch posts page
  const fetchPostsPage = useCallback(
    async (reset = false) => {
      if (!userId) return;

      setLoadingPosts(true);
      try {
        const ref = collection(db, "posts");

        let q = query(ref, where("idAuthor", "==", userId), orderBy("createdAt", "desc"), limit(postsPerPage));

        if (!reset && lastDoc) {
          q = query(ref, where("idAuthor", "==", userId), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(postsPerPage));
        }

        const snap = await getDocs(q);
        const newPosts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        if (reset) {
          setPosts(newPosts);
        } else {
          setPosts((prev) => [...prev, ...newPosts]);
        }

        setLastDoc(snap.docs[snap.docs.length - 1] || null);

        if (reset) {
          setTotalPosts(snap.size);
        }
      } catch (err) {
        console.error("Error fetch posts", err);
        if (reset) setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    },
    [userId, postsPerPage]
  );

  // Auto load page pertama
  useEffect(() => {
    if (userId) {
      setPosts([]);
      setLastDoc(null);
      fetchPostsPage(true);
    }
  }, [userId, postsPerPage, fetchPostsPage]);

  return {
    profile,
    posts,
    totalPosts,
    loadingProfile,
    loadingPosts,
    fetchPostsPage,
  };
};
