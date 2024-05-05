import React from "react";
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
const Post = ({ data }) => {
  return (
    <div className="">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{data.description.name}</CardTitle>
          <CardDescription>{data.description.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Tech Stacks :</Label>
                <div className="flex space-x-3">
                  {data.description.tags.map((tag, index) => (
                    <div key={index}>{tag}</div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Bounty Amount</Label>
                <div>Min {data.description.bounty.min} - Max{data.description.bounty.max} ({data.description.bountyCurrency})</div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full">View Problem</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
