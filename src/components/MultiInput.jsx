import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

const MultiInput = ({inputs, setInputs}) => {
  
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
        {inputs.map((input, index) => (
          <div key={index} className="flex flex-row mt-2">
            <input
              type="text"
              value={input}
              className="block w-full rounded-md border-0  mr-3 px-3.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <Button onClick={() => handleRemoveInput(index)}>-</Button>
          </div>
        ))}
      </div>
      <div className="flex justify-start mt-2">
        <Button className="mr-3" onClick={handleAddInput}>
          Add Link
        </Button>
      </div>
    </div>
  );
};

export default MultiInput;
