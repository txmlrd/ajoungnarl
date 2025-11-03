import NotFound from "../../pages/404NotFound";
import DetailComment from "./CommentComponent/DetailComment";
import { useState } from "react";
import { useAddComment } from "../../hooks/useAddComment";
import { useAlert } from "../../context/AlertContext";
import { useUserProfile } from "../../hooks/useUserProfile";

const Comments = ({ post, onCommentAdded }) => {
  const [text, setText] = useState("");
  const { addComment, loading } = useAddComment();
  const { showAlert } = useAlert();
  const { profile } = useUserProfile();
  console.log("User Profile in Comments:", profile);

  const handleSubmit = async () => {
    if (text.trim() === "") {
      showAlert("Comment cannot be empty.", "error");
      return;
    }

    if (!profile) {
      showAlert("You must be logged in to add a comment.", "error");
      return;
    }
    const success = await addComment({ postId: post.id, commentText: text, user: profile.name, userSlug: profile.userSlug });
    if (success) {
      setText("");
      onCommentAdded();
      showAlert("Comment added successfully!", "success");
    } else {
      showAlert("Failed to add comment.", "error");
    }
  };

  if (!post) return <NotFound />;
  return (
    <div className="flex flex-col gap-2 border-t-1 border-b-1 border-gray-300 py-5">
      <h1 className="font-bold text-xl">Comments</h1>

      <div className="flex flex-col gap-10">{post.comments.length === 0 ? <p className="text-gray-500">No comments</p> : post.comments.map((comment) => <DetailComment key={comment.id} posts={comment} />)}</div>
      <div className="flex flex-col gap-2 mt-5">
        <h1 className="font-bold text-lg">Add a Comment</h1>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full border-2 border-black  p-2 min-h-20" rows={4} placeholder="Write your comment here..." />
        <button onClick={handleSubmit} disabled={loading} className="bg-black text-white px-4 py-2 hover:bg-gray-600 transition-colors w-fit cursor-pointer">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      <div className="mt-5">
        <p className="text-gray-500 text-sm">* Comments are moderated and may take some time to appear.</p>
      </div>
    </div>
  );
};

export default Comments;
