import Filter from "@/components/Filter";
import GlobalChat from "@/components/GlobalChat";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Void from "../assets/void.svg";
import Skeletons from "@/components/Skeletons";

const HomePage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [screenLoad, setScreenLoad] = useState(false);

  useEffect(() => {
    console.log("this page");
    setScreenLoad(true);
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
        setScreenLoad(false);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  }, []);

  return (
    <div className="">
      <div className="overflow-hidden">
        <div className="h-[700px] w-[700px] absolute  left-[17%] top-[10%] bg-purple-700 rounded-full blur-3xl dark:opacity-20 opacity-30 -z-20 overflow-hidden"></div>
        <div className="h-[700px] w-[700px] absolute  right-[17%] bg-indigo-600 rounded-full blur-3xl dark:opacity-20 -z-40 opacity-30 overflow-hidden"></div>
      </div>
      {screenLoad ? (
        <>
          <Skeletons />
        </>
      ) : (
        <>
          {!screenLoad && posts.length > 0 && (
            <>
              <div className=" mt-14 pl-44">
                <Filter />
              </div>
              <div className="flex justify-evenly mt-16">
                <div className="grid grid-cols-3 gap-5 ">
                  {posts?.map((post, index) => (
                    <Post data={post} key={index} />
                  ))}
                </div>
                <div className="flex ">
                  <GlobalChat />
                </div>
              </div>
            </>
          )}
          {!screenLoad && posts.length === 0 && (
            <div className="">
              <div className="flex flex-col justify-center mt-24">
                <div className="text-3xl font-semibold text-center ">
                  There are
                  <span className="bg-red-400 text-black ml-2 mr-2 rounded-lg px-3 py-1">
                    no posts
                  </span>
                  yet..
                </div>
                <div className="text-3xl mt-10 text-center font-semibold">
                  You will see posts when
                  <span className="bg-emerald-300  text-black ml-2 mr-2 rounded-lg px-3 py-1">
                    you
                  </span>
                  or the
                  <span className="bg-emerald-300 text-black ml-2 mr-2 rounded-lg px-3 py-1">
                    community
                  </span>
                  starts posting .
                </div>
                <div className="flex justify-center mt-20">
                  <img src={Void} className="w-96" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
