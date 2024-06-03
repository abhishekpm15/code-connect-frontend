import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SocketContext } from "./SocketProvider";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  const { socket } = useContext(SocketContext);
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(()=>{
    console.log('notification',notification);
  },[notification])

  useEffect(() => {
    const handleGetNotification = (datas) => {
      const userInfo = localStorage.getItem("userInfo");
      const id = JSON.parse(userInfo).data.id;
      console.log("id postedid", id, datas.receiverId);
      if (id === datas.receiverId) {
        setNotification((prev => prev+1))
        toast.info(
          `You have new Interest notification from ${datas.senderName}`,
          {
            autoClose: 5000,
            position: "top-center",
          }
        );
      }
    };
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo)?.data.token);
    const token = JSON.parse(userInfo)?.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
    .get(`${URL}/notification/fetchAllNotifications`, {
      headers,
    })
    .then((res) => {
      setNotification(res)
      console.log('notifications',res);
    })
    .catch((err) => {
      console.log("fetch err", err);
    });
    socket?.on("getNotification", handleGetNotification);
    return () => {
      socket?.off("getNotification", handleGetNotification);
    };
  }, [URL, socket]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo)?.data.token);
    const token = JSON.parse(userInfo)?.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/notification/fetchAllNotifications`, {
        headers,
      })
      .then((res) => {
        setNotification(res)
        console.log('notifications',res);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  },[URL, socket]);

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
