import React from "react";

const Nostate = ({ title = "No Record Found" }) => {
  return <div className="text-center py-5">{title}</div>;
};

export default Nostate;
