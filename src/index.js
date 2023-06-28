import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/projects";
import { ProjectProvider } from "./context/project";
import { TaskProvider } from "./context/tasks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider>
      <ProjectProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </ProjectProvider>
    </Provider>
  </BrowserRouter>
);
