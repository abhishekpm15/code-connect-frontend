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

  useEffect(() => {
    console.log("notification", notification);
  }, [notification, socket]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userInfo = localStorage.getItem("userInfo");
      const token = JSON.parse(userInfo)?.data.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      
      try {
        const response = await axios.get(`${URL}/notification/fetchAllNotifications`, { headers });
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
    fetchNotifications();
    if (socket) {
      console.log('socket called')
      socket.on("getNotification", handleGetNotification);
    }
    return () => {
      if (socket) {
        socket.off("getNotification", handleGetNotification);
      }
    };
  }, [URL, socket]);

  const values = {
    notification,
    setNotification,
  };

  return (
    <NotificationContext.Provider value={values}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
