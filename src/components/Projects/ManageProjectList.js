import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ContextHook } from "../../Router";

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

function ManageProjectList() {
  const [projList, setProjList] = useState(initProjList);
  const [searchInput, setSearchInput] = useState("");
  const [addInput, setAddInput] = useState("");
  const [updateState, setUpdateState] = useState(-1);
  const [nameInput, setNameInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // let contextData = useContext(ContextHook);
  // contextData.setJwt(Cookies.get("jwt"));
  useEffect(() => {
    // fetch(process.env.REACT_APP_SERVER_USER_URL)
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    fetch(process.env.REACT_APP_SERVER_PROJ_URL + "/list", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setProjList(data);
      });
  }, []);

  const getAllDataFromDB = () => {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };

    fetch(process.env.REACT_APP_SERVER_PROJ_URL + "/list", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setProjList(data);
      });
  };

  function editStatus(item) {
    setUpdateState(item.id);
    // setNameInput(item.projectName);
  }

  function updateHandler() {
    if (nameInput.length > 0) {
      const headers = {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
        "Content-Type": "application/json",
      };

      fetch(
        process.env.REACT_APP_SERVER_PROJ_URL + "/list" + `/${updateState}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({
            id: updateState,
            projectName: nameInput,
          }),
          // headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.projectName == null) {
            setErrorMsg("Error: Project does not exist or duplicate Project name.");
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
      setErrorMsg("Project name must not be empty");
    }
  }

  function addHandler() {
    if (addInput.length > 0) {
      const headers = {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
        "Content-Type": "application/json",
      };

      fetch(process.env.REACT_APP_SERVER_PROJ_URL + "/list", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          projectName: addInput,
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
      setErrorMsg("Project name must not be empty");
    }
  }

  function delHandler(item) {
    const headers = {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
    };
    if (window.confirm(`Are you sure you want to delete ${item.projectName}?`)) {
      fetch(process.env.REACT_APP_SERVER_PROJ_URL + "/list" + `/${item.id}`, {
        method: "DELETE",
        headers: headers,
      })
        .then((res) => res.text())
        .then((data) => {
          setErrorMsg(data.replace("*name*", item.projectName));
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
            placeholder="Add Project"
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
            placeholder="Search Projects"
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
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projList
              .filter((item) =>
                item.projectName.toLowerCase().includes(searchInput.toLowerCase())
              )
              // .sort((a, b) => a.projectId.id - b.projectId.id)
              .sort((a,b)=>a.projectName.localeCompare(b.projectName))
              .map((item) =>
                updateState === item.id ? (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="text"
                        name="projectName"
                        defaultValue={item.projectName}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                      ></input>
                    </td>

                    <td>
                      <button type="button" onClick={() => updateHandler()}>
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
                    <td>{item.projectName}</td>
                    <td>
                      <button onClick={() => editStatus(item)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => delHandler(item)}>Delete</button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProjectList;
