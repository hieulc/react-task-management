import { createContext, useCallback, useState } from "react";
import axios from "axios";
import { PROJECT_API } from "./api";

const ProjectContext = createContext();

function Provider({ children }) {
  const [projects, setProjects] = useState([]);

  const fetchProjects = useCallback(async (authHeader, username) => {
    const response = await axios.get(PROJECT_API + "/employees/pages", {
      params: {
        username,
      },
      headers: authHeader,
    });

    setProjects(response.data.content);
  }, []);

  const createProject = async (name, createdBy, authHeader) => {
    const response = await axios.post(
      PROJECT_API,
      {
        projectName: name,
        createdBy,
      },
      {
        headers: authHeader,
      }
    );

    const updatedProjects = [...projects, response.data];
    setProjects(updatedProjects);
  };

  const deleteProjectById = async (id, authHeader) => {
    await axios.delete(PROJECT_API + `/${id}`, { headers: authHeader });

    const updatedProjects = projects.filter((project) => {
      return project.projectId !== id;
    });

    setProjects(updatedProjects);
  };

  const searchProjectByName = async (projectName, createdBy, authHeader) => {
    const response = await axios.get(PROJECT_API + "/exist", {
      headers: authHeader,
      params: {
        createdBy,
        projectName,
      },
    });

    return response;
  };

  const editProjectById = async (id, newName, authHeader) => {
    const response = await axios.put(
      PROJECT_API + `/${id}`,
      {
        projectName: newName,
      },
      {
        headers: authHeader,
      }
    );

    const updatedProjects = projects.map((project) => {
      if (project.projectId === id) {
        return { ...project, ...response.data };
      }
      return project;
    });

    setProjects(updatedProjects);
  };

  const addMemberToProject = async (username, project, authHeader) => {
    const response = await axios.post(
      PROJECT_API + `/members/${username}`,
      project,
      {
        headers: authHeader,
      }
    );

    // const updatedProjects = projects.map((p) => {
    //   if (p.projectId === project.projectId) {
    //     const newProject = { ...p, ...response.data };
    //     return newProject;
    //   }

    //   return p;
    // });

    // setProjects(updatedProjects);
    return response.data;
  };

  const valueToShare = {
    projects,
    fetchProjects,
    createProject,
    deleteProjectById,
    editProjectById,
    searchProjectByName,
    addMemberToProject,
  };

  return (
    <ProjectContext.Provider value={valueToShare}>
      {children}
    </ProjectContext.Provider>
  );
}

export { Provider };
export default ProjectContext;
