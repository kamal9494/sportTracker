import React, { useEffect, useCallback, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import makeApiCall from "../../api";

const AdminHome = ({ user, setUser, setCurrUser }) => {
  const [sportData, setSportData] = useState(null);
  const [historyCount, setHistoryCount] = useState(null);
  const [pendingCount, setPendingCount] = useState(null);

  const nav = useNavigate();
  const cookies = new Cookies();

  const handleLogout = () => {
    setUser(null);
    setCurrUser("public");
    cookies.remove("token", { path: "/" });
    nav("/login");
  };

  const fetchData = useCallback(async (url, method) => {
    try {
      const response = await makeApiCall(url, method, null);
      return response.data;
    } catch (error) {
      toast.error("Internal Server Error");
      throw error;
    }
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const urls = [
          "https://sportenvbackend.vercel.app/sports",
          "https://sportenvbackend.vercel.app/issue/count",
          "https://sportenvbackend.vercel.app/history/count",
        ];
        const methods = Array(urls.length).fill("GET");

        const apiPromises = urls.map((url, index) =>
          fetchData(url, methods[index])
        );

        const allResponses = await Promise.all(apiPromises);
        setSportData(allResponses[0]);
        setPendingCount(allResponses[1].pending);
        setHistoryCount(allResponses[2].issues);
      } catch (error) {
        console.log(error);
      }
    };
    if (user && user.role === "admin") {
      fetchAll();
    }
  }, [user, fetchData]);

  const Card = ({ title, quantity }) => {
    return (
      <div
        key={title}
        className="flex justify-start gap-[20px] self-stretch w-[250px]"
      >
        <div className="flex justify-center items-center gap-[24px] flex-grow flex-shrink-0 flex-basis-0">
          <div className="flex p-[20px] flex-col items-start gap-[16px] rounded-[8px] bg-[#FFf] shadow-md flex-grow flex-shrink-0 flex-basis-0">
            <div className="flex flex-col items-start gap-[10px] self-stretch">
              <div className="flex items-center gap-[8px]">
                <p className="font-inter text-[#4D4D4D] text-[16px] font-normal leading-[24px]">
                  {title}
                </p>
              </div>
              <p className="font-inter text-[#1A181E] text-[32px] font-normal leading-[38px]">
                {quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col gap-10 md:flex-row bg-gray-50">
      <div className="w-full md:w-[70%] flex flex-col items-center">
        {sportData && historyCount && pendingCount ? (
          <>
            <label className="text-2xl font-semibold p-5 font-inter uppercase">
              Sport Items
            </label>
            <div className="flex flex-wrap gap-4 justify-center lg:px-16 lg:justify-start">
              {sportData &&
                sportData.map((item, index) => (
                  <Card key={index} title={item.sportName} quantity={item.quantity} />
                ))}
            </div>
            <label className="text-2xl font-semibold p-5 font-inter uppercase">
              Student Information
            </label>
            <div className="flex flex-wrap gap-4">
              {historyCount && pendingCount && (
                <>
                  <Card key="pending" title="Pending Returns" quantity={pendingCount} />
                  <Card key="totalIssues" title="Total Issues" quantity={historyCount} />
                </>
              )}
            </div>
          </>
        ) : (
          <label className="text-center mt-32">Loading...</label>
        )}
      </div>
      <div className="w-full p-5 h-[500px] md:w-[30%] flex flex-col items-center">
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
            <h2 className="text-2xl text-center font-semibold">
              Login required
            </h2>
            <button className="bg-[#0d6efd] p-1 px-2 rounded-md text-white">
              <NavLink to="/login">Login</NavLink>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
