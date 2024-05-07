import Filter from "@/components/Filter";
import GlobalChat from "@/components/GlobalChat";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
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
    <div>
      {screenLoad ? (
        <>
          <Navbar />
          <div className="flex justify-center items-center h-full mt-24 space-x-10">
            <div className="flex flex-col space-y-3 ">
              <Skeleton className="h-[350px] w-[350px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3 ">
              <Skeleton className="h-[350px] w-[350px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3 ">
              <Skeleton className="h-[350px] w-[350px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {!screenLoad && posts.length > 0 && (
            <>
              <Navbar />
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
              <Navbar />
              <div className="flex flex-col justify-center mt-24">
                <div className="text-3xl text-center ">
                  There are
                  <span className="bg-red-400 text-black ml-2 mr-2 rounded-lg">
                    no posts
                  </span>
                  yet..
                </div>
                <div className="text-3xl mt-10 text-center">
                  You will see posts when{" "}
                  <span className="bg-green-300  text-black ml-2 mr-2 rounded-lg">
                    you{" "}
                  </span>
                  or the{" "}
                  <span className="bg-green-300 text-black ml-2 mr-2 rounded-lg">
                    community{" "}
                  </span>{" "}
                  starts posting .
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
  // <Navbar />
  // <div className=" mt-14 pl-44">
  //   <Filter />
  // </div>
  //         <div className="flex justify-evenly mt-16">
  //           {!screenLoad && posts.length > 0 ?
  // (
  //             <div className="grid grid-cols-3 gap-5 ">
  //               {posts?.map((post, index) => (
  //                 <Post data={post} key={index} />
  //               ))}
  //             </div>
  //           )
  // : (
  //             <>
  // {!screenLoad && (
  //   <div className="">
  //     <div className="text-3xl text-center">
  //       There are
  //       <span className="bg-red-400 text-black ml-2 mr-2 rounded-lg">
  //         no posts
  //       </span>
  //       yet..
  //     </div>
  //     <div className="text-3xl mt-10">
  //       You will see posts when{" "}
  //       <span className="bg-green-300  text-black ml-2 mr-2 rounded-lg">
  //         you{" "}
  //       </span>
  //       or the{" "}
  //       <span className="bg-green-300 text-black ml-2 mr-2 rounded-lg">
  //         community{" "}
  //       </span>{" "}
  //       starts posting .
  //     </div>
  //   </div>
  // )}
  //             </>
  //           )}
  //           <div className="flex ">
  //             <GlobalChat />
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default HomePage;
