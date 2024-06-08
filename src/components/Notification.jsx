import { NotificationContext } from "@/context/NotificationProvider";
import React, { useContext, useRef, useEffect } from "react";
import { CloseCircleTwoTone } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import gsap from "gsap";

const Notification = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { notification, setNotification } = useContext(NotificationContext);
  

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

  return (
    <div className="flex w-full justify-center mt-5">
      {notification.length > 0 && (
        <div className="flex flex-col items-center justify-center mb-5">
          {notification?.map((notif, index) => (
            <div
              key={notif._id}
              className="relative duration-200 cursor-pointer"
              ref={(el) => (notificationRefs.current[index] = el)}
            >
              <div
                className="absolute -right-2 top-3"
                onClick={() => {
                  removeNotification(notif._id, index);
                }}
              >
                <CloseCircleTwoTone className="text-xl" />
              </div>
              <div className="px-10 py-5 dark:bg-white mt-5 rounded-xl dark:text-black text-white bg-[#10172a]">
                {notif?.notifications?.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
