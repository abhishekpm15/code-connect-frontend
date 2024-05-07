import Account from "../assets/account.png";
import React, { useEffect, useState } from "react";
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
import {
  CreditCard,
  Settings,
  User
} from "lucide-react"

const Navbar = ({ setIsModalOpen }) => {
  const navigate = useNavigate();
  const data = localStorage.getItem("userInfo");
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    if (data) {
      setUserData(true);
    }
  }, [data]);

  return (
    <div className="w-full text-xl mt-4 z-10">
      <div className="w-full flex justify-around items-center rounded-3xl p-2">
        <div>
          <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="w-10"
            alt=""
          ></img>
        </div>
        <div className="flex items-center space-x-7">
          <ul className="flex space-x-10 dark:text-white text-black items-center">
            <li
              className="hover:bg-[#4f46e5] font-semibold px-2 hover:text-white duration-200 rounded-md cursor-pointer z-10"
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </li>
            <li className="hover:bg-[#4f46e5] font-semibold px-2 hover:text-white duration-200 rounded-md cursor-pointer z-10">
              Chats
            </li>
            <li className="font-semibold px-2 hover:text-white duration-200 rounded-md cursor-pointer z-10 hover:scale-125">
              <Button
                onClick={() => {
                  navigate("/posts/create");
                }}
              >
                Add Post
              </Button>
            </li>
          </ul>
          <div>
            <ModeToggle />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={()=>{navigate('/profile')}}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>{navigate('/myposts')}}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Posts</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>{navigate('/savedposts')}}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Saved Posts</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center space-x-4 dark:text-white text-black font-semibold">
          <div>
            <img src={Account} alt="" className="w-7"></img>
          </div>
          {userData ? (
            <div
              className="text-lg w-20 dark:hover:bg-white dark:hover:text-black dark:text-white text-black hover:bg-black hover:text-white px-2 duration-200 rounded-md cursor-pointer"
              onClick={() => {
                toast.success("Successfully logged out");
                navigate("/");
                localStorage.removeItem("userInfo");
                setUserData(false);
              }}
            >
              Log out
            </div>
          ) : (
            <div
              className="text-lg w-20 dark:hover:bg-white dark:hover:text-black dark:text-white text-black hover:bg-black hover:text-white px-2 duration-200 rounded-md cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Log in
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
