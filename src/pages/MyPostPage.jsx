import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/Post";
import NoData from "../assets/no-data.svg";
import Skeletons from "@/components/Skeletons";

const MyPostPage = () => {
  const [myPosts, setMyPosts] = useState([]);
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
      .get(`${URL}/post/myPosts`, { headers })
      .then((res) => {
        console.log(res);
        setMyPosts(res.data);
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
          {myPosts.length > 0 && (
            <>
              <div className="text-3xl font-semibold mt-16 flex justify-center items-center">
                <div>
                  Your
                  <span className="bg-blue-300 text-black ml-2 p-2 mr-2 rounded-lg  decoration-black">
                    Posts
                  </span>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-evenly mt-10">
            {myPosts.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-7 ">
                  {myPosts?.map((post, index) => (
                    <Post data={post} key={index} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="text-3xl mt-16 font-semibold">
                  You
                  <span className="bg-green-300 font-semibold text-black ml-2 mr-2 rounded-lg px-3 py-1">
                    haven't created
                  </span>
                  any posts yet.
                  <div className="flex justify-center mt-10">
                    <img src={NoData} className="w-96" />
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyPostPage;
