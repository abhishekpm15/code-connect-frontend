import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Void from "../assets/void.svg";
import Skeletons from "@/components/Skeletons";
import Background from "@/components/Background";
import Paginations from "@/components/Paginations";
import Filter from "@/components/Filter";
import GlobalChat from "@/components/GlobalChat";
import Post from "@/components/Post";
import { SocketContext } from "@/context/SocketProvider";
import { toast } from "react-toastify";
import { SearchContext } from "@/context/SearchProvider";
import { NotificationContext } from "@/context/NotificationProvider";

const HomePage = () => {
  const rowsPerPage = 6;
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [screenLoad, setScreenLoad] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { searched, searchPost } = useContext(SearchContext);
  // const { socket } = useContext(SocketContext);
  // const {notification, setNotification} = useContext(NotificationContext)

  // useEffect(() => {
  //   const handleGetNotification = (datas) => {
  //     const userInfo = localStorage.getItem("userInfo");
  //     const id = JSON.parse(userInfo).data.id;
  //     console.log("id postedid", id, datas.receiverId);
  //     if (id === datas.receiverId) {
  //       setNotification((prev => prev+1))
  //       toast.info(
  //         `You have new Interest notification from ${datas.senderName}`,
  //         {
  //           autoClose: 5000,
  //           position: "top-center",
  //         }
  //       );
  //     }
  //   };
  //   socket?.on("getNotification", handleGetNotification);
  //   return () => {
  //     socket?.off("getNotification", handleGetNotification);
  //   };
  // }, [socket]);
  
  // const {socket} = useContext(SocketContext)

  // useEffect(() => {
  //   socket?.on("getLike", () => {
  //     toast.success("New notification")
  //   });
  // }, [socket]);

  useEffect(() => {
    const fetchPosts = async () => {
      setScreenLoad(true);
      const userInfo = localStorage.getItem("userInfo");
      const token = JSON.parse(userInfo).data.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const res = await axios.get(
          `${URL}/post/allPosts?page=${currentPage}&limit=${rowsPerPage}`,
          { headers }
        );
        setPosts(res.data.posts);
        console.log("post fetched", res.data.posts);
        setTotalPages(Math.ceil(res.data.totalCount / rowsPerPage));
        setScreenLoad(false);
      } catch (err) {
        console.log("fetch err", err);
        setScreenLoad(false);
      }
    };

    fetchPosts();
  }, [URL, currentPage, rowsPerPage]);

  return (
    <Background>
      <div className="w-full pb-40">
        {screenLoad ? (
          <Skeletons />
        ) : (
          <>
            {posts.length > 0 ? (
              <>
                <div className="mt-14 w-full flex justify-center">
                  <Filter />
                </div>
                {searched ? (
                  <>
                    <div className="text-2xl font-semibold mt-5 flex justify-center  items-center  ml-6">
                      Search
                      <span className="bg-blue-300 text-black ml-2 p-2 mr-2 rounded-lg  decoration-black">
                        Results
                      </span>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="flex justify-evenly mt-10 xl:px-10">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-7">
                    {searched
                      ? searchPost?.map((post, index) => (
                          <Post data={post} key={index} />
                        ))
                      : posts?.map((post, index) => (
                          <Post data={post} key={index} />
                        ))}
                  </div>
                  <div className="2xl:block hidden">
                    <GlobalChat />
                  </div>
                </div>
                <div className="mt-20">
                  <Paginations
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </div>
              </>
            ) : (
              <div className="overflow-hidden">
                <div className="flex flex-col justify-center mt-24">
                  <div className="text-3xl font-semibold text-center">
                    There are
                    <span className="bg-red-400 text-black ml-2 mr-2 rounded-lg px-3 py-1">
                      no posts
                    </span>
                    yet..
                  </div>
                  <div className="text-3xl mt-10 text-center font-semibold">
                    You will see posts when
                    <span className="bg-emerald-300 text-black ml-2 mr-2 rounded-lg px-3 py-1">
                      you
                    </span>
                    or the
                    <span className="bg-emerald-300 text-black ml-2 mr-2 rounded-lg px-3 py-1">
                      community
                    </span>
                    starts posting.
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
