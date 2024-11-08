import React, { useEffect } from "react";
import { InputNumber, Select, Space } from "antd";
const { Option } = Select;

const Bounty = ({defaultValue, head, bounty, setBounty, type, bountyCurrency, setBountyCurrency }) => {

  useEffect(() => {
    console.log("bounty", bounty);
    console.log('currecnt', bountyCurrency)
  }, [bounty,bountyCurrency]);

  
  const onChange = (value) => {
    setBounty((prevBounty) => ({
      ...prevBounty,
      [type]: value,
    }));
  };

  const onSelectChange = (value) => {
    console.log('value',value)
    setBountyCurrency(value === "INR" ? '₹' : ( value === "USD" ? '$' : (value === "EUR" ? '€' : (value === "GBP" ? '£' : '¥'))));
  };

  const selectAfter = (
    <Select
      className="bg-white"
      defaultValue={bountyCurrency}
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
        value={defaultValue}
      />
    </Space>
  );
};

export default Bounty;
