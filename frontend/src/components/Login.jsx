import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import makeApiCall from "../api";

const Login = ({ setUser, setCurrUser }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      role: selectedRole,
      ...(selectedRole === "admin" && { username: email }),
      ...(selectedRole === "student" && { email }),
      password,
    };
    try {
      const url = "https://sportenvbackend.vercel.app/login";
      const method = "POST";

      const result = await makeApiCall(url, method, data);
      if (result.status === 200) {
        toast.success("Log In Successful");
        const token = result.data.token;
        var decoded = jwtDecode(token);
        const exp = {
          expires: new Date(decoded.exp * 1000),
        };
        cookies.set("token", token, exp);
        const { name, email, sid, role, branch, semester, id, username } =
          decoded;
        setUser({
          name,
          email,
          sid,
          role,
          branch,
          semester,
          id,
          username,
        });
        setCurrUser(role);
        if (selectedRole === "student") navigate("/");
        else navigate("/admin");
      }
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.warning("Invalid Login Details");
      } else if (error.response && error.response.status === 404) {
        toast.warning("User Not Found");
      } else {
        toast.error("Error from server");
      }
      setLoading(false);
    }
  };

  return (
    <div className="h-[89vh] w-full flex flex-col items-center">
      <form onSubmit={handleLogin}>
        <h1 className="text-center text-3xl mt-10 font-semibold">Login</h1>
        <div className="flex flex-col gap-3 mt-10 w-[350px]">
          <label className="text-xl">Select Role</label>
          <div className="flex gap-5">
            <div className="flex gap-1">
              <input
                type="radio"
                id="student"
                name="userRole"
                value="student"
                checked={selectedRole === "student"}
                onChange={() => setSelectedRole("student")}
              />
              <label htmlFor="student">student</label>
              <input
                type="radio"
                id="admin"
                name="userRole"
                value="admin"
                checked={selectedRole === "admin"}
                onChange={() => setSelectedRole("admin")}
              />
              <label htmlFor="admin">admin</label>
            </div>
          </div>
        </div>
        <div className="my-3 opacity-50">
          <label>Demo Login details</label>
          <p>{selectedRole === "student" ? "Email : demo@gmail.com" : "Username : admin"}</p>
          <p>Password : {selectedRole === "student" ? "demo1234" : "admin1234"}</p>
        </div>
        <div className="flex flex-col gap-3 mt-5 w-[350px]">
          <label className="text-xl">
            {selectedRole === "student" ? "Email" : "Username"}
          </label>
          <input
            type={selectedRole === "student" ? "email" : "text"}
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            placeholder={
              selectedRole === "student" ? "Enter Email" : "Enter username"
            }
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3 mt-5  w-[350px]">
          <label className="text-xl">Password</label>
          <input
            type="password"
            className="border px-4 py-2 w-[350px] focus:shadow-md focus:outline-none"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3 mt-6 w-[350px]">
          <button
            type="submit"
            className={`px-4 w-full py-2 bg-[#0d6efd] rounded-lg hover:bg-[#0b5ed7] text-white
              ${
                loading || !email || !password
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            disabled={loading || !email || !password}
          >
            {loading ? "Logging In... " : "Login"}
          </button>
        </div>
        <div className="flex gap-3 mt-5 w-[350px]">
          <p>
            Don't have an account register{" "}
            <label
              onClick={() => navigate("/signup")}
              className="hover:cursor-pointer text-blue-700"
            >
              here
            </label>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
