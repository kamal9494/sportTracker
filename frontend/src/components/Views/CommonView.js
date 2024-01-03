import React from "react";

const CommonView = ({ children, role }) => {
  if (role === "student" || role === "admin") return <>{children}</>;
  else return <div className="h-[80vh] grid place-items-center text-md font-semibold text-center">You do not have access to this page...</div>;
};

export default CommonView;
