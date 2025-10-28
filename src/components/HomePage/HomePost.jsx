import { User, Clock, Calendar } from "lucide-react";
import { usePosts } from "../../hooks/usePosts";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import PostCategory from "../PostCategory";

const HomePost = () => {
  const { posts, loading } = usePosts();

  if (loading) {
    return <Skeleton active paragraph={{ rows: 4 }} className="w-full" />;
  }

  return (
    <div className="flex flex-col gap-10">
      {posts.map((post) => (
        <Link to={`/news/${post.id}`} key={post.id} className="no-underline text-black">
          <div key={post.id} className="flex lg:flex-row flex-col gap-5 group">
            <div className="rounded-sm outline-1 outline-black lg:h-[150px] h-[250px] lg:w-[200px] w-full flex-shrink-0 overflow-hidden">
              <img
                onError={(e) => {
                  e.currentTarget.onerror = null; // cegah loop
                  e.currentTarget.src = "/image-not-found.png"; // fallback
                }}
                src={post?.image || "/image-not-found.png"}
                alt="thumbnail"
                className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-all"
              />
            </div>
            <div className="flex flex-col justify-between ">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <PostCategory key={tag} text={tag} />
                ))}
              </div>

              <div>
                <h1 className="font-cormorant text-[24px] font-bold group-hover:underline">{post.title}</h1>
                <p className="text-[14px] tracking-wide line-clamp-2">{post.content}</p>
              </div>

              <div className="flex flex-row lg:gap-4 gap-3 mt-2">
                <div className="flex flex-row gap-1 items-center">
                  <User />
                  <Link
                    to={`/profile/${post.userSlug}`} // menuju halaman profil user
                    className="text-[14px] hover:underline"
                  >
                    {post.author}
                  </Link>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <Clock />
                  <p className="text-[14px]">{post.readTime} min read</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <Calendar />
                  <p className="text-[14px]">
                    {post.createdAt?.toDate().toLocaleDateString("en-US", {
                      month: "short", // Mar
                      day: "numeric", // 5
                      year: "numeric", // 2025
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePost;
