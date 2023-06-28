import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../login.module.css";
import TaskModal from "./TaskModal";
import { MdSubtitles } from "react-icons/md";
import { ImParagraphLeft } from "react-icons/im";
import {
  AiOutlineUser,
  AiOutlineTag,
  AiOutlineClose,
  AiOutlineClockCircle,
  AiOutlineCheck,
} from "react-icons/ai";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { IoMdTime } from "react-icons/io";
import PopUpCalendar from "./PopUpCalendar";
import moment from "moment/moment";
import PopUpPriority from "./PopUpPriority";
import { TASK_API } from "../context/api";
import authHeader from "../services/auth-header";
import axios from "axios";
import AssigneeShow from "./AssigneeShow";
import NotificationDialog from "./NotificationDialog";
import { Draggable } from "react-beautiful-dnd";

function Task({
  element,
  listTitle,
  onUpdateTask,
  members,
  onAddPriority,
  index,
}) {
  const [task, setTask] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(element.taskTitle);
  const [taskDescr, setTaskDescr] = useState(element.taskDescr);
  const [isDescrOpen, setIsDescrOpen] = useState(false);
  const [isPopOverheadOpen, setIsPopOverheadOpen] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isOverDue, setIsOverDue] = useState(element.overDue);
  const [hasDueDate, setHasDueDate] = useState(element.dueDate);
  const [isOpenPriority, setIsOpenPriority] = useState(false);
  const [listAssignee, setListAssignee] = useState([]);
  const [priorityBadge, setPriorityBadge] = useState({
    color: "",
    textColor: "",
  });
  const [isClicked, setIsClicked] = useState([]);
  const [isArchived, setIsArchived] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const projectMembers = members;
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = authHeader(user);

  const fetchTaskById = useCallback(async () => {
    const response = await axios.get(TASK_API + `/${element.taskId}`, {
      headers,
    });

    const updatedTask = response.data;
    const newTask = { ...updatedTask, ...task };
    const newIsClicked = response.data.assignees.map((assignee) => assignee.id);

    setTask(newTask);
    setListAssignee(response.data.assignees);
    setIsClicked(newIsClicked);
    setIsArchived(response.data.archived);
  }, [projectMembers.length]);

  useEffect(() => {
    fetchTaskById(element.taskId);
  }, [fetchTaskById]);

  const hasPriority = element.taskPriority;

  const divEl = useRef();
  const divEl2 = useRef();

  const DateFomat = moment(hasDueDate).format("L");
  const TimeFormat = moment(hasDueDate).format("LT");

  let showDateinTask = task.dueDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
      }).format(new Date(task.dueDate))
    : null;

  useEffect(() => {
    showDateinTask = task.dueDate
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
        }).format(new Date(task.dueDate))
      : null;
  }, [task.pos]);

  const conditionalStyle = isOverDue
    ? "show_red_background"
    : "show_normal_due_date";

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsDescrOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (!divEl2.current) {
        return;
      }

      if (!divEl2.current.contains(event.target)) {
        setIsPopOverheadOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const checkIsTaskOverDue = (checkedDate) => {
    if (checkedDate) {
      const now = new Date().getTime();
      const dueDate = new Date(checkedDate).getTime();

      if (now > dueDate) {
        setIsOverDue(true);
      } else {
        setIsOverDue(false);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isOverDue === false) {
        checkIsTaskOverDue(task.dueDate);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isOverDue, hasDueDate]);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const openDescrTextarea = () => {
    setIsDescrOpen(!isDescrOpen);
  };

  const closeTextarea = () => {
    setIsDescrOpen(false);
    const currentDescr = taskDescr;
    setTaskDescr(currentDescr);
  };

  const handleTaskTitleAndDescrUpdate = (e) => {
    e.preventDefault();
    onUpdateTask(element.taskId, taskTitle, taskDescr);
    setTaskTitle(element.taskTitle);
    setTaskDescr(taskDescr);
    setIsDescrOpen(false);
  };

  const handleOnBlurTaskTitle = (e) => {
    setTaskTitle(e.target.value);
    onUpdateTask(element.taskId, taskTitle, taskDescr);
    setIsDescrOpen(false);
  };

  const handleOnBlurTaskDescr = (e) => {
    setTaskDescr(e.target.value);
    onUpdateTask(element.taskId, taskTitle, taskDescr);
  };

  const descrButton = (
    <div className={styles.task_modal_gutter} onClick={openDescrTextarea}>
      <div className={styles.description_content_button}>
        {taskDescr && (
          <span className={styles.description_fade_button_text}>
            {taskDescr}
          </span>
        )}
        {!taskDescr && (
          <span className={styles.description_fade_button_text}>
            Add a more detail description...
          </span>
        )}
      </div>
    </div>
  );

  const descrTextarea = (
    <>
      <div className={styles.task_modal_descr_textarea}>
        <textarea
          className={styles.descr_textarea}
          placeholder="Edit your description"
          value={taskDescr}
          onChange={(e) => setTaskDescr(e.target.value)}
          onBlur={handleOnBlurTaskDescr}
        />
      </div>
      <div className={styles.button_container}>
        <button href="#" className={styles.submit_edit}>
          Save
        </button>
        <a href="#" className={styles.submit_cancel} onClick={closeTextarea}>
          Cancel
        </a>
      </div>
    </>
  );

  const openPopOverhead = () => {
    setIsPopOverheadOpen(!isPopOverheadOpen);
  };

  const closePopOverhead = () => {
    setIsPopOverheadOpen(false);
  };

  const openCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  const closeCalendar = () => {
    setIsOpenCalendar(false);
  };

  const openPopUpPriority = () => {
    setIsOpenPriority(!isOpenPriority);
  };

  const closePopUpPriority = () => {
    setIsOpenPriority(false);
  };

  const addOrRemove = (id) => {
    const isChecked = isClicked.includes(id);
    if (isChecked) {
      removeAssignee(id);
      const newIsClicked = isClicked.filter((isClickId) => {
        return isClickId !== id;
      });

      setIsClicked(newIsClicked);
    } else {
      const newIsClicked = [...isClicked, id];
      addAssignee(id);
      setIsClicked(newIsClicked);
    }
  };

  const addAssignee = async (assigneeId) => {
    const response = await axios.get(TASK_API + `/assignee/${element.taskId}`, {
      params: {
        assigneeId,
      },
      headers,
    });

    const updatedTask = response.data;

    const newTask = { ...task, ...updatedTask };

    setTask(newTask);
    const newListAssignee = [...listAssignee, ...response.data.assignees];
    setListAssignee(newListAssignee);
  };

  const removeFromListAssignee = (assigneeId) => {
    const updatedListAssignee = listAssignee.filter((assignee) => {
      return assignee.id !== assigneeId;
    });

    setListAssignee(updatedListAssignee);
  };

  const removeAssignee = async (assigneeId) => {
    const response = axios.delete(TASK_API + `/assignee/${element.taskId}`, {
      params: {
        assigneeId,
      },
      headers,
    });

    const updatedTask = response.data;

    const newTask = { ...task, ...updatedTask };

    setTask(newTask);
    removeFromListAssignee(assigneeId);
  };

  const removeAssignee2 = async (assigneeId) => {
    const isChecked = isClicked.includes(assigneeId);
    if (isChecked) {
      const response = axios.delete(TASK_API + `/assignee/${element.taskId}`, {
        params: {
          assigneeId,
        },
        headers,
      });

      const updatedTask = response.data;

      const newTask = { ...task, ...updatedTask };

      setTask(newTask);
      removeFromListAssignee(assigneeId);
      const newIsClicked = isClicked.filter((isClickId) => {
        return isClickId !== assigneeId;
      });

      setIsClicked(newIsClicked);
    } else return;
  };

  const addDueDate = async (dueDate) => {
    const response = await axios.post(
      TASK_API + `/due-date/${element.taskId}`,
      {
        taskId: element.taskId,
        dueDate,
      },
      {
        headers,
      }
    );

    const updatedTask = response.data;

    const newTask = { ...task, ...updatedTask };

    setTask(newTask);
    setHasDueDate(dueDate);
    checkIsTaskOverDue(dueDate);
    setIsOpenCalendar(false);
  };

  const addPriority = (taskPriority) => {
    onAddPriority(taskPriority, element.taskId);
  };

  useEffect(() => {
    if (element.taskPriority === "HIGH") {
      setPriorityBadge({
        color: "#F87462",
        textColor: "#601e16",
      });
    }

    if (element.taskPriority === "NORMAL") {
      setPriorityBadge({
        color: "#E2B206",
        textColor: "#533f04",
      });
    }

    if (element.taskPriority === "LOW") {
      setPriorityBadge({
        color: "#4BCE97",
        textColor: "#164b35",
      });
    }
  }, [element.taskPriority]);

  const setArchived = async () => {
    await axios.get(TASK_API + `/archive/${task.taskId}`, {
      headers,
    });

    setIsArchived(true);
  };

  const renderedProjectMembers = projectMembers.map((member) => {
    return (
      <li
        className={`${styles.board_members_list_item} ${
          isClicked.includes(member.id) ? "show_darker_color" : ""
        }`}
        onClick={() => addOrRemove(member.id)}
        key={member.id}
      >
        <a className={styles.select_member}>
          <span className={styles.select_member_name} key={member.id}>
            {member.email}
          </span>
          {isClicked.includes(member.id) && (
            <span className={styles.board_member_icon_check}>
              <AiOutlineCheck />
            </span>
          )}
        </a>
      </li>
    );
  });

  const popOverhead = (
    <div className={styles.pop_over}>
      <div className={styles.pop_over_header}>
        <span className={styles.pop_over_header_title}>Members</span>
        <a
          href="#"
          className={styles.pop_over_header_close_btn}
          onClick={closePopOverhead}
        >
          <AiOutlineClose />
        </a>
      </div>
      <div className={styles.pop_over_content}>
        <div>
          <input
            type="text"
            placeholder="Search members"
            className={styles.search_members}
            autoFocus
          />
          <div className={styles.board_members}>
            <h4>Board members</h4>
            <ul className={styles.board_members_list}>
              {projectMembers && renderedProjectMembers}
            </ul>
          </div>
          <div className={styles.show_org_member}>
            <a href="#" className={styles.btn_full}>
              Show other Workspace member
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const popUpCalendar = (
    <PopUpCalendar onClose={closeCalendar} onAddDueDate={addDueDate} />
  );

  const popUpPriorty = (
    <PopUpPriority
      onClose={closePopUpPriority}
      onAddPriority={addPriority}
      onOpenPopUp={openPopUpPriority}
    />
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = () => {
    setArchived();
    setOpenDialog(false);
  };

  const confirmDialog = (
    <NotificationDialog
      onOpen={handleOpenDialog}
      onClose={handleCloseDialog}
      title={`Notification`}
      content={`Do you want to archive this task?`}
      onConfirm={handleConfirmDialog}
    />
  );

  const cardDueDate = (
    <div className={styles.card_due_date}>
      <h3 className={styles.card_due_date_title}>Due date</h3>
      <div className={styles.card_due_date_content}>
        <div className={styles.card_due_date_button} onClick={openCalendar}>
          <span className={styles.card_due_date_text}>
            {DateFomat} at {TimeFormat}
          </span>
          {isOverDue && (
            <span className={styles.card_due_date_status}>overdue</span>
          )}
        </div>
      </div>
    </div>
  );

  const cardPriority = (
    <div
      className={styles.card_priority}
      style={{ marginLeft: hasDueDate ? "" : `-6px` }}
    >
      <h3 className={styles.card_due_date_title}>Priority</h3>
      <div className={`${styles.card_due_date_content}`}>
        <div
          className={styles.card_priority_button}
          style={{
            backgroundColor: `${priorityBadge.color}`,
            color: `${priorityBadge.textColor}`,
          }}
          onClick={openPopUpPriority}
        >
          <span className={styles.card_priority_text}>
            {element.taskPriority}
          </span>
        </div>
      </div>
    </div>
  );

  const modal = (
    <TaskModal onClose={handleClose}>
      <div>
        <form onSubmit={handleTaskTitleAndDescrUpdate}>
          <div className={styles.task_modal_title}>
            <div className={styles.task_modal_icon}>
              <MdSubtitles size={20} />
            </div>
            <div className={styles.task_modal_input}>
              <textarea
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onBlur={handleOnBlurTaskTitle}
              />
            </div>
            <div className={styles.task_modal_inline_content}>
              in list{" "}
              <a href="#" className={styles.quiet_a}>
                {listTitle}
              </a>
            </div>
          </div>
          <div className={styles.task_modal_sign}>
            <div className={styles.task_modal_due_date_sign}>
              {hasDueDate && cardDueDate}
            </div>
            <div className={styles.task_modal_priority_sign}>
              {hasPriority && cardPriority}
            </div>
          </div>
          <div className={styles.task_modal_container}>
            <div className={styles.task_modal_main_col}>
              <div className={styles.task_modal_module}>
                <div className={styles.task_modal_description_title}>
                  <span className={styles.task_modal_descr_icon}>
                    <ImParagraphLeft size={14} />
                  </span>
                  <h3>Description</h3>
                </div>
                <div className={styles.descr_button} ref={divEl}>
                  {isDescrOpen ? descrTextarea : descrButton}
                </div>
              </div>
              <div
                className={`${styles.task_modal_module} ${styles.task_modal_assignees_list_fullwidth}`}
              >
                <div className={styles.task_modal_sidebar_title}>
                  <h3 className={styles.assignee_list}>Assignees</h3>
                  <AssigneeShow
                    assignees={listAssignee}
                    onRemoveAssignee={removeAssignee2}
                  />
                </div>
              </div>
            </div>
            <div className={styles.task_modal_main_sidebar}>
              <div className={styles.task_modal_sidebar_title}>
                <h3>Add to card</h3>
                <div className={styles.task_modal_sidebar_menu}>
                  <a className={styles.button_link}>
                    <div
                      className={styles.inline_style}
                      onClick={openPopOverhead}
                    >
                      <div className={styles.icon_sm}>
                        <span>
                          <AiOutlineUser />
                        </span>
                      </div>
                      <div>
                        <span>Members</span>
                      </div>
                    </div>
                  </a>
                  <a className={styles.button_link} onClick={openCalendar}>
                    <div className={styles.inline_style}>
                      <div className={styles.icon_sm}>
                        <span>
                          <IoMdTime />
                        </span>
                      </div>
                      <div>
                        <span>Dates</span>
                      </div>
                    </div>
                  </a>
                  <a className={styles.button_link} onClick={openPopUpPriority}>
                    <div className={styles.inline_style}>
                      <div className={styles.icon_sm}>
                        <span>
                          <AiOutlineTag />
                        </span>
                      </div>
                      <div>
                        <span>Priorities</span>
                      </div>
                    </div>
                  </a>
                  <h3 style={{ marginTop: "20px" }}>Actions</h3>
                  <a className={styles.button_link} onClick={handleOpenDialog}>
                    <div className={styles.inline_style}>
                      <div className={styles.icon_sm}>
                        <span>
                          <HiOutlineArchiveBox />
                        </span>
                      </div>
                      <div>
                        <span>Archive</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </TaskModal>
  );

  if (task && !isArchived) {
    return (
      <>
        <div className={styles.chrome_container} ref={divEl2}>
          <div>
            <Draggable draggableId={element.taskId} index={index}>
              {(provided, snapshot) => {
                return (
                  <div
                    className={styles.task_card}
                    onClick={handleClick}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    style={{
                      ...provided.draggableProps.style,
                      backgroundColor: snapshot.isDragging
                        ? "#ccecfc"
                        : "white",
                    }}
                  >
                    <div className={styles.task_card_title}>
                      <p>{element.taskTitle}</p>
                    </div>
                    <div className={styles.task_sign}>
                      {hasDueDate && (
                        <div className={`${styles.badges} ${conditionalStyle}`}>
                          <span className={styles.show_due_date_icon}>
                            <AiOutlineClockCircle />
                          </span>
                          <span className={styles.warning_due_date_text}>
                            {showDateinTask}
                          </span>
                        </div>
                      )}
                      {hasPriority && (
                        <div className={styles.sign_priority}>
                          <button
                            className={styles.sign_priority_btn}
                            style={{
                              backgroundColor: `${priorityBadge.color}`,
                              color: `${priorityBadge.textColor}`,
                            }}
                          >
                            <span style={{ marginLeft: "5px" }}>
                              {element.taskPriority.toLowerCase()}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            </Draggable>
          </div>
          {isOpen && modal}
          {isPopOverheadOpen && popOverhead}
        </div>
        {isOpenCalendar && popUpCalendar}
        {isOpenPriority && popUpPriorty}
        {openDialog && confirmDialog}
      </>
    );
  } else {
    <></>;
  }
}

export default Task;
