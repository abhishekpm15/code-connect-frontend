import { Spin } from "antd";
import React, { useState } from "react";

const ImageViewModal = ({ src }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spin size="large"/>
        </div>
      )}
      <img
        src={src}
        onLoad={()=>{setLoading(false)}}
        className={`w-full h-full object-cover ${loading ? "hidden" : "block"}`}
      />
    </div>
  );
};

export default ImageViewModal;
