import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);
    console.log("socket", socket);
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (socket) {
      if (userInfo) {
        const userId = JSON.parse(userInfo).data.id;
        socket?.emit("newUser", userId);
      }
    }
  }, [socket]);

  const values = {
    socket,
    setSocket,
  };
  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
