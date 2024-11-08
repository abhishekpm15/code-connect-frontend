import React from "react";

const Background = ({children}) => {
  return (
    <div className="relative w-full overflow-hidden ">
      <div className="fixed left-0 z-0 pointer-events-none w-full h-full top-[15%]">
        <div className="h-[700px] w-[700px] absolute left-[10%] bg-purple-700 rounded-full blur-3xl dark:opacity-20 opacity-30 z-[-1]"></div>
        <div className="h-[700px] w-[700px] absolute right-[10%] bg-indigo-600 rounded-full blur-3xl dark:opacity-20 z-[-2] opacity-30"></div>
      </div>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};

export default Background;
