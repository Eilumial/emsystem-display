import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";

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
];

var initDepList = [
  {
    createdBy: "",
    createdOn: "",
    lastModifiedBy: "",
    lastModifiedOn: "",
    id: 0,
    role: "",
  },
];

const rolesAndIds = [];
// const roles = [];

function ManageUserDepartments() {
  const [userList, setUserList] = useState(initUserList);
  const [depList, setDepList] = useState(initDepList);
  const [updateState, setUpdateState] = useState(-1);
  const [searchInput, setSearchInput] = useState("");
  const [empID, setEmpID] = useState(-1);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    fetch(`http://localhost:8080/ems/dep/list`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setDepList(data);
        console.log(depList);
      });
  }, []);

  const getAllDataFromDB = () => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    fetch(`http://localhost:8080/ems/dep/list`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setDepList(data);
        console.log(depList);
      });
  };

  function searchHandler() {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    };

    fetch(process.env.REACT_APP_SERVER_EMP_URL + "/e" + `/${searchInput}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        setRoles(userList[0].departments.map((department) => department.role));
        //   userList[0].departments.map((department) =>
        //     roles.push(department.role)
        //   );
        //   console.log("Roles" + roles);
        //   console.log("Search data:" + userList[0].id);
        //   console.log(
        //     process.env.REACT_APP_SERVER_EMP_URL + "/e" + `/${searchInput}`
        //   );
      });
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchHandler();
        }}
      >
        <input
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by Employee Email"
        ></input>
        <button type="submit">Search</button>
      </form>
      <p>
        Email: {userList[0].email}
        <br />
        Username: {userList[0].userEntity.username}
      </p>
      <select>
        {depList
          //     .filter((item) => {roles.coitem.role;
          //     })
          .filter((item) => !roles.includes(item.role))
          .map((item) => (
            <option key={item.id}>{item.role}</option>
          ))}
        {/* {depList
                  .filter((item)=>)
        .map((item) => (
          <option key={item.id}>{item.role}</option>
        ))} */}
      </select>
      <table>
        <thead>
          <tr>
            <th>Departments</th>
          </tr>
        </thead>
        <tbody>
          {userList[0].departments.map((dep) => (
            <tr key={dep.departmentId.id}>
              <td>{dep.role}</td>
            </tr>
          ))}
          {/* {userList.map((item) => (
            <>
              <tr key={item.id}>
                <td>{item.userEntity.username}</td>
                <td>{item.email}</td>
              </tr>
              {item.departments.map((dep) => (
                <tr key={dep.departmentId.id}>
                  <td>{dep.role}</td>
                </tr>
              ))}
            </>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUserDepartments;
