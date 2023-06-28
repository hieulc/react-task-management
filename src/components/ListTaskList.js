import ListTask from "./ListTask";

function ListTaskList({
  listTasks,
  onCreateNewTask,
  onUpdateTask,
  members,
  onAddPriority,
  projectId,
}) {
  const projectMembers = members;

  const createNewTask = (listId, taskTitle, pos) => {
    onCreateNewTask(listId, taskTitle, pos);
  };

  const updateTask = (listId, taskId, taskTitle, taskDescr) => {
    onUpdateTask(listId, taskId, taskTitle, taskDescr);
  };

  const addPriority = (taskPriority, listId, taskId) => {
    onAddPriority(taskPriority, listId, taskId);
  };

  const uniqueIds = [];

  const list = listTasks;

  const unique = list.filter((listTask) => {
    const isDuplicate = uniqueIds.includes(listTask.listId);

    if (!isDuplicate) {
      uniqueIds.push(listTask.listId);
      return true;
    }

    return false;
  });

  const orderedListTasks = unique.sort((a, b) => a.pos - b.pos);

  const renderedListTasks = orderedListTasks.map((listTask, index) => {
    return (
      <ListTask
        key={`${listTask.listId}`}
        listTask={listTask}
        onCreateNewTask={createNewTask}
        onUpdateTask={updateTask}
        onAddPriority={addPriority}
        members={projectMembers}
        projectId={projectId}
        colPos={listTask.pos}
        colIndex={index}
      />
    );
  });

  return <>{renderedListTasks}</>;
}

export default ListTaskList;
