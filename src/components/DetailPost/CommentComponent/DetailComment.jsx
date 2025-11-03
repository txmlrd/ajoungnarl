import React from "react";

const DetailComment = ({ posts }) => {
  const username = truncateText(posts.user, 20);
  const userSlug = posts.userSlug || "ajung-adhi";
  return (
    <div className="text-[14px]">
      <h1 className="font-bold">
        <a href={`/profile/${userSlug}`} className="hover:underline">{username}</a> •{" "}
        {posts.createdAt.toDate().toLocaleString("en-US", {
          month: "short", // Sep
          day: "numeric", // 9
          year: "numeric", // 2025
          hour: "numeric", // 12
          minute: "2-digit", // 10
          hour12: true, // AM/PM
        })}
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
