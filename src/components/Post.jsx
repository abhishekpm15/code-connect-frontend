import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LikeFilled from "../assets/likeFilled.png";
import LikeUnfilled from "../assets/likeUnfilled.png";
import { SocketContext } from "@/context/SocketProvider";
import { toast } from "react-toastify";

const Post = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [btn, setBtn] = useState(false);
  const [likes, setLikes] = useState(data.likes.length);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const handleGetLike = (datas) => {
      console.log("datas", datas);
      if (data.postId === datas.id) {
        setLikes((prev) => prev + 1);
      }
    };
    const handleRemoveLike = (datas) => {
      if (data.postId === datas.id) {
        setLikes((prev) => prev - 1);
      }
    };
    socket?.on("getLike", handleGetLike);
    socket?.on("removeLike", handleRemoveLike);
    return () => {
      socket?.off("getLike", handleGetLike);
      socket?.off("removeLike", handleRemoveLike);
    };
  }, [socket, data]);

  useEffect(() => {
    if (location.pathname === "/myposts") {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, [location.pathname]);

  const handleViewPost = (id) => {
    console.log(id);
    navigate(`/posts/${id}`);
  };
  const handleUpdatePost = (id) => {
    console.log(id);
    navigate(`/posts/updatePost/${id}`);
  };

  return (
    <div className="">
      <Card
        className="dark:bg-transparent w-[350px] h-[440px] hover:scale-105 hover:border-2 duration-200 border-black
         shadow-black dark:border-white/20 dark:hover:border-white/40"
      >
        {/* <div className="h-2 rounded-md w-2 bg-red-400"></div> */}
        <CardHeader>
          <div className="flex items-center">
            <div className="flex">Status : {data.status}</div>
            {data?.status === "open" ? (
              <div className="w-2 h-2 ml-2 bg-green-500 rounded-full"></div>
            ) : data?.status === "stashed" ? ( 
              <div className="w-2 h-2 ml-2 bg-orange-300 rounded-full"></div> 
            ) : (
              <div className="w-2 h-2 ml-2 bg-red-500 rounded-full"></div>
            )}
          </div>
          <div className="flex justify-between items-center h-14">
            <CardTitle className="h-full overflow-hidden text-ellipsis w-full">
              {data.description.name}
            </CardTitle>
            <CardDescription></CardDescription>
          </div>
          <CardDescription className="h-24 overflow-hidden">
            <div className="h-full">{data.description.message}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 text-ellipsis h-14 w-full  overflow-hidden">
                <Label>Tech Stacks :</Label>
                <CardDescription className="flex space-x-3">
                  {data.description.tags.map((tag, index) => (
                    <div
                      className="bg-green-300 text-black font-semibold rounded-md px-2 py-1"
                      key={index}
                    >
                      {tag}
                    </div>
                  ))}
                </CardDescription>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Bounty Amount</Label>
                <CardDescription className="flex justify-between">
                  <div>
                    min {data?.description?.bounty?.min} (
                    {data?.description?.bountyCurrency}) - max{" "}
                    {data?.description?.bounty?.max} (
                    {data?.description?.bountyCurrency})
                  </div>
                  <div className="flex gap-2">
                    {likes}
                    {likes > 0 ? (
                      <img src={LikeFilled} className="w-5 h-5" />
                    ) : (
                      <img src={LikeUnfilled} className="w-5 h-5" />
                    )}
                  </div>
                </CardDescription>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          {btn ? (
            <Button
              className="w-full"
              onClick={() => {
                handleUpdatePost(data.postId);
              }}
            >
              Update Post
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                handleViewPost(data.postId);
              }}
            >
              View Post
              <span className="ml-3 text-xs">
                {/* {
                JSON.parse(localStorage.getItem("userInfo")).data.id === data.postedBy.user_id ? "🫵🏻" : ""
              } */}
                {JSON.parse(localStorage.getItem("userInfo")).data.id ===
                data.postedBy.user_id
                  ? "(Your post)"
                  : ""}
              </span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
