import { useContext } from "react";
import ProjectContext from "../context/projects";

function useProjectContext() {
  return useContext(ProjectContext);
}

export default useProjectContext;
