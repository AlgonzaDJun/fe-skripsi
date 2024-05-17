/* eslint-disable no-unused-vars */
// import React from "react";

import { useState } from "react";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

const postLogin = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

const Login = () => {
  const [dataSubmit, setDataSubmit] = useState({
    username: "",
    password: "",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: postLogin,
    mutationKey: "login",
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleChange = (e) => {
    setDataSubmit({ ...dataSubmit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(dataSubmit, {
      onSuccess: (data) => {
        if (data.data) {
          console.log(data.data);
          localStorage.setItem("id", data.data.id);
          localStorage.setItem("role", data.data.role);
          //   window.location.href = "/";
          if (data.data.role === "admin") {
            toast.success("Login Success", {
              onClose: () => {
                window.location.href = "/admin";
              },
              autoClose: 1000,
            });
          } else {
            toast.success("Login Success", {
              onClose: () => {
                window.location.href = "/";
              },
              autoClose: 1000,
            });
          }
        } else {
          toast.error(data.detail);
          //   console.log(data);
        }
      },
    });
  };

  return (
    <div>
      {isLoading && <Loading />}
      <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="facility.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username / email
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={dataSubmit.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                  className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset   focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-primary hover:text-primary-hover"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={dataSubmit.password}
                  onChange={handleChange}
                  //   autoComplete="current-password"
                  required
                  className="px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-primary hover:text-primary-hover"
            >
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
