import Filter from "@/components/Filter";
import GlobalChat from "@/components/GlobalChat";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(posts.length);
  }, [posts]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/post/allPosts`, { headers })
      .then((res) => {
        console.log("fetch res", res);
        setPosts(res.data);
        console.log(posts.length);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className=" mt-14 pl-44">
        <Filter />
      </div>
      <div className="flex justify-evenly mt-16">
        <div className="grid grid-cols-3 gap-5 ">
          {posts.map((post,index) => (
            <Post data={post} key={index}/>
          ))}
        </div>
        <div className="flex ">
          <GlobalChat />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
