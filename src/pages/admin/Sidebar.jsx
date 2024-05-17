/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdHome, MdLogout } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { FaRankingStar } from "react-icons/fa6";
import { TbTextRecognition } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { IoChatbubbleEllipses } from "react-icons/io5";
import checkMobileScreen from "../../utils/checkMobileScreen";

const Sidebar = ({ children }) => {
  const location = useLocation().pathname;

  const menus = [
    { name: "Dashboard", link: "/admin/dashboard", icon: MdHome },
    { name: "Laporan Masuk", link: "/admin/laporan", icon: TbReport },
    {
      name: "Perangkingan Laporan",
      link: "/admin/perangkingan",
      icon: FaRankingStar,
    },
    {
      name: "Fitur Ekstraksi Informasi",
      link: "/admin/ekstraksi-informasi",
      icon: TbTextRecognition,
    },
    {
      name: "Chat User",
      link: "/admin/chat",
      icon: IoChatbubbleEllipses,
    },
    {
      name: "Logout",
      link: () => {
        localStorage.clear();
        window.location.replace("/");
      },
      icon: MdLogout,
      margin: true,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const isMobile = checkMobileScreen();

  const [open, setOpen] = useState(isMobile ? false : true);
  return (
    <section className="flex gap-6 ">
      <div
        className={`border-r border-r-incare-primary min-h-screen ${
          open ? "w-52" : "w-16"
        } duration-500 text-primary px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) =>
            menu.name == "Logout" ? (
              <Link
                to={menu?.link}
                onClick={handleLogout}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-primary ${
                  location == (menu.link || menu.link + "/") &&
                  "bg-primary text-white"
                } hover:text-white rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={
                    {
                      //   transitionDelay: `${i + 3}00ms`,
                    }
                  }
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-primary rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ) : (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-primary ${
                  location == (menu.link || menu.link + "/") &&
                  "bg-primary text-white"
                } hover:text-white rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={
                    {
                      //   transitionDelay: `${i + 3}00ms`,
                    }
                  }
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-primary rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            )
          )}
        </div>
      </div>
      {/* <div className="m-3 text-xl text-gray-900 font-semibold">
      REACT TAILWIND
    </div> */}

      <div className="flex-grow overflow-auto">{children}</div>
    </section>
  );
};

export default Sidebar;
