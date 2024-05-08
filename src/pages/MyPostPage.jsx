import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
      {myPosts && (
        <>
          <div className="text-3xl font-semibold mt-10 flex justify-center w-1/2 items-center underline underline-offset-8">
            <div>
              Your
              <span className="bg-blue-300 text-black ml-2 p-2 mr-2 rounded-lg underline underline-offset-8 decoration-black">
                Posts
              </span>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-evenly mt-16">
        {myPosts.length > 0 ? (
          <div>
            <div className="grid grid-cols-3 gap-5 ">
              {myPosts?.map((post, index) => (
                <Post data={post} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="text-3xl mt-24">
              You
              <span className="bg-green-300 font-semibold text-black ml-2 mr-2 rounded-lg">
                haven't created
              </span>
              any posts yet 😔..
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPostPage;
