import React, { useState } from "react";
import makeApiCall from "../api";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const sample = {
    currentPassword: "",
    updatedPassword: "",
  };
  const [formData, setFormData] = useState(sample);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateAndUpdate = (e) => {
    e.preventDefault();
    if (confirmPwd.toLowerCase() === formData.updatedPassword.toLowerCase()) {
      handleUpdate();
      setError("");
    } else {
      setError("New password and confirmed password don't match");
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const url = "https://sportenvbackend.vercel.app/changePassword";
      const method = "POST";

      const result = await makeApiCall(url, method, formData);
      if (result.status === 200) {
        toast.success("Updated successfully");
      }
      setLoading(false);
      setFormData(sample);
      setConfirmPwd("");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.warning("Invalid Password");
      }
      if (error.response && error.response.status === 500) {
        toast.warning("Internal Server Error");
      }
      setLoading(false);
    }
  };
  return (
    <div className="h-[89vh] w-full flex flex-col items-center">
      <h1 className="text-center text-3xl mt-10 font-semibold">
        Update Password
      </h1>
      <p className="text-red-500 text-md m-2">{error}</p>
      <form onSubmit={validateAndUpdate}>
        <div className="flex flex-col gap-3 mt-5 w-[350px]">
          <label className="text-xl">Current Password</label>
          <input
            type="password"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            placeholder="Password"
            value={formData.currentPassword}
            name="currentPassword"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3 mt-5  w-[350px]">
          <label className="text-xl">New Password</label>
          <input
            type="password"
            name="updatedPassword"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            value={formData.updatedPassword}
            onChange={handleChange}
            placeholder="New Password"
            required
          />
        </div>
        <div className="flex flex-col gap-3 mt-5  w-[350px]">
          <label className="text-xl">Confirm New Password</label>
          <input
            type="password"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            placeholder="Re-enter New Password"
            required
          />
        </div>
        <div className="flex gap-3 mt-6 w-[350px]">
          <button
            type="submit"
            className={`px-4 w-full py-2 bg-[#0d6efd] rounded-lg hover:bg-[#0b5ed7] text-white
              ${
                loading ||
                !formData.currentPassword ||
                !formData.updatedPassword ||
                !confirmPwd
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            disabled={
              loading ||
              !formData.currentPassword ||
              !formData.updatedPassword ||
              !confirmPwd
            }
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
