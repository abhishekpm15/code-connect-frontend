import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchContext } from "@/context/SearchProvider";

const Filter = () => {
  const {searchValue, setSearchValue, handleSubmit} = useContext(SearchContext)
  return (
    <div className="flex w-4/5 xl:w-1/2 justify-center items-center space-x-2 ml-5">
      <Input value={searchValue} type="text" placeholder="Search using tech stacks" className="border-black/30 dark:border-white/30" onChange={(e)=>{setSearchValue(e.target.value)}}/>
      <Button onClick={handleSubmit}>Search</Button>
    </div>
  );
};

export default Filter;
