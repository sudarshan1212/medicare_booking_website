import React from "react";

const Error = ({ errormessage }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h3 className="  text-headingColor text-xl leading-7 font-semibold">
        {errormessage}{" "}
      </h3>
    </div>
  );
};

export default Error;
