import React from "react";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";

const RecentPost = () => {
  const { posts, loading } = usePosts();

  const latestPosts = posts.slice(0, 5);
  console.log(latestPosts);

  return (
    <div className="flex flex-col gap-5 border border-black rounded-sm lg:p-10 p-5">
      <h1 className="font-cormorant text-3xl font-bold">Recent Posts</h1>
      <div className="flex flex-col gap-2">
        {latestPosts.map((post) => (
          <NewPost
            slug={post.id}
            title={post?.title}
            date={post.createdAt?.toDate().toLocaleDateString("en-US", {
              month: "short", // Mar
              day: "numeric", // 5
              year: "numeric", // 2025
            })}
          />
        ))}
      </div>
    </div>
  );
};

const NewPost = ({ title, date, slug }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-1" onClick={() => navigate(`/news/${slug}`)} style={{ cursor: "pointer" }}>
      <h1 className="text-md font-bold line-clamp-1 hover:underline cursor-pointer">{title}</h1>
      <p className="text-sm">{date} </p>
    </div>
  );
};

export default RecentPost;
