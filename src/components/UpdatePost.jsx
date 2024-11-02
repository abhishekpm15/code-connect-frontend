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
import { Modal, Spin } from "antd";
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
  const [isSwitchOn, setIsSwitchOn] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [bounty, setBounty] = useState({ min: 10, max: 10 });
  const [bountyCurrency, setBountyCurrency] = useState("INR");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(
      "bounty postName tags bounty.min",
      bounty,
      postName,
      tags,
      bounty.min,
      bounty.max,
      isSwitchOn
    );
  }, [tags, setTags, isSwitchOn, setIsSwitchOn]);

  useEffect(() => {
    console.log("page");
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
        console.log(res);
        // setUpdatePost(res.data);
        setPostName(res.data?.description?.name);
        setDescription(res.data?.description?.message);
        setTags(res.data?.description?.tags);
        console.log(res.data?.description?.tags);
        setBounty({
          min: res.data?.description?.bounty.min,
          max: res.data?.description?.bounty.max,
        });
        console.log("bounty", res.data?.description?.bounty.min);
        setIsSwitchOn(res.data?.status === "open" ? true : false);
        console.log(res);
      })
      .catch((err) => {
        console.log("fetch err", err);
      });
  }, []);

  const onChange = (checked) => {
    setIsSwitchOn(checked);
    if (checked === false) {
      setIsModalOpen(true);
    }
    console.log(`switch to ${checked}`);
  };

  const handleUpdate = async (e) => {
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const status = isSwitchOn ? "open" : "closed";
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

    if (!isSwitchOn) {
      try {
        const res = await axios.post(
          `${URL}/post/deletePost/${id}`,
          {},
          { headers }
        );
        console.log("post res delete", res);
        setTimeout(() => {
          toast.success(res.data.message);
          setLoad(false);
          navigate("/myposts");
        }, 2000);
      } catch (err) {
        console.log("post err delete", err);
        console.log("could not delete post");
        toast.error("An error occurred while deleting the post");
        setLoad(false);
      }
    } else {
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
        console.log("post res update", res);
        setTimeout(() => {
          toast.success(res.data);
          setLoad(false);
          navigate("/myposts");
        }, 2000);
      } catch (err) {
        console.log("post err update", err);
        console.log("could not create post");
        toast.error("An error occurred while creating the post");
        setLoad(false);
      }
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal open={isModalOpen} onOk={handleOk}>
        <div className="font-semibold text-2xl mb-3">Are you sure ?</div>
        <div className="text-xl">
          If post status is closed, then it gets deleted !{" "}
        </div>
      </Modal>
      <div className="w-full flex justify-center h-full mt-20 pb-20">
        <Card className="w-[1000px] border-black/30 shadow-2xl dark:border-white/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Edit Post</CardTitle>
              <CardDescription className="flex font-semibold text-lg mr-5 items-center">
                <div className="flex items-center">
                  <div className="mr-3">Status:</div>
                  <Switch defaultValue={`${isSwitchOn}`} onChange={onChange} />
                  <Label htmlFor="airplane-mode" className="w-5 ml-3">
                    {isSwitchOn ? "open" : "closed"}
                    {console.log(isSwitchOn)}
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
                      defaultValue={bounty.min}
                      type="min"
                      bountyCurrency={bountyCurrency}
                      setBountyCurrency={setBountyCurrency}
                    />
                    <Bounty
                      head={"Maximum"}
                      bounty={bounty}
                      setBounty={setBounty}
                      defaultValue={bounty.max}
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
