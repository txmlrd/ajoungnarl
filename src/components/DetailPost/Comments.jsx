import NotFound from "../../pages/404NotFound";
import DetailComment from "./CommentComponent/DetailComment";

const Comments = ({ post }) => {
  // if (!post) {
  //   return <NotFound />;
  // }
  return (
    <div className="flex flex-col gap-2 border-t-1 border-b-1 border-gray-300 py-5">
      <h1 className="font-bold text-xl">Comments</h1>

      <div className="flex flex-col gap-10">{post.comments.length === 0 ? <p className="text-gray-500">Belum ada komentar</p> : post.comments.map((comment) => <DetailComment key={comment.id} posts={comment} />)}</div>
    </div>
  );
};

export default Comments;
