import Account from "../assets/account.png";
import React, { useContext, useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { NotificationContext } from "@/context/NotificationProvider";
import Badges from "./Badges";


const Navbar = ({ setIsModalOpen }) => {
  const navigate = useNavigate();
  const data = localStorage.getItem("userInfo");
  const [userData, setUserData] = useState(false);
  const location = useLocation();
  const [currentLink, setCurrentLink] = useState("");
  const { notification } = useContext(NotificationContext);
  console.log('navbar',notification)
  useEffect(() => {
    console.log("location change", location.pathname);
    if (location.pathname === "/home") {
      setCurrentLink("home");
      console.log("current", currentLink);
    } else if (location.pathname === "/posts/create") {
      setCurrentLink("posts/create");
      console.log("current", currentLink);
    } else if (location.pathname === "/profile") {
      setCurrentLink("profile");
      console.log("current", currentLink);
    } else if (location.pathname === "/myposts") {
      setCurrentLink("myposts");
      console.log("current", currentLink);
    } else if (location.pathname === "/savedposts") {
      setCurrentLink("savedposts");
      console.log("current", currentLink);
    } else if (location.pathname === "/interestedposts") {
      setCurrentLink("interestedposts");
      console.log("current", currentLink);
    } else if (location.pathname === "/notifications") {
      setCurrentLink("notifications")
      console.log("current", currentLink);
    } else {
      setCurrentLink("");
    }
  }, [location, currentLink]);

  useEffect(() => {
    if (data) {
      setUserData(true);
    }
  }, [data]);

  return (
    <div className="w-full text-base  mt-4 z-10">
      <div className={`w-full flex ${location.pathname === "/" ? "justify-between px-40" : "justify-around"} items-center rounded-3xl p-2`}>
        <div
          onClick={() => {
            window.location.reload();
          }}
        >
          <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            className="w-10"
            alt=""
          ></img>
        </div>
        {location.pathname !== "/" ? (
          <div className="flex items-center space-x-5 xl:space-x-7 ">
            <ul className="hidden sm:flex space-x-5 md:space-x-7 xl:space-x-10 dark:text-white text-black items-center ">
              <Button
              variant="outline"
                className={`${
                  currentLink === "home" ? "bg-[#4f46e5] text-white" : ""
                } hover:bg-[#4f46e5] border font-semibold px-3 py-1 hover:text-white duration-200 rounded-md cursor-pointer z-10`}
                onClick={() => {
                  navigate("/home");
                  // window.location.reload();
                }}
              >
                Home
              </Button>
              <Button variant="outline" className="hover:bg-[#4f46e5] border font-semibold px-3 py-1 hover:text-white duration-200 rounded-md cursor-pointer z-10">
                Chats
              </Button>
              <Button
              variant="outline"
                className={`${
                  currentLink === "posts/create"
                    ? "bg-[#4f46e5] text-white"
                    : ""
                } font-semibold px-2 py-1 hover:bg-[#4f46e5] hover:text-white duration-200 border  rounded-md cursor-pointer z-10`}
                onClick={() => {
                  navigate("/posts/create");
                }}
              >
                Add Post
              </Button>
            </ul>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="relative hover:bg-[#4f46e5] hover:text-white">
                    Account
                    <span className="absolute left-20 -top-2">
                      { notification.length > 0 && (
                        <Badges count={notification.length} dot={true} />
                      )}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                {data && (
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className={`${
                          currentLink === "profile"
                            ? "bg-[#4f46e5] text-white px-2 py-1 rounded-lg"
                            : ""
                        }`}
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={`${
                          currentLink === "myposts"
                            ? "bg-[#4f46e5] text-white px-2 py-1 rounded-lg"
                            : ""
                        }`}
                        onClick={() => {
                          navigate("/myposts");
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>My Posts</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={`${
                          currentLink === "savedposts"
                            ? "bg-[#4f46e5] text-white px-2 py-1 rounded-lg"
                            : ""
                        }`}
                        onClick={() => {
                          navigate("/savedposts");
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Saved Posts</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={`${
                          currentLink === "interestedposts"
                            ? "bg-[#4f46e5] text-white px-2 py-1 rounded-lg"
                            : ""
                        }`}
                        onClick={() => {
                          navigate("/interestedposts");
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Interested Posts</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={`${
                          currentLink === "notifications"
                            ? "bg-[#4f46e5] text-white px-2 py-1 rounded-lg"
                            : ""
                        }`}
                        onClick={() => {
                          navigate("/notifications");
                        }}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Notifications
                        <span className="ml-2">
                          {notification > 0 && (
                            <Badges count={notification} type={"Dot"} />
                          )}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center space-x-5 dark:text-white text-black font-semibold">
          <div>
            {userData ? (
              <Avatar className="ml-2 mr-2 w-10 h-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <img src={Account} className="w-10 h-10" />
            )}
          </div>
          {userData ? (
            <>
              <FaHamburger className="sm:hidden block text-xl" />
              <Button
                className={`text-sm cursor-pointer hidden sm:block `}
                onClick={() => {
                  toast.success("Successfully logged out");
                  navigate("/");
                  localStorage.removeItem("userInfo");
                  setUserData(false);
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              className={`text-sm cursor-pointer hidden sm:block `}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
