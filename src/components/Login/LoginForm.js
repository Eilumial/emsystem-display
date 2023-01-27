import React, { useState, useContext } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import FormInput from "../FormComponents/FormInput";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";
import "./loginForm.css";

const DUMMY = {
  sub: "",
  authorities: [{}],
};

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tokenArr, setTokenArr] = useState(DUMMY);
  const [errorMsg, setErrorMsg] = useState(
    "Please login to system to continue"
  );
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      // pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // const [jwt, setJwt] = useState("");
  const navigate = useNavigate();
  let contextData = useContext(ContextHook);
  let output;
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
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
        return response.json();
      })
      .then((data) => {
        output = data;
        // console.log("Data");
        console.log(data);
        if (data.status === "success") {
          if (data.accessToken) {
            contextData.setJwt(data.accessToken);

            Cookies.set("jwt", data.accessToken);
            console.log("Cookies jwt " + Cookies.get("jwt"));
            const decoded = jwtDecode(data.accessToken);
            setTokenArr(decoded);
            console.log("Token:" + tokenArr);
            setErrorMsg("");

            Cookies.set("username", decoded.sub);
            Cookies.set("authorities", decoded.authorities);
            console.log("Auth " + Cookies.get("authorities"));
            for (let x in decoded.authorities) {
              Cookies.set(decoded.authorities[x].authority, true);
              if (decoded.authorities[x].authority === "ADMIN") {
                contextData.adminAction(true);
              }
              // else {
              //   Cookies.set("ADMIN", false);
              //   contextData.adminAction(false);
              // }

              // if (decoded.authorities[x].authority === "USER") {
              //   Cookies.set("USER", true);
              // } else {
              //   Cookies.set("USER", false);
              // }
            }
            console.log("Cookies admin " + Cookies.get("ADMIN"));
            console.log("Login succ, redirecting to protected");
            localStorage.setItem("login", true);
            contextData.loginAction(true);

            navigate("/viewalluser");
          }
        } else {
          setErrorMsg(data.accessToken);
          contextData.setJwt("");
          reset();
        }
      })
      .catch((err) => {
        console.log("Error:" + err.message);
      });
  };
  function reset() {
    Cookies.set("USER", false);
    Cookies.set("ADMIN", false);
    Cookies.remove("authorities");
    Cookies.remove("username");
    setTokenArr(DUMMY);
  }
  // const logoutHandler = () => {
  //   // set the Authorization header

  //   // console.log(typeof jwt);

  //   contextData.setJwt(Cookies.get("jwt"));

  //   console.log("Logout cookie " + Cookies.get("jwt"));
  //   console.log("Logout jwt " + contextData.jwt);
  //   const headers = {
  //     Authorization: `Bearer ${contextData.jwt}`,
  //   };

  //   // make the GET request to the logout endpoint
  //   fetch("http://localhost:8080/logou", {
  //     method: "GET",
  //     headers: headers,
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // handle successful logout
  //         console.log("logout successful");
  //         setErrorMsg("logout successful");
  //         reset();
  //         console.log("Redirecting to home");
  //         localStorage.setItem("login", false);
  //         contextData.loginAction(false);
  //       } else {
  //         // handle failed logout
  //         setErrorMsg("logout failed");
  //         console.log("logout failed");
  //       }
  //     })
  //     .catch((error) => {
  //       // handle errors
  //       console.log(error);
  //     });
  // };

  // const testHandler = () => {
  //   // set the Authorization header
  //   const headers = {
  //     Authorization: `Bearer ${contextData.jwt}`,
  //   };

  //   // make the GET request to the logout endpoint
  //   fetch("http://localhost:8080/test", {
  //     method: "GET",
  //     headers: headers,
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("API Access Successful");
  //         return response.text();
  //       } else {
  //         // handle failed logout

  //         console.log("API Access Failed");
  //       }
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data !== undefined) {
  //         setErrorMsg(data);
  //       } else {
  //         setErrorMsg("API Access Failed");
  //       }
  //     })
  //     .catch((error) => {
  //       // handle errors
  //       console.log(error);
  //     });
  // };

  return (
    <div className="app">
      <form className="login" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {/* <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label> */}
        <button className="login" type="submit">Login</button>
        {/* <button type="button" onClick={logoutHandler}>
          Logout Current User
        </button>
        <button type="button" onClick={testHandler}>
          TEST3
        </button> */}
        {"   "+errorMsg}
      </form>
      
      {/* <table border="3px">
        <tbody>
          <tr>
            <td>Username:</td>
            <td>{tokenArr.sub}</td>
          </tr>
          <tr>
            <td>Roles:</td>
            {tokenArr.authorities.map((item) => (
              <td>"{item.authority}"</td>
            ))}
          </tr>
        </tbody>
      </table>
      <p>JWT:{Cookies.get("jwt")}</p>
      <p>User:{Cookies.get("username")}</p>
      {/* <p>Auth:{Cookies.get("authorities")}</p> */}
      {/* <p>ADMIN:{Cookies.get("ADMIN")}</p>
      <p>USER:{Cookies.get("USER")}</p>  */}
    </div>
  );
}

export default LoginForm;
