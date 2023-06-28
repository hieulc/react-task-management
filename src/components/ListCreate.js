import { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../login.module.css";
import { AiOutlinePlus } from "react-icons/ai";

function ListCreate({ onSubmit }) {
  const [listName, setListName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const divEl = useRef();

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(listName);
    setIsExpanded(false);
    setListName("");
  };

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

  const createForm = (
    <div className={styles.task_form_container}>
      <form onSubmit={handleSubmit}>
        <input
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Enter list title... "
          className={styles.task_form_input}
        />
        <div className={styles.task_form_add_btn}>
          <button className={styles.add_list_btn}>Add list</button>
        </div>
      </form>
    </div>
  );

  const createListButton = (
    <div className={styles.task_btn_container} onClick={handleClick}>
      <div className={styles.task_btn_icon}>
        <AiOutlinePlus />
      </div>
      <div className={styles.task_btn}>
        <button>Add another list</button>
      </div>
    </div>
  );

  return (
    <div ref={divEl} className={styles.list_wrapper}>
      {isExpanded ? createForm : createListButton}
    </div>
  );
}

export default ListCreate;
