import Filter from "@/components/Filter";
import GlobalChat from "@/components/GlobalChat";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className=" mt-14 pl-44">
        <Filter />
      </div>
      <div className="flex justify-evenly mt-16">
        <div className="grid grid-cols-3 gap-5 ">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="flex ">
          <GlobalChat />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
