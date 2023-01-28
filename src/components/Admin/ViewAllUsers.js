import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";
import "./viewAllUsers.css";

var initUserList = [
  {
    createdBy: "",
    createdOn: "",
    lastModifiedBy: "",
    lastModifiedOn: "",
    id: 0,
    first_name: "",
    last_name: "",
    age: 0,
    gender: "",
    salary: 0,
    email: "",
    userEntity: {
      createdBy: "",
      createdOn: "",
      lastModifiedBy: "",
      lastModifiedOn: "",
      id: 0,
      username: "",
      password: "",
      salt: "",
      roles: [
        {
          id: 0,
          name: "",
        },
      ],
      errorMessage: null,
    },
    departments: [
      {
        createdBy: "",
        createdOn: "",
        lastModifiedBy: "",
        lastModifiedOn: "",
        departmentId: {
          id: 0,
          employee_id: 0,
        },
        role: "",
      },
    ],
    projects: [
      {
        createdBy: "",
        createdOn: "",
        lastModifiedBy: "",
        lastModifiedOn: "",
        projectId: {
          id: 0,
          employee_id: 0,
        },
        project_name: "",
      },
    ],
    errorMessage: null,
  },
  // {
  //   username: "",
  //   first_name: "",
  //   last_name: "",
  //   age: 0,
  //   salary: 0,
  //   gender: "",
  //   email: "",
  // },
];

export const ViewAllUsers = () => {
  let [userList, setUserList] = useState(initUserList);
  const [updateState, setUpdateState] = useState(-1);
  const [empID, setEmpID] = useState(-1);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState(0.0);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  let contextData = useContext(ContextHook);
  contextData.setJwt(Cookies.get("jwt"));

  useEffect(() => {
    // fetch(process.env.REACT_APP_SERVER_USER_URL)
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    fetch(`http://localhost:8080/ems/emp`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
      });
  }, []);

  const getAllDataFromDB = () => {
    // fetch(process.env.REACT_APP_SERVER_USER_URL)
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    fetch(process.env.REACT_APP_SERVER_EMP_URL, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
      });
  };

  const ageOptions = [];
  for (let i = 15; i <= 99; i++) {
    ageOptions.push(i);
  }

  function handleSubmit(item) {
    setUpdateState(item.userEntity.id);
    setEmpID(item.id);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setAge(item.age);
    setGender(item.gender);
    setSalary(item.salary);
    setEmail(item.email);
  }

  function EditList({ item }) {
    return (
      <></>
      // <tr>
      //   <td>
      //     <input
      //       type="text"
      //       name="username"
      //       defaultValue={item.userEntity.username}
      //       disabled
      //     ></input>
      //   </td>
      //   <td>
      //     <input
      //       type="text"
      //       name="firstName"
      //       pattern="^[A-Za-z]+$"
      //       defaultValue={item.first_name}
      //       onChange={(e) => setFirstName(e.target.value)}
      //       required
      //     ></input>
      //   </td>
      //   <td>
      //     <input
      //       type="text"
      //       name="lastName"
      //       pattern="^[A-Za-z]+$"
      //       defaultValue={item.last_name}
      //       // onChange={(e) => setLastName(e.target.value)}
      //       required
      //     ></input>
      //   </td>
      //   <td>
      //     <select
      //       defaultValue={item.age}
      //       // onChange={(e) => setAge(e.target.value)}
      //       required
      //     >
      //       <option value="" disabled>
      //         Age
      //       </option>
      //       {ageOptions.map((age) => (
      //         <option key={age} value={age}>
      //           {age}
      //         </option>
      //       ))}
      //     </select>
      //   </td>
      //   <td>
      //     <select
      //       defaultValue={item.gender}
      //       // onChange={(e) => setGender(e.target.value)}
      //       required
      //     >
      //       <option value="" disabled>
      //         Gender
      //       </option>
      //       <option key={"male"}>Male</option>
      //       <option key={"female"}>Female</option>
      //       <option key={"other"}>Other</option>
      //     </select>
      //   </td>
      //   <td>
      //     <input
      //       type="email"
      //       name="email"
      //       label="Email"
      //       defaultValue={item.email}
      //       // onChange={(e) => setEmail(e.target.value)}
      //       required
      //     ></input>
      //   </td>
      //   <td>
      //     <button>Update</button>
      //   </td>
      //   <td></td>
      // </tr>
    );
  }

  const editHandler = () => {
    // updateState

    // let item = bookList[indx];
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    };

    fetch(process.env.REACT_APP_SERVER_EMP_URL + "/update" + `/${empID}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        age: age,
        gender: gender,
        salary: salary,
        email: email,
      }),
      // headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.errorMessage != null) {
          setErrorMsg("Error: " + data.errorMessage);
        } else {
          setErrorMsg("");
          setUpdateState(-1);
          setEmpID(-1);
        }
        getAllDataFromDB();
        // console.log(data);
        // const newArr = [...bookList];
        // newArr[indx] = bookInputs;
        // setBookList(newArr);
        // setIndx(-1);
        // clearInput();
      });
  };

  const delHandler = (item) => {
    // var item = [index];
    //let itemid = item.id;
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };
    if (
      window.confirm(
        `Are you sure you want to delete ${item.userEntity.username}?`
      )
    ) {
      fetch(process.env.REACT_APP_SERVER_USER_URL + `/${item.userEntity.id}`, {
        method: "DELETE",
        headers: headers,
      })
        .then((res) => res.text())
        .then((data) => {
          getAllDataFromDB();
        });
    }
  };

  return (
    <div className="app">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editHandler();
        }}
      >
        {/* <form> */}
        {errorMsg}
        <table border="0" cellPadding="10">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userList
              //Sort by title String (title) accending order
              //.sort((a,b)=> a.title.localeCompare(b.title))
              //Sort by number (cost) accending order
              //.sort((a,b)=> a.cost - b.cost)
              //Sort by number (cost) decending order
              // .sort((a, b) => b.cost - a.cost)
              //Sort by Date (date) accending order
              //.sort((a,b)=> new Date(a.date) - new Date(b.date))
              //Sort by Date (date) descending order
              //.sort((a,b)=> new Date(b.date) - new Date(a.date))

              // Filter based on searchInput (search field)
              .filter(
                (item) =>
                  item.userEntity.username.toLowerCase() !==
                  Cookies.get("username").toLowerCase()
              )
              .map((item) =>
                updateState === item.userEntity.id ? (
                  <tr>
                    <td>
                      <input
                        type="text"
                        name="username"
                        defaultValue={item.userEntity.username}
                        disabled
                      ></input>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="firstName"
                        pattern="^[A-Za-z]+$"
                        defaultValue={item.first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      ></input>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="lastName"
                        pattern="^[A-Za-z]+$"
                        defaultValue={item.last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      ></input>
                    </td>
                    <td>
                      <select
                        defaultValue={item.age}
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
                    </td>
                    <td>
                      <select
                        defaultValue={item.gender}
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
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        label="Email"
                        defaultValue={item.email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      ></input>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="salary"
                        label="Salary"
                        defaultValue={item.salary.toFixed(2)}
                        onChange={(e) =>
                          setSalary(Number(e.target.value).toFixed(2))
                        }
                        min="0"
                        step=".01"
                        required
                      ></input>
                    </td>
                    <td>
                      <button type="submit">Update</button>
                      {/* <button type="button" onClick={() => editHandler()}>
                        Update
                      </button> */}
                    </td>
                    <td></td>
                  </tr>
                ) : (
                  <tr key={item.id}>
                    <td>{item.userEntity.username}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.salary}</td>

                    <td>
                      <button
                        type="button"
                        // onClick={() => editHandler(item, index)}
                        onClick={() => handleSubmit(item)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button type="button" onClick={() => delHandler(item)}>
                        {/* <button type="submit"> */}
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </form>
    </div>
  );
};
