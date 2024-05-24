import Filter from "@/components/Filter";
import GlobalChat from "@/components/GlobalChat";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Void from "../assets/void.svg";
import Skeletons from "@/components/Skeletons";
import Background from "@/components/Background";
import Paginations from "@/components/Paginations";

const HomePage = () => {
  const rowsPerPage = 6;
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [screenLoad, setScreenLoad] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage) 
  const [postLength, setPostLength] = useState(0);

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
        setPostLength(res.data.length)
        console.log(posts.length);
        setScreenLoad(false);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  }, []);

  return (
    <Background>
      <div className="w-full pb-40">
        {screenLoad ? (
          <>
            <Skeletons />
          </>
        ) : (
          <>
            {!screenLoad && posts.length > 0 && (
              <>
                <div className="mt-14 w-full flex justify-center">
                  <Filter />
                </div>
                <div className="flex justify-evenly mt-16 xl:px-10">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-x-5 gap-y-7 ">
                    {posts.slice(startIndex,endIndex)?.map((post, index) => (
                      <Post data={post} key={index} />
                    ))}
                  </div>
                  <div className="2xl:block hidden">
                    <GlobalChat />
                  </div>
                </div>
                <div className="mt-20">
                  <Paginations startIndex={startIndex} setStartIndex={setStartIndex} endIndex={endIndex} setEndIndex={setEndIndex} rowsPerPage={rowsPerPage} postLength={postLength}/>
                </div>
              </>
            )}
            {!screenLoad && posts.length === 0 && (
              <div className="overflow-hidden">
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
    </Background>
  );
};

export default HomePage;
