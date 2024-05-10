import Navbar from "@/components/Navbar";
import ViewPost from "@/components/ViewPost";
import React from "react";
import { useParams } from "react-router-dom";

const ViewPostPage = () => {
  const { id } = useParams();
  console.log(id)
  return (
    <div>
      <ViewPost id={id}/>
    </div>
  );
};

export default ViewPostPage;
