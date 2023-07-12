import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/projects";
import { ProjectProvider } from "./context/project";
import { TaskProvider } from "./context/tasks";
import { SidebarProvider } from "./context/sidebarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SidebarProvider>
      <Provider>
        <ProjectProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </ProjectProvider>
      </Provider>
    </SidebarProvider>
  </BrowserRouter>
);
