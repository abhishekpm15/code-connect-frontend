import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/Post";
import Saved from "../assets/saved.svg";
import Interest from "../assets/interest.svg";
import Skeletons from "@/components/Skeletons";

const InterestedPostPage = () => {
  const [interestedPosts, setinterestedPosts] = useState([]);
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
      .get(`${URL}/post/interestedPosts/`, { headers })
      .then((res) => {
        console.log(res);
        setinterestedPosts(res.data);
        setScreenLoad(false);
      })
      .catch((err) => {
        console.log("fetch err", err);
        setScreenLoad(false);
      });
  }, [URL]);

  return (
    <div>
      {screenLoad ? (
        <>
          <Skeletons />
        </>
      ) : (
        <>
          {interestedPosts.length > 0 ? (
            <div className="text-3xl font-semibold mt-16 flex justify-center items-center ml-16 pl-5 ">
              <div>
              Interested
                <span className="bg-blue-300 text-black ml-2 p-2 mr-2 rounded-lg  decoration-black px-3 py-1">
                   Posts
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
            <div className="flex justify-evenly mt-16">
              {interestedPosts.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-5 gap-y-7 ">
                    {interestedPosts?.map((post, index) => (
                      <Post data={post} key={index} />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-3xl mt-24 font-semibold">
                    You don't have any
                    <span className="bg-green-300 font-semibold text-black ml-2 mr-2 rounded-lg px-3 py-1">
                      Interested Posts
                    </span>
                    <div className="flex justify-center mt-10">
                      <img src={Interest} className="w-[550px]" />
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

export default InterestedPostPage;
