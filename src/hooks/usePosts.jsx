import { useEffect, useState, useCallback } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // bikin reusable function
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);

      // Ambil semua posts
      const postsSnap = await getDocs(collection(db, "posts"));
      // Ambil semua tags
      const tagsSnap = await getDocs(collection(db, "tags"));

      // Convert tags jadi object { id: name }
      const tags = {};
      tagsSnap.forEach((doc) => {
        tags[doc.id] = doc.data().name;
      });

      // Mapping tagIds ke tagName + ambil comments
      const postsData = await Promise.all(
        postsSnap.docs.map(async (docSnap) => {
          const data = docSnap.data();

          const commentsSnap = await getDocs(collection(db, "posts", docSnap.id, "comments"));

          const comments = commentsSnap.docs.map((c) => ({
            id: c.id,
            ...c.data(),
          }));

          return {
            id: docSnap.id,
            ...data,
            tags: data.tagIds?.map((id) => tags[id] || id) || [],
            comments,
          };
        })
      );

      setPosts(postsData);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // otomatis jalan sekali di awal
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // return fetchPosts juga
  return { posts, loading, fetchPosts };
}
