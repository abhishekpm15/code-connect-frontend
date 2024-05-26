import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "@/components/Profile";

const ProfilePage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [profile, setProfile] = useState([]);
  const [screenLoad, setScreenLoad] = useState(false);
  const [techStack, setTechStack] = useState([]);

  useEffect(() => {
    console.log("tech stacks", profile.techStack);
  }, []);

  useEffect(() => {
    // setScreenLoad(true)
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/user/myProfile`, { headers })
      .then((res) => {
        console.log("fetch res", res);
        setProfile(res.data);
        // setScreenLoad(false);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex mt-10 justify-center space-x-24">
        <div className="flex flex-col items-center ">
          <div className="flex justify-center">
            <Avatar className="w-80 h-80">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-2xl font-semibold mt-5 w-80">
            {profile.username}
          </div>
          <div className="text-xl font-semibold mt-3 w-80 dark:text-white/55 text-black/55 ">
            {profile.email}
          </div>
          <div className="text-base font-semibold mt-3 w-80 dark:text-white text-black/55 ">
            {profile.bio}
          </div>
          <div className="w-80 h-full">
            <div className="flex flex-wrap text-base gap-2 font-semibold mt-3 w-full dark:text-white text-black/55">
              {techStack?.map((tag, index) => (
                <div
                  className="bg-green-300 text-black font-semibold rounded-md px-2 py-1 mt-1"
                  key={index}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <Profile
            username={profile.username}
            email={profile.email}
            techStacks={profile.techStack}
            websiteLinks={profile.websiteLinks}
            bio={profile.bio}
            socialLinks={profile.socialLinks}
            setTechStack={setTechStack}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

{
  /* <div className="flex w-1/2 justify-end">
<Avatar className="w-72 h-72">
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
</div> */
}
