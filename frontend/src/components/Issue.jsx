import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import makeApiCall from "../api";

const Issue = ({ user }) => {
  const [sportData, setSportData] = useState(null);
  const [sportItem, setSportItem] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const url = "https://sportenvbackend.vercel.app/sports";
      const method = "GET";
      const response = await makeApiCall(url, method, null);
      setSportData(response.data);
    } catch (error) {
      toast.error("Error with contacting server...");
    }
  }, []);

  useEffect(() => {
    if (user && user.sid) {
      fetchData();
    }
  }, [user, fetchData]);

  const isQuantityValid = () => {
    if (Number(quantity) > 5 || Number(quantity) < 0) {
      setError("The quantity should be a in between 1-5");
      return false;
    }
    return true;
  };

  const issue = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    if (isQuantityValid()) {
      try {
        const url = "https://sportenvbackend.vercel.app/issue";
        const method = "PATCH";
        const data = {
          id: sportItem,
          quantity: Number(quantity),
        };
        const response = await makeApiCall(url, method, data);
        setLoading(false);
        fetchData();
        if (response.status === 200) {
          toast.success("Issued Success!");
        } else {
          toast.error("Error from server");
        }
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 400) {
          const errorMessage =
            error.response.data.message || "Item Not Available";
          toast.error(errorMessage);
        } else if (error.response && error.response.status === 404) {
          toast.error("Error from server");
        }
      }
    }
  };

  return (
    <div className="w-full h-[89vh] flex flex-col items-center">
      {user ? (
        <div className="flex h-full flex-col gap-5 items-center md:flex-row md:justify-evenly">
          <div className="bg-gray-100 w-[350px] flex flex-col gap-2 p-5 rounded-md mt-10">
            <h2 className="text-2xl font-semibold my-3 text-center">
              Availability
            </h2>
            {!sportData && <div className="text-center">Loading...</div>}

            <table className="w-full border">
              <thead className="bg-[#BDD5EA] border-2">
                <tr className="p-3 text-sm font-semibold tracking-wide text-left">
                  <th>Sport Item</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {sportData &&
                  sportData.map((item, index) => (
                    <tr
                      key={index}
                      className="p-2 bg-gray-300 border-2 text-left"
                    >
                      <td>{item.sportName}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col p-5 w-[350px]">
            <form onSubmit={issue}>
              <h2 className="text-2xl font-semibold mb-5">Issue Equipment</h2>
              <p className="text-red-500 text-md mb-2">{error}</p>
              <label className="uppercase text-left text-gray-700 font-bold mb-2">
                Select Equipment
              </label>
              <div className="py-2">
                <select
                  className="bg-gray-200 border w-full border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded focus:bg-white focus:border-gray-500"
                  onChange={(e) => setSportItem(e.target.value)}
                  value={sportItem ? sportItem._id : ""}
                  required
                >
                  <option value="" disabled={true}>
                    Select
                  </option>
                  {sportData &&
                    sportData.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.sportName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="py-2 flex flex-col gap-2">
                <label className="uppercase text-left text-gray-700 font-bold mb-2">
                  Quantity
                  <small className="text-xs text-red-500">(Max : 5)</small>
                </label>
                <input
                  type="number"
                  value={quantity}
                  className="bg-gray-100 border w-[100px] border-gray-200 text-gray-700 py-2 px-2 rounded focus:bg-white focus:border-gray-500"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-3 mt-5 justify-start">
                <button
                  type="submit"
                  className={`px-4 w-full py-2 text-white bg-[#0d6efd] rounded-lg hover:bg-[#0b5ed7] ${
                    loading || !sportItem || !quantity
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={loading || !sportItem}
                >
                  {loading ? "Please wait" : "Issue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="h-[89vh] flex flex-col gap-3 justify-center w-[160px]">
          <h2 className="text-2xl text-center font-semibold">Login required</h2>
          <NavLink
            className="bg-[#0d6efd] p-1 px-2 rounded-md text-white text-center hover:bg-[#0b5ed7];"
            to="/login"
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Issue;
