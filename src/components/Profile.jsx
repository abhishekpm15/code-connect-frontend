import React, { useEffect, useState } from "react";
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
import Github from "../assets/github.png";
import Twitter from "../assets/twitter.png";
import Tags from "./Tags";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = ({ username, email, techStacks, websiteLinks, bio, socialLinks }) => {
  console.log(username, email);
  const [inputs, setInputs] = useState([""]);
  const [message, setMessage] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [tags, setTags] = useState([])
  const [load , setLoad] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(()=>{
    if(techStacks){
      console.log(tags)
      console.log(techStacks)
      setTags(techStacks);
    }
    console.log(socialLinks)
    if(socialLinks){
      console.log(socialLinks?.github)
      setGithub(socialLinks?.github)
      setTwitter(socialLinks?.twitter)
    }
    if(websiteLinks){
      console.log(websiteLinks);
      setInputs(websiteLinks)
    }
    if(bio){
      setMessage(bio)
    }
  },[bio,techStacks,websiteLinks])

  const handleSave = () =>{
    setLoad(true)
    console.log(inputs,message,github,twitter,tags)
    const userInfo = localStorage.getItem("userInfo");
    const userId = JSON.parse(userInfo).data.id
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    // if(inputs.length > 0 || message.length > 0 || github.length > 0 || twitter.length > 0 || tags.length > 0){
      axios.post(`${URL}/user/edit/${userId}`,{
        inputs,
        message,
        github,
        twitter,
        tags
      },{headers}).then((res)=>{
        toast.success(res.data)
        setLoad(false);
        console.log(res);
      }).catch((err)=>{
        setLoad(false)
        console.log(err)
      })
    // }
  }

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
                <Label htmlFor="description">Tell us about yourself</Label>
                <Textarea
                  id="description"
                  value={message}
                  placeholder="Type your message here."
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3">
                <Label htmlFor="stacks">Stacks you prefer / use</Label>
                <Tags tags={tags} setTags={setTags}/>
              </div>
              <div className="flex flex-col space-y-1.5 mt-3 ">
                <Label htmlFor="links">Add Links to your website</Label>
                <ProfileLinks inputs={inputs} setInputs={setInputs} />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3">
                <Label htmlFor="description">Social accounts</Label>
                <div className="flex flex-col space-y-3 pt-3">
                  <div className="flex items-center space-x-5">
                    <img src={Github} className="w-6 h-6" />
                    <input value={github} type="text" className="w-1/2 rounded-md ring-1 text-black text-sm p-1 border-black/30" onChange={(e)=>{setGithub(e.target.value)}}/>
                  </div>
                  <div className="flex items-center space-x-5">
                    <img src={Twitter} className="w-6 h-6" />
                    <input value = {twitter} type="text" className="w-1/2 rounded-md ring-1 text-black text-sm p-1 border-black/30" onChange={(e)=>{setTwitter(e.target.value)}} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full">
          <Button className="bg-blue-300 hover:bg-blue-500 " onClick={handleSave}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
