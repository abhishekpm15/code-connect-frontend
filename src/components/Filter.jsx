import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Filter = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search" />
      <Button type="submit">Search</Button>
    </div>
  );
};

export default Filter;
