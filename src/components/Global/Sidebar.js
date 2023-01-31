import React, { useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";
import "./sidebar.css";

export default function Sidebar(props) {
   const navigate = useNavigate();
   let contextData = useContext(ContextHook);
   const [isAdmin, setIsAdmin] = useState(Cookies.get("ADMIN")==="true");

   useEffect(() => {
      contextData.setJwt(Cookies.get("jwt"));
      console.log("Cookies admin"+Cookies.get("ADMIN")==="true");
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
         {!props.userLogin ? (
            <>
               <a href="/login">
                  <button>Login</button>
               </a>
               <a href="/register">
                  <button>Register</button>
               </a>
            </>
         ) : 
        //  props.isAdmin
        Cookies.get("ADMIN")==="true"
        // isAdmin
          ? (
            <>
               <a href="/viewalluser">
                  <button>User List</button>
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
               <a href="/usercp">
                  <button>Change Password</button>
               </a>

               <button onClick={() => logoutHandler()}>Log Out</button>
            </>
         ) : (
            <>
               <a href="/userdetails">
                  <button>My Details</button>
               </a>
               <a href="/usercp">
                  <button>User CP</button>
               </a>

               <button onClick={() => logoutHandler()}>Log Out</button>
            </>
         )}

         {/* {!props.userLogin && (
            <>
               <a href="/login">
                  <button>Login</button>
               </a>
               <a href="/register">
                  <button>Register</button>
               </a>
            </>
         )}

         {props.userLogin && !props.isAdmin && (
            <>
               <a href="/protected">
                  <button>Protected</button>
               </a>
            </>
         )}
         {props.isAdmin && props.userLogin && (
            <>
/               <a href="/viewalluser">
                  <button>User List</button>
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
               <a href="/usercp">
                  <button>User CP</button>
               </a>
               <button onClick={() => logoutHandler()}>Log Out</button>
            </>
         )} */}
      </div>
   );
}
