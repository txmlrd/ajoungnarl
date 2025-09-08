import { User, Clock, Calendar, MessageSquare } from "lucide-react";
import TagButton from "../TagButton";

const TopPost = ({ post }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 justify-center">
        <h1 className="text-5xl font-cormorant font-bold text-center">{post.title}</h1>
        <div className="flex flex-wrap items-center flex-row justify-center w-full lg:gap-4 gap-3 mt-2 ">
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
          <div className="flex flex-row gap-1 items-center">
            <MessageSquare />
            <p className="text-[14px]">1000</p>
          </div>
        </div>
        <div className="w-full h-[187px] my-5">
          <img src={post.image} className="w-full h-full object-cover" />
        </div>

        <p>{post.content}</p>
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
