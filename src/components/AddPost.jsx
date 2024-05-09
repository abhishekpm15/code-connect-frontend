import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { imageDB } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
import MultiInput from "./MultiInput";
import ImageUpload from "./ImageUpload";

const AddPost = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [uploading, setUploading] = useState(false);
  const [uploadedImageURL, setUploadedImageURL] = useState([]);
  const [inputs, setInputs] = useState([""]);
  const [postName, setPostName] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [bounty, setBounty] = useState({ min: 10, max: 10 });
  const [bountyCurrency, setBountyCurrency] = useState("INR");
  // const [load, setLoad] = useState(false);
  const [token, setToken] = useState("");
  const [fileList, setFileList] = useState([]);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setToken(JSON.parse(userInfo).data.token);
  }, []);

  useEffect(() => {
    console.log("uploadedImageURL changed", uploadedImageURL);
  }, [uploadedImageURL]);
  
  useEffect(() => {
    console.log("inputs changed", inputs);
  }, [inputs]);
  
  const handleSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();
    if (!postName || !description || !tags || !bounty || !bountyCurrency) {
      toast.error("Please fill all the details");
      setUploading(false);
      return;
    }
    
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    
    let uploadedURLs = [];
    if (fileList.length > 0) {
      try {
        for (const file of fileList) {
          const uniqueId = uuidv4();
          const storageRef = ref(imageDB, `images/${uniqueId}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          uploadedURLs.push(downloadURL);
        }
        setUploadedImageURL(uploadedURLs);
        message.success("Upload successful.");
      } catch (err) {
        console.log("Error in uploading images", err);
        setUploading(false);
        toast.error("An error occurred while uploading images");
        return;
      }
    }
    
    try {
      const res = await axios.post(
        `${URL}/post/create`,
        {
          postName,
          description,
          tags,
          uploadedImageURL: uploadedURLs,
          inputs,
          bounty,
          bountyCurrency,
          status: isSwitchOn ? "closed" : "open",
        },
        { headers }
      );
      console.log("Post response", res);
      toast.success(res.data.message);
      setUploading(false);
      navigate("/home");
    } catch (err) {
      console.error("Error creating post", err);
      message.error("An error occurred while creating the post");
      setUploading(false);
    }
  };

  
  return (
    <div className="w-full flex justify-center mt-4 ">
      <Card className="w-[1000px] border-black/30 shadow-2xl dark:border-white/30">
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
              <div className="flex flex-col space-y-1.5 mt-3 ">
                <Label htmlFor="uploadImage">Upload images</Label>
                <ImageUpload
                  uploading={uploading}
                  setUploading={setUploading}
                  uploadedImageURL={uploadedImageURL}
                  setUploadedImageURL={setUploadedImageURL}
                  fileList={fileList}
                  setFileList={setFileList}
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3 ">
                <Label htmlFor="url">Add URLs</Label>
                <div>
                  <MultiInput inputs={inputs} setInputs={setInputs} />
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
          {uploading ? (
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
