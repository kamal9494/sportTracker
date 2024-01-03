import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Issue from "./components/Issue";
import Return from "./components/Return";
import Request from "./components/Request";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import AdminHome from "./components/AdminPages/AdminHome";
import History from "./components/AdminPages/History";
import Requests from "./components/AdminPages/Requests";
import Items from "./components/AdminPages/Items";
import Issues from "./components/AdminPages/Issues";
import NoPage from "./components/NoPage";
import ChangePassword from "./components/ChangePassword";
import StudentView from "./components/Views/StudentView";
import AdminView from "./components/Views/AdminView";
import CommonView from "./components/Views/CommonView";

function App() {
  const [user, setUser] = useState(null);
  const [currUser, setCurrUser] = useState("public");
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      try {
        const { name, email, sid, role, branch, semester, id } =
          jwtDecode(token);
        setUser({
          name,
          email,
          sid,
          role,
          branch,
          semester,
          id,
        });
        setCurrUser(role);
      } catch (error) {
        console.error("error", error);
      }
    }
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} setCurrUser={setCurrUser} />
      <Routes>
        {/* Public Views  */}
        <Route
          path="/login"
          element={<Login setUser={setUser} setCurrUser={setCurrUser} />}
        />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Views */}
        <Route
          path="/admin"
          element={
            <AdminView role={currUser}>
              <AdminHome
                user={user}
                setUser={setUser}
                setCurrUser={setCurrUser}
              />
            </AdminView>
          }
        />
        <Route
          path="/addItems"
          element={
            <AdminView role={currUser}>
              <Items user={user} />
            </AdminView>
          }
        />
        <Route
          path="/requests"
          element={
            <AdminView role={currUser}>
              <Requests />
            </AdminView>
          }
        />
        <Route
          path="/history"
          element={
            <AdminView role={currUser}>
              <History />
            </AdminView>
          }
        />
        <Route
          path="/issues"
          element={
            <AdminView role={currUser}>
              <Issues />
            </AdminView>
          }
        />
        <Route
          path="/changePassword"
          element={
            <AdminView role={currUser}>
              <ChangePassword />
            </AdminView>
          }
        />

        {/* Student Views */}
        <Route
          index
          element={
            <Home user={user} setUser={setUser} setCurrUser={setCurrUser} />
          }
        />
        <Route
          path="/issue"
          element={
            <StudentView role={currUser}>
              <Issue user={user} />
            </StudentView>
          }
        />
        <Route
          path="/return"
          element={
            <StudentView role={currUser}>
              <Return user={user} />
            </StudentView>
          }
        />
        <Route
          path="/request"
          element={
            <StudentView role={currUser}>
              <Request user={user} />
            </StudentView>
          }
        />
        <Route
          path="/changePassword"
          element={
            <CommonView role={currUser}>
              <ChangePassword />
            </CommonView>
          }
        />

        <Route path="*" element={<NoPage user={user} />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
