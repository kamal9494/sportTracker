import React from "react";
import Cookies from "universal-cookie";
import { NavLink, useNavigate } from "react-router-dom";

const AdminHome = ({ user, setUser, setCurrUser }) => {
  const nav = useNavigate();
  const cookies = new Cookies();

  const handleLogout = () => {
    setUser(null);
    setCurrUser("public");
    cookies.remove("token", { path: "/" });
    nav("/login");
  };

  return (
    <div className="h-[89vh] w-full flex flex-col items-center">
      {user ? (
        <div className="text-center">
          <div className="mt-20">
            <img
              src={require("../../assets/profile.png")}
              alt="profile"
              className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
            />
          </div>
          <div className="my-2 space-y-1">
            <h2 className="px-5 text-black text-xl">{user.role}</h2>
          </div>
          <div className="mt-10 flex flex-col gap-2">
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
        <div className="h-[89vh] flex flex-col gap-3 justify-center">
          <h2 className="text-2xl text-center font-semibold">Login required</h2>
          <button className="bg-[#0d6efd] p-1 px-2 rounded-md text-white">
            <NavLink to="/login">Login</NavLink>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
