import React from "react";
import { Breadcrumb } from "antd";
import "./index.css";
import { useLocation } from "react-router-dom";

const CommonBread = () => {
  const location = useLocation();
  const items = [
    {
      href: location.pathname,
      title: <span>{location.pathname}</span>,
    },
  ];
  return <Breadcrumb className="bread" items={items} />;
};
export default CommonBread;
