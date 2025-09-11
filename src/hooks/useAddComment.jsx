import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
export function useAddComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addComment = async ({ postId, commentText, user }) => {
    if (!commentText.trim()) return false; // return false kalau kosong

    try {
      setLoading(true);
      setError(null);

      const commentsRef = collection(db, "posts", postId, "comments");
      await addDoc(commentsRef, {
        comment: commentText.trim(),
        user: user || "Anonymous",
        createdAt: serverTimestamp(),
      });

      return true; // berhasil
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addComment, loading, error };
}
