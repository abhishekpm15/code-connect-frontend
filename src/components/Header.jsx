import React from "react";
import Stars from "./Stars";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaArrowDown } from "react-icons/fa6";

const Header = ({ setIsModalOpen }) => {
  const gsapRefTitle = useRef();
  const gsapRefPara = useRef();
  const gsapRefBtn = useRef();

  const tl = gsap.timeline();

  useGSAP(() => {
    tl.from(gsapRefTitle.current, {
      marker:true,
      duration: 1,
      opacity: 0,
      y: 100,
    });
    tl.from(gsapRefPara.current, {
      duration: 1,
      opacity: 0,
      y: 100,
    });
    tl.from(gsapRefBtn.current, {
      duration: 1,
      opacity: 0,
      y: 100,
    });
  });

  // function smoothScrollToSecondSection() {
  //   const secondSection = document.getElementById('second-section');
  //   if (secondSection) {
  //     window.scrollTo({
  //       top: secondSection.offsetTop,
  //       behavior: 'smooth'
  //     });
  //   }
  // }

  return (
      <div className="w-full flex flex-col space-y-10 mt-32 font-customFont items-center">
        {/* <Stars /> */}
        <div
          className={`text-8xl font-semibold  dark:text-white text-black`}
          ref={gsapRefTitle}
        >
          Code.{" "}
          <span className="dark:bg-blue-300  bg-blue-400 px-2 py-2 dark:text-black text-white rounded-xl">
            Connect
          </span>
        </div>
        <div
          className="text-4xl font-medium dark:text-white/80 text-gray-600"
          ref={gsapRefPara}
        >
          Where Novices Discover Solutions and Developers Earn Bounties .
        </div>
        <div className="flex space-x-10" ref={gsapRefBtn}>
          <button
            className="bg-[#2949ED] text-xl flex items-center mx-auto px-3 py-2 text-white rounded-md mt-10 hover:scale-125 cursor-pointer z-10 duration-300 dark:text-white "
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Get Started
          </button>
          <button
            className=" text-xl flex items-center mx-auto px-3 py-2 text-black bg-white/10 backdrop-blur-3xl rounded-md mt-10 hover:scale-125 cursor-pointer z-10 duration-300 dark:text-white "
            // onClick={() => {
            //   smoothScrollToSecondSection();
            // }}
          >
            learn more &nbsp; <FaArrowDown />
          </button>
        </div>
      </div>
  );
};

export default Header;
