import React, { useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";
import "./sidebar.css";

export default function Sidebar(props) {
  const navigate = useNavigate();
  let contextData = useContext(ContextHook);

  useEffect(() => {
    contextData.setJwt(Cookies.get("jwt"));
  }, []);

  const logoutHandler = () => {
    // set the Authorization header

    // console.log(typeof jwt);

    contextData.setJwt(Cookies.get("jwt"));

    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    // make the GET request to the logout endpoint
    fetch("http://localhost:8080/logou", {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        console.log("Logout JWT " + contextData.jwt);
        console.log("Logout Cookie JWT" + Cookies.get("jwt"));
        console.log(response.text());
        // localStorage.setItem("login", false);
        // contextData.loginAction(false);
        // contextData.setIsAdmin(false);
        // Cookies.set("USER", false);
        // Cookies.set("ADMIN", false);
        // Cookies.remove("authorities");
        // Cookies.remove("username");
        // Cookies.remove("jwt");
        if (response.ok) {
          localStorage.setItem("login", false);
          contextData.loginAction(false);
          contextData.setIsAdmin(false);
          Cookies.set("USER", false);
          Cookies.set("ADMIN", false);
          Cookies.remove("authorities");
          Cookies.remove("username");
          Cookies.remove("jwt");
          navigate("/login");
        } else {
          // handle failed logout
          // setErrorMsg("logout failed");
          console.log("logout failed");
        }
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };
  return (
    <div className="sidebar">
      {!props.userLogin && (
        <>
          Public
          <a href="/login">
            <button>Login</button>
          </a>
          <a href="/register">
            <button>Register</button>
          </a>
        </>
      )}
      {props.isAdmin && <></>}
      {props.userLogin && (
        <>
          
          {/* <a href="/admin">
            <button>Admin</button>
          </a> */}
          <a href="/viewalluser">
            <button>View All Users</button>
          </a>
          <a href="/managedeplist">
            <button>Department List</button>
          </a>
          <a href="/manageuserdep">
            <button>Assign Departments</button>
          </a>
          <a href="/managedepemp">
            <button>Department Members</button>
          </a>
          <a href="/manageprojlist">
            <button>Project List</button>
          </a>
          <a href="/manageuserproj">
            <button>Assign Projects</button>
          </a>
          <a href="/manageprojemp">
            <button>Project Members</button>
          </a>


          
          {/* Protected User Panel
          <a href="/protected">
            <button>Protected</button>
          </a> */}
          <button onClick={() => logoutHandler()}>Log Out</button>
        </>
      )}
    </div>
  );
}
