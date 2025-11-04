import { Instagram, Linkedin, Settings } from "lucide-react";
import React from "react";
import { InstagramOutlined, LinkedinOutlined, TikTokOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LatestUserPost from "./LatestUserPost";
import Button from "../Button";
import { Pagination, Spin, Tooltip } from "antd";
import { useState, useEffect } from "react";
import ImageZoomModal from "../ImageZoomModal";

const Profile = ({ profile, posts, totalPosts, loadingPosts, fetchPostsPage  }) => {
  // console.log("posts", posts);
  // console.log("profile in profile comp", profile);
  // console.log("totalPosts in profile comp", totalPosts);
  // const userId = profile?.id;
  const [currentPage, setCurrentPage] = useState(1);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);


  useEffect(() => {
    // setCurrentPage(1);
    fetchPostsPage(currentPage);
  }, [currentPage, fetchPostsPage]);
  
  // console.log 

  return (
    <div className="flex flex-col gap-3 max-w-[500px] mx-auto my-10">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 items-center">
          <Tooltip title={`Click to see ${profile.name ? profile.name.trim().split(" ")[0] : ""}'s full image`} placement="top">
            <img
              src={profile.pictureProfile || "/image-not-found.png"}
              // onError={(e) => {
              //   e.target.onerror = null;
              //   e.target.src = profilePic || "/image-not-found.png";
              // }}
              alt="Profile"
              className="w-16 h-16 rounded-full  object-cover border-2 border-black cursor-pointer"
              onClick={() => setOpenPhotoModal(true)}
            />
          </Tooltip>

          <ImageZoomModal src={profile.pictureProfile || "/image-not-found.png"} alt="Profile" open={openPhotoModal} onClose={() => setOpenPhotoModal(false)} />
          <h1 className="text-lg font-bold">{profile.name}</h1>
        </div>
        <Tooltip title="Settings" placement="top">
          <Settings className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-all" />
        </Tooltip>
      </div>
      <p className="text-md text-black">{profile.bio}</p>
      <p className="text-sm text-gray-500">Ajoungnarl member since {profile.createdAt?.toDate().getFullYear()}</p>
      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex flex-row flex-wrap gap-2">
          {profile.socialMedia?.instagram?.trim() && (
            <Tooltip title="Instagram" placement="top">
              <Link
                to={`https://www.instagram.com/${profile.socialMedia.instagram}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-black text-white p-2 rounded-full flex items-center gap-2 border-1 border-black transition-all"
              >
                <InstagramOutlined className="text-[24px] cursor-pointer !text-black group-hover:!text-white transition-all justify-center" />
              </Link>
            </Tooltip>
          )}

          {profile.socialMedia?.linkedin?.trim() && (
            <Tooltip title="LinkedIn" placement="top">
              <Link
                to={`https://www.linkedin.com/in/${profile.socialMedia.linkedin}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-black text-white p-2 rounded-full flex items-center gap-2 border-1 border-black transition-all"
              >
                <LinkedinOutlined className="text-[24px] cursor-pointer !text-black group-hover:!text-white transition-all justify-center" />
              </Link>
            </Tooltip>
          )}

          {profile.socialMedia?.tiktok?.trim() && (
            <Tooltip title="TikTok" placement="top">
              <Link
                to={`https://www.tiktok.com/@${profile.socialMedia.tiktok}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-black text-white p-2 rounded-full flex items-center gap-2 border-1 border-black transition-all"
              >
                <TikTokOutlined className="text-[24px] cursor-pointer !text-black group-hover:!text-white transition-all justify-center" />
              </Link>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-5">
        <h1 className="font-cormorant font-bold lg:text-4xl text-2xl">Latest from {profile.name}</h1>

        {loadingPosts ? <Spin /> : posts?.map((post) => <LatestUserPost key={post.id} post={post} />)}
        {!posts?.length && !loadingPosts && <p className="text-start text-gray-500">{profile.name} has no posts yet.</p>}
      </div>
      {posts?.length > 0 && (
        <div className="flex justify-center pt-5">
          <Pagination current={currentPage} pageSize={3} total={totalPosts} onChange={(p) => setCurrentPage(p)} />
        </div>
      )}
    </div>
  );
};

export default Profile;
