import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ViewPost from "@/components/ViewPost";
import UpdatePost from "@/components/UpdatePost";
import Navbar from "@/components/Navbar";

const UpdatePostPage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();


  return (
    <div>
      <Navbar />
      <div><UpdatePost id = {id} /></div>
    </div>
  );
};

export default UpdatePostPage;
