import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SocketContext } from "./SocketProvider";
import gsap from "gsap";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  const { socket } = useContext(SocketContext);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchNotifications = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${URL}/notification/fetchAllNotifications`,
        { headers }
      );
      setNotification(response.data);
      console.log("notifications", response.data);
    } catch (err) {
      console.log("fetch err", err);
    }
  };

  const handleGetNotification = (datas) => {
    const userInfo = localStorage.getItem("userInfo");
    const id = JSON.parse(userInfo).data.id;
    console.log("id postedid", id, datas.receiverId);
    console.log("datas", datas);
    if (id === datas.receiverId) {
      fetchNotifications();
      toast.info(
        `You have new Interest notification from ${datas.senderName}`,
        {
          autoClose: 5000,
          position: "top-center",
        }
      );
    }
  };

  const handleGetAcceptNotification = (datas) => {
    const userInfo = localStorage.getItem("userInfo");
    const id = JSON.parse(userInfo).data.id;
    console.log("id postedid", id, datas.receiverId);
    console.log("datas", datas);
    if (id === datas.receiverId) {
      fetchNotifications();
      toast.info(
        `Your request has been accepted by ${datas.senderName} for the problem ${datas.postName}`,
        {
          autoClose: 5000,
          position: "top-center",
        }
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
    console.log("socket changes");
    socket?.on("getNotification", handleGetNotification);
    socket?.on("getAcceptNotification", handleGetAcceptNotification);
  }, [socket]);

  const values = {
    notification,
    setNotification,
    fetchNotifications,
  };

  return (
    <NotificationContext.Provider value={values}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
