import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

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
            projectId: {
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

export default function ManageProjectEmp() {
   const [userList, setUserList] = useState(initUserList);
   const [projList, setProjList] = useState(initProjList);
   const [selectedName, setSelectedName] = useState("");
   const [errorMsg, setErrorMsg] = useState("");
   const [searched, setSearched] = useState(false);
   const [projectID, setProjectID] = useState(0);
   const [projectName, setProjectName] = useState("");
   const [error, setError] = useState("defaultMsg");
   useEffect(() => {
      getProjList();
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

   function getProjList() {
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
      };

      fetch(`http://localhost:8080/ems/proj/list`, {
         method: "GET",
         headers: headers,
      })
         .then((res) => res.json())
         .then((data) => {
            setProjList(data);
            console.log(projList);
         });
   }

   // const getAllDataFromDB = () => {
   //    const headers = {
   //       Authorization: `Bearer ${Cookies.get("jwt")}`,
   //    };

   //    fetch(`http://localhost:8080/ems/proj/list`, {
   //       method: "GET",
   //       headers: headers,
   //    })
   //       .then((res) => res.json())
   //       .then((data) => {
   //          setProjList(data);
   //          console.log(projList);
   //       });
   // };

   function refreshProjUserList() {
      // const selectedOption = projList.find((item) => {
      //    return item.role === selectedName;
      // });

      // setProjectID(selectedOption.id);
      // setProjectName(selectedOption.role);
      // console.log(projectID);
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
         "Content-Type": "application/json",
      };
      //     console.log("User Email: " + userEmail);
      fetch(process.env.REACT_APP_SERVER_EMP_URL + "/p" + `/${projectID}`, {
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
   function findProjHandler(e) {
      const selectedOption = projList.find((item) => {
         // console.log("Select role: " + selectedName);
         // console.log("Role: "+ item.role)
         // console.log("id: "+ item.id)
         return item.projectName === e.target.value;
      });
      console.log("SOID: " + selectedOption.id);
      console.log("SOProjName: " + selectedOption.projectName);
      setProjectID(selectedOption.id);
      setProjectName(selectedOption.projectName);

      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
         "Content-Type": "application/json",
      };
      //     console.log("User Email: " + userEmail);
      fetch(process.env.REACT_APP_SERVER_EMP_URL + `/p/${selectedOption.id}`, {
         method: "GET",
         headers: headers,
      })
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
            `Are you sure you want to remove ${emp.userEntity.username} from ${projectName}?`
         )
      ) {
         //   console.log(process.env.REACT_APP_SERVER_DEP_URL + `/${depId}/${id}`);
         fetch(
            process.env.REACT_APP_SERVER_PROJ_URL + `/${projectID}/${emp.id}`,
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
                  "(" +
                     emp.userEntity.username +
                     ") has been removed from Project (" +
                     projectName +
                     ")"
               );
               setError("successGreen");
               refreshProjUserList();
               // refreshUserList();
               //     getAllDataFromDB();
            });
      }
   }
   return (
      <div className="app">
         <br />
         <select
            className="depselect2"
            defaultValue=""
            // onChange={(e) => setSelectedName(e.target.value)}>
            onChange={(e) => findProjHandler(e)}
         >
            <option value="" disabled>
               Select Project
            </option>
            {projList
               //     .filter((item) => !roles.includes(item.role))
               .map((item) => (
                  <option key={item.id}>{item.projectName}</option>
               ))}
            {/* {projList
                  .filter((item)=>)
        .map((item) => (
          <option key={item.id}>{item.role}</option>
        ))} */}
         </select>
         {/* <button type="button" onClick={() => findEmpHandler()}>
            Search
         </button> */}
         {errorMsg !== "" && (
            <div className="error_div">
               <p className={[error]}>{errorMsg}</p>
            </div>
         )}
         <br />
         {searched && (
            <div>
               <table
                  className="deplisttable"
                  style={{
                     width: "800px",
                     height: "100px",
                     maxWidth: "800px",
                     maxHeight: "800px",
                     overflowY: "scroll",
                  }}
               >
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
                                 className="del_dep"
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
