import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import makeApiCall from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sampleData = {
    sid: "",
    email: "",
    name: "",
    branch: "",
    semester: "",
    password: "",
  };
  const [formData, setFormData] = useState(sampleData);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "https://sportenvbackend.vercel.app/signup";
      const method = "POST";

      const result = await makeApiCall(url, method, formData);
      if (result.status === 200) {
        toast.success("User created successfully");
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning("Error creating user");
      }
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="h-[89vh] w-full flex flex-col items-center">
      <form onSubmit={handleLogin}>
        <h1 className="text-center text-3xl mt-10 font-semibold">
          Student Details
        </h1>
        <div className="flex flex-col gap-3 mt-5 w-[350px]">
          <label className="text-xl">Name</label>
          <input
            type="text"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            placeholder="Student Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3 mt-5 w-[350px]">
          <label className="text-xl">Registration Number</label>
          <input
            type="text"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            placeholder="Registration No."
            value={formData.sid}
            name="sid"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3 mt-5 w-[350px]">
          <label className="text-xl">School</label>
          <select
            name="branch"
            className="bg-gray-200 border w-full border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded focus:bg-white focus:border-gray-500"
            onChange={handleChange}
            value={formData.branch}
            required
          >
            <option value="" disabled={true}>
              Select School
            </option>
            <option value="Computer Engineering">BCE</option>
            <option value="Computer Engineering">BCI</option>
            <option value="Computer Engineering">BCR</option>
            <option value="Computer Engineering">BCD</option>
            <option value="Computer Engineering">BCB</option>
            <option value="Computer Engineering">BCN</option>
            <option value="Computer Engineering">BEC</option>
            <option value="Computer Engineering">BES</option>
            <option value="Computer Engineering">BEV</option>
            <option value="Computer Engineering">BME</option>
            <option value="Computer Engineering">VSB</option>
            <option value="Computer Engineering">VSL</option>
            <option value="Electronics Engineering">
              Electronics Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Information Technology">
              Information Technology
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-3 mt-5 w-[350px]">
          <label className="text-xl">Semester</label>
          <input
            type="number"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            placeholder="Enter Semester"
            value={formData.semester}
            name="semester"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3 mt-5 w-[350px]">
          <label className="text-xl">Email</label>
          <input
            type="email"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            placeholder="Enter Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3 mt-5  w-[350px]">
          <label className="text-xl">Password</label>
          <input
            type="password"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            placeholder="Enter Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3 mt-6 w-[350px]">
          <button
            type="submit"
            className={`px-4 mb-4 w-full py-2 bg-[#0d6efd] rounded-lg hover:bg-[#0b5ed7] text-white
              ${
                loading ||
                !formData.email ||
                !formData.password ||
                !formData.sid ||
                !formData.branch ||
                !formData.semester ||
                !formData.name
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            disabled={
              loading ||
              !formData.email ||
              !formData.password ||
              !formData.sid ||
              !formData.branch ||
              !formData.semester ||
              !formData.name
            }
          >
            {loading ? "Creating user..." : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
