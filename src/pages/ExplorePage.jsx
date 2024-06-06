import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ExplorePage = ({ parent }) => {
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
        start: "top 30%",
        scrub: 2,
        pin: true,
      },
    });
  }, [parent]);

  return (
    <div className="w-screen h-full font-sans flex flex-col items-center">
      <div className="text-[5vw] font-semibold explore_class">
        Collaborate with like minds
      </div>
      <div className="text-4xl mt-3 text-white/80 explore_class">
        Share your expertise and mentor newbies by resolving their doubts.
      </div>
    </div>
  );
};

export default ExplorePage;
