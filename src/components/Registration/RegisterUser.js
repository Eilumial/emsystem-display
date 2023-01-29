import React, { useState, useContext, useEffect } from "react";
import { ContextHook } from "../../Router";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormComponents/FormInput";
import "./registerUser.css"

export default function RegisterUser() {
  useEffect(() => {
    document.title = "Register User Page";
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [confPassword, setConfPassword] = useState("");
  // const [tokenArr, setTokenArr] = useState(DUMMY);
  const [errorMsg, setErrorMsg] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    // age: 0,
    // gender: "",
    email: "",
  });

  let contextData = useContext(ContextHook);
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
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
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 4,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage: "It should be a valid name!",
      label: "First Name",
      pattern: "^[A-Za-z]+$",
      required: true,
    },
    {
      id: 5,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "It should be a valid name!",
      label: "Last Name",
      pattern: "^[A-Za-z]+$",
      required: true,
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    // {
    //   id: 4,
    //   name: "email",
    //   type: "email",
    //   placeholder: "Email",
    //   errorMessage: "It should be a valid email address!",
    //   label: "Email",
    //   required: true,
    // },
  ];

  const ageOptions = [];
  for (let i = 15; i <= 99; i++) {
    ageOptions.push(i);
  }

  const registerHandler = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_SERVER_AUTH_URL + "/register", {
      method: "POST",
      body: JSON.stringify({
        // username: username,
        // password: password,
        // first_name: firstName,
        // last_name: lastName,
        // age: age,
        // gender: gender,
        // email: email,
        username: values.username,
        password: values.password,
        first_name: values.firstName,
        last_name: values.lastName,
        age: age,
        gender: gender,
        email: values.email,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        // if (!res.ok) {
        return res.json();
        // }else
      })
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          contextData.setID(data.id);

          // setTimeout(() => {
          //   navigate("/login" , {replace: true});
          // }, 2000);
          navigate("/login", { replace: true });
        } else {
          setErrorMsg(data.msg);
        }
        // setBookList([...bookList, data]);
        // clearInput();
      });
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form className="reguserform" onSubmit={registerHandler}>
        <h1>Register User</h1>
        {inputs.map((input) => (
          <FormInput
          
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <select defaultValue="" onChange={(e) => setAge(e.target.value)} required>
          <option value="" disabled>
            Age
          </option>
          {ageOptions.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>

        <select defaultValue="" onChange={(e) => setGender(e.target.value)} required>
          <option value="" disabled>
            Gender
          </option>
          <option key={"male"}>Male</option>
          <option key={"female"}>Female</option>
          <option key={"other"}>Other</option>
        </select>
        <br />

        <button className="submit">Submit</button>
        {errorMsg}
      </form>
    </div>

    // <div>
    //   <h1>Register New User</h1>
    //   <div>
    //     <form onSubmit={() => registerHandler()}>
    //       {/* <form> */}
    //       <div>
    //         <input
    //           type="text"
    //           name="username"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           placeholder="Username"
    //           required
    //         />
    //         <input
    //           type="password"
    //           name="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           placeholder="Password"
    //           required
    //         />
    //         <input
    //           type="password"
    //           name="password2"
    //           value={confPassword}
    //           onChange={(e) => setConfPassword(e.target.value)}
    //           placeholder="Confirm Password"
    //           required
    //         />
    //         <br />
    //       </div>
    //       <div>
    //         <input
    //           type="text"
    //           name="firstname"
    //           value={firstName}
    //           placeholder="First Name"
    //           onChange={(e) => setFirstName(e.target.value)}
    //           required
    //         />
    //         <input
    //           type="text"
    //           name="lastname"
    //           value={lastName}
    //           placeholder="Last Name"
    //           onChange={(e) => setLastName(e.target.value)}
    //           required
    //         />
    //         <br />
    //         <input
    //           type="text"
    //           name="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="Email"
    //           required
    //         />
    //         <select onChange={(e) => setAge(e.target.value)} required>
    //           <option value="" disabled selected>
    //             Age
    //           </option>
    //           {ageOptions.map((age) => (
    //             <option key={age} value={age}>
    //               {age}
    //             </option>
    //           ))}
    //         </select>

    //         <select onChange={(e) => setGender(e.target.value)} required>
    //           <option value="" disabled selected>
    //             Gender
    //           </option>
    //           <option>Male</option>
    //           <option>Female</option>
    //           <option>Other</option>
    //         </select>
    //         <br />
    //       </div>
    //       {/* <button type="button" onClick={registerHandler}> */}
    //       {/* <button type="button" onClick={() => registerHandler()}> */}
    //       <button type="submit">Register User</button>
    //     </form>
    //     {errorMsg}
    //   </div>
    // </div>
  );
}
