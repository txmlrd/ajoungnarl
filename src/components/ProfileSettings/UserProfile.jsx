import { SquarePen } from "lucide-react";
import ImageCrop from "./ImageCrop";
import { useState, useRef } from "react";

const UserProfile = () => {
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("/path/to/profile/picture"); // default foto
  const [selectedFile, setSelectedFile] = useState(null);

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
          <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full bg-green-200 object-cover" />
        </div>

        {/* Hidden input file */}
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

        {isCropOpen && selectedFile && (
          <ImageCrop
            file={selectedFile}
            onComplete={(croppedUrl) => {
              if (croppedUrl) setProfilePic(croppedUrl);
              setIsCropOpen(false);
              setSelectedFile(null);
            }}
            onClose={() => {
              setIsCropOpen(false);
              setSelectedFile(null);
            }}
          />
        )}

        <p className="text-center text-sm text-gray-500">*Click your profile picture to remove or change picture</p>
      </div>
    </div>
  );
};

export default UserProfile;
