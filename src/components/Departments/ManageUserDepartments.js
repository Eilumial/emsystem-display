import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";
import "./dep.css";
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

// const rolesAndIds = [];
// const roles = [];

function ManageUserDepartments() {
   const [userList, setUserList] = useState(initUserList);
   const [depList, setDepList] = useState(initDepList);
   const [updateState, setUpdateState] = useState(-1);
   const [searchInput, setSearchInput] = useState("");
   const [empID, setEmpID] = useState(-1);
   const [role, setRole] = useState([]);
   const [selectedId, setSelectedId] = useState(0);
   const [selectedRole, setSelectedRole] = useState("");
   const [errorMsg, setErrorMsg] = useState("Please select a Department");
   const [searched, setSearched] = useState(false);
   const [roleInput, setRoleInput] = useState("");
   const [userEmail, setUserEmail] = useState("");
   const [error, setError] = useState("defaultMsg");
   const [testArr, setTestArr] = useState(initUserList);

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

   // const getAllDataFromDB = () => {
   //   const headers = {
   //     Authorization: `Bearer ${Cookies.get("jwt")}`,
   //   };

   //   fetch(`http://localhost:8080/ems/dep/list`, {
   //     method: "GET",
   //     headers: headers,
   //   })
   //     .then((res) => res.json())
   //     .then((data) => {
   //       setDepList(data);
   //       console.log(depList);
   //     });
   // };

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
            setRole(
               userList[0].departments.map((department) => department.role)
            );
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
            // setTestArr(data);
            if(data[0].errorMessage===null){
            setUserList(data);
            // //   console.log("Before roles"+roles);
            // setRole(
            //    userList[0].departments.map((department) => department.role)
            // );
            setSearched(true);
            setUserEmail(searchInput);
            setErrorMsg("Please select a Department");
            setError("defaultMsg");
         }else{
            
            setErrorMsg(data[0].errorMessage);
            setError("errorRed");
         }
            //   console.log("After roles"+roles);
            //   setUserList(prevList=>[...prevList]);
            //   console.log("Before roles"+depList);
            //   setDepList(depList.filter(dep => !roles.includes(dep.role)));
            //   console.log("After roles"+depList);
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

   function addHandler() {
      if (selectedRole.length > 0) {
         const headers = {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
         };
         const selectedOption = depList.find((item) => {
            // console.log("Item role: "+item.role);
            // console.log("Item id: "+item.id);
            console.log("Select role: " + selectedRole);
            return item.role === selectedRole;
         });
         console.log("SOID: " + selectedOption.id);
         console.log("SORole: " + selectedOption.role);
         setSelectedId(selectedOption.id);
         //     console.log("ID:" + selectedId);
         //     console.log("Role:" + selectedRole);

         fetch(process.env.REACT_APP_SERVER_DEP_URL, {
            method: "POST",
            headers: headers,
            // mode: 'no-cors',
            body: JSON.stringify({
               departmentId: {
                  id: selectedOption.id,
                  employee_id: userList[0].id,
               },
               role: selectedOption.role,
            }),
            // headers: { "Content-Type": "application/json" },
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data);
               //   if (data.status === "success") {
               if (data.role !== null) {
                  setErrorMsg("Success!");
                  setError("successGreen");
                  refreshUserList();

                  //     setTimeout(refreshUserList(), 5000);
                  //     setTimeout(refreshUserList(), 3000);
                  //     setTimeout(refreshUserList(), 3000);
                  //     setAddInput("");
                  //     setSearchInput("");
               } else {
                  setErrorMsg(
                     "Error: User already assigned to this department!"
                  );
                  setError("errorRed");
               }
               //   getAllDataFromDB();
               // console.log(data);
               // const newArr = [...bookList];
               // newArr[indx] = bookInputs;
               // setBookList(newArr);
               // setIndx(-1);
               // clearInput();
            });
      } else {
         setErrorMsg("Please select a Department.");
         setError("defaultMsg");
      }
   }

   const handleChange = (event) => {
      const selectedOption = depList.find(
         (item) => item.role === event.target.value
      );
      setSelectedId(selectedOption.id);
      setSelectedRole(selectedOption.role);
      //     console.log(selectedId);
      //     console.log(selectedRole);
   };

   function editStatus(dep) {
      setUpdateState(dep.departmentId.id);
      // setRoleInput(item.role);
   }

   function updateHandler(dep) {
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
         "Content-Type": "application/json",
      };
      const empId = userList[0].id;
      const depId = dep.departmentId.id;
      //       const arr = [
      //       {
      //         departmentId: {
      //           id: id,
      //           employee_id: depId,
      //         },
      //         role: role,
      //       },
      //     ];

      fetch(process.env.REACT_APP_SERVER_DEP_URL + `/${depId}`, {
         method: "PUT",
         headers: headers,
         body: JSON.stringify({
            departmentId: {
               id: depId,
               employee_id: empId,
            },
            role: role,
         }),
         // headers: { "Content-Type": "application/json" },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            //   if (data.status === "success") {
            if (data.role !== null) {
               setErrorMsg("Success!");
               setError("successGreen");
               refreshUserList();

               //     setTimeout(refreshUserList(), 5000);
               //     setTimeout(refreshUserList(), 3000);
               //     setTimeout(refreshUserList(), 3000);
               //     setAddInput("");
               //     setSearchInput("");
            } else {
               setErrorMsg("Error: User already assigned to this department!");
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

   function delHandler(dep) {
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
      };

      const id = userList[0].id;
      const depId = dep.departmentId.id;
      //     console.log("Emp ID: " + id);
      //     console.log("Dep ID: " + depId);
      if (window.confirm(`Are you sure you want to delete ${dep.role}?`)) {
         console.log(process.env.REACT_APP_SERVER_DEP_URL + `/${depId}/${id}`);
         fetch(process.env.REACT_APP_SERVER_DEP_URL + `/${depId}/${id}`, {
            method: "DELETE",
            headers: headers,
         })
            .then((res) => res.text())
            .then((data) => {
               //     setErrorMsg(data.replace("*name*", item.role));
               //     setErrorMsg(data);
               setErrorMsg(
                  "Record (" +
                     dep.role +
                     ") for (" +
                     userList[0].userEntity.username +
                     ") has been deleted"
               );
               setError("successGreen");
               refreshUserList();
               //     getAllDataFromDB();
            });
      }
   }

   return (
      <div className="app">
         <div className="list_table">
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  searchHandler();
               }}
            >
               <input
                  type="text"
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by Employee Email or Username"
                  style={{ width: "300px", height: "30px" }}
                  required
               ></input>
               <button className="search_btn" type="submit">
                  Search
               </button>
            </form>
            <div className="error_div">
                     <p className={[error]}>{errorMsg}</p>
                  </div>
            {searched && (
               <>
                  <div className="pdetails">
                     Email: {userList[0].email}
                     <br />
                     Username: {userList[0].userEntity.username}
                  </div>

                  {/* <select> */}

                  {/* <p className={error ? "errorRed" : "successGreen"}>{errorMsg}</p> */}
                  
                  <div>
                     <select
                        className="depselect"
                        defaultValue=""
                        onChange={(e) => setSelectedRole(e.target.value)}
                     >
                        <option value="" disabled>
                           Select Department
                        </option>
                        {depList
                           //     .filter((item) => !roles.includes(item.role))
                           .map((item) => (
                              <option key={item.id}>{item.role}</option>
                           ))}
                        {/* {depList
                  .filter((item)=>)
        .map((item) => (
          <option key={item.id}>{item.role}</option>
        ))} */}
                     </select>
                     <button
                        className="assign_btn"
                        type="button"
                        onClick={() => addHandler()}
                     >
                        Assign to User
                     </button>

                     <table className="deplisttable">
                        <thead>
                           <tr>
                              <th colSpan={2}>Departments</th>
                           </tr>
                        </thead>
                        <tbody>
                           {userList[0].departments
                              .sort(
                                 (a, b) => a.departmentId.id - b.departmentId.id
                              )
                              // .sort((a,b)=>a.role.localeCompare(b.role))
                              .map((dep) =>
                                 updateState === dep.departmentId.id ? (
                                    <tr key={dep.departmentId.id}>
                                       <td>
                                          <input
                                             type="text"
                                             name="role"
                                             defaultValue={dep.role}
                                             onChange={(e) =>
                                                setRoleInput(e.target.value)
                                             }
                                             required
                                          ></input>
                                       </td>
                                       <td>
                                          <button
                                             type="button"
                                             onClick={() => updateHandler(dep)}
                                          >
                                             Update
                                          </button>
                                       </td>
                                    </tr>
                                 ) : (
                                    <tr key={dep.departmentId.id}>
                                       <td>{dep.role}</td>
                                       {/* <td>
                        <button onClick={() => editStatus(dep)}>Edit</button>
                      </td> */}
                                       <td>
                                          <button
                                             className="del_dep"
                                             onClick={() => delHandler(dep)}
                                          >
                                             Delete
                                          </button>
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
               </>
            )}
         </div>
      </div>
   );
}

export default ManageUserDepartments;
