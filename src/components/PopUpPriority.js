import { useEffect, useRef } from "react";
import styles from "../login.module.css";
import { AiOutlineClose } from "react-icons/ai";

function PopUpPriority({ onClose, onAddPriority, onOpenPopUp }) {
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const priorities = [
    {
      priorityName: "High",
      color: "#F87462",
      textColor: "#601e16",
    },
    {
      priorityName: "Normal",
      color: "#E2B206",
      textColor: "#533f04",
    },
    {
      priorityName: "Low",
      color: "#4BCE97",
      textColor: "#164b35",
    },
  ];

  const handleClick = (priorityName) => {
    onAddPriority(priorityName);
  };

  const renderedPriorities = priorities.map((priority) => {
    return (
      <li key={priority.priorityName}>
        <label className={styles.list_priority_label}>
          <span className={styles.list_priority_element}>
            <div
              className={styles.label_element}
              style={{
                backgroundColor: `${priority.color}`,
                color: `${priority.textColor}`,
              }}
              onClick={() => handleClick(priority.priorityName)}
            >
              {priority.priorityName}
            </div>
          </span>
        </label>
      </li>
    );
  });

  return (
    <section
      className={styles.pop_up_priority_container}
      onClick={onOpenPopUp}
      ref={divEl}
    >
      <header className={styles.pop_up_priority_header}>
        <h2 className={styles.pop_up_priority_header_title}>Label</h2>
        <a href="#" className={styles.close_priority_btn} onClick={onClose}>
          <span className={styles.close_priority_icon}>
            <AiOutlineClose />
          </span>
        </a>
      </header>
      <div className={styles.priority_bottom_content}>
        <div>
          <ul className={styles.list_priority}>{renderedPriorities}</ul>
        </div>
      </div>
    </section>
  );
}

export default PopUpPriority;
