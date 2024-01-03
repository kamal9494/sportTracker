import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import makeApiCall from "../../api";

const Items = ({ user }) => {
  const [sportData, setSportData] = useState(null);
  const [sportItem, setSportItem] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [newSportItem, setNewSportItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("10");
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState("update");

  const fetchData = useCallback(async () => {
    try {
      const url = "https://sportenvbackend.vercel.app/sports";
      const method = "GET";
      const response = await makeApiCall(url, method, null);
      setSportData(response.data);
    } catch (error) {
      toast.error("Internal Server Error");
    }
  }, []);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchData();
    }
  }, [user, fetchData]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "https://sportenvbackend.vercel.app/sports";
      const method = "POST";
      const data = {
        sportName: newSportItem,
        quantity: Number(newQuantity),
      };
      const response = await makeApiCall(url, method, data);
      if (response.status === 200) {
        toast.success("Added Successfully!");
      }
      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Internal Server Error");
      }
    }
    setLoading(false);
    setNewQuantity("10");
    setNewSportItem("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "https://sportenvbackend.vercel.app/sports";
      const method = "PATCH";
      const data = {
        sportItem: sportItem,
        quantity: Number(quantity),
      };
      const response = await makeApiCall(url, method, data);
      if (response.status === 200) {
        toast.success("Updated Successfully!");
      }
      fetchData();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Error from server");
      }
    }
    setLoading(false);
    setQuantity("1");
    setSportItem("");
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
            <label className="text-xl font-semibold">Select Action</label>
            <div className="flex gap-5 py-5">
              <div className="flex gap-1">
                <input
                  type="radio"
                  id="update"
                  name="update"
                  value="update"
                  checked={selectedAction === "update"}
                  onChange={() => setSelectedAction("update")}
                />
                <label htmlFor="update">Update</label>
                <input
                  type="radio"
                  id="add"
                  name="add"
                  value="add"
                  checked={selectedAction === "add"}
                  onChange={() => setSelectedAction("add")}
                />
                <label htmlFor="admin">Add</label>
              </div>
            </div>
            {selectedAction === "update" ? (
              <form onSubmit={handleUpdate}>
                <div>
                  <h2 className="text-2xl font-semibold mb-10">
                    Update Equipment
                  </h2>
                  <label className="uppercase text-left text-gray-700 font-bold mb-2">
                    Select Equipment
                  </label>
                  <div className="py-2">
                    <select
                      className="bg-gray-200 border w-full border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded focus:bg-white focus:border-gray-500"
                      onChange={(e) => setSportItem(e.target.value)}
                      value={sportItem ? sportItem : ""}
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
                      disabled={loading || !sportItem || !quantity}
                    >
                      {loading ? "Please wait" : "Update"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <form onSubmit={handleAdd}>
                  <h2 className="text-2xl font-semibold mb-10">
                    Add Equipment
                  </h2>
                  <label className="uppercase text-left text-gray-700 font-bold mb-2">
                    Equipment Name
                  </label>
                  <div className="py-2">
                    <input
                      className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
                      placeholder="Equipment Name"
                      type="text"
                      onChange={(e) => setNewSportItem(e.target.value)}
                      value={newSportItem}
                      required
                    />
                  </div>
                  <div className="py-2 flex flex-col gap-2">
                    <label className="uppercase text-left text-gray-700 font-bold mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={newQuantity}
                      className="bg-gray-100 border w-[100px] border-gray-200 text-gray-700 py-2 px-2 rounded focus:bg-white focus:border-gray-500"
                      onChange={(e) => setNewQuantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-3 mt-5 justify-start">
                    <button
                      type="submit"
                      className={`px-4 w-full py-2 text-white bg-[#0d6efd] rounded-lg hover:bg-[#0b5ed7] ${
                        loading || !newSportItem || !newQuantity
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={loading || !newSportItem || !newQuantity}
                    >
                      {loading ? "Please wait" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-[89vh] flex flex-col gap-3 justify-center">
          <h2 className="text-2xl text-center font-semibold">Login required</h2>
          <button className="bg-[#0d6efd] p-1 px-2 rounded-md text-white">
            <NavLink
              className="bg-[#0d6efd] p-1 px-2 rounded-md text-white"
              to="/login"
            >
              Login
            </NavLink>
          </button>
        </div>
      )}
    </div>
  );
};

export default Items;
