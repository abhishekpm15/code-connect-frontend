import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
import Bounty from "./Bounty";
import Tags from "./Tags";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Switch } from "antd";

const AddPost = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [postName, setPostName] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [bounty, setBounty] = useState({ min: 10, max: 10 });
  const [bountyCurrency, setBountyCurrency] = useState("INR");
  const [load, setLoad] = useState(false);
  const [token, setToken] = useState("");

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setToken(JSON.parse(userInfo).data.token);
  }, []);

  const handleSubmit = async (e) => {
    const status = isSwitchOn ? "closed" : "open";
    console.log(status)
    e.preventDefault();
    if (!postName || !description || !tags || !bounty || !bountyCurrency) {
      toast.error("Please fill all the details");
      return;
    }
    setLoad(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.post(
        `${URL}/post/create`,
        {
          postName,
          description,
          tags,
          bounty,
          bountyCurrency,
          status
        },
        { headers }
      );
      console.log("post res", res);
      setTimeout(() => {
        toast.success(res.data.message);
        setLoad(false);
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.log("post err", err);
      console.log("could not create post");
      toast.error("An error occurred while creating the post");
      setLoad(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-20">
      <Card className="w-[700px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create Post</CardTitle>
            <CardDescription className="flex font-semibold text-lg mr-5 items-center">
              <div className="flex items-center">
                <div className="mr-3">Status:</div>
                <Switch defaultChecked onChange={onChange} />
                <Label htmlFor="airplane-mode" className="w-5 ml-3">
                  {isSwitchOn ? "closed" : "open"}
                </Label>
              </div>
            </CardDescription>
          </div>
          <CardDescription>
            Deploy your new post by filling the details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your post"
                  onChange={(e) => {
                    setPostName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Type your message here."
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3 ">
                <Label htmlFor="tags">
                  Tags &nbsp;(Select all the frameworks / tools )
                </Label>
                <div>
                  <Tags tags={tags} setTags={setTags} />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5 mt-3">
                <Label htmlFor="bounty">Bounty</Label>
                <div className="flex justify-between">
                  <Bounty
                    head={"Minimum"}
                    bounty={bounty}
                    setBounty={setBounty}
                    type="min"
                    bountyCurrency={bountyCurrency}
                    setBountyCurrency={setBountyCurrency}
                  />
                  <Bounty
                    head={"Maximum"}
                    bounty={bounty}
                    setBounty={setBounty}
                    type="max"
                    bountyCurrency={bountyCurrency}
                    setBountyCurrency={setBountyCurrency}
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/home");
            }}
          >
            Cancel
          </Button>
          {load ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                  }}
                  spin
                />
              }
            />
          ) : (
            <Button onClick={handleSubmit}>Deploy</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddPost;
