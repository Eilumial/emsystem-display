import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
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

export default function ManageDepartmentEmp() {
   const [userList, setUserList] = useState(initUserList);
   const [depList, setDepList] = useState(initDepList);
   const [selectedRole, setSelectedRole] = useState("");
   const [errorMsg, setErrorMsg] = useState("");
   const [searched, setSearched] = useState(false);
   const [departmentID, setDepartmentID] = useState(0);
   const [departmentName, setDepartmentName] = useState("");

   useEffect(() => {
      getDepList();
   }, []);

   //    useEffect(() => {
   //       console.log(userList);
   //       if (userList.length > 0) {
   //          setSearched(true);
   //          setErrorMsg("");
   //       } else {
   //          setSearched(false);
   //          setErrorMsg("No Employee found.");
   //       }
   //    }, [userList]);

   function getDepList() {
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
   }

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

   function refreshEmpList() {
      // const selectedOption = depList.find((item) => {
      //    return item.role === selectedRole;
      // });

      // setDepartmentID(selectedOption.id);
      // setDepartmentName(selectedOption.role);
      // console.log(departmentID);
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
         "Content-Type": "application/json",
      };
      //     console.log("User Email: " + userEmail);
      fetch(process.env.REACT_APP_SERVER_EMP_URL + "/d" + `/${departmentID}`, {
         method: "GET",
         headers: headers,
      })
         .then((res) => res.json())
         .then((data) => {
            setUserList(data);
            //   console.log("Before roles"+roles);
            //     setRole(userList[0].departments.map((department) => department.role));
         });
   }

   function findEmpHandler() {
      console.log("Select role: " + selectedRole);
      if (selectedRole !== "") {
         const selectedOption = depList.find((item) => {
            // console.log("Select role: " + selectedRole);
            // console.log("Role: "+ item.role)
            // console.log("id: "+ item.id)
            return item.role === selectedRole;
         });
         console.log("SOID: " + selectedOption.id);
         console.log("SORole: " + selectedOption.role);
         setDepartmentID(selectedOption.id);
         setDepartmentName(selectedOption.role);
         //    console.log("Depart ID: " + departmentID);
         //    console.log("Depart Name: " + departmentName);
         const headers = {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
         };
         //     console.log("User Email: " + userEmail);
         fetch(
            process.env.REACT_APP_SERVER_EMP_URL +
               "/d" +
               `/${selectedOption.id}`,
            {
               method: "GET",
               headers: headers,
            }
         )
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
               setUserList(data);
               //   console.log("Before roles"+roles);
               //     setRole(userList[0].departments.map((department) => department.role));
               //    console.log(data);
               //    console.log(userList);
               setSearched(true);
            //    if (userList.length > 0) {
            //       setSearched(true);
            //       setErrorMsg("");
            //    } else {
            //       setSearched(false);
            //       setErrorMsg("No Employee found.");
            //    }
            });
      } else {
         setErrorMsg("Please select a Department.");
      }
   }

   function findEmpHandler2(e) {
      
      
         const selectedOption = depList.find((item) => {
            // console.log("Select role: " + selectedRole);
            // console.log("Role: "+ item.role)
            // console.log("id: "+ item.id)
            return item.role === e.target.value;
         });
         console.log("SOID: " + selectedOption.id);
         console.log("SORole: " + selectedOption.role);
         setDepartmentID(selectedOption.id);
         setDepartmentName(selectedOption.role);
         //    console.log("Depart ID: " + departmentID);
         //    console.log("Depart Name: " + departmentName);
         const headers = {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
         };
         //     console.log("User Email: " + userEmail);
         fetch(
            process.env.REACT_APP_SERVER_EMP_URL +
               "/d" +
               `/${selectedOption.id}`,
            {
               method: "GET",
               headers: headers,
            }
         )
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
               setUserList(data);
               //   console.log("Before roles"+roles);
               //     setRole(userList[0].departments.map((department) => department.role));
               //    console.log(data);
               //    console.log(userList);
               setSearched(true);
            //    if (userList.length > 0) {
            //       setSearched(true);
            //       setErrorMsg("");
            //    } else {
            //       setSearched(false);
            //       setErrorMsg("No Employee found.");
            //    }
            });
      
   }

   function delHandler(emp) {
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
      };

      //     console.log("Emp ID: " + id);
      //     console.log("Dep ID: " + depId);
      if (
         window.confirm(
            `Are you sure you want to remove ${emp.userEntity.username} from ${departmentName}?`
         )
      ) {
         //   console.log(process.env.REACT_APP_SERVER_DEP_URL + `/${depId}/${id}`);
         fetch(
            process.env.REACT_APP_SERVER_DEP_URL + `/${departmentID}/${emp.id}`,
            {
               method: "DELETE",
               headers: headers,
            }
         )
            .then((res) => res.text())
            .then((data) => {
               //     setErrorMsg(data.replace("*name*", item.role));
               //     setErrorMsg(data);
               setErrorMsg(
                  "Record of Department: (" +
                     departmentName +
                     ") for Username: (" +
                     emp.userEntity.username +
                     ") has been deleted"
               );
               refreshEmpList();
               // refreshUserList();
               //     getAllDataFromDB();
            });
      }
   }
   return (
      <div className="app">
         
         <br />
         <select
         className="depselect"
            defaultValue=""
            // onChange={(e) => setSelectedRole(e.target.value)}>
            onChange={(e) => findEmpHandler2(e)}>
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
         {/* <button type="button" onClick={() => findEmpHandler()}>
            Search
         </button> */}
         {errorMsg}
         <br/>
         {searched && (
            <div>
               <table>
                  <thead>
                     <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {userList.map((emp) => (
                        <tr key={emp.id}>
                           <td>{emp.userEntity.username}</td>
                           <td>{emp.first_name}</td>
                           <td>{emp.last_name}</td>
                           <td>{emp.email}</td>
                           <td>
                              <button
                                 type="Button"
                                 onClick={() => delHandler(emp)}
                              >
                                 Remove
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
}
