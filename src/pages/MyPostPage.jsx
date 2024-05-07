import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewPost from "@/components/ViewPost";
import Post from "@/components/Post";
const MyPostPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/post/myPosts`, { headers })
      .then((res) => {
        console.log(res);
        setMyPosts(res.data);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-evenly mt-16">
        {myPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-5 ">
            {myPosts?.map((post, index) => (
              <Post data={post} key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="text-3xl mt-10">
              You
              <span className="bg-green-300  text-black ml-2 mr-2 rounded-lg">
                haven't created
              </span>
              any posts yet ..
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPostPage;
