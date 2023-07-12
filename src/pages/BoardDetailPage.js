import { useNavigate, useParams } from "react-router-dom";
import useProjectContext from "../hooks/useProjectContext";
import styles from "../login.module.css";
import authHeader from "../services/auth-header";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { PROJECT_API, TASK_API, USER_API } from "../context/api";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import Modal from "../components/Modal";
import success_logo from "../images/accept-icon.svg";
import ListCreate from "../components/ListCreate";
import ListTaskList from "../components/ListTaskList";
import MemberDropdown from "../components/MemberDropdown";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function BoardDetailPage() {
  const { addMemberToProject } = useProjectContext();
  const navigate = useNavigate();

  const [project, setProject] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isCofirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFound, setIsFound] = useState(true);
  const [memberEmail, setMemberEmail] = useState("");
  const [notFoundEmail, setNotFoundEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const path = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);

  const getProjectById = useCallback(async (id) => {
    const response = await axios.get(PROJECT_API + `/project/${id}`, {
      headers,
    });

    const updatedProject = response.data;
    console.log(response.data);

    const newProject = { ...updatedProject, ...project };

    setProject(newProject);
    setMembers(response.data.members);
    setCategories(response.data.listOfTasks);
  }, []);

  useEffect(() => {
    let id = path.id;
    getProjectById(id);
  }, [getProjectById, path.id]);

  const handleClick = () => {
    setIsFound(true);
    setNotFoundEmail("");
    setIsOpen(true);
    setMemberEmail("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event) => {
    setMemberEmail(event.target.value);
  };

  const findExistEmail = async (email) => {
    const response = await axios.get(USER_API + `/exist/${email}`);

    return response.data;
  };

  const addToMembers = (responseMembers, email) => {
    const member = responseMembers.find((member) => member.email === email);

    const updatedMembers = [...members, member];
    setMembers(updatedMembers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const existEmail = await findExistEmail(memberEmail);

    if (existEmail !== 1) {
      setIsFound(false);
      setNotFoundEmail(memberEmail);
      return;
    }

    const updatedProject = await addMemberToProject(
      memberEmail,
      project,
      headers
    );

    const newProject = { ...project, ...updatedProject };
    setProject(newProject);
    addToMembers(updatedProject.members, memberEmail);
    setIsConfirmModalOpen(true);
    handleClose();
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirm = () => {
    handleConfirmModalClose();
  };

  const setPosForList = () => {
    const ceil = project.listOfTasks.length;
    const highestPos = Math.max(
      ...project.listOfTasks.map((tasks) => tasks.pos)
    );

    if (ceil === 0) return 1;

    if (ceil < highestPos) {
      return highestPos + 1;
    } else {
      return ceil + 1;
    }
  };

  const createNewList = async (listName) => {
    const response = await axios.get(PROJECT_API + `/list`, {
      params: {
        listName,
        pos: setPosForList(),
        projectId: project.projectId,
      },
      headers,
    });

    const updatedProject = response.data;

    const newProject = { ...project, ...updatedProject };
    const newCategories = response.data.listOfTasks;

    setProject(newProject);
    setCategories(newCategories);
  };

  const createNewTask = async (listId, taskTitle, pos) => {
    const response = await axios.get(PROJECT_API + `/list/task`, {
      params: {
        listId,
        pos,
        taskTitle,
      },
      headers,
    });

    const updatedProject = response.data;

    const newProject = { ...project, ...updatedProject };

    setProject(newProject);
    setCategories(response.data.listOfTasks);
  };

  const updateTitleAndDescrTask = async (
    listId,
    taskId,
    taskTitle,
    taskDescr
  ) => {
    const response = await axios.post(
      PROJECT_API + `/list/task/${listId}`,
      {
        taskId,
        taskTitle,
        taskDescr,
      },
      {
        headers,
      }
    );

    const updatedProject = response.data;
    const newProject = { ...project, ...updatedProject };

    setProject(newProject);
    setCategories(response.data.listOfTasks);
  };

  const addPriority = async (taskPriority, listId, taskId) => {
    const response = await axios.post(
      PROJECT_API + `/list/task/priority/${listId}`,
      {
        taskId,
        taskPriority: taskPriority.toUpperCase(),
      },
      { headers }
    );

    const updatedProject = response.data;
    const newProject = { ...project, ...updatedProject };

    setProject(newProject);

    setCategories(response.data.listOfTasks);
  };

  const moveTask = async (
    assignedListTaskId,
    unassignedListTaskId,
    movedTaskId,
    desTaskId,
    dropPlace
  ) => {
    const response = await axios.post(
      PROJECT_API + "/project/listTask/movedTask",
      {
        assignedListTaskId,
        unassignedListTaskId,
        movedTaskId,
        desTaskId,
        dropPlace,
      },
      {
        headers,
      }
    );

    if (assignedListTaskId === unassignedListTaskId) {
      setCategories(response.data.listOfTasks);
    }
  };

  const success_image = (
    <img
      src={success_logo}
      alt="success_logo"
      style={{ height: 30, width: 30 }}
      className={styles.success_logo}
    />
  );

  const actionBar = (
    <div>
      <button
        onClick={handleSubmit}
        className={`${styles.register_btn} large-btn`}
      >
        Add User
      </button>
    </div>
  );

  const confirmActionBar = (
    <div>
      <button
        onClick={handleConfirm}
        className={`${styles.register_btn} large-btn`}
      >
        OK
      </button>
    </div>
  );

  const openMembersDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMembersDropdown = () => {
    setIsDropdownOpen(false);
  };

  const removeExistedMember = (email) => {
    const updatedMembers = members.filter((member) => {
      return member.email !== email;
    });

    setMembers(updatedMembers);
  };

  const removeMember = async (email) => {
    const response = await axios.delete(PROJECT_API + `/member/${email}`, {
      params: {
        projectId: project.projectId,
      },
      headers,
    });

    const updatedProject = response.data;
    const newProject = { ...project, ...updatedProject };
    setProject(newProject);
    // setMembers(response.data.members);
    removeExistedMember(email);
  };

  const swapItem = (sourceId, desId, sourcePos, desPos, colId) => {
    const colIndex = categories.findIndex((col) => col.listId === colId);
    const tasks = Array.from(categories[colIndex].tasks);

    if (sourcePos - desPos === 1 || desPos - sourcePos === 1) {
      const updatedTasks = tasks.map((task) => {
        if (task.taskId === sourceId) {
          return { ...task, pos: desPos };
        }

        if (task.taskId === desId) {
          return { ...task, pos: sourcePos };
        }

        return task;
      });

      const updatedCategories = categories.map((category) => {
        if (category.listId === colId) {
          return { ...category, tasks: updatedTasks };
        }

        return category;
      });

      setCategories(updatedCategories);
    } else {
      if (desPos - sourcePos > 1) {
        const updatedTasks = tasks.map((task) => {
          if (task.pos <= desPos && task.pos !== sourcePos) {
            const newPos = task.pos - 1;
            return { ...task, pos: newPos };
          }

          if (task.taskId === sourceId) {
            return { ...task, pos: desPos };
          }

          return task;
        });

        const updatedCategories = categories.map((category) => {
          if (category.listId === colId) {
            return { ...category, tasks: updatedTasks };
          }

          return category;
        });

        setCategories(updatedCategories);
      } else {
        const updatedTasks = tasks.map((task) => {
          if (task.pos >= desPos && task.pos !== sourcePos) {
            const newPos = task.pos + 1;
            return { ...task, pos: newPos };
          }

          if (task.taskId === sourceId) {
            return { ...task, pos: desPos };
          }

          return task;
        });

        const updatedCategories = categories.map((category) => {
          if (category.listId === colId) {
            return { ...category, tasks: updatedTasks };
          }

          return category;
        });

        setCategories(updatedCategories);
      }
    }
  };

  const setColPos = async (projectId, sourceId, desId) => {
    const response = await axios.post(
      PROJECT_API + "/project/listTask/order",
      {
        projectId,
        sourceId,
        desId,
      },
      {
        headers,
      }
    );

    setCategories(response.data.listOfTasks);
  };

  const fetchDraggedTask = async (taskId) => {
    const response = await axios.get(TASK_API + `/${taskId}`, { headers });

    const task = response.data;

    return task;
  };

  const onDragEnd = async (result) => {
    const { type, source, destination, draggableId } = result;

    if (!destination) return;

    const isSameColumn = destination.droppableId === source.droppableId;
    const isChangePosition = destination.index !== source.index;

    if (isSameColumn && !isChangePosition) return;

    if (type === "column") {
      const sourcePos = source.index;
      const desPos = destination.index;

      const sourceItem = categories.find(
        (category) => category.pos === sourcePos
      );

      const desItem = categories.find((category) => category.pos === desPos);

      const sourceItemId = sourceItem["listId"];

      const desItemId = desItem["listId"];

      const newSourceItem = sourceItem;
      const newDesItem = desItem;

      const tmp = newSourceItem["pos"];
      newSourceItem["pos"] = desItem["pos"];
      newDesItem["pos"] = tmp;

      setColPos(projectId, sourceItemId, desItemId);
      return;
    }

    const sourceCol = categories.find(
      (category) => category.listId === source.droppableId
    );
    const dropCol = categories.find(
      (category) => category.listId === destination.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const draggedTask = sourceCol.tasks.find(
        (task) => task.pos === source.index
      );

      const desTask = dropCol.tasks.find(
        (task) => task.pos === destination.index
      );

      const draggedTaskId = draggedTask.taskId;
      const desTaskId = desTask.taskId;

      const dragPos = draggedTask.pos;
      const desPos = desTask.pos;

      swapItem(draggedTaskId, desTaskId, dragPos, desPos, sourceCol.listId);

      moveTask(
        source.droppableId,
        destination.droppableId,
        draggedTaskId,
        desTaskId
      );
    } else {
      const dropPlace = destination.index;

      const srcTasks = Array.from(sourceCol.tasks);

      const taskIndex = srcTasks.findIndex(
        (task) => task.taskId === draggableId
      );

      const draggedTask = await fetchDraggedTask(draggableId);

      // const draggedTask = srcTasks[taskIndex];

      const dragPos = draggedTask.pos;
      const srcHighestPos = Math.max(...srcTasks.map((task) => task.pos));
      const srcLowestPos = Math.min(...srcTasks.map((task) => task.pos));

      const updatedSrcTasks = srcTasks.map((task) => {
        if (srcTasks.length === 1) {
          return { ...task, pos: 1 };
        }

        if (dragPos === srcLowestPos && srcTasks.length > 1) {
          if (task.pos !== dragPos) {
            const newPos = task.pos - 1;
            return { ...task, pos: newPos };
          }
        }

        if (dragPos < srcHighestPos && dragPos > srcLowestPos) {
          if (task.pos > dragPos) {
            const newPos = task.pos - 1;
            return { ...task, pos: newPos };
          }
        }

        return task;
      });

      updatedSrcTasks.splice(taskIndex, 1);
      const updatedSrcCol = { ...sourceCol, tasks: updatedSrcTasks };

      const dropTasks = Array.from(dropCol.tasks);

      let dropHighestPos = 0;
      let dropLowestPos = 0;

      if (dropTasks.length >= 1) {
        dropHighestPos = Math.max(...dropTasks.map((task) => task.pos));

        dropLowestPos = Math.min(...dropTasks.map((task) => task.pos));
      }

      const updatedDropTasks = dropTasks.map((task) => {
        if (dropTasks.length === 0) {
          return;
        }

        if (dropPlace === 1) {
          const newPos = task.pos + 1;
          return { ...task, pos: newPos };
        }

        if (dropPlace > 1 && dropPlace <= dropHighestPos) {
          if (task.pos >= dropPlace) {
            if (task.pos === dropPlace) {
            }
            const newPos = task.pos + 1;
            return { ...task, pos: newPos };
          }
          return task;
        }

        return task;
      });

      if (updatedDropTasks.length === 0 || dropPlace === 1) {
        const newDraggedTask = { ...draggedTask, pos: 1 };
        const updatedDropTasks2 = [...updatedDropTasks, newDraggedTask];

        const updatedDropCol = { ...dropCol, tasks: updatedDropTasks2 };

        const updatedCategories = categories.map((category) => {
          if (category.listId === updatedSrcCol.listId) {
            return { ...category, tasks: updatedSrcTasks };
          }

          if (category.listId === updatedDropCol.listId) {
            return { ...category, tasks: updatedDropTasks2 };
          }

          return category;
        });

        setCategories(updatedCategories);

        moveTask(
          destination.droppableId,
          source.droppableId,
          draggableId,
          draggableId,
          1
        );
      } else {
        if (dropPlace > dropHighestPos) {
          const newDraggedTask = { ...draggedTask, pos: dropPlace };
          const updatedDropTasks2 = [...updatedDropTasks, newDraggedTask];

          const updatedDropCol = { ...dropCol, tasks: updatedDropTasks2 };

          const updatedCategories = categories.map((category) => {
            if (category.listId === updatedSrcCol.listId) {
              return { ...category, tasks: updatedSrcTasks };
            }

            if (category.listId === updatedDropCol.listId) {
              return { ...category, tasks: updatedDropTasks2 };
            }

            return category;
          });

          setCategories(updatedCategories);
          moveTask(
            destination.droppableId,
            source.droppableId,
            draggableId,
            draggableId,
            dropPlace
          );
        } else {
          const newDraggedTask = { ...draggedTask, pos: dropPlace };
          const updatedDropTasks2 = [...updatedDropTasks, newDraggedTask];

          const updatedDropCol = { ...dropCol, tasks: updatedDropTasks2 };

          const updatedCategories = categories.map((category) => {
            if (category.listId === updatedSrcCol.listId) {
              return { ...category, tasks: updatedSrcTasks };
            }

            if (category.listId === updatedDropCol.listId) {
              return { ...category, tasks: updatedDropTasks2 };
            }

            return category;
          });

          setCategories(updatedCategories);
          moveTask(
            destination.droppableId,
            source.droppableId,
            draggableId,
            draggableId,
            dropPlace
          );
        }
      }
    }
  };

  const membersDropdown = (
    <MemberDropdown
      onClose={closeMembersDropdown}
      members={members}
      admin={project.createdBy}
      onRemoveMember={removeMember}
    />
  );

  const confirmModal = (
    <Modal
      onClose={handleConfirmModalClose}
      actionBar={confirmActionBar}
      image={success_image}
    >
      <h1>Added Successfully</h1>
      <p>
        Member {memberEmail} is added to '
        <span className="highlight">{project.projectName}</span>' successfully
      </p>
    </Modal>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <div className="book-create">
        <form onSubmit={handleSubmit}>
          <label className="board-title">Member Email</label>
          <br />
          <input
            className="board-name"
            value={memberEmail}
            onChange={handleChange}
            placeholder="Enter member email"
          />
          {!isFound && (
            <div className={`${styles.alert} ${styles.field_error}`}>
              Email <span className="highlight">'{notFoundEmail}'</span> is not
              found. Please add another name.
            </div>
          )}
        </form>
      </div>
    </Modal>
  );

  const isAdmin = project.createdBy === user.username;
  const projectMembers = members;
  const list = categories;

  if (Object.keys(project).length === 0) {
    return (
      <div>
        <div className={styles.login_form}>
          <h1>Not found any project with ID: {path.id}</h1>
        </div>
        <div
          className={`btn ${styles.register_btn}`}
          onClick={() => navigate("/")}
        >
          <button>Click here to return main board</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.board}>
        <div className={styles.board_detail_container}>
          {isAdmin ? (
            <div
              onClick={handleClick}
              className={styles.add_member_btn_container}
            >
              <div className={styles.flex_container}>
                <div className={styles.add_user_icon}>
                  <AiOutlineUserAdd />
                </div>
                <div className={styles.add_user_btn}>
                  <button>Share </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.add_member_btn_container}>
              Joined Project
            </div>
          )}
          <div
            className={styles.expand_members_dropdown_button}
            onClick={openMembersDropdown}
          >
            <h3 className={styles.expand_members_dropdown_button_title}>
              Members
            </h3>
            <MdArrowDropDown className={styles.dropdown_chevron} />
          </div>
          {isDropdownOpen && membersDropdown}
          {isOpen && modal}
          {isCofirmModalOpen && confirmModal}
        </div>
        <hr className={styles.btm_form_separator} />
        <div className={styles.project_title}>
          <h2>{project.projectName}</h2>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-column"
            direction="horizontal"
            type="column"
          >
            {(provided) => {
              return (
                <div
                  className={styles.task_board}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <>
                    <div className={styles.task_container}>
                      <ListTaskList
                        listTasks={list}
                        onCreateNewTask={createNewTask}
                        onUpdateTask={updateTitleAndDescrTask}
                        onAddPriority={addPriority}
                        members={projectMembers}
                        projectId={project.projectId}
                      />
                      {provided.placeholder}
                      <ListCreate onSubmit={createNewList} />
                    </div>
                  </>
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
        <div className={styles.background_board_detail}></div>
      </div>
    );
  }
}

export default BoardDetailPage;
