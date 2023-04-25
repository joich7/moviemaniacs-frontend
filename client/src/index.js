import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalProvider>
);
