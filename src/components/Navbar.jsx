/* eslint-disable no-unused-vars */
import React from "react";
import { MdRecordVoiceOver } from "react-icons/md";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Dropdown } from "flowbite-react";
import { useQuery } from "react-query";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

const fetchUserById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/auth/${id}`
  );
  const data = await response.json();
  return data;
};

const Navbar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const { data } = useQuery({
    queryFn: () => fetchUserById(localStorage.getItem("id")),
    queryKey: "user",
  });

  useEffect(() => {
    initFlowbite();
  }, []);

  // console.log(data)

  return (
    // <nav className="p-3 flex justify-between text-white bg-primary">
    //   <div className="flex gap-5 ml-24">
    //     <div className="flex items-center gap-2 text-lg font-semibold">
    //       <Link to="/" className="flex items-center gap-2">
    //         <MdRecordVoiceOver fontSize={30} />
    //         <h1>SIPFANESA</h1>
    //       </Link>
    //     </div>
    //     <a href="" className="ml-10 font-light">
    //       TENTANG WEB
    //     </a>
    //     <a href="/riwayat" className="font-light">
    //       RIWAYAT LAPORAN
    //     </a>
    //     <HashLink to={"/#statistik"} className="font-light">
    //       STATISTIK
    //     </HashLink>
    //   </div>
    //   <div className="space-x-3 mr-4">
    //     {localStorage.getItem("id") ? (
    //       <>
    //         <Dropdown
    //           label={data ? data.data.full_name : ""}
    //           inline
    //           placement="bottom"
    //         >
    //           {data ? (
    //             data.data.role === "admin" ? (
    //               <Dropdown.Item href="/admin">Dashboard</Dropdown.Item>
    //             ) : (
    //               <></>
    //             )
    //           ) : null}
    //           <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
    //         </Dropdown>
    //       </>
    //     ) : (
    //       <>
    //         <Link to="/login" className="font-light">
    //           <button>Login</button>
    //         </Link>

    //         <Link to="/register" className="font-light">
    //           <button>Register</button>
    //         </Link>
    //       </>
    //     )}
    //     {/* <Link to="/login" className="font-light">
    //       <button>Login</button>
    //     </Link>

    //     <Link to="/register" className="font-light">
    //       <button>Register</button>
    //     </Link> */}
    //   </div>
    // </nav>

    <nav className="bg-primary text-white fixed w-full z-20 top-0 start-0 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center gap-2">
          <MdRecordVoiceOver fontSize={30} />
          <h1>SIPFANESA</h1>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg space-y-5 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
            <li>
              <a href="/" className="md:ml-10 font-light">
                HOME
              </a>
            </li>
            <li>
              <a href="/riwayat" className="font-light">
                RIWAYAT LAPORAN{" "}
              </a>
            </li>
            <li>
              <HashLink to={"/#statistik"} className="font-light">
                STATISTIK
              </HashLink>
            </li>
            <li>
              <a href="/chat" className="font-light">
                CHAT{" "}
              </a>
            </li>
            {localStorage.getItem("id") ? (
              <>
                <Dropdown
                  label={data ? data.data.full_name : ""}
                  inline
                  // placement="bottom"
                >
                  {data ? (
                    data.data.role === "admin" ? (
                      <Dropdown.Item href="/admin">Dashboard</Dropdown.Item>
                    ) : (
                      <></>
                    )
                  ) : null}
                  <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to="/login" className="font-light">
                  <button>Login</button>
                </Link>

                <Link to="/register" className="font-light">
                  <button>Register</button>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
