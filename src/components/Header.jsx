import React from "react";
import Stars from "./Stars";

const Header = ({setIsModalOpen }) => {
  return (
    <div className="w-full flex flex-col space-y-7 mt-32 font-customFont items-center">
      <Stars />
      <div className="h-96 w-96 absolute left-[30%] top-[24%] bg-purple-600 rounded-full blur-3xl opacity-30 circle1 -z-20"></div>
      <div className="h-96 w-96 absolute right-[30%] bg-indigo-600 rounded-full blur-3xl opacity-30 circle2 -z-20"></div>
      <div className={`text-7xl font-semibold  dark:text-white text-black`}>
        Code Connect
      </div>
      <div className="text-3xl font-medium dark:text-gray-400 text-gray-600">
        Where Novices Discover Solutions and Developers Earn Bounties .
      </div>
      <div>
        <button
          className="bg-[#2949ED] text-xl flex items-center mx-auto px-3 py-2 text-white rounded-md mt-10 hover:scale-125 cursor-pointer z-10 duration-300 dark:text-white "
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default Header;
