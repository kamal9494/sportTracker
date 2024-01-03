import React from "react";
import { NavLink } from "react-router-dom";

const StudentView = ({ children, role }) => {
  if (role === "student") return <>{children}</>;
  else
    return (
      <div className="h-[80vh] flex items-center justify-center flex-col gap-5 text-md text-center">
        <div className="flex flex-col gap-2">
        <p>You do not have access to this page...</p>
        <p>Login as <span className="font-semibold">student</span> to access this page</p>
        </div>
        <NavLink
          className="bg-[#0d6efd] w-[200px] p-1 px-2 rounded-md text-white text-center hover:bg-[#0b5ed7]"
          to="/login"
        >
          Login
        </NavLink>
      </div>
    );
};

export default StudentView;
