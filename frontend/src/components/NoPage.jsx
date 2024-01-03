import React from "react";
import { NavLink } from "react-router-dom";

const NoPage = ({ user }) => {
  return (
    <div className="h-[89vh] w-full flex flex-col gap-3 items-center justify-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <h1 className="text-4xl font-semibold">Page Not Found</h1>
      {user && (
        <div className="mt-8 flex flex-col gap-2">
          <button className="px-4 w-full py-2 bg-[#ffc107] rounded-lg hover:bg-[#ffca2c] text-white">
            <NavLink to={user.role === "admin" ? "/admin" : "/"}>
              Back to Home
            </NavLink>
          </button>
        </div>
      )}
    </div>
  );
};

export default NoPage;
