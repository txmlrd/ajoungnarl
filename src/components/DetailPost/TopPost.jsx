import { User, Clock, Calendar, MessageSquare } from "lucide-react";
import TagButton from "../TagButton";
import { timeAgo } from "../../function/timeAgo";
import { Link } from "react-router-dom";

const TopPost = ({ post }) => {
  const totalComments = post.comments ? post.comments.length : 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 justify-center">
        <h1 className="text-5xl font-cormorant font-bold text-center">{post.title}</h1>
        <div className="flex flex-wrap items-center flex-row justify-center w-full lg:gap-4 gap-3 mt-2 ">
          <Link to={`/profile/${post.userSlug}`} className="text-[14px] tracking-wide line-clamp-2 hover:underline">
            <div className="flex flex-row gap-1 items-center">
              <User />
              <p className="text-[14px]">{post.author}</p>
            </div>
          </Link>
          <div className="flex flex-row gap-1 items-center">
            <Clock />
            <p className="text-[14px]">{post.readTime} min read</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Calendar />
            <p className="text-[14px]">
              {/* {post.createdAt?.toDate().toLocaleDateString("en-US", {
                month: "short", // Mar
                day: "numeric", // 5
                year: "numeric", // 2025
              })} */}
              {timeAgo(post.createdAt)}
            </p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <MessageSquare />
            <p className="text-[14px]">{totalComments}</p>
          </div>
        </div>
        <div className="w-full h-[187px] my-5">
          <img
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/image-not-found.png";
            }}
            src={post.image || "/image-not-found.png"}
            className="w-full h-full object-cover"
          />
        </div>

        <p dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="flex flex-wrap gap-2 mt-2">
          <TagButton text={"#UI/UX"} />
          <TagButton text={"#WebDevelopment"} />
          <TagButton text={"#React"} />
          <TagButton text={"#JavaScript"} />
        </div>
      </div>
    </div>
  );
};

export default TopPost;
