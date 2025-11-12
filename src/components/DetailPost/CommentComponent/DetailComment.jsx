import React from "react";
import { useNavigate } from "react-router-dom";

const DetailComment = ({ posts, authorSlug }) => {
  const navigate = useNavigate();
  const username = truncateText(posts.user, 20);
  const userSlug = posts.userSlug;
  console.log("DetailComment props:", posts);
  const authorChecker = posts.userSlug === authorSlug;
  return (
    <div className="text-[14px]">
      <h1 className="font-bold">
        <div onClick={() => navigate(`/profile/${userSlug}`)} className="hover:underline cursor-pointer">
          {username} •{" "}
          {posts.createdAt.toDate().toLocaleString("en-US", {
            month: "short", // Sep
            day: "numeric", // 9
            year: "numeric", // 2025
            hour: "numeric", // 12
            minute: "2-digit", // 10
            hour12: true, // AM/PM
          })}
          {authorChecker ? <span className="ml-2 px-2 py-1 text-xs bg-black text-white rounded-full">Author</span> : null}
        </div>
      </h1>
      <p className="pt-2">{posts.comment}</p>
    </div>
  );
};

function truncateText(text, maxLength = 15) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default DetailComment;
