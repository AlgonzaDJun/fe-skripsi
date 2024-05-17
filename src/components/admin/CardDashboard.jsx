/* eslint-disable react/prop-types */
// import React from "react";
// import { IoIosMailUnread } from "react-icons/io";

const CardDashboard = ({ jenis, jumlah, icon, className }) => {
  return (
    <div
      className={
        "card flex p-2 bg-primary-hover text-white rounded-lg gap-5 space-x-4" + className
      }
    >
      <div className="flex-grow space-y-2 ">
        <h1 className="text-xl font-light capitalize">{jenis}</h1>
        <h2 className="font-semibold text-xl">{jumlah}</h2>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default CardDashboard;
