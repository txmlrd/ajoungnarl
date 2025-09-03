import { User, Clock, Calendar } from "lucide-react";

import PostCategory from "../PostCategory";

const HomePost = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-5">
      <div className="rounded-sm outline-1 outline-black lg:h-[150px] h-[250px] lg:w-[500px] w-full"></div>
      <div className="flex flex-col justify-between">
        <PostCategory text={"Technology"} />
        <div>
          <h1 className="font-cormorant text-[24px] font-bold">The Future of AI: Trends to Watch in 2025</h1>
          <p className="text-[14px] tracking-wide line-clamp-2">
            As we look ahead to 2025, several key trends are emerging in the field of artificial intelligence (AI). These trends are set to shape the future of AI and its impact on various industries.
          </p>
        </div>

        <div className="flex flex-row lg:gap-4 gap-3 mt-2">
          <div className="flex flex-row gap-1 items-center">
            <User />
            <p className="text-[14px]">John Doe</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Clock />
            <p className="text-[14px]">5 min read</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Calendar />
            <p className="text-[14px]">March 10, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePost;
