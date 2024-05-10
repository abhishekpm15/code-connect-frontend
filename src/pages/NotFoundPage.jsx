import Navbar from "@/components/Navbar";
import React from "react";
import PageNotFound from "../assets/page-not-found.svg"
const NotFoundPage = () => {
  return (
    <div>
      <div className="flex justify-center mt-28">
        <img src={PageNotFound} className="w-[600px]"/>
      </div>
    </div>
  );
};

export default NotFoundPage;
