import React from "react";
import Stars from "./Stars";
import "./Header.css"

const Header = ({setIsModalOpen }) => {
  function smoothScrollToSecondSection() {
    const secondSection = document.getElementById('second-section');
    if (secondSection) {
      window.scrollTo({
        top: secondSection.offsetTop,
        behavior: 'smooth'
      });
    }
  }
  return (
    <div className="w-full flex flex-col space-y-7 mt-32 font-customFont items-center">
      <Stars />
      {/* <div className="h-96 w-96 absolute circle1 left-[30%] top-[24%] bg-purple-600 rounded-full blur-xl opacity-30 circle1 -z-20"></div>
      <div className="h-96 w-96 absolute circle2 right-[30%] bg-indigo-600 rounded-full blur-xl opacity-30 circle2 -z-20"></div> */}
      <div className={`text-7xl font-semibold  dark:text-white text-black`}>
        Code. <span className="dark:bg-blue-300  bg-blue-400 px-2 py-2 dark:text-black text-white rounded-xl">Connect</span>
      </div>
      <div className="text-3xl font-medium dark:text-gray-400 text-gray-600">
        Where Novices Discover Solutions and Developers Earn Bounties .
      </div>
      <div className="flex space-x-10">
        <button
          className="bg-[#2949ED] text-xl flex items-center mx-auto px-3 py-2 text-white rounded-md mt-10 hover:scale-125 cursor-pointer z-10 duration-300 dark:text-white "
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          GET STARTED
        </button>
        <button
          className=" text-xl flex items-center mx-auto px-3 py-2 text-black bg-white/10 backdrop-blur-3xl rounded-md mt-10 hover:scale-125 cursor-pointer z-10 duration-300 dark:text-white "
          onClick={() => {
            smoothScrollToSecondSection();
          }}
        >
          learn more
        </button>
      </div>
    </div>
  );
};

export default Header;
