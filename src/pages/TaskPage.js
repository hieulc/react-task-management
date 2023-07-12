import { useCallback, useEffect, useState } from "react";
import authHeader from "../services/auth-header";
import { TASK_API } from "../context/api";
import axios from "axios";
import TaskTable from "../components/TaskTable";
import SortableTable from "../components/SortableTable";
import styled from "../table.module.css";
import styles from "../login.module.css";
import moment from "moment/moment";
import { AiOutlineClockCircle } from "react-icons/ai";

function setColorBaseOnPriority(priority) {
  if (priority === "HIGH") {
    return 3;
  }

  if (priority === "NORMAL") {
    return 2;
  }

  if (priority === "LOW") {
    return 1;
  } else return 0;
}

function tranformData(listTask) {
  const newListTask = listTask.map((task) => {
    const { taskId, taskTitle, completed, dueDate, taskPriority } = task;

    const number = setColorBaseOnPriority(taskPriority);

    const newTask = { taskId, taskTitle, completed, dueDate, number };

    return newTask;
  });

  return newListTask;
}

function renderCompletedColumn(isCompleted) {
  if (isCompleted) {
    return "Done";
  }

  return "In progress";
}

const colorSignDueDate = (isCompleted, isOverDue, isNearOverDue) => {
  return isCompleted
    ? "show_green_background"
    : isOverDue
    ? "show_red_background"
    : isNearOverDue
    ? "show_yellow_background"
    : "show_normal_due_date";
};

const signDueDate = (dueDate, isCompleted, isOverDue, isNearOverDue) => {
  if (!dueDate) {
    return (
      <div className={`${styles.badges}`}>
        <span className={styles.warning_due_date_text}>
          <div className={styles.no_data}></div>
        </span>
      </div>
    );
  }
  return (
    <div
      className={`${styles.badges} ${colorSignDueDate(
        isCompleted,
        isOverDue,
        isNearOverDue
      )}`}
    >
      <span className={styles.show_due_date_icon}>
        <AiOutlineClockCircle />
      </span>
      <span className={styles.warning_due_date_text}>
        {moment(dueDate).format("L")}
      </span>
    </div>
  );
};

function renderDueDateColumn(dueDate, isCompleted) {
  if (isCompleted) {
    return signDueDate(dueDate, isCompleted, false, false);
  }
  if (dueDate) {
    const diff = moment().diff(dueDate, "days");
    if (diff >= 0) {
      return signDueDate(dueDate, false, true, false);
    } else if (diff < 0 && diff > -3) {
      return signDueDate(dueDate, false, false, true);
    } else {
      return signDueDate(dueDate, false, false, false);
    }
  } else {
    return signDueDate();
  }
}

function renderPriorityColumn(priority) {
  if (priority === 0) {
    return (
      <div className={styles.sign_priority}>
        <div className={styles.no_data}></div>
      </div>
    );
  }
  if (priority === 3) {
    return (
      <div className={styles.sign_priority}>
        <button
          className={styles.sign_priority_btn}
          style={{
            backgroundColor: `#F87462`,
            color: `#601e16`,
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          <span>HIGH</span>
        </button>
      </div>
    );
  } else if (priority === 2) {
    return (
      <div className={styles.sign_priority}>
        <button
          className={styles.sign_priority_btn}
          style={{
            backgroundColor: `#E2B206`,
            color: `#533f04`,
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          <span>NORMAL</span>
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.sign_priority_table}>
        <button
          className={styles.sign_priority_btn}
          style={{
            backgroundColor: `#4BCE97`,
            color: `#164b35`,
            textAlign: "center",
            fontWeight: 400,
          }}
        >
          <span>LOW</span>
        </button>
      </div>
    );
  }
}

function TaskPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);
  const [listTask, setListTask] = useState([]);

  const fetchUserTask = useCallback(async () => {
    const response = await axios.get(TASK_API + `/assigned/${user.username}`, {
      headers,
    });

    const newData = tranformData(response.data);
    setListTask(newData);
  }, []);

  const config = [
    {
      label: "Name",
      render: (task) => task.taskTitle,
      sortValue: (task) => task.taskTitle,
    },
    {
      label: "Completed",
      render: (task) => renderCompletedColumn(task.completed),
    },
    {
      label: "Due date",
      render: (task) => renderDueDateColumn(task.dueDate, task.completed),
      sortValue: (task) => task.dueDate,
    },
    {
      label: "Priority",
      render: (task) => renderPriorityColumn(task.number),
      sortValue: (task) => task.number,
    },
  ];

  useEffect(() => {
    fetchUserTask();
  }, []);

  return (
    <div className={styled.page}>
      <SortableTable data={listTask} config={config} />
    </div>
  );
}

export default TaskPage;
