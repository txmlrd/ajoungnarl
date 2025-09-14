import { useParams } from "react-router-dom";
import TopPost from "../components/DetailPost/TopPost";
import Comments from "../components/DetailPost/Comments";
import OtherNews from "../components/DetailPost/OtherNews";
import LoadingFallback from "../helper/LoadingFallback";
import { usePosts } from "../hooks/usePosts";
import NotFound from "./404NotFound";

const DetailPost = () => {
  const { id } = useParams();
  const { posts, loading, fetchPosts } = usePosts();
  // console.log(posts);

  if (loading) return <LoadingFallback />;
  const post = posts.find((p) => p.id === id);
  if (!post) return <NotFound />;
  return (
    <div className="flex flex-col gap-5 max-w-[500px] mx-auto my-10">
      <TopPost post={post} />
      <Comments post={post} onCommentAdded={fetchPosts} />
      <OtherNews posts={posts} currentPostId={post.id} />
    </div>
  );
};

export default DetailPost;
