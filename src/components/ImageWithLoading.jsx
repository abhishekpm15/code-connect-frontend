import React, { useState } from "react";
import { Modal, Spin } from "antd";
import ImageViewModal from "./ImageViewModal";

const ImageWithLoading = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
          <ImageViewModal src={src}/>
        </Modal>
      )}

      <div className="relative w-64 h-64">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spin size="large"/>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={`w-full h-full object-cover ${
            loading ? "hidden" : "block"
          }`}
          onClick={()=>{setIsModalOpen(true)}}
        />
      </div>
    </div>
  );
};

export default ImageWithLoading;
