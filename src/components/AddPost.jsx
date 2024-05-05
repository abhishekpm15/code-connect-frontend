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

const AddPost = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [postName, setPostName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [bounty, setBounty] = useState({ min: 10, max: 10 });
  const [bountyCurrency, setBountyCurrency] = useState("INR");
  const [load, setLoad] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setToken(JSON.parse(userInfo).data.token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiQWJoaXNoZWsiLCJlbWFpbCI6InBhYmhpc2hla21AZ21haWwuY29tIiwiaWQiOiI2NjM2NjJiMmZhNmRlZjIxYjE2OGRiN2IifSwiaWF0IjoxNzE0OTA0MDY1LCJleHAiOjE3MTc0OTYwNjV9.Tod4SPH0RfYZZt-YevJVriXMfzL_H7vs3h2goJa42JE`,
    };
    await axios
      .post(
        `${URL}/post/create`,
        {
          postName,
          description,
          tags,
          bounty,
          bountyCurrency,
        },
        { headers }
      )
      .then((res) => {
        console.log("post res", res);
        toast.success();
        setLoad(false);
      })
      .catch((err) => {
        console.log("post err", err);
        setLoad(false);
      });
  };

  return (
    <div className="w-full flex justify-center mt-20">
      <Card className="w-[700px]">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
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
              <div className="flex flex-col space-y-1.5 mt-3">
                <Label htmlFor="bounty">
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
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit}>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddPost;
