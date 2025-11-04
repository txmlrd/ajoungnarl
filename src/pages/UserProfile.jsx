import {useEffect} from "react";
import Profile from "../components/UserProfile/Profile";
import { useParams } from "react-router-dom";
import LoadingFallback from "../helper/LoadingFallback";
import NotFound from "./404NotFound";
import { useUserProfileWithPosts } from "../hooks/useUserProfileWithPosts";

const UserProfile = () => {
  // console.log("Rendering UserProfile component");
  const { userSlug } = useParams();
  // console.log ("userSlug from params:", userSlug);
  const { profile, posts, totalPosts, loadingProfile, loadingPosts, fetchPostsPage, page, setPosts } = useUserProfileWithPosts({ userSlug, postsPerPage: 3 }); 
  console.log("posts", posts);
  // console.log("UserProfile data:", { profile, posts, totalPosts, loadingProfile, loadingPosts });
  useEffect(() => {
  console.log("Posts baru masuk:", posts);
}, [posts]);
  if (loadingProfile) return <LoadingFallback />;
  if (!profile) return <NotFound />;
  return (
    <>
      <Profile profile={profile} posts={posts} totalPosts={totalPosts} loadingPosts={loadingPosts} fetchPostsPage={fetchPostsPage} page={page} setPosts={setPosts} postsPerPage={3} />
    </>
  );
};

export default UserProfile;
