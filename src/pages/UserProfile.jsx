import React from "react";
import Profile from "../components/UserProfile/Profile";
import { useParams } from "react-router-dom";
import LoadingFallback from "../helper/LoadingFallback";
import NotFound from "./404NotFound";
import { useUserProfileWithPosts } from "../hooks/useUserProfileWithPosts";

const UserProfile = () => {
  const { userSlug } = useParams();
  const { profile, posts, totalPosts, loadingProfile, loadingPosts, fetchPostsPage, page, setPage } = useUserProfileWithPosts({ userSlug, postsPerPage: 3 }); 
  if (loadingProfile) return <LoadingFallback />;
  if (!profile) return <NotFound />;
  return (
    <>
      <Profile profile={profile} posts={posts} totalPosts={totalPosts} loadingPosts={loadingPosts} fetchPostsPage={fetchPostsPage} page={page} setPage={setPage} postsPerPage={3} />
    </>
  );
};

export default UserProfile;
