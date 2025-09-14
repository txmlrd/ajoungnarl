import { useState, useRef, useCallback, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCrop = ({ file, onComplete, onClose }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);

  // Convert file ke base64 → untuk preview
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result.toString());
      reader.readAsDataURL(file);
    }
  }, [file]);

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: "%", width: 50 }, 1, width, height),
        width,
        height
      )
    );
  }, []);

  // Convert hasil crop ke base64
  const getCroppedImage = useCallback(() => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    // 👉 langsung return base64 string
    const base64Image = canvas.toDataURL("image/jpeg", 0.95);
    if (onComplete) onComplete(base64Image);
    onClose();
  }, [completedCrop, onComplete, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Box */}
      <div
        className="bg-white p-4 shadow-lg flex flex-col items-center gap-4 
                   max-w-[90vw] max-h-[90vh] w-full sm:w-[400px] overflow-auto"
      >
        {imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            className="max-w-full max-h-[60vh]"
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop"
              onLoad={onImageLoad}
              className="max-w-full max-h-[60vh] object-contain"
            />
          </ReactCrop>
        )}

        <div className="flex gap-3 *:cursor-pointer *:transition-all">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-black text-black hover:bg-gray-200"
          >
            Cancel
          </button>
          {completedCrop && (
            <button
              onClick={getCroppedImage}
              className="px-4 py-2 bg-black text-white border border-black hover:bg-gray-500 hover:text-black"
            >
              Crop & Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCrop;
