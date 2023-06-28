import { createContext, useState, useCallback } from "react";
import authHeader from "../services/auth-header";
import axios from "axios";
import { TASK_API } from "./api";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [task, setTask] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);

  const fetchTaskById = useCallback(async (taskId) => {
    const response = axios.get(TASK_API + `/${taskId}`, headers);

    setTask(response.data);
  }, []);

  const valueToShare = {
    task,
    fetchTaskById,
  };

  return (
    <TaskContext.Provider value={valueToShare}>{children}</TaskContext.Provider>
  );
}

export { TaskProvider };
export default TaskContext;
