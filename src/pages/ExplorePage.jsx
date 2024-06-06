import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
gsap.registerPlugin(ScrollTrigger);

const ExplorePage = ({ parent, isModalOpen, setIsModalOpen }) => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    scrollToTop();
    window.addEventListener("beforeunload", scrollToTop);
    return () => {
      window.removeEventListener("beforeunload", scrollToTop);
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".explore_class", {
      opacity: 0,
      y: 100,
      stagger: 0.3,
      scrollTrigger: {
        trigger: parent.current,
        // markers:true,
        scroller: "body",
        start: "top 20%",
        scrub: 2,
        stagger:0.3,
        pin: true,
      },
    });
  }, [parent]);

  return (
    <div className="w-screen h-screen font-sans flex flex-col items-center">
      <div className="text-[5vw] font-semibold explore_class mt-[5%]">
        Collaborate with like minds
      </div>
      <div className="text-4xl mt-3 text-white/80 explore_class">
        Share your expertise and mentor newbies by resolving their doubts
      </div>
      <div className="explore_class mt-3 text-2xl"> + </div>
      <div className="text-4xl mt-3 text-white/80 explore_class">
        Earn bounties for your contributions.
      </div>
      <div className="mt-14 explore_class getBtn">
        <Button onClick={()=>{setIsModalOpen(true)}}>Get Started</Button>
      </div>
    </div>
  );
};

export default ExplorePage;
