import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Type assertion to let TypeScript know that 'root' will not be null
const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);