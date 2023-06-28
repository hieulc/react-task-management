import styles from "../login.module.css";
import TaskCreate from "./TaskCreate";
import Task from "./Task";
import { RiMoreLine } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

function ListDropStyle(style, snapshot) {}

function ListTask({
  listTask,
  onCreateNewTask,
  onUpdateTask,
  members,
  onAddPriority,
  projectId,
  colPos,
}) {
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const projectMembers = members;

  const setPosForTask = () => {
    const ceil = listTask.tasks.length;
    const highestPos = Math.max(...listTask.tasks.map((task) => task.pos));

    if (ceil === 0) return 1;
    else {
      if (ceil < highestPos) return highestPos + 1;
      else return ceil + 1;
    }
  };

  const createTask = (taskTitle) => {
    const pos = setPosForTask();
    onCreateNewTask(listTask.listId, taskTitle, pos);
  };

  const updateTask = (taskId, taskTitle, taskDescr) => {
    onUpdateTask(listTask.listId, taskId, taskTitle, taskDescr);
  };

  const addPriority = (taskPriority, taskId) => {
    onAddPriority(taskPriority, listTask.listId, taskId);
  };

  const openExtras = () => {
    setIsExtrasOpen(!isExtrasOpen);
  };

  useEffect(() => {
    setTasks(listTask.tasks);
  }, [listTask.tasks.length, listTask.tasks]);

  const getOrder = () => {
    if (tasks.length === 0 || tasks.length === 1) return tasks;
    else {
      return tasks.sort((task1, task2) => task1.pos - task2.pos);
    }
  };

  const orderedTasks = getOrder();

  const renderedTasks = orderedTasks.map((task) => {
    return (
      <Task
        key={task.taskId}
        element={task}
        listTitle={listTask.listName}
        onUpdateTask={updateTask}
        onAddPriority={addPriority}
        members={projectMembers}
        projectId={projectId}
        currentListId={listTask.listId}
        index={task.pos}
      />
    );
  });

  if (listTask === null || listTask === undefined) {
    return <></>;
  } else {
    return (
      <Draggable draggableId={listTask.listId} index={colPos}>
        {(provided) => {
          return (
            <div
              className={styles.list_wrapper}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div
                className={styles.list_task}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div
                  className={styles.list_task_header}
                  {...provided.dragHandleProps}
                >
                  <h2>{listTask.listName}</h2>
                  <div className={styles.list_task_extras} onClick={openExtras}>
                    <RiMoreLine />
                  </div>
                </div>
                <Droppable droppableId={listTask.listId} type="task">
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${tasks.length === 0 ? "drop-zone" : ""}`}
                        style={{
                          ...provided.droppableProps.style,
                          minHeight:
                            tasks.length === 0 && snapshot.isDraggingOver
                              ? "50px"
                              : 0,
                        }}
                      >
                        {renderedTasks}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
                <TaskCreate onSubmit={createTask} />
              </div>
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default ListTask;
