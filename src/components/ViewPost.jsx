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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import LikeFilled from "../assets/likeFilled.png";
import LikeUnfilled from "../assets/likeUnfilled.png";
import LargeSkeletons from "./LargeSkeletons";
import ImageWithLoading from "./ImageWithLoading";
import { SocketContext } from "@/context/SocketProvider";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { FaLink } from "react-icons/fa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { useToast } from "@/components/ui/use-toast";

const ViewPost = ({ id }) => {
  // const { toast:Toast } = useToast()

  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [savedBy, setSavedBy] = useState([]);
  const [saved, setSaved] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [screenLoad, setScreenLoad] = useState(false);
  const [postSelected, setPostSelected] = useState([]);
  const [like, setLike] = useState(false);
  const [interestShown, setInterestShown] = useState(false);
  const location = useLocation();
  const { socket } = useContext(SocketContext);
  const [userId, setUserId] = useState("");

  // useEffect(() => {
  //   console.log("interest between", interestShown);
  // }, [interestShown]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    console.log(JSON.parse(userInfo).data.token);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/post/getSavedBy/${id}`, { headers })
      .then((res) => {
        if (res.data.savedByUser) {
          setSaved(true);
        } else {
          setSaved(false);
        }
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
    // savedBy.forEach((user) => {
    //   console.log("user", user);
    //   console.log("user id", userId);
    //   if (user === userId) {
    //     setSaved(true);
    //   }
    // });
  }, [URL, id, savedBy]);

  useEffect(() => {
    setScreenLoad(true);
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const userId = JSON.parse(userInfo).data.id;
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/post/getPost/${id}`, { headers })
      .then((res) => {
        setPostSelected(res.data);
        setUserId(userId);
        setScreenLoad(false);
        console.log(res);
        console.log("fetch post id", res.data.savedBy);
        setSavedBy(res.data.savedBy);
        if (res.data.likes.length > 0) {
          setLike(true);
        }
        console.log("list of interest", res.data.interestShown);
        if (res.data.interestShown.includes(userId)) {
          setInterestShown(true);
        }
      })
      .catch((err) => {
        console.log("fetch err", err);
        setScreenLoad(false);
      });
  }, [URL, id]);

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

  const handleInterest = () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo).data.token;
    console.log(JSON.parse(userInfo).data.token);
    setLoad2(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const viewerID = JSON.parse(userInfo).data.id;
    console.log("viewer id", viewerID);
    const viewerEmail = JSON.parse(userInfo).data.email;
    const viewerName = JSON.parse(userInfo).data.username;
    axios
      .post(
        `${URL}/post/showInterest/${id}`,
        { viewerID, viewerEmail, viewerName },
        { headers }
      )
      .then((res) => {
        console.log(res);
        toast.info(res.data, { autoClose: 5000, position: "top-center" });
        setInterestShown((prev) => {
          const newInterestShown = !prev;
          if (newInterestShown) {
            socket.emit("sendNotification", {
              viewerName: viewerName,
              viewerID: viewerID,
              postedBy: postSelected.postedBy,
            });
          }
          return newInterestShown;
        });
        setLoad2(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data, { autoClose: 2000, position: "top-center" });
        setLoad2(false);
      });
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = `http://${link}`;
    }
    window.open(link, "_blank");
  };

  const handleLike = () => {
    setLike((prev) => !prev);
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${URL}/post/likePost/${id}`, {}, { headers })
      .then((res) => {
        console.log("res", res);
        if (res.data === "Liked") socket.emit("sendLike", { id });
        else socket.emit("unsendLike", { id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pb-20">
      {screenLoad ? (
        <>
          <LargeSkeletons />
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
                <div>
                  created by : {postSelected.postedBy?.user.username}
                  <span>
                    {postSelected.postedBy?.user_id === userId && " (You)"}
                  </span>
                </div>
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
                  <div className="flex flex-col space-y-3 ">
                    <div className="dark:text-white font-semibold text-black">
                      Tech stacks
                    </div>
                    <CardDescription>
                      {postSelected.description?.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-green-300 text-black mr-2 px-2 font-semibold rounded-md p-1 w-full inline"
                        >
                          {tag}
                        </div>
                      ))}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col space-y-3 ">
                    {postSelected?.description?.uploadedImageURL.length > 0 ? (
                      <>
                        <div className="dark:text-white font-semibold">
                          Images
                        </div>
                        <div className="flex space-x-5">
                          {postSelected?.description?.uploadedImageURL?.map(
                            (image, index) => (
                              <ImageWithLoading
                                key={index}
                                src={image}
                                alt="Post image"
                              />
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
                    <div className="dark:text-white font-semibold">
                      URLs / Links
                    </div>
                    {postSelected?.description?.inputs.length > 0 ? (
                      postSelected.description.inputs.map((link, index) => (
                        <>
                          {link.length > 0 && (
                            <div className="flex items-center">
                              <div>
                                <FaLink />
                              </div>
                              <div
                                key={index}
                                className=" w-1/2 dark:text-white/50 text-black/50 font-normal rounded-md px-2 py-1"
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
                            </div>
                          )}
                        </>
                      ))
                    ) : (
                      <div className="dark:text-white font-semibold text-black">
                        No Links
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    <div className="dark:text-white font-semibold">Bounty </div>
                    <CardDescription>
                      Min {postSelected.description?.bounty.min} (
                      {postSelected.description?.bountyCurrency}) - Max{" "}
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
                        fontSize: 40,
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
                      saved ? "text-white bg-blue-600 hover:bg-blue-500" : ""
                    }`}
                  >
                    {!saved ? (
                      <>
                        <BookmarkBorderIcon />
                      </>
                    ) : (
                      <BookmarkIcon />
                    )}{" "}
                    &nbsp;
                    {saved ? "Unsave" : "Save"}
                  </Button>
                  <div className="flex items-center">
                    {like
                      ? postSelected.postedBy?.user_id !== userId && (
                          <button
                            // className="bg-black dark:bg-white p-2 rounded-lg hover:scale-125 duration-150"
                            className="hover:scale-125 duration-200"
                            onClick={handleLike}
                          >
                            <FavoriteIcon fontSize="medium" />
                            {/* <img
                              src={LikeFilled}
                              width={"20px"}
                              className="cursor-pointer "
                            /> */}
                          </button>
                        )
                      : postSelected.postedBy?.user_id !== userId && (
                          <button
                            className="hover:scale-125 duration-200"
                            // className="dark:bg-white p-2 rounded-lg hover:scale-125 duration-150 "
                            onClick={handleLike}
                          >
                            <FavoriteBorderIcon fontSize="medium" />
                            {/* <img
                              src={LikeUnfilled}
                              width={"20px"}
                              className="cursor-pointer "
                            /> */}
                          </button>
                        )}
                  </div>
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
                <>
                  {interestShown ? (
                    <Button
                      onClick={handleInterest}
                      className="bg-blue-600 hover:bg-blue-500 dark:text-white"
                    >
                      Marked as Interested
                    </Button>
                  ) : postSelected.postedBy?.user_id === userId ? (
                    <> </>
                  ) : (
                    <Button onClick={handleInterest}>Show Interest</Button>
                  )}
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
