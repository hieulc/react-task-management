import axios from "axios";
import { createContext, useCallback, useState } from "react";
import { PROJECT_API } from "./api";
import authHeader from "../services/auth-header";

const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [project, setProject] = useState({});

  const fetchProjectById = useCallback(async (projectId, authHeader) => {
    const response = await axios.get(PROJECT_API + `/project/${projectId}`, {
      headers: authHeader,
    });

    const updatedProject = response.data;

    const newProject = { ...project, ...updatedProject };

    setProject(newProject);
  }, []);

  const valueToShare = {
    project,
    fetchProjectById,
  };

  return (
    <ProjectContext.Provider value={valueToShare}>
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectProvider };
export default ProjectContext;
