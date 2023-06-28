import { useState } from "react";
import styles from "../login.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useRef } from "react";
import { useEffect } from "react";

function TaskCreate({ onSubmit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const handleClick = () => {
    setIsExpanded(true);
  };

  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskTitle);
    setIsExpanded(false);
    setTaskTitle("");
  };

  return (
    <>
      {isExpanded && (
        <div ref={divEl} className={styles.list_card_expanded}>
          <div className={styles.card_composer}>
            <form onSubmit={onHandleSubmit}>
              <div className={styles.list_card}>
                <div className={styles.list_card_details}>
                  <textarea
                    className={styles.list_card_composer_textarea}
                    dir="auto"
                    placeholder="Enter a title for this card..."
                    style={{
                      overflow: "hidden",
                      overflowWrap: "break-word",
                      resize: "none",
                      height: "54px",
                    }}
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className={styles.task_form_add_task_btn}>
                <button className={styles.add_list_btn}>Add task</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {!isExpanded && (
        <div className={styles.list_card_btn_container} onClick={handleClick}>
          <a className={styles.list_card_add_btn}>
            <AiOutlinePlus className={styles.icon_add} />
            <span className={styles.add_a_card}>Add a card</span>
          </a>
          <div className={styles.list_card_menu_icon}></div>
        </div>
      )}
    </>
  );
}

export default TaskCreate;
