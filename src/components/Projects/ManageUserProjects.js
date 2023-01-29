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

var initProjList = [
  {
    createdBy: "",
    createdOn: "",
    lastModifiedBy: "",
    lastModifiedOn: "",
    id: 0,
    projectName: "",
  },
];

// const rolesAndIds = [];
// const roles = [];

function ManageUserProjects() {
  const [userList, setUserList] = useState(initUserList);
  const [projList, setProjList] = useState(initProjList);
  const [updateState, setUpdateState] = useState(-1);
  const [searchInput, setSearchInput] = useState("");
  // const [empID, setEmpID] = useState(-1);
  const [name, setName] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedRole, setSelectedRole] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searched, setSearched] = useState(false);
  const [roleInput, setRoleInput] = useState("");
  const [userEmail, setUserEmail] = useState("");
  

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    fetch(process.env.REACT_APP_SERVER_PROJ_URL+`/list`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setProjList(data);
        console.log(projList);
      });
  }, []);

  const getAllDataFromDB = () => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    fetch(process.env.REACT_APP_SERVER_PROJ_URL+`/list`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setProjList(data);
        console.log(projList);
      });
  };

  function refreshUserList() {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    };
    //     console.log("User Email: " + userEmail);
    fetch(process.env.REACT_APP_SERVER_EMP_URL + "/e" + `/${userEmail}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        //   console.log("Before roles"+roles);
        setName(userList[0].projects.map((project) => project.project_name));
        setSearched(true);
      });
  }

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

        setName(userList[0].projects.map((project) => project.project_name));
        setSearched(true);
        setUserEmail(searchInput);

      });
  }

  function addHandler() {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    };
    const selectedOption = projList.find((item) => {
      return item.projectName === selectedRole;
    });
    
    setSelectedId(selectedOption.id);
    

    fetch(process.env.REACT_APP_SERVER_PROJ_URL, {
      method: "POST",
      headers: headers,
      // mode: 'no-cors',
      body: JSON.stringify({
        projectId: {
          id: selectedOption.id,
          employee_id: userList[0].id,
        },
        project_name: selectedOption.projectName,
      }),
      // headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //   if (data.status === "success") {
        if (data.project_name !== null) {
          setErrorMsg("Success!");
          refreshUserList();

          //     setTimeout(refreshUserList(), 5000);
          //     setTimeout(refreshUserList(), 3000);
          //     setTimeout(refreshUserList(), 3000);
          //     setAddInput("");
          //     setSearchInput("");
        } else {
          setErrorMsg("Error: User already assigned to this project!");
        }
        //   getAllDataFromDB();
        // console.log(data);
        // const newArr = [...bookList];
        // newArr[indx] = bookInputs;
        // setBookList(newArr);
        // setIndx(-1);
        // clearInput();
      });
  }

  // const handleChange = (event) => {
  //   const selectedOption = projList.find(
  //     (item) => item.role === event.target.value
  //   );
  //   setSelectedId(selectedOption.id);
  //   setSelectedRole(selectedOption.project_name);
  //   //     console.log(selectedId);
  //   //     console.log(selectedRole);
  // };

  // function editStatus(proj) {
  //   setUpdateState(proj.departmentId.id);
  //   // setRoleInput(item.role);
  // }

  function updateHandler(proj) {
    // const headers = {
    //   Authorization: `Bearer ${Cookies.get("jwt")}`,
    //   "Content-Type": "application/json",
    // };
    // const empId = userList[0].id;
    // const projId = proj.departmentId.id;
    // //       const arr = [
    // //       {
    // //         departmentId: {
    // //           id: id,
    // //           employee_id: projId,
    // //         },
    // //         role: role,
    // //       },
    // //     ];

    // fetch(process.env.REACT_APP_SERVER_PROJ_URL + `/${projId}`, {
    //   method: "PUT",
    //   headers: headers,
    //   body: JSON.stringify({
    //     departmentId: {
    //       id: projId,
    //       employee_id: empId,
    //     },
    //     role: role,
    //   }),
    //   // headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     //   if (data.status === "success") {
    //     if (data.role !== null) {
    //       setErrorMsg("Success!");
    //       refreshUserList();

    //       //     setTimeout(refreshUserList(), 5000);
    //       //     setTimeout(refreshUserList(), 3000);
    //       //     setTimeout(refreshUserList(), 3000);
    //       //     setAddInput("");
    //       //     setSearchInput("");
    //     } else {
    //       setErrorMsg("Error: User already assigned to this department!");
    //     }
    //     //   getAllDataFromDB();
    //     // console.log(data);
    //     // const newArr = [...bookList];
    //     // newArr[indx] = bookInputs;
    //     // setBookList(newArr);
    //     // setIndx(-1);
    //     // clearInput();
    //   });
  }

  function delHandler(proj) {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    const id = userList[0].id;
    const projId = proj.projectId.id;
    
    if (window.confirm(`Are you sure you want to delete ${proj.project_name}?`)) {
    
      fetch(process.env.REACT_APP_SERVER_PROJ_URL + `/${projId}/${id}`, {
        method: "DELETE",
        headers: headers,
      })
        .then((res) => res.text())
        .then((data) => {
             setErrorMsg(
            "Record of Project: (" +
              proj.project_name +
              ") for Username: (" +
              userList[0].userEntity.username +
              ") has been deleted"
          );
          refreshUserList();
          //     getAllDataFromDB();
        });
    }
  }

  return (
    <div className="app">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchHandler();
        }}
      >
        <input
          type="email"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by Employee Email"
          style={{ width: "300px", height: "30px" }}
          required
        ></input>
        <button type="submit">Search</button>
      </form>
      {searched && (
        <>
          <p>
            Email: {userList[0].email}
            <br />
            Username: {userList[0].userEntity.username}
          </p>

          {/* <select> */}
          <select
            defaultValue=""
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="" disabled>
              Projects
            </option>
            {projList

              .map((item) => (
                <option key={item.id}>{item.projectName}</option>
              ))}
            {/* {projList
                  .filter((item)=>)
        .map((item) => (
          <option key={item.id}>{item.role}</option>
        ))} */}
          </select>
          <button type="button" onClick={() => addHandler()}>
            Assign to User
          </button>
          {errorMsg}
          <table>
            <thead>
              <tr>
                <th>Projects</th>
              </tr>
            </thead>
            <tbody>
              {userList[0].projects
                .sort((a, b) => a.projectId.id - b.projectId.id)
                // .sort((a,b)=>a.project_name.localeCompare(b.project_name))
                .map((proj) =>
                  updateState === proj.projectId.id ? (
                    <tr key={proj.projectId.id}>
                      <td>
                        <input
                          type="text"
                          name="project_name"
                          defaultValue={proj.project_name}
                          onChange={(e) => setRoleInput(e.target.value)}
                          required
                        ></input>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => updateHandler(proj)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={proj.projectId.id}>
                      <td>{proj.project_name}</td>
                      {/* <td>
                        <button onClick={() => editStatus(proj)}>Edit</button>
                      </td> */}
                      <td>
                        <button onClick={() => delHandler(proj)}>Delete</button>
                      </td>
                    </tr>
                  )
                )}
              {/* {userList.map((item) => (
            <>
              <tr key={item.id}>
                <td>{item.userEntity.username}</td>
                <td>{item.email}</td>
              </tr>
              {item.departments.map((proj) => (
                <tr key={proj.departmentId.id}>
                  <td>{proj.role}</td>
                </tr>
              ))}
            </>
          ))} */}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ManageUserProjects;
