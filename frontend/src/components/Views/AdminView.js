import React from "react";

const AdminView = ({ children, role }) => {
  if (role === "admin") return <>{children}</>;
  else
    return (
      <div className="h-[80vh] grid place-items-center text-md font-semibold text-center">
        You do not have access to this page...
      </div>
    );
};

export default AdminView;
