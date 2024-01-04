import React, { useState, useEffect, useRef } from "react";
import { AiOutlineMenu, AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Navbar = ({ user, setUser, setCurrUser }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [nav, setNav] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNav(false);
        setMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleNav = () => {
    setNav((prev) => !prev);
  };

  const handleContextMenu = () => {
    setMenu((prev) => !prev);
  };

  const navItemClicked = ({ isActive }) => {
    return {
      color: isActive ? "red" : "#fff",
    };
  };

  const handleLogout = () => {
    setUser(null);
    setCurrUser("public");
    cookies.remove("token", { path: "/" });
    setMenu(false);
    navigate("/login");
    toast.success("Logout Success!");
  };

  return (
    <div
      ref={menuRef}
      className="w-full flex justify-between items-center h-20 max-w-[1640px] mx-auto px-4 bg-black text-white"
    >
      <div onClick={handleNav} className="w-[25px] block md:hidden">
        <AiOutlineMenu size={25} />
      </div>
      <h3 className="text-2xl font-mono font-bold text-blue-200 sm:m-5 cursor-pointer">
        {user && user.role === "admin" ? (
          <NavLink to="/admin">SportTrackPro</NavLink>
        ) : (
          <NavLink to="/">SportTrackPro</NavLink>
        )}
      </h3>
      {user && user.role === "admin" ? (
        <ul className="m-20 font-mono text-md hidden md:flex  gap-x-5">
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/admin">
              Home
            </NavLink>
          </li>
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/addItems">
              Items
            </NavLink>
          </li>
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/issues">
              Issues
            </NavLink>
          </li>
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/requests">
              Requests
            </NavLink>
          </li>
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/history">
              History
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="m-20 font-mono text-md hidden md:flex  gap-x-5">
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/">
              Home
            </NavLink>
          </li>
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/issue">
              Issue
            </NavLink>
          </li>
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/return">
              Return
            </NavLink>
          </li>
          <li className="p-4 cursor-pointer">
            <NavLink style={navItemClicked} to="/request">
              Request
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex items-center justify-center gap-1">
        {user && (
          <div>
            {menu ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </div>
        )}
        <div
          className={`items-center p-2 rounded-full gap-2 flex cursor-pointer select-none ${user ? `hover:bg-slate-900` : ``}`}
          onClick={handleContextMenu}
        >
          <AiOutlineUser
            size={35}
            className={user && "border-blue-800 border rounded-full"}
          />
          {user && user.role === "student" ? (
            <label className="text-white font-semibold hidden lg:block">
              {user.sid.toUpperCase()}
            </label>
          ) : user && user.role === "admin" ? (
            <>
              <label className="text-white font-semibold hidden lg:block">
                {user.role}
              </label>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-[#2a2b2a] p-2 rounded-md hover:bg-[#363736]"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      <div8
        className={
          menu && user
            ? "absolute z-20 right-0 top-20 bg-white shadow-lg text-black w-[180px] md:w-[200px] rounded-lg select-none"
            : "absolute top-[-100%]"
        }
      >
        <ul className="flex flex-col gap-2">
          <li className="text-center p-3">
            <NavLink
              className="hover:text-red-500 w-full flex items-center"
              to={user && user.role === "student" ? "/" : "/admin"}
            >
              <AiOutlineUser size={20} className="mr-2" />
              Profile
            </NavLink>
          </li>
          <li className="text-center  p-3">
            <div className="w-full">
              <NavLink
                className="hover:text-red-500 w-full flex items-center"
                to="/changePassword"
              >
                <RiLockPasswordFill size={20} className="mr-2" /> Change
                Password
              </NavLink>
            </div>
          </li>
          <li className="bg-red-500 text-center text-white p-3">
            <div className="w-full h-full">
              <button
                className="w-full h-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <CiLogout size={20} className="mr-2" />
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div8>

      <div
        className={
          nav
            ? "fixed bg-black z-10 left-0 top-0 w-[200px] h-full border-r-900 ease-in-out duration-300"
            : "fixed left-[-100%]"
        }
      >
        <div className="flex justify-end items-center m-6">
          <AiOutlineClose onClick={handleNav} size={25} />
        </div>
        <div>
          {user && user.role === "admin" ? (
            <ul className="font-medium text-sm font-mono text-center p-3">
              <li className="p-4 border-b border-gray-100">
                <NavLink
                  style={navItemClicked}
                  className="flex justify-center items-center gap-2"
                  to="/admin"
                >
                  Home
                </NavLink>
              </li>
              <li className="p-4 border-b border-gray-100">
                <NavLink style={navItemClicked} to="/addItems">
                  Items
                </NavLink>
              </li>
              <li className="p-4 border-b border-gray-100">
                <NavLink style={navItemClicked} to="/issues">
                  Issues
                </NavLink>
              </li>
              <li className="p-4 border-b border-gray-100">
                <NavLink style={navItemClicked} to="/requests">
                  Requests
                </NavLink>
              </li>
              <li className="p-4 border-b border-gray-100">
                <NavLink style={navItemClicked} to="/history">
                  History
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="font-medium text-sm font-mono text-center p-3">
              <li className="p-4 border-b border-gray-100">
                <NavLink style={navItemClicked} to="/">
                  Home
                </NavLink>
              </li>
              <li className="p-4 border-b border-gray-100">
                <NavLink style={navItemClicked} to="/issue">
                  Issue
                </NavLink>
              </li>
              <li className="p-4 border-b border-gray-100">
                <NavLink style={navItemClicked} to="/return">
                  Return
                </NavLink>
              </li>
              <li className="p-4 border-b border-gray-100">
                <NavLink style={navItemClicked} to="/request">
                  Request
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
