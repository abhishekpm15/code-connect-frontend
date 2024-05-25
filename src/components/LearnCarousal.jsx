import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LightModeSS from "../assets/LightModeSS.png";
import DarkModeSS from "../assets/DarkModeSS.png";
import HomePageSS from "../assets/HomePageSS.png";



const LearnCarousal = () => {
  return (
    <Carousel className="">
      <CarouselContent>
       <CarouselItem >
            <div className="p-1 w-full">
              <div classNamew-full>
                <CardContent className="p-6">
                  <div className="flex justify-evenly mt-20">
                    <div className="flex flex-col space-y-5">
                      <div className="text-2xl font-semibold">Step 1 :</div>
                      <div className="text-xl w-[600px] leading-7">
                        Go to
                        <span className="bg-emerald-400 px-2 py-1 text-black mx-1 rounded-lg">
                          Add Post
                        </span>
                        and fill all the necessary details that would tell more
                        about your problem. A typical usecase can be shown as{" "}
                        <span className="ml-2 text-2xl">🡆</span>
                      </div>
                      <div className="w-[600px] flex flex-col">
                        <div className="text-2xl font-semibold">Name</div>
                        <div className="text-lg mt-3 leading-7">
                          ⭐ Heading should be short and precise so that
                          developers would understand in a glance.
                        </div>
                        <div className="text-2xl font-semibold mt-5">
                          Description
                        </div>
                        <div className="text-lg mt-3 leading-7">
                          ⭐ Descriptions must be clear and such that it should
                          explain what the problem is precisely
                        </div>
                        <div className="text-2xl font-semibold mt-5">Tags</div>
                        <div className="text-lg mt-3 leading-7">
                          ⭐ All the frameworks/tools used should be mentioned .
                        </div>
                        <div className="text-2xl font-semibold mt-5">
                          Bounty
                        </div>
                        <div className="text-lg mt-3 leading-7">
                          ⭐ This is an important aspect of this platform.
                          Provide only suitable bounty for the required work. It
                          can range from 1 unit of currency to a 100 depending
                          on the problem.
                        </div>
                      </div>
                    </div>
                    <div>
                      <img src={LightModeSS} className="w-[700px]" />
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem >
            <div className="p-1 w-full">
              <div classNamew-full>
                <CardContent className="p-6">
                  <div className="flex justify-evenly mt-20 items-center">
                    <div className="flex flex-col space-y-5">
                      <div className="text-2xl font-semibold">Step 2 :</div>
                      <div className="text-xl w-[600px] leading-7">
                        You can view others as well as your post in the Homepage.
                      </div>
                      <div className="text-xl w-[650px] leading-7">
                      ⭐ Select post that you know better and help others to resolve their problem.
                      </div>
                      <div className="text-xl w-[650px] leading-7">
                      ⭐ You can anytime update or turn off the post if your doubt is clarified. 
                      </div>
                      <div className="text-xl w-[650px] leading-7">
                      ⭐ Once signed in Update your profile, so that others can see your tier.
                      </div>
                    </div>
                    <div>
                      <img src={HomePageSS} className="w-[700px]" />
                    </div>
                  </div>
                  <div className="text-2xl flex justify-center w-[600px] mt-5 font-semibold">
                    Finally, respect the platform
                  </div>
                </CardContent>
              </div>
            </div>
          </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default LearnCarousal;
