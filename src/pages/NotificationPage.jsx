import Notification from "@/components/Notification";
import { NotificationContext } from "@/context/NotificationProvider";
import React, { useContext } from "react";
import NotificationImage from "../assets/notification.svg";
const NotificationPage = () => {
  const { notification } = useContext(NotificationContext);
  console.log("noti", notification);
  return (
    <div>
      <div className="text-3xl font-semibold mt-16 flex justify-center items-center pl-5 ">
        {notification.length > 0 && (
          <span className="bg-blue-300 text-black ml-2 p-2 mr-2 rounded-lg  decoration-black px-3 py-1">
            Notifications
          </span>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        {notification.length > 0 ? (
          <Notification />
        ) : (
          <>
            <div className="text-3xl mt-14 font-semibold">
              You have
              <span className="bg-green-300 font-semibold text-black ml-2 mr-2 rounded-lg px-3 py-1">
                No Notifications
              </span>
            </div>

            <div className="flex justify-center mt-10">
              <img src={NotificationImage} className="w-[550px]" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
