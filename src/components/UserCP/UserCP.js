import React, { useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import FormInput from "../FormComponents/FormInput";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";
// import "./loginForm.css";

const DUMMY = {
   sub: "",
   authorities: [{}],
};

function UserCP(props) {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const [tokenArr, setTokenArr] = useState(DUMMY);
   const [errorMsg, setErrorMsg] = useState(
      "Please enter your existing password and new password!"
   );
   const navigate = useNavigate();
   let contextData = useContext(ContextHook);
   const [values, setValues] = useState({
      username: "",
      password: "",
      oldpassword: "",
      confirmPassword: ""
   });

   const inputs = [
      {
         id: 1,
         name: "oldpassword",
         type: "password",
         placeholder: "Password",
         errorMessage:
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
         label: "Existing Password",
         required: true,
      },
      {
         id: 2,
         name: "password",
         type: "password",
         placeholder: "Password",
         errorMessage:
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
         label: "New Password",
         pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
         required: true,
      },
      {
         id: 3,
         name: "confirmPassword",
         type: "password",
         placeholder: "Confirm New Password",
         errorMessage: "Passwords don't match!",
         label: "Confirm New Password",
         pattern: values.password,
         required: true,
      },
   ];

   const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   //  let output;
   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(values);
      if (values.oldpassword !== values.password) {
         const headers = {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
         };
         var url = "http://localhost:8080/ems/u/pw";
         if (Cookies.get("ADMIN") === "true") {
            url = "http://localhost:8080/ems/user/pw";
         }
         console.log("URL: " + url);
         fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
               username: Cookies.get("username"),
               password: values.password,
               oldpassword: values.oldpassword,
            }),
         })
            .then((response) => {
               // if (response.ok) {
               //   response.json();
               // }else{
               //   Cookies.set("USER", false);
               //   Cookies.set("ADMIN", false);
               //   Cookies.remove("authorities");
               //   Cookies.remove("username");
               // }
               return response.text();
            })
            .then((data) => {
               setErrorMsg(data);
               // output = data;
               // console.log("Data");
               // console.log(data);
               // if (data.status === "success") {
               //    if (data.accessToken) {
               //       contextData.setJwt(data.accessToken);

               //       Cookies.set("jwt", data.accessToken);
               //       console.log("Cookies jwt " + Cookies.get("jwt"));
               //       const decoded = jwtDecode(data.accessToken);
               //       setTokenArr(decoded);
               //       console.log("Token:" + tokenArr);
               //       setErrorMsg("");

               //       Cookies.set("username", decoded.sub);
               //       Cookies.set("authorities", decoded.authorities);
               //       console.log("Auth " + Cookies.get("authorities"));
               //       for (let x in decoded.authorities) {
               //          Cookies.set(decoded.authorities[x].authority, true);
               //          if (decoded.authorities[x].authority === "ADMIN") {
               //             contextData.adminAction(true);
               //          }
               //       }
               //       console.log("Cookies admin " + Cookies.get("ADMIN"));
               //       console.log("Login succ, redirecting to protected");
               //       localStorage.setItem("login", true);
               //       contextData.loginAction(true);

               //       navigate("/viewalluser");
               //    }
               // } else {
               //    setErrorMsg(data.accessToken);
               //    contextData.setJwt("");
               //    reset();
               // }
            });
      } else {
         setErrorMsg("Old and New passwords are the same!");
      }

      //  .catch((err) => {
      //     console.log("Error:" + err.message);
      //  });
   };

   //  function reset() {
   //     Cookies.set("USER", false);
   //     Cookies.set("ADMIN", false);
   //     Cookies.remove("authorities");
   //     Cookies.remove("username");
   //     setTokenArr(DUMMY);
   //  }

   return (
      <div className="app">
         <form className="changepw" onSubmit={handleSubmit}>
            {inputs.map((input) => (
               <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
               />
            ))}

            <button className="login" type="submit">
               Change Password
            </button>

            {"   " + errorMsg}
         </form>
      </div>
   );
}

export default UserCP;
