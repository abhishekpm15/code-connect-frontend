import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Skeletons = () => {
  return (
    <div className="flex justify-center items-center h-full mt-24 space-x-10">
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[350px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[350px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[350px] w-[350px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default Skeletons;
