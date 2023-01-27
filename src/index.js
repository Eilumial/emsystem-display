import React from "react";
import ReactDOM from "react-dom/client";

// import "./index.css";
//import ListCrudFnc from './ListCrudFnc';
// import TableCrudFnc from "./TableCrud";
// import JSONView from "./JSONView";
// import App from './App';
// import App2 from './App2';
// import Decoder from "./Decoder";
// import LoginForm from "./LoginForm";
// import Book from "./Book";
import RouterFnc from "./Router";
import { BrowserRouter } from "react-router-dom";
// import Login from "./Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterFnc />
    </BrowserRouter>
  </React.StrictMode>
);