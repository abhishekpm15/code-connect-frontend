import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Filter = () => {
  return (
    <div className="flex w-4/5 xl:w-1/2 justify-center items-center space-x-2 ml-5">
      <Input type="text" placeholder="Search using tech stacks" className="border-black/30 dark:border-white/30"/>
      <Button type="submit">Search</Button>
    </div>
  );
};

export default Filter;
