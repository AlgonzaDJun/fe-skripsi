/* eslint-disable react/prop-types */
// import React from "react";

const RoomSelector = ({ judul, newChat, id, id_pelapor, active }) => {
  const role = localStorage.getItem("role");

  return (
    <button
      onClick={() =>
        role === "admin"
          ? (window.location.href = `/admin/chat/${id}/${id_pelapor}`)
          : (window.location.href = `/chat/${id}`)
      }
      className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${
        active ? "bg-gray-100" : ""
      }`}
    >
      <div className="flex items-center justify-center h-8 w-8 px-2 bg-orange-200 rounded-full">
        {judul[0]}
      </div>
      <div className="ml-2 text-sm font-semibold truncate ...">{judul}</div>
      {newChat && (
        <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
          {newChat}
        </div>
      )}
    </button>
  );
};

export default RoomSelector;
