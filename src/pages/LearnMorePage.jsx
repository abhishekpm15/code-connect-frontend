import React, { useRef } from "react";
import LearnMore from "@/components/LearnMore";

const LearnMorePage = ({parent}) => {
  // const parentRef = useRef(null)
  return (
    <div className="w-screen h-screen overflow-hidden bg-white -z-50 bg-transparent" >
      <LearnMore parent={parent}/>
    </div>
  );
};

export default LearnMorePage;
