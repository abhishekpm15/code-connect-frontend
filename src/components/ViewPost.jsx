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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Skeletons from "./Skeletons";

const ViewPost = ({ id }) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [savedBy, setSavedBy] = useState([]);
  const [saved, setSaved] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [screenLoad, setScreenLoad] = useState(false);
  const [postSelected, setPostSelected] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // setScreenLoad(true);
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const userId = JSON.parse(userInfo).data.id;
    const res = savedBy.forEach((user) => {
      console.log("user", user);
      console.log("user id", userId);
      if (user === userId) {
        setSaved(true);
        // setScreenLoad(false);
      }
    });
  }, [savedBy]);

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
      .get(`${URL}/post/getPost/${id}`, { headers })
      .then((res) => {
        setPostSelected(res.data);
        setScreenLoad(false);
        console.log(res);
        console.log("fetch post id", res.data.savedBy);
        setSavedBy(res.data.savedBy);
      })
      .catch((err) => {
        console.log("fetch err", err);
        setScreenLoad(false);
      });
  }, []);

  const handleSave = async (e) => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    e.preventDefault();
    setLoad(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (saved) {
      axios
        .post(`${URL}/post/unSavePost/${id}`, {}, { headers })
        .then((res) => {
          console.log(res);
          console.log("fetch post id res2", res.data);
          setSaved(false);
          toast.success("Post Unsaved successfully");
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          console.log("fetch err", err);
          setTimeout(() => {
            setLoad(false);
          }, 2000);
        });
    } else {
      axios
        .post(`${URL}/post/savePost/${id}`, {}, { headers })
        .then((res) => {
          console.log(res);
          console.log("fetch post id res2", res.data);
          setSaved(true);
          toast.success("Post saved successfully");
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
          console.log("fetch err", err);
          setTimeout(() => {
            setLoad(false);
          }, 2000);
        });
    }
  };

  const handleSolve = () => {
    setLoad2(true);
  };
  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = `http://${link}`;
    }
    window.open(link, "_blank");
  };

  return (
    <div>
      {screenLoad ? (
        <>
          <Skeletons />
        </>
      ) : (
        <div className="w-full flex justify-center h-full mt-10 px-24">
          <Card className="w-[1200px] border-black/30 shadow-2xl dark:border-white/30">
            <CardHeader>
              <div className="flex justify-between mb-1">
                <CardTitle>{postSelected.description?.name}</CardTitle>
                <div className="flex items-center">
                  <div className="">Status </div>
                  <div>
                    {postSelected?.status === "open" ? (
                      <div className="w-5  h-5 bg-green-400 rounded-full ml-2"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-400 rounded-full  "></div>
                    )}
                  </div>
                </div>
              </div>
              <CardDescription className="flex">
                created by : {postSelected.postedBy?.user.username}
                <Avatar className="ml-2 mr-2 w-5 h-5">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </CardDescription>
              <CardDescription>
                view profile : {postSelected.postedBy?.user_id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4 h-full">
                  <div className="flex flex-col space-y-1.5 ">
                    <div className="dark:text-white font-semibold text-black">
                      Problem Description
                    </div>
                    <CardDescription>
                      {postSelected.description?.message}
                    </CardDescription>
                    <div className="flex space-x-3"></div>
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    <div className="dark:text-white font-semibold text-black">
                      Tech stacks
                    </div>
                    <CardDescription>
                      {postSelected.description?.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-green-300 text-black ml-1 font-semibold rounded-md p-1 w-full inline"
                        >
                          {tag}
                        </div>
                      ))}
                    </CardDescription>
                    <div className="flex space-x-3"></div>
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    {postSelected?.description?.uploadedImageURL.length > 0 ? (
                      <>
                        <div className="dark:text-white font-semibold">
                          Images
                        </div>
                        <div className="flex space-x-5">
                          {postSelected?.description?.uploadedImageURL?.map(
                            (image) => (
                              <div className="">
                                <img src={image} className="w-64" />
                              </div>
                            )
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="dark:text-white font-semibold text-black">
                        No Images
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    {postSelected?.description?.inputs.length > 0 ? (
                      <>
                        <div className="dark:text-white font-semibold">
                          URLs / Links
                        </div>
                        {postSelected?.description?.inputs?.map(
                          (link, index) => (
                            <div
                              key={index}
                              className="bg-blue-300 w-1/2 text-black font-semibold rounded-md px-2 py-1"
                            >
                              <a
                                href={link}
                                onClick={() => handleLinkClick(link)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link}
                              </a>
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      <div className="dark:text-white font-semibold text-black">
                        No Links
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    <div className="dark:text-white font-semibold">Bounty </div>
                    <CardDescription>
                      Min {postSelected.description?.bounty.min} - Max{" "}
                      {postSelected.description?.bounty.max} (
                      {postSelected.description?.bountyCurrency})
                    </CardDescription>
                    <div className="flex space-x-3"></div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {load ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                      }}
                      spin
                    />
                  }
                />
              ) : (
                <div className="flex space-x-5">
                  <Button
                    onClick={() => {
                      if (location.pathname.startsWith("/posts"))
                        navigate("/savedposts");
                      else navigate("/home");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className={`${
                      saved ? "bg-blue-400 hover:bg-blue-500" : ""
                    }`}
                  >
                    {saved ? "Unsave" : "Save"}
                  </Button>
                </div>
              )}
              {load2 ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                      }}
                      spin
                    />
                  }
                />
              ) : (
                <Button onClick={handleSolve}>Solve Problem</Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
