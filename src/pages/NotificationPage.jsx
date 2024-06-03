import { NotificationContext } from "@/context/NotificationProvider";
import React, { useContext } from "react";

const NotificationPage = () => {
  const { notification } = useContext(NotificationContext);
  return (
    <div>
      <div className="text-3xl font-semibold mt-16 flex justify-center items-center pl-5 ">
        <span className="bg-blue-300 text-black ml-2 p-2 mr-2 rounded-lg  decoration-black px-3 py-1">
          Notifications
        </span>
      </div>
      <div className="flex justify-center">{notification?.data?.map((notification,index) => (<div key={index}>{notification?.notifications?.message}</div>))}</div>
    </div>
  );
};

export default NotificationPage;
