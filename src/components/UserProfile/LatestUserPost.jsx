import React from "react";
import { Link } from "react-router-dom";
import PostCategory from "../PostCategory";
import { User, Clock, Calendar } from "lucide-react";
import { timeAgo } from "../../function/timeAgo";
const LatestUserPost = ({ post }) => {
  // Dummy data for the latest post

  return (
    <div key={post.id} className="flex lg:flex-row flex-col gap-5 group border-b py-5">
      <Link to={`/news/${post.id}`} className="rounded-sm outline-1 outline-black lg:h-[125px] h-[250px] lg:w-[200px] w-full flex-shrink-0 overflow-hidden">
        <img
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/image-not-found.png";
          }}
          src={post?.image || "/image-not-found.png"}
          alt="thumbnail"
          className="w-full h-full object-cover cursor-pointer rounded-sm group-hover:scale-105 transition-all"
        />
      </Link>

      <div className="flex flex-col justify-between">
        <div className="flex flex-wrap gap-2">
          <PostCategory text={post.tagIds} />
        </div>

        <div>
          <Link to={`/news/${post.id}`}>
            <h1 className="font-cormorant text-[20px] font-bold hover:underline cursor-pointer">{post.title}</h1>
          </Link>
        </div>

        <div className="flex flex-row lg:gap-2 gap-1 mt-2">
          <Link to={`/profile/${post.userSlug}`} className="text-[14px] tracking-wide line-clamp-2 hover:underline">
            <div className="flex flex-row gap-1 items-center">
              <User />
              <p className="text-[14px]">{post.author}</p>
            </div>
          </Link>
          •
          <div className="flex flex-row gap-1 items-center">
            <Clock />
            <p className="text-[14px]">{timeAgo(post.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestUserPost;
