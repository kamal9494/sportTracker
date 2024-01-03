import React, { useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import makeApiCall from "../api";
import { FaGithub } from "react-icons/fa";

const Login = ({ user }) => {
  const [sportName, setSportName] = useState(null);
  const [quantity, setQuantity] = useState("10");
  const [loading, setLoading] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = "https://sportenvbackend.vercel.app/request";
    const method = "POST";
    const data = {
      sportName,
      quantity,
    };
    const responce = await makeApiCall(url, method, data);
    if (responce.status === 200) {
      toast.success("Request sent!");
    } else {
      toast.error("Login Error from server");
    }
    setLoading(false);
    setSportName(null);
    setQuantity(10);
  };
  return (
    <div className="h-[89vh] w-full flex flex-col items-center">
      {user ? (
        <div>
          <form onSubmit={handleRequest}>
            <h1 className="text-center text-3xl my-10 font-semibold">
              Request New Equipments
            </h1>
            <div className="flex flex-col gap-3 mt-10 w-[350px]">
              <label className="uppercase text-left text-gray-700 font-bold mb-2">
                Equipment Name
              </label>
              <input
                type="text"
                className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
                placeholder="Equipment Name"
                onChange={(e) => setSportName(e.target.value)}
                required
              />
            </div>
            <div className="py-2 w-[350px] flex flex-col gap-2">
              <label className="uppercase text-left text-gray-700 font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                className="bg-gray-100 border w-[100px] border-gray-200 text-gray-700 py-2 px-2 rounded focus:bg-white focus:border-gray-500"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-6 w-[350px]">
              <button
                type="submit"
                className={`px-4 w-full py-2 text-white bg-[#0d6efd] rounded-lg hover:bg-[#0b5ed7] ${
                  loading || !sportName ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading || !sportName}
              >
                {loading ? "Please wait" : "Request"}
              </button>
            </div>
          </form>
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

export default Login;
