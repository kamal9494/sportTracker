import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import makeApiCall from "../api";

const Return = ({ user }) => {
  const [sportData, setSportData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const url = "https://sportenvbackend.vercel.app/return";
      const methods = "POST";
      const response = await makeApiCall(url, methods, null);
      setSportData(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error with contacting server...");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.sid) {
      fetchData();
    }
  }, [user, fetchData]);

  const handleReturn = async (item) => {
    try {
      const url = `https://sportenvbackend.vercel.app/return/${item._id}`;
      const method = "DELETE";
      const response = await makeApiCall(url, method, null);
      if (response.status === 200) {
        toast.success("Return Success!");
      } else {
        toast.error("Error from server");
      }
      fetchData();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        const errorMessage =
          error.response.data.message || "Something Went Wrong!";
        toast.error(errorMessage);
      } else {
        toast.error("Error from server");
      }
    }
  };

  const Item = ({ item }) => {
    return (
      <div className="p-5 flex flex-col gap-2 border rounded w-[250px]">
        <div className="flex justify-between">
          <label>Sport Item</label>
          <label>- {item.sportName}</label>
        </div>
        <div className="flex justify-between">
          <label>Quantity</label>
          <label>- {item.quantity}</label>
        </div>
        <div className="flex justify-between">
          <label>Issued Date</label>
          <label>- {new Date(item.issuedDate).toLocaleDateString()}</label>
        </div>
        <button
          className="px-4 w-full py-2 bg-[#0d6efd] rounded-lg hover:bg-[#0b5ed7] text-white"
          onClick={() => handleReturn(item)}
        >
          Return
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {user ? (
        <div>
          <h2 className="text-2xl font-semibold my-20 text-center">
            Return Equipment
          </h2>
          <div className="p-3 text-center">{loading && "Loading..."}</div>
          <div className="p-3 text-center">
            {!loading && sportData.length === 0 && "No Items"}
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            {!loading &&
              sportData.length !== 0 &&
              sportData.map((item) => <Item key={item._id} item={item} />)}
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
        </div>
      )}
    </div>
  );
};

export default Return;
