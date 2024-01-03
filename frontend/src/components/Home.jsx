import React from "react";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGithub } from "react-icons/fa";


const Home = ({ user, setUser, setCurrUser}) => {
  const cookies = new Cookies();

  const handleLogout = () => {
    setUser(null);
    setCurrUser("public");
    cookies.remove("token", { path: "/" });
    toast.success("Logout Success!");
  };

  return (
    <div className="h-[89vh] w-full flex flex-col items-center">
      {user ? (
        <div className="text-center">
          <div className="mt-20">
            <img
              src={require("../assets/profile.png")}
              alt="profile"
              className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
            />
          </div>
          <div className="my-2 space-y-1">
            <h2 className="text-2xl text-center font-semibold sm:text-2xl">
              {user.name}
            </h2>
            <p className="tracking-wide">{user.email}</p>
            <p className="text-md text-center sm:text-base dark:text-gray-400">
            {user.sid && user.sid.toUpperCase()}
            </p>
            <div className="pt-5">
              <label className="uppercase text-sm sm:text-base dark:text-gray-500">
                Role{" "}
              </label>
              <p className="text-md sm:text-base">{user.role && user.role.toUpperCase()}</p>
            </div>
            <div>
              <label className="uppercase text-sm sm:text-base dark:text-gray-500">
                Branch
              </label>
              <p className="text-md sm:text-base">{user.branch}</p>
            </div>

            <div>
              <label className="uppercase text-sm sm:text-base dark:text-gray-500">
                Semeter
              </label>
              <p className="text-md sm:text-base">
                {user.semester} <sup>th</sup>
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <button className="px-4 w-full py-2 bg-[#ffc107] rounded-lg hover:bg-[#ffca2c] text-white">
              <NavLink to="/changePassword">Change Password</NavLink>
            </button>
            <button
              className="px-4 w-full py-2 bg-[#dc3545] rounded-lg hover:bg-[#bb2d3b] text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[89vh] flex flex-col gap-3 justify-center w-[160px]">
          <h2 className="text-2xl text-center font-semibold">Login required</h2>
          <NavLink
            className="bg-[#0d6efd] p-1 px-2 rounded-md text-white text-center hover:bg-[#0b5ed7]"
            to="/login"
          >
            Login
          </NavLink>
          <a href="https://github.com/kamal9494/sportTracker" target="_blank" rel="noreferrer" className="flex gap-2 items-center justify-center opacity-70">
          <FaGithub /> kamal9494
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
