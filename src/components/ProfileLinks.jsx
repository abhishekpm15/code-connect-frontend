import React, { useState } from "react";
import { Button } from "antd";

const ProfileLinks = ({inputs, setInputs}) => {
  
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    const newInputs = [...inputs, ""];
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  return (
    <div>
      <div className="sm:col-span-2">
        {inputs?.map((input, index) => (
          <div key={index} className="flex flex-row mt-1">
            <input
              type="text"
              value={input}
              className=" w-full rounded-md border-0 mt-1 mr-3 px-3.5  text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <Button onClick={() => handleRemoveInput(index)} className="font-bold mt-1">-</Button>
          </div>
        ))}
      </div>
      <div className="flex justify-start mt-2">
        <Button className="mr-3" onClick={handleAddInput}>
          Add Links 
        </Button>
      </div>
    </div>
  );
};

export default ProfileLinks;
