import { SquarePen, Copy } from "lucide-react";
import ImageCrop from "./ImageCrop";
import { useState, useRef } from "react";
import { useAlert } from "../../context/AlertContext";
import Form from "../Form";
import Button from "../Button";
import { Popover } from "antd";
import { useUserProfile } from "../../hooks/useUserProfile";
import LoadingFallback from "../../helper/LoadingFallback";
import NotFound from "../../pages/404NotFound";
import { membershipStatusData } from "../../data/membershipStatusData";
import { useEffect } from "react";

const UserProfile = () => {
  //fetch user profile data
  const { profile: userProfile, fetchProfile, loading, updateProfile, updateSocialMedia } = useUserProfile();
  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ name, phoneNumber: phone });
      await updateSocialMedia({ instagram, linkedin, tiktok });
      showAlert("Profile updated successfully!", "success");
      fetchProfile(); // Refresh profile data after update
    } catch (err) {
      console.error("Error updating profile:", err);
      showAlert("Failed to update profile: " + err.message, "error");
    }
  };
  console.log(userProfile);

  const [isCropOpen, setIsCropOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [idUser, setIdUser] = useState("");
  const { showAlert } = useAlert();

  // Social media & personal info states
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [tiktok, setTikTok] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // isi default profile ketika pertama kali userProfile loaded
  useEffect(() => {
    if (userProfile) {
      setInstagram(userProfile?.socialmedia?.instagram || "");
      setLinkedIn(userProfile?.socialmedia?.linkedin || "");
      setTikTok(userProfile?.socialmedia?.tiktok || "");
      setName(userProfile?.name || "");
      setPhone(userProfile?.phoneNumber || "");
      setIdUser(userProfile?.id || "");
      setProfilePic(userProfile?.pictureProfile || "");
    }
  }, [userProfile]);

  const handleCopyID = () => {
    if (idUser) {
      navigator.clipboard.writeText(idUser);
      showAlert("Success Copying ID to Clipboard", "success");
    } else {
      showAlert("Failed Copying ID to Clipboard", "error");
    }
  };

  const fileInputRef = useRef(null);

  // Trigger input file saat klik foto
  const handleClickProfile = () => {
    fileInputRef.current.click();
  };

  // Simpan file yang dipilih → buka cropper
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setIsCropOpen(true);
    }
  };

  function formatDate(value, options) {
    if (!value) return "Unknown";

    let date;
    if (value?.toDate && typeof value.toDate === "function") {
      date = value.toDate(); // Firestore Timestamp
    } else if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value); // timestamp number or ISO string
    }

    if (isNaN(date.getTime())) return "Unknown";
    return date.toLocaleString("en-US", options);
  }

  if (loading) return <LoadingFallback />;
  if (!userProfile) return <NotFound />;
  // Set idUser when userProfile is loaded

  const popUpContent = (
    <div className="font-merriweather text-[15px]">
      <h1 className="font-bold mb-2">Membership Status</h1>
      <p>This is a free member account.</p>
      <p>Upgrade to premium for more features!</p>
      <Button path={""} text={"Upgrade Now"} wFull className={"bg-black text-white hover:text-black mt-2"} />
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-3">
        {/* Profile picture */}
        <div onClick={handleClickProfile} className="flex justify-center overflow-hidden relative">
          {/* Overlay edit */}
          <div className="absolute w-24 h-24 rounded-full bg-black opacity-0 hover:opacity-70 cursor-pointer z-10 transition-all">
            <p className="text-white flex text-center justify-center items-center h-full text-sm">
              <SquarePen className="w-8 h-8 mx-auto" />
            </p>
          </div>

          {/* Foto profil */}
          <img
            src={profilePic || "/image-not-found.png"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = profilePic || "/image-not-found.png";
            }}
            alt="Profile"
            className="w-24 h-24 rounded-full  object-cover border-2 border-black"
          />
        </div>

        {/* Hidden input file */}
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

        {isCropOpen && selectedFile && (
          <ImageCrop
            file={selectedFile}
            onComplete={async (base64Image) => {
              setProfilePic(base64Image);
              await updateProfile({ pictureProfile: base64Image });
            }}
            onClose={() => {
              setIsCropOpen(false);
              setSelectedFile(null);
            }}
          />
        )}

        <p className="text-center text-sm text-gray-500">*Click your profile picture to remove or change picture</p>
        <Popover content={popUpContent} trigger="hover" placement="bottom" autoAdjustOverflow>
          <h1 className="text-center text-xl font-semibold underline cursor-pointer">{membershipStatusData[userProfile?.role]?.text || "Free Member"}</h1>
        </Popover>

        <div className="flex flex-col lg:flex-row gap-2 items-center text-center">
          <p>Account ID : {idUser}</p>
          <Copy className="w-4 h-4 cursor-pointer hover:text-gray-500 transition-all" onClick={handleCopyID} />
        </div>

        <div className="flex flex-col text-center text-[12px] black">
          <p>
            Your account created at <span className="font-bold">{formatDate(userProfile?.createdAt, { weekday: "short", day: "2-digit", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}</span>
          </p>
          <p>
            Last updated at <span className="font-bold">{formatDate(userProfile?.updatedAt, { weekday: "short", day: "2-digit", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}</span>
          </p>
        </div>
        <div className="flex flex-col lg:w-96 w-full justify-center items-center ">
          <Form placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <Form
            placeholder="Phone Number"
            type="text"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              const val = e.target.value;
              if (/^[1-9][0-9]*$/.test(val) || val === "") {
                setPhone(val);
              }
            }}
          />
        </div>
        <div className="flex flex-col lg:w-96 w-full justify-center items-center ">
          <h1 className="text-lg font-semibold w-full">Social Media</h1>
          <Form placeholder="Username" type="text" text="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          <Form placeholder="Username" type="text" text="LinkedIn" value={linkedin} onChange={(e) => setLinkedIn(e.target.value)} />
          <Form placeholder="Username" type="text" text="TikTok" value={tiktok} onChange={(e) => setTikTok(e.target.value)} />
        </div>
        <Button onClick={handleUpdateProfile} text={loading ? "Saving..." : "Save Changes"} wFull className={"bg-black text-white hover:text-black lg:w-96 w-full"} />
      </div>
    </div>
  );
};

export default UserProfile;
