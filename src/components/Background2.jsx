import React from "react";
import "./Header.css";

const Background2 = ({ children }) => {
  return (
    <div className="relative w-fulloverflow-hidden ">
      <div className="fixed left-0 z-0 pointer-events-none w-full h-full top-[15%]">
        <div className="h-96 w-96 absolute circle1 left-[30%] top-[24%] bg-purple-600 rounded-full blur-xl opacity-30 circle1 -z-20"></div>
        <div className="h-96 w-96 absolute circle2 right-[30%] bg-indigo-600 rounded-full blur-xl opacity-30 circle2 -z-20"></div>
      </div>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};

export default Background2;
