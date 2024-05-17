/* eslint-disable react/prop-types */
// import React from "react";

const AdminBubble = ({ message, image }) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg md:max-w-md">
      <div className="flex flex-row items-center">
        <div className=" items-center justify-center h-10 w-10 rounded-full bg-orange-500 flex-shrink-0 hidden md:flex">
          A
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          {image ? (
            <img
              src={image}
              alt="image-from-user"
              className="mb-2 w-[448px] h-44 object-cover"
            />
          ) : null}
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminBubble;
