import React from "react";
import Background2 from "./Background2";
import LearnCarousal from "./LearnCarousal";
const LearnMore = () => {
  return (
    <Background2>
      <div className="w-full flex flex-col space-y-7 mt-32 font-customFont items-center">
        <h1 className="text-4xl font-bold mt-24 dark:text-white text-black">How to use</h1>
      </div>
    <LearnCarousal />
    </Background2>
  );
};

export default LearnMore;
