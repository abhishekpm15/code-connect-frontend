import React, { useRef, useEffect } from "react";
import LearnCarousal from "./LearnCarousal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stars from "./Stars";
gsap.registerPlugin(ScrollTrigger);

const LearnMore = ({ parent }) => {
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);

  useEffect(() => {
    if (titleRef.current && parent.current) {
      const tl = gsap.timeline();
      tl.to(titleRef.current, {
        x: "-100%",
        duration: 10,
        scrollTrigger: {
          trigger: parent.current,
          scroller: "body",
          start: "top 0%",
          end: "top -100%",
          scrub: 2,
          pin: true,
        },
      });

      tl.from(titleRef2.current, {
        opacity:0,
        x:"-100%",
        y:"100%",
        scrollTrigger: {
          trigger: titleRef.current,
          scroller: "body",
          start: "top -100%",
          end: "top 0%",
          scrub: 2,
          pin: true,
        },
      });
    }
  }, [parent]);

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


  return (
    <div className="flex flex-col">
      <div className="flex">
        <div
          className="text-[20vw] ml-[10%] font-bold dark:text-black text-white text-nowrap" ref={titleRef}>
          Explore the beauty of Code.
          <span className="dark:bg-black  bg-blue-400 px-4 py-2 dark:text-white text-black rounded-xl">
            Connect
          </span>
        </div>
      </div>
      
        <div
          className="text-[10vw] flex justify-center font-bold dark:text-black text-white text-nowrap" ref={titleRef2}>
          through 'experience'
        </div>
      {/* </div> */}
      {/* <LearnCarousal /> */}
    </div>
  );
};

export default LearnMore;
