import React from "react";
import UserProfile from "../components/ProfileSettings/UserProfile";

const Profile = () => {
  return (
    <div className="flex flex-col mt-5">
      <h1 className="font-cormorant font-bold lg:text-5xl text-3xl text-center">Profile</h1>
      <div className="mt-5">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
