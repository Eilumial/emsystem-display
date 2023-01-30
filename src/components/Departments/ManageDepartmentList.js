import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";
import { initDepList } from "../Global/initialState";
// var initDepList = [
//    {
//       createdBy: "",
//       createdOn: "",
//       lastModifiedBy: "",
//       lastModifiedOn: "",
//       id: 0,
//       role: "",
//    },
// ];

function ManageDepartmentList() {
   const [depList, SetDepList] = useState(initDepList);
   const [searchInput, setSearchInput] = useState("");
   const [addInput, setAddInput] = useState("");
   const [updateState, setUpdateState] = useState(-1);
   const [roleInput, setRoleInput] = useState("");
   const [errorMsg, setErrorMsg] = useState("");
   const [existingRole, setExistingRole] = useState("");

   // let contextData = useContext(ContextHook);
   // contextData.setJwt(Cookies.get("jwt"));
   useEffect(() => {
      // fetch(process.env.REACT_APP_SERVER_USER_URL)
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
      };

      fetch(`http://localhost:8080/ems/dep/list`, {
         method: "GET",
         headers: headers,
      })
         .then((res) => res.json())
         .then((data) => {
            SetDepList(data);
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
            SetDepList(data);
         });
   };

   function editStatus(item) {
      setUpdateState(item.id);
      setExistingRole(item.role);
      setRoleInput(item.role);
   }
   function updateHandler() {
      // console.log("Existing " + existingRole);
      // console.log("input " + roleInput);
      if (existingRole !== roleInput) {
         if (roleInput.length > 0) {
            const headers = {
               Authorization: `Bearer ${Cookies.get("jwt")}`,
               "Content-Type": "application/json",
            };

            fetch(
               process.env.REACT_APP_SERVER_DEP_URL +
                  "/list" +
                  `/${updateState}`,
               {
                  method: "PUT",
                  headers: headers,
                  body: JSON.stringify({
                     id: updateState,
                     role: roleInput,
                  }),
                  // headers: { "Content-Type": "application/json" },
               }
            )
               .then((res) => res.json())
               .then((data) => {
                  console.log(data);
                  if (data.role == null) {
                     setErrorMsg(
                        "Error: Duplicate Department name"
                     );

                  } else {
                     setErrorMsg("");
                     setUpdateState(-1);
                  }
                  getAllDataFromDB();
                  // console.log(data);
                  // const newArr = [...bookList];
                  // newArr[indx] = bookInputs;
                  // setBookList(newArr);
                  // setIndx(-1);
                  // clearInput();
               });
         } else {
            setErrorMsg("Error: Department name must not be empty");
         }
      } else {
         setUpdateState(-1);
         setErrorMsg("Error: Department name same as previous.");
      }
   }

   function addHandler() {
      if (addInput.length > 0) {
         const headers = {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
            "Content-Type": "application/json",
         };

         fetch(process.env.REACT_APP_SERVER_DEP_URL + "/list", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
               role: addInput,
            }),
            // headers: { "Content-Type": "application/json" },
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data);
               if (data.status === "success") {
                  setErrorMsg(data.msg);
                  setAddInput("");
               } else {
                  setErrorMsg("Error: " + data.msg);
               }
               getAllDataFromDB();
               // console.log(data);
               // const newArr = [...bookList];
               // newArr[indx] = bookInputs;
               // setBookList(newArr);
               // setIndx(-1);
               // clearInput();
            });
      } else {
         setErrorMsg("Department name must not be empty");
      }
   }

   function delHandler(item) {
      const headers = {
         Authorization: `Bearer ${Cookies.get("jwt")}`,
      };
      if (window.confirm(`Are you sure you want to delete ${item.role}?`)) {
         fetch(process.env.REACT_APP_SERVER_DEP_URL + "/list" + `/${item.id}`, {
            method: "DELETE",
            headers: headers,
         })
            .then((res) => res.text())
            .then((data) => {
               setErrorMsg(data.replace("*name*", item.role));
               getAllDataFromDB();
            });
      }
   }

   return (
      <div className="app">
         <div>
            {/* {
                  editMode?
                  <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editHandler();
                  }}>
                        :
                 <form
        onSubmit={(e) => {
          e.preventDefault();
          editHandler();
        }}
      >
            } */}

            {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            editHandler();
          }}
        > */}
            <form>
               {/* <label>Add</label> */}
               <input
                  type="text"
                  name="add"
                  onChange={(e) => setAddInput(e.target.value)}
                  value={addInput}
                  placeholder="Add Department"
               />
               <button type="button" onClick={() => addHandler()}>
                  Add
               </button>

               <br />
               {/* <label>Search</label> */}
               <input
                  type="text"
                  name="search"
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search Departments"
               />
               {/* {!editMode<0 ? (
            <button type="button" onClick={() => updateHandler()}>
              Update
            </button>
          ) : (
            <button type="button" onClick={() => addHandler()}>
              Add
            </button>
          )} */}
            </form>
            {errorMsg}
            <div
               style={{
                  overflow: "scroll",
                  maxHeight: "700px",
                  maxWidth: "800px",
               }}
            >
               <table className="deplisttable">
                  <thead>
                     <tr>
                        <th>Department Name</th>
                        <th></th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {depList
                        .filter((item) =>
                           item.role
                              .toLowerCase()
                              .includes(searchInput.toLowerCase())
                        )
                        // .sort((a, b) => a.projectId.id - b.projectId.id)
                        .sort((a, b) => a.role.localeCompare(b.role))
                        .map((item) =>
                           updateState === item.id ? (
                              <tr key={item.id}>
                                 <td>
                                    <input
                                       type="text"
                                       name="role"
                                       defaultValue={item.role}
                                       onChange={(e) =>
                                          setRoleInput(e.target.value)
                                       }
                                       required
                                    ></input>
                                 </td>

                                 <td>
                                    <button
                                       type="button"
                                       onClick={() => updateHandler()}
                                    >
                                       Update
                                    </button>
                                    {/* <button type="button" onClick={() => editHandler()}>
                              Update
                            </button> */}
                                 </td>
                                 <td></td>
                              </tr>
                           ) : (
                              <tr key={item.id}>
                                 <td>{item.role}</td>
                                 <td>
                                    <button onClick={() => editStatus(item)}>
                                       Edit
                                    </button>
                                 </td>
                                 <td>
                                    <button onClick={() => delHandler(item)}>
                                       Delete
                                    </button>
                                 </td>
                              </tr>
                           )
                        )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

export default ManageDepartmentList;
