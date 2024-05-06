import React, { useEffect } from "react";
import { InputNumber, Select, Space } from "antd";
const { Option } = Select;

const Bounty = ({ head, bounty, setBounty, type, bountyCurrency, setBountyCurrency }) => {

  useEffect(() => {
    console.log("bounty", bounty);
    console.log('currecnt', bountyCurrency)
  }, [bounty]);

  
  const onChange = (value) => {
    setBounty((prevBounty) => ({
      ...prevBounty,
      [type]: value,
    }));
  };

  const onSelectChange = (value) => {
    console.log('value',value)
    setBountyCurrency(value);
  };

  const selectAfter = (
    <Select
      className="bg-white"
      defaultValue="INR"
      onChange={onSelectChange}
      style={{
        width: 60,
      }}
    >
      <Option value="INR">₹</Option>
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  );
  return (
    <Space direction="vertical">
      <div className="text-xs">{head}</div>
      <InputNumber
        min={1}
        max={10000}
        defaultValue={10}
        addonAfter={selectAfter}
        onChange={onChange}
        changeOnWheel
      />
    </Space>
  );
};

export default Bounty;
