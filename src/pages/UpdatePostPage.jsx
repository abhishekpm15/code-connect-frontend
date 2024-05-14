import React from "react";
import { useParams } from "react-router-dom";
import UpdatePost from "@/components/UpdatePost";

const UpdatePostPage = () => {
  const { id } = useParams();
  return (
    <div>
      <div><UpdatePost id = {id} /></div>
    </div>
  );
};

export default UpdatePostPage;
