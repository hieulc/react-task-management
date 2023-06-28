import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";
import { PROJECT_API } from "./api";
import axios from "axios";
import authHeader from "../services/auth-header";

const AdminContext = createContext();

function AdminProvider({ children }) {
  const [managedProjects, setManagedProjects] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);

  const fetchManagedProjects = useCallback(async () => {
    const response = await axios.get(PROJECT_API + "/createdBy", {
      params: {
        username: user.username,
      },
      headers,
    });

    const managedProjects = response.data.content;

    setManagedProjects(managedProjects);
  }, []);

  const valueToShare = {
    managedProjects,
    fetchManagedProjects,
  };

  return (
    <AdminContext.Provider value={valueToShare}>
      {children}
    </AdminContext.Provider>
  );
}

export { AdminProvider };
export default AdminContext;
