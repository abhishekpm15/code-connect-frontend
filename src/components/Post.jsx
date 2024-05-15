import React, { useEffect, useState } from "react";
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

const Post = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [btn, setBtn] = useState(false);

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
      <Card className="w-[350px] hover:scale-105 hover:shadow-lg duration-200 border-black/20
        shadow-md shadow-black dark:shadow-white/30 ">
        <CardHeader>
          <div className="flex items-center">
            <div className="flex">Status : {data.status}</div>
            {data?.status === "open" ? (
              <div className="w-2 h-2 ml-2 bg-green-400 rounded-full"></div>
            ) : (
              <div className="w-2 h-2 ml-2 bg-red-400 rounded-full"></div>
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
                    <div className="bg-green-300 text-black font-semibold rounded-md px-2 py-1" key={index}>{tag}</div>
                  ))}
                </CardDescription>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Bounty Amount</Label>
                <CardDescription>
                  Min {data?.description?.bounty?.min} - Max{" "}
                  {data?.description?.bounty?.max} (
                  {data?.description?.bountyCurrency})
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
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
