import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/Post";


const SavedPostPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
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
      .get(`${URL}/post/savedPosts/`, { headers })
      .then((res) => {
        console.log(res);
        setSavedPosts(res.data);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {savedPosts && (
        <>
          <div className="text-3xl font-semibold mt-10 flex justify-center w-1/2 items-center underline underline-offset-8">
            <div>
              Your
              <span className="bg-blue-300 text-black ml-2 p-2 mr-2 rounded-lg underline underline-offset-8 decoration-black">
               Saved Posts
              </span>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-evenly mt-16">
        {savedPosts.length > 0 ? (
          <div>
            <div className="grid grid-cols-3 gap-5 ">
              {savedPosts?.map((post, index) => (
                <Post data={post} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="text-3xl mt-24">
              You
              <span className="bg-green-300 font-semibold text-black ml-2 mr-2 rounded-lg">
                haven't saved
              </span>
              any posts yet 👎..
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedPostPage;
