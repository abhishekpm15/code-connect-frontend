import React from "react";
import { Avatar, Badge, Space } from "antd";

const Badges = ({ count, dot }) => (
  <Space size="large" className="">
    <Badge dot={dot} count={count} size="small"></Badge>
  </Space>
);
export default Badges;
