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
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "@/components/ui/textarea";
import Tags from "./Tags";
import Bounty from "./Bounty";

const UpdatePost = ({ id }) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [postName, setPostName] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [bounty, setBounty] = useState({ min: 10, max: 10 });
  const [bountyCurrency, setBountyCurrency] = useState("INR");


  useEffect(() => {
    console.log(
      "bounty postName tags bounty.min",
      bounty,
      postName,
      tags,
      bounty.min,
      bounty.max
    );
  }, [tags, setTags]);

  useEffect(() => {
    console.log("page")
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/post/getPost/${id}`, { headers })
      .then((res) => {
        console.log(res)
        setUpdatePost(res.data);
        setPostName(res.data?.description?.name);
        setDescription(res.data?.description?.message);
        setTags(res.data?.description?.tags);
        console.log(res.data?.description?.tags);
        setBounty({
          min: res.data?.description?.bounty.min,
          max: res.data?.description?.bounty.max,
        });
        console.log("bounty", res.data?.description?.bounty.min);
        console.log(res);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  }, []);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsSwitchOn(!isSwitchOn);
  };

  const handleUpdate = async (e) => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const status = isSwitchOn ? "closed" : "open";
    console.log(status);
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
        `${URL}/post/updatePost/${id}`,
        {
          postName,
          description,
          tags,
          bounty,
          bountyCurrency,
          status,
        },
        { headers }
      );
      console.log("post res", res);
      setTimeout(() => {
        toast.success(res.data);
        setLoad(false);
        navigate("/myposts");
      }, 2000);
    } catch (err) {
      console.log("post err", err);
      console.log("could not create post");
      toast.error("An error occurred while creating the post");
      setLoad(false);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center h-full mt-20">
        <div
          onClick={() => {
            navigate("/myposts");
          }}
        >
          <ArrowLeftOutlined className="p-3 text-2xl hover:scale-150 duration-200" />
        </div>
        <Card className="w-[700px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Edit Post</CardTitle>
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
              Edit your post by re-filling the details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={postName}
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
                    value={description}
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
                      defaultValue={bounty.min }
                      type="min"
                      bountyCurrency={bountyCurrency}
                      setBountyCurrency={setBountyCurrency}
                    />
                    <Bounty
                      head={"Maximum"}
                      bounty={bounty}
                      setBounty={setBounty}
                      defaultValue={bounty.max }
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
                navigate("/myposts");
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
              <Button onClick={handleUpdate}>Update</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePost;
