import { useEffect, useState, useCallback } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil semua posts + comments + tag names
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);

      const postsSnap = await getDocs(collection(db, "posts"));
      const tagsSnap = await getDocs(collection(db, "tags"));

      const tags = {};
      tagsSnap.forEach((doc) => {
        tags[doc.id] = doc.data().name;
      });

      const postsData = await Promise.all(
        postsSnap.docs.map(async (docSnap) => {
          const data = docSnap.data();

          const commentsSnap = await getDocs(collection(db, "posts", docSnap.id, "comments"));
          const comments = commentsSnap.docs.map((c) => ({ id: c.id, ...c.data() }));

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

  // Increment views untuk post tertentu + update state lokal
  const incrementViews = useCallback(async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, { views: increment(1) });

      // update state lokal supaya UI sinkron
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, views: (p.views || 0) + 1 } : p))
      );
    } catch (err) {
      console.error("Error incrementing views:", err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, fetchPosts, incrementViews };
}
