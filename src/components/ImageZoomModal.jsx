import React from "react";
import { Modal } from "antd";

const ImageZoomModal = ({ src, alt, open, onClose }) => {
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      centered

    >
      <img
        src={src}
        alt={alt}
        className="max-h-[80vh] object-contain rounded-full"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/image-not-found.png";
        }}
      />
    </Modal>
  );
};

export default ImageZoomModal;
