import DetailComment from "./CommentComponent/DetailComment";

const Comments = () => {
  return (
    <div className="flex flex-col gap-2 border-t-1 border-b-1 border-gray-300 py-5">
      <h1 className="font-bold text-xl">Comments</h1>

      <div className="flex flex-col gap-10">
        <DetailComment />
        <DetailComment />
        <DetailComment />
      </div>
    </div>
  );
};

export default Comments;
