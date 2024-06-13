import { NotificationContext } from "@/context/NotificationProvider";
import React, { useContext, useRef, useEffect, useState } from "react";
import { CloseCircleTwoTone } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import gsap from "gsap";
import { Modal } from 'antd';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Notification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [isHovered, setIsHovered] = useState(null)
  const { notification, setNotification } = useContext(NotificationContext);
  const [id, setId] = useState();
  const [viewProfile, setViewProfile] = useState([])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  useEffect(()=>{
    gsap.from(".btn-appear",{
      opacity:0,
      y:-10 
    })
  })

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
    console.log('refs',notificationRefs)
  }, [notification]);

  const handleViewProfile = (id) => {
    showModal(true)
    setId(id)
    console.log(id)
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
        setViewProfile(res.data)
        console.log(res);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });  
    }


  return (
    <>
      <>
        <Modal title="Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={"900px"}>
        <div className="flex justify-between items-center">
          <div className="">
            <Avatar className="w-64 h-64">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-2">
            <div><Label className="font-semibold">Username: </Label>{viewProfile.username}</div>
            <div><Label className="font-semibold">Email: </Label>{viewProfile.email}</div>
            <div><Label className="font-semibold">Description: </Label>{viewProfile.bio}</div>
            <div><Label className="font-semibold">Tech stacks: </Label>
            <span className="mt-2">{viewProfile.techStack?.map((tag, index) => (
                <div
                  className="bg-green-300 text-wrap inline mr-2 text-black font-semibold rounded-md px-2 py-1"
                  key={index}
                >
                  {tag}
                </div>
                
              ))}
            </span>
            </div>
            <div><Label className="font-semibold">Solved ✅: </Label></div>
            <div><Label className="font-semibold">Success rate %: </Label></div>
            <div><Label className="font-semibold">Total earnings: </Label></div>
            <div><Label className="font-semibold">Acheivements: </Label></div>
          </div>
          </div>
        </Modal>
      </>
    <div className="flex w-full justify-center mt-10">
      {notification.length > 0 && (
        <div className="flex flex-col items-center justify-center ">
          {notification?.map((notif, index) => (
            <div
              key={notif._id}
              className="relative duration-200 cursor-pointer mb-5 z-0 "
              ref={(el) => (notificationRefs.current[index] = el)}
              onMouseEnter={()=>{setIsHovered(notif._id)}}
              onMouseLeave={()=>{setIsHovered(null)}}
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
                {notif?.notifications?.message}
              </div>
                {isHovered === notif._id && (
                <div className="absolute space-x-2 z-50 btn-appear w-full text-center">
                  <Button  variant="outline" className=" rounded-lg  text-white px-3 py-1" onClick={()=>{handleViewProfile(notif.userId)}}>View Profile</Button>
                  <Button variant="outline" className="rounded-lg text-white px-2 py-1" >Accept Interest</Button>
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
