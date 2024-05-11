import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProfileLinks from "./ProfileLinks";

const Profile = ({ username, email }) => {
  console.log(username, email);
  const [inputs, setInputs] = useState([""]);
  return (
    <div>
      <Card className="w-[800px] border-black/30 shadow-2xl dark:border-white/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={username}
                  id="name"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setPostName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => {
                    setPostName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3">
                <Label htmlFor="description">Tell us about you</Label>
                <Textarea
                  id="description"
                  placeholder="Type your message here."
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3 ">
                <Label htmlFor="links">Add Links to your website</Label>
                <ProfileLinks inputs={inputs} setInputs={setInputs} />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3 ">
                <Label htmlFor="url">Add URLs</Label>
              </div>
              <div className="flex flex-col space-y-1.5 mt-3">
                <Label htmlFor="bounty">Bounty</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
