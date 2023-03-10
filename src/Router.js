import React, { useState, createContext, useEffect } from "react";
// import { render } from "react-dom";
// import AboutPage from "./About";
import {
  BrowserRouter,
  Route,
  Routes,
  redirect,
  Navigate,
  Switch,
} from "react-router-dom";

import LoginForm from "./components/Login/LoginForm";
import Home from "./components/Home/Home";
import Protected from "./components/Protected/Protected";
import Admin from "./components/Admin/Admin";
import RegisterUser from "./components/Registration/RegisterUser";
import Sidebar from "./components/Global/Sidebar";
import Cookies from "js-cookie";
import { ViewAllUsers } from "./components/Admin/ViewAllUsers";
import ManageDepartmentList from "./components/Departments/ManageDepartmentList";
import ManageUserDepartments from "./components/Departments/ManageUserDepartments";
import ManageProjectList from "./components/Projects/ManageProjectList";
import ManageUserProjects from "./components/Projects/ManageUserProjects";
import ManageDepartmentEmp from "./components/Departments/ManageDepartmentEmp";
import ManageProjectEmp from "./components/Projects/ManageProjectEmp";
import UserCP from "./components/UserCP/UserCP";
import UserDetails from "./components/User/UserDetails";

export var ContextHook = createContext();

export default function Router() {
  //localStorage.setItem("abc","XYZ");
  //sessionStorage
  const getUserLogin = localStorage.getItem("login") === "true";
  const [userLogin, setUserLogin] = useState(getUserLogin);
  const [isAdmin, setIsAdmin] = useState(Cookies.get("ADMIN"));
  // const [isRegistering, setIsRegistering] = useState(false);
  const [userID, setUserID] = useState(0);
  const [jwt, setJwt] = useState("");
  // console.log("Admin:"+isAdmin);

  // useEffect(() => {
  //   setIsAdmin(Cookies.get("ADMIN"));
  // }, [Cookies.get("ADMIN")]);
  // console.log(typeof userLogin);
  // if (userLogin === "true") {
  //   setUserLogin(true);
  // } else {
  //   setUserLogin(false);
  // }
  return (
    // <div className="app">
      <ContextHook.Provider
        value={{
          loginAction: setUserLogin,
          adminAction: setIsAdmin,
          // registerAction: setIsRegistering,
          setID: setUserID,
          getUserID: userID,
          jwt: jwt,
          setJwt: setJwt,
          isAdmin: isAdmin,
          setIsAdmin,
          setIsAdmin,
        }}
      >
        <Sidebar userLogin={userLogin} isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterUser />} />
          {/* <Route
        path="/user/:id"
        element={userLogin ? <User /> : <Navigate to="/about" />}
      />
      <Route
        path="/user/:name/:id"
        element={userLogin ? <User /> : <Navigate to="/about" />}
      />
      <Route
        path="/dashboard"
        element={userLogin ? <Dashboard /> : <Navigate to="/login" />}
      /> */}
          {/* <Route
          path="/registeremp"
          element={
            isRegistering ? <RegisterEmp /> : <Navigate to="/register " />
          }
        /> */}
          {/* {isRegistering ? (
          <>
            <Route path="/registeremp" element={<RegisterEmp />} />
          </>
        ) : (
          <>
            <Navigate replace to={"/register"} />
          </>
        )} */}
          {userLogin && (
            <>
              {/* <Route
              path="/dashboard"
              element={<Dashboard />}
              loginAction={setUserLogin}
            /> */}
              {/* <Route path="/user/:id" element={<User />} />
            <Route path="/user/:name/:id" element={<User />} /> */}
              <Route path="/protected" element={<Protected />} />
              <Route path="/userdetails" element={<UserDetails />} />
              <Route path="/usercp" element={<UserCP/>}/>
            </>
          )}

          {Cookies.get("ADMIN")==="true" && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/viewalluser" element={<ViewAllUsers />} />
              <Route path="/managedeplist" element={<ManageDepartmentList/>}/>
              <Route path="/manageuserdep" element={<ManageUserDepartments/>}/>
              <Route path="/managedepemp" element={<ManageDepartmentEmp/>}/>
              <Route path="/manageprojlist" element={<ManageProjectList/>}/>
              <Route path="/manageuserproj" element={<ManageUserProjects/>}/>
              <Route path="/manageprojemp" element={<ManageProjectEmp/>}/>
              

              
              
            </>
          )}

          <Route
            path="*"
            element={<LoginForm />}
            errorM={"Please login to continue"}
          />

          {/* <Route path="*" element={<div>ERROR PAGE</div>} /> */}
          {/* <ProtectedRoute /> */}
        </Routes>
      </ContextHook.Provider>
    // </div>
  );

  // function ProtectedRoute() {
  //   //const [userLogin, ]
  //   let userLogin = localStorage.getItem("login");

  //   if (userLogin === "true") {
  //     userLogin = true;
  //   } else {
  //     userLogin = false;
  //   }

  //   return (
  //     <>
  //       <Route
  //         path="/user/:id"
  //         element={userLogin ? <User /> : <Navigate to="/about" />}
  //       />
  //       <Route
  //         path="/user/:name/:id"
  //         element={userLogin ? <User /> : <Navigate to="/about" />}
  //       />
  //       <Route
  //         path="/dashboard"
  //         element={userLogin ? <Dashboard /> : <Navigate to="/login" />}
  //       />
  //     </>
  //   );
  // }
}
