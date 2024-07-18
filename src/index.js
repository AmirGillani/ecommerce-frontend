import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./Store";
import "./index.css";
import App from "./App";

// OPTIONS FOR ALERTS

const options = {
 
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // PROVIDE STORE TO APP

  <Provider store={store}>

  {/* PROVIDE ALERT BOX TO APP */}
  
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
