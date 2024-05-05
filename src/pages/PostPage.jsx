import AddPost from "@/components/AddPost";
import Navbar from "@/components/Navbar";
import React from "react";

const PostPage = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full">
        <AddPost />
      </div>
    </div>
  );
};

export default PostPage;
