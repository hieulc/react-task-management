import { useContext } from "react";
import TaskContext from "../context/tasks";

function useTaskContext() {
  return useContext(TaskContext);
}

export default useTaskContext;
