import React, { useState, useContext, useEffect } from "react";
import { ContextHook } from "../../Router";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormComponents/FormInput";
import { initUserList } from "../Global/initialState";
import Cookies from "js-cookie";

export default function UserDetails() {
   let [userList, setUserList] = useState(initUserList);
   const [updateState, setUpdateState] = useState(-1);
   const [empID, setEmpID] = useState(-1);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [age, setAge] = useState(0);
   const [gender, setGender] = useState("");
   const [email, setEmail] = useState("");
   const [confPassword, setConfPassword] = useState("");
   // const [tokenArr, setTokenArr] = useState(DUMMY);
   const [errorMsg, setErrorMsg] = useState(
      "Please edit your details to update."
   );
   const [error, setError] = useState("defaultMsg");
   const [values, setValues] = useState({
      username: "",
      firstName: "",
      lastName: "",
      // age: 0,
      // gender: "",
      email: "",
   });

   let contextData = useContext(ContextHook);
   const navigate = useNavigate();
   useEffect(() => {
      document.title = "User Details";
      getUserDataFromDB();
      console.log(userList);
      // setUsername(userList[0].userEntity.username);

      // setEmail(userList[0].email);
      // setGender(userList[0].gender);
      // setAge(userList[0].age);
      // setFirstName(userList[0].first_name);
      // setLastName(userList[0].last_name);
      // // console.log("UL UN:"+userList[0].username);
      // console.log("Userlist un " + userList[0].userEntity.username);
      // // setValues({ ...values, username: userList[0].username});
      // setValues({
      //    username: userList[0].userEntity.username,
      //    firstName: userList[0].first_name,
      //    lastName: userList[0].last_name,
      //    email: userList[0].email,
      // });
      // console.log("V email " + values.email);
      // console.log("V firstname " + values.firstName);
      // console.log(gender);
   }, []);

   useEffect(() => {
      if (userList.length > 0) {
         setUsername(userList[0].userEntity.username);
         setEmail(userList[0].email);
         setGender(userList[0].gender);
         setAge(userList[0].age);
         setFirstName(userList[0].first_name);
         setLastName(userList[0].last_name);
         setEmpID(userList[0].id);
         setValues({
            username: userList[0].userEntity.username,
            firstName: userList[0].first_name,
            lastName: userList[0].last_name,
            email: userList[0].email,
         });
      }
   }, [userList]);
   //  function setV(){
   //   console.log("Userlist setV un " + userList[0].userEntity.username);

   //  }
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
         //  defaultValue: username,
         disabled: true,
      },
      {
         id: 2,
         name: "firstName",
         type: "text",
         placeholder: "First Name",
         errorMessage: "It should be a valid name!",
         label: "First Name",
         pattern: "^[A-Za-z]+$",
         required: true,
      },
      {
         id: 3,
         name: "lastName",
         type: "text",
         placeholder: "Last Name",
         errorMessage: "It should be a valid name!",
         label: "Last Name",
         pattern: "^[A-Za-z]+$",
         required: true,
      },
      {
         id: 4,
         name: "email",
         type: "email",
         placeholder: "Email",
         errorMessage: "It should be a valid email address!",
         label: "Email",
         required: true,
      },
   ];

   const ageOptions = [];
   for (let i = 15; i <= 99; i++) {
      ageOptions.push(i);
   }

   const getUserDataFromDB = () => {
      // fetch(process.env.REACT_APP_SERVER_USER_URL)
      //fetch(process.env.REACT_APP_SERVER_EMP_URL + "/update" + `/${empID}`, {
      const username = Cookies.get("username");
      console.log("UN " + username);
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
      };
      // let url = "http://localhost:8080/ems/u/";
      fetch("http://localhost:8080/ems/u/un/" + `${username}`, {
         method: "GET",
         headers: headers,
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setUserList(data);
         });
   };

   const editHandler = (event) => {
      // updateState
      event.preventDefault();
      // let item = bookList[indx];
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
         "Content-Type": "application/json",
      };
      console.log(firstName);
      console.log(lastName);
      console.log(age);
      console.log(gender);
      console.log(email);
      //http://localhost:8080/ems/u/un/
      console.log("editHandler empID " + empID);
      fetch("http://localhost:8080/ems/u/" + `${empID}`, {
         method: "PUT",
         headers: headers,
         body: JSON.stringify({
            first_name: values.firstName,
            last_name: values.lastName,
            age: age,
            gender: gender,
            // salary: salary,
            email: values.email,
         }),
         // headers: { "Content-Type": "application/json" },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.errorMessage != null) {
               setErrorMsg("Error: " + data.errorMessage);
               setError("errorRed");
            } else {
               setErrorMsg("User Details update successful!");
               setError("successGreen");
            }
            // getAllDataFromDB();
            // console.log(data);
            // const newArr = [...bookList];
            // newArr[indx] = bookInputs;
            // setBookList(newArr);
            // setIndx(-1);
            // clearInput();
         });
   };

  //  const registerHandler = (event) => {
  //     event.preventDefault();
  //     fetch(process.env.REACT_APP_SERVER_AUTH_URL + "/register", {
  //        method: "POST",
  //        body: JSON.stringify({
  //           // username: username,
  //           // password: password,
  //           // first_name: firstName,
  //           // last_name: lastName,
  //           // age: age,
  //           // gender: gender,
  //           // email: email,
  //           username: values.username,
  //           password: values.password,
  //           first_name: values.firstName,
  //           last_name: values.lastName,
  //           age: age,
  //           gender: gender,
  //           email: values.email,
  //        }),
  //        headers: { "Content-Type": "application/json" },
  //     })
  //        .then((res) => {
  //           // if (!res.ok) {
  //           return res.json();
  //           // }else
  //        })
  //        .then((data) => {
  //           console.log(data);
  //           if (data.status === "success") {
  //              contextData.setID(data.id);

  //              // setTimeout(() => {
  //              //   navigate("/login" , {replace: true});
  //              // }, 2000);
  //              navigate("/login", { replace: true });
  //           } else {
  //              setErrorMsg(data.msg);
  //           }
  //           // setBookList([...bookList, data]);
  //           // clearInput();
  //        });
  //  };
   const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      // setV();
      console.log(values);
   };

   return (
      <div className="app">
         <form className="reguserform" onSubmit={editHandler}>
            <h1>Update User Details</h1>
            {inputs.map((input) => (
               <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  style={
                     input.name === "username"
                        ? { color: "grey", backgroundColor: "#d3d3d38e" }
                        : {}
                  }
                  onChange={onChange}
               />
            ))}
            {/* <input
               type="text"
               defaultValue={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="Username"
               disabled
            ></input>
            <input
               type="text"
               defaultValue={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               placeholder="First Name"
            ></input>
            <input
               type="text"
               defaultValue={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               placeholder="First Name"
            ></input>
            <input
               type="text"
               defaultValue={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               placeholder="First Name"
            ></input> */}
            <select
               className="formSelect"
               value={age}
               onChange={(e) => setAge(e.target.value)}
               required
            >
               <option value="" disabled>
                  Age
               </option>
               {ageOptions.map((age) => (
                  <option key={age} value={age}>
                     {age}
                  </option>
               ))}
            </select>
            <select
               className="formSelect"
               value={gender}
               onChange={(e) => setGender(e.target.value)}
               required
            >
               <option value="" disabled>
                  Gender
               </option>
               <option key={"male"}>Male</option>
               <option key={"female"}>Female</option>
               <option key={"other"}>Other</option>
            </select>
            {/* <select
               defaultValue={gender}
               onChange={(e) => setGender(e.target.value)}
               required
            >
               <option value="" disabled>
                  Gender
               </option>
               <option key={"male"} value="Male">Male</option>
               <option key={"female"} value="Female">Female</option>
               <option key={"other"} value="Other">Other</option>
            </select> */}

            <button className="submit2">Submit</button>
            <div className="">
               <p className={[error]}>{errorMsg}</p>
            </div>
         </form>
      </div>
   );
}
