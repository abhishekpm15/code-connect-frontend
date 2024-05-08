import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

const ImageUpload = ({uploading, setUploading, uploadedImageURL, setUploadedImageURL, fileList, setFileList}) => {
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <div>
      <Upload {...props} className="dark:text-white">
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </div>
  );
};

export default ImageUpload;
