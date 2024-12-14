import React from "react";
import "./pills.css"; 

const Pills = ({ type }) => {
  
  const pillClass = `pill pill-${type.toLowerCase()}`;

  return <span className={pillClass}>{type}</span>;
};

export default Pills;
