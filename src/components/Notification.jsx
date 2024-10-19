import { NotificationContext } from "@/context/NotificationProvider";
import React, { useContext, useRef, useEffect, useState } from "react";
import { CloseCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import gsap from "gsap";
import { Modal, Spin } from "antd";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThemeProviderContext } from "./theme-provider";
import { SocketContext } from "@/context/SocketProvider";

const Notification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [isHovered, setIsHovered] = useState(null);
  const { notification, setNotification } = useContext(NotificationContext);
  const [id, setId] = useState();
  const [acceptLoad, setAcceptLoad] = useState(false);
  const [viewProfile, setViewProfile] = useState([]);
  const [clickedNoti, setClickedNoti] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState();
  const [selectedId, setSelectedId] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedPostName, setSelectedPostName] = useState();
  const [selectedNotificationPostId, setSelectedNotificationPostId] =
    useState();
  const [sendToId, setSendToId] = useState();
  const [totalUserBounty, setTotalUserBounty] = useState(0);
  const { socket } = useContext(SocketContext);
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("clicked noti", clickedNoti);
  });

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  useEffect(() => {
    gsap.from(".btn-appear", {
      opacity: 0,
      y: -10,
    });
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const userToken = JSON.parse(userInfo).data.token;
    setToken(userToken)
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    };
  });

  const removeNotification = (id, index) => {
    const notificationRef = notificationRefs.current[index];
    gsap.to(notificationRef, {
      opacity: 0,
      y: -100,
      onComplete: () => {
        const userInfo = localStorage.getItem("userInfo");
        const token = JSON.parse(userInfo).data.token;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .delete(`${URL}/notification/removeNotification/${id}`, { headers })
          .then((res) => {
            console.log("res", res);
            setNotification(res.data);
            toast.success("Deleted a Notification");
          })
          .catch((err) => {
            toast.error("Could not delete the notification");
            console.log(err);
          });
      },
    });
  };
  const notificationRefs = useRef([]);

  useEffect(() => {
    notificationRefs.current = notification.map(
      (_, i) => notificationRefs.current[i] ?? React.createRef()
    );
    console.log("refs", notificationRefs);
  }, [notification]);

  const handleViewProfile = (id) => {
    showModal(true);
    setId(id);
    console.log(id);
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/user/getProfile/${id}`, { headers })
      .then((res) => {
        setViewProfile(res.data);
        console.log(res);
        axios
          .get(`${URL}/user/getTotalBounty/${id}`, { headers })
          .then((res) => {
            console.log("res bounty", res);
            setTotalUserBounty(res.data.totalBounty);
          })
          .catch((err) => {
            console.log("fetch err", err);
          });
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  };

  const handleAccept = (
    e,
    userId,
    notificationId,
    index,
    postID,
    sendToId,
    postName
  ) => {
    console.log(notificationId, index);
    setSelectedUserId(userId);
    setSelectedId(notificationId);
    setSelectedIndex(index);
    setClickedNoti(notificationId);
    setSelectedNotificationPostId(postID);
    setSendToId(sendToId);
    setSelectedPostName(postName);
    e.preventDefault();
    showModal2(true);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setToken(JSON.parse(userInfo).data.token);
  }, []);

  const handleConfirm = async () => {
    console.log("here");
    console.log(selectedId, selectedIndex);
    setAcceptLoad(true);
    setIsModalOpen2(false);
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const userId = JSON.parse(userInfo).data.id;
    console.log("viewer id", userId);
    const userEmail = JSON.parse(userInfo).data.email;
    const userName = JSON.parse(userInfo).data.username;
    const postID = selectedNotificationPostId;
    console.log(
      "user id , sender id , sendToId",
      userId,
      selectedUserId,
      sendToId,
      selectedPostName
    );
    try {
      console.log("Token check", token);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${URL}/post/stashPost/${postID}`,
        {
          status: "closed",
          receiverId:sendToId
        },
        { headers }
      );
      console.log("Post response", res);
      console.log("items listed" , sendToId, userName, userId, userEmail)
      socket.emit("sendAcceptNotification", {
        sendToUserId: sendToId,
        userName: userName,
        userId: userId,
        userEmail: userEmail,
        postID: postID,
        postName: selectedPostName,
      });
      toast.success("You have accepted the request");  
    } catch (err) {
      toast.error("Error updating post")
      console.error("Error updating post", err);
    }
    setTimeout(() => {
      removeNotification(selectedId, selectedIndex);
    }, 1000);
    setAcceptLoad(false);
  };

  return (
    <>
      <>
        <Modal
          title="Profile"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={"900px"}
        >
          <div className="flex justify-center space-x-12 items-center">
            <div className="">
              <Avatar className="w-64 h-64">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col space-y-2">
              <div>
                <Label className="font-semibold">Username: </Label>
                {viewProfile.username}
              </div>
              <div>
                <Label className="font-semibold">Email: </Label>
                {viewProfile.email}
              </div>
              <div>
                <Label className="font-semibold">Description: </Label>
                {viewProfile.bio}
              </div>
              <div>
                <Label className="font-semibold">Tech stacks: </Label>
                <span className="mt-2">
                  {viewProfile.techStack?.map((tag, index) => (
                    <div
                      className="bg-green-300 inline-block mt-1 mr-2 text-black font-semibold rounded-md px-2 py-1"
                      key={index}
                    >
                      {tag}
                    </div>
                  ))}
                </span>
              </div>
              <div>
                <Label className="font-semibold">
                  Solved ✅: {viewProfile?.completedPosts?.length}
                </Label>
              </div>
              <div>
                <Label className="font-semibold">
                  Success rate %:{" "}
                  {(viewProfile?.completedPosts?.length * 100) /
                    viewProfile?.interestedPosts?.length}
                </Label>
              </div>
              <div>
                <Label className="font-semibold">
                  Total earnings: {totalUserBounty}
                </Label>
              </div>
              <div>
                <Label className="font-semibold">Acheivements: {totalUserBounty} </Label>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          title="📌 Rules and Regulations"
          open={isModalOpen2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          width={"700px"}
          footer={null}
        >
          <div className="font-semibold ml-1">
            Please read the below rules carefully ❗
          </div>
          <div className="flex flex-col space-y-3 mt-5">
            <div>
              • Upon mutual acceptance of the problem request, the problem/post
              will be moved to a restricted visibility state (only the developer
              involved can see the post).
            </div>
            <div>
              • If the developer is unable to solve the problem, you rerserve
              all rights to demote the person.
            </div>
            <div>
              • In the event of a conflict, the concerned party can email the
              platform, and appropriate actions will be taken accordingly.
            </div>
          </div>
          <div className="mt-5 font-bold text-center mb-10">
            {" "}
            Collaboration is the cornerstone of innovation. <br></br> Respect
            the platform, and together, we can achieve greatness.
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              className="rounded-lg  bg-white text-black dark:border-gray-200 hover:bg-gray-100 border px-3 py-1"
              onClick={handleCancel2}
            >
              Decline
            </Button>

            {acceptLoad ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                      width: "100px",
                    }}
                    spin
                  />
                }
              />
            ) : (
              <Button
                className="rounded-lg dark:bg-[#10172a] dark:text-white px-3 py-1"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            )}
          </div>
        </Modal>
      </>
      <div className="flex  justify-center mt-10">
        {notification.length > 0 && (
          <div className="flex flex-col items-center justify-center ">
            {notification?.map((notif, index) => (
              <div
                key={notif._id}
                className="relative duration-200 cursor-pointer mb-5 z-0 w-full"
                ref={(el) => (notificationRefs.current[index] = el)}
                onMouseEnter={() => {
                  setIsHovered(notif._id);
                }}
                onMouseLeave={() => {
                  setIsHovered(null);
                }}
              >
                <div className="flex items-center ">
                  <div
                    className="absolute -right-2 -top-2"
                    onClick={() => {
                      removeNotification(notif._id, index);
                    }}
                  >
                    <CloseCircleTwoTone className="text-xl" />
                  </div>
                  <div className="px-10 py-5 w-full dark:bg-white rounded-xl dark:text-black text-white bg-[#10172a]">
                    {notif?.notifications?.type === "Interest"
                      ? notif?.notifications?.message.split('"')[0]
                      : ""}
                    <span className="font-bold text-blue-500">
                      {" "}
                      {notif?.notifications?.type === "Interest"
                        ? notif?.notifications?.message.split('"')[1]
                        : ""}
                    </span>
                    {notif?.notifications?.type === "Interest"
                      ? notif?.notifications?.message.split('"')[2]
                      : ""}
                    <span className="font-bold text-blue-500">
                      {notif?.notifications?.type === "Interest"
                        ? notif?.notifications?.message.split('"')[3]
                        : ""}
                    </span>
                  </div>
                  {isHovered === notif._id && (
                    <div className="absolute space-x-2 z-50 btn-appear w-full text-center">
                      <Button
                        variant="outline"
                        className=" rounded-lg  dark:text-white px-3 py-1"
                        onClick={() => {
                          handleViewProfile(notif.notifications.sentBy);
                        }}
                      >
                        View Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-lg w-30 dark:text-white px-2 py-1"
                        onClick={(e) => {
                          handleAccept(
                            e,
                            notif.userId,
                            notif._id,
                            index,
                            notif.notifications.postInfo.postID,
                            notif.notifications.sentBy,
                            notif.notifications.postInfo.postName
                          );
                        }}
                      >
                        Accept Interest
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
