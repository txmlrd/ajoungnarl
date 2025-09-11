import React from "react";
import { Link } from "react-router-dom";

const DetailOtherNews = ({ currentPostId, posts }) => {
  const otherPosts = posts.filter((post) => post.id !== currentPostId).slice(0, 3);
  return (
    <div className="flex flex-col gap-5">
      {otherPosts.map((post) => (
        <Link key={post.id} to={`/news/${post.id}`} className="w-full">
          <div className="flex flex-col lg:flex-row gap-3 items-center  group hover:cursor-pointer">
            <div className="lg:w-1/3 w-full h-24 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-all"
                src={post.image || "/image-not-found.png"}
                onError={(e) => {
                  e.currentTarget.onerror = null; // cegah loop
                  e.currentTarget.src = "/image-not-found.png"; // fallback
                }}
                alt={post.title || "thumbnail"}
              />
            </div>
            <h1 className="lg:w-2/3 w-full text-[16px] break-words line-clamp-4 group-hover:underline">{post.title || "Untitled"}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DetailOtherNews;
