import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
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

        // Mapping tagIds ke tagName
        const postsData = await Promise.all(
          postsSnap.docs.map(async (docSnap) => {
            const data = docSnap.data();

            // ambil comments subcollection
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
    }

    fetchPosts();
  }, []);

  return { posts, loading };
}
