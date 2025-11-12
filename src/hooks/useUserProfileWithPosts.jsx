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
  // const [lastDoc, setLastDoc] = useState(null);
  const [pageCursors, setPageCursors] = useState([]);

  // Cari userId dari slug
  useEffect(() => {
    if (!userSlug) return;

    const fetchUserId = async () => {
      // console.log("Fetching userId for slug:", userSlug);
      try {
        const q = query(collection(db, "users"), where("userSlug", "==", userSlug));
        const snap = await getDocs(q);
        // console.log("Fetched userId snap for slug", userSlug, snap);

        if (!snap.empty) {
          setUserId(snap.docs[0].id);
        } else {
          setUserId(null);
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetch userId by slug", err);
        setUserId(null);
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserId();
  }, [userSlug]);

  // Fetch profile
  useEffect(() => {
    if (!userId) return;
    // console.log("Fetching profile for userId:", userId);

    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        // console.log("before fetching profile for userId:", userId);
        const ref = doc(db, "users", userId);
        const snap = await getDoc(ref);
        // console.log("Fetched profile snap for userId", userId, snap);
        if (snap.exists()) {
          let userData = { id: snap.id, ...snap.data() };
          // console.log("User data:", userData);

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
    async (pageNum = 1) => {
      if (!userId) return;
      // console.log("pageNum", pageNum);
      setLoadingPosts(true);
      try {
        const ref = collection(db, "posts");

        let q = query(ref, where("idAuthor", "==", userId), orderBy("createdAt", "desc"), limit(postsPerPage));

        if (pageNum > 1 && pageCursors[pageNum - 2]) {
          q = query(ref, where("idAuthor", "==", userId), orderBy("createdAt", "desc"), startAfter(pageCursors[pageNum - 2]), limit(postsPerPage));
        }

        const snap = await getDocs(q);
        const newPosts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        console.log("newposts", newPosts);
        setPosts(newPosts);

        const lastVisible = snap.docs[snap.docs.length - 1];
        if (pageCursors.length < pageNum) {
          setPageCursors((prev) => [...prev, lastVisible]);
        }

        if (totalPosts === 0) {
          const totalQuery = query(ref, where("idAuthor", "==", userId));
          // const postTotal = await getDocs(totalQuery);
          // console.log("postTotal", postTotal);
          
          const getCountFromServer = async (query) => {
            const snapshot = await getDocs(query);
            return { data: () => ({ count: snapshot.size }) };
          };
          const totalSnap = await getCountFromServer(totalQuery);
          setTotalPosts(totalSnap.data().count);
        }
      } catch (err) {
        console.error("Error fetch posts", err);
        setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    },
    [userId, pageCursors, postsPerPage, totalPosts]
  );

  // Auto load page pertama
  useEffect(() => {
    if (userId) {
      setPosts([]);
      fetchPostsPage(true);
    }
  }, [userId, postsPerPage, fetchPostsPage]);

  return {
    setPosts,
    profile,
    posts,
    totalPosts,
    loadingProfile,
    loadingPosts,
    fetchPostsPage,
  };
};
