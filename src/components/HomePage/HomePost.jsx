import { User, Clock, Calendar } from "lucide-react";
import { usePosts } from "../../hooks/usePosts";

import PostCategory from "../PostCategory";

const HomePost = () => {
  const { posts, loading } = usePosts();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="flex lg:flex-row flex-col gap-5">
          <div className="rounded-sm outline-1 outline-black lg:h-[150px] h-[250px] lg:w-[500px] w-full">
            <img src={post.image}  className="w-full h-full object-cover rounded-sm" />
          </div>
          <div className="flex flex-col justify-between">
            {post.tags.map((tag) => (
              <PostCategory key={tag} text={tag} />
            ))}
            <div>
              <h1 className="font-cormorant text-[24px] font-bold">{post.title}</h1>
              <p className="text-[14px] tracking-wide line-clamp-2">{post.content}</p>
            </div>

            <div className="flex flex-row lg:gap-4 gap-3 mt-2">
              <div className="flex flex-row gap-1 items-center">
                <User />
                <p className="text-[14px]">{post.author}</p>
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
      ))}
    </div>
  );
};

export default HomePost;
