import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/Post";
import Saved from "../assets/saved.svg";
import Skeletons from "@/components/Skeletons";

const SavedPostPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [screenLoad, setScreenLoad] = useState(false);

  useEffect(() => {
    setScreenLoad(true);
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
        setScreenLoad(false);
      })
      .catch((err) => {
        console.log("fetch err", err);
        setScreenLoad(false);
      });
  }, []);

  return (
    <div>
      {screenLoad ? (
        <>
          <Skeletons />
        </>
      ) : (
        <>
          {savedPosts.length > 0 ? (
            <div className="text-3xl font-semibold mt-16 flex justify-center items-center pl-5 ">
              <div>
              Saved
                <span className="bg-blue-300 text-black ml-2 p-2 mr-2 rounded-lg  decoration-black px-3 py-1">
                   Posts
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
            <div className="flex justify-evenly mt-10">
              {savedPosts.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-7 ">
                    {savedPosts?.map((post, index) => (
                      <Post data={post} key={index} />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-3xl mt-16 font-semibold">
                    You
                    <span className="bg-green-300 font-semibold text-black ml-2 mr-2 rounded-lg px-3 py-1">
                      haven't saved
                    </span>
                    any posts yet.
                    <div className="flex justify-center mt-10">
                      <img src={Saved} className="w-96" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedPostPage;
