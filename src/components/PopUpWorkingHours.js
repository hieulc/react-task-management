import { useEffect, useRef } from "react";
import styles from "../login.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

function WorkingHours({ onClose, hours, onAddWorkingHour }) {
  const divEl = useRef();
  const [workingHours, setWorkingHours] = useState(hours);

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

  const handleChange = (event) => {
    setWorkingHours(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddWorkingHour(workingHours);
    setWorkingHours(workingHours);
  };

  return (
    <div className={styles.pop_over} ref={divEl}>
      <div className={styles.pop_over_header}>
        <span className={styles.pop_over_header_title}>Working Days</span>
        <a
          href="#"
          className={styles.pop_over_header_close_btn}
          onClick={onClose}
        >
          <AiOutlineClose />
        </a>
      </div>
      <div className={styles.pop_working_hours_content}>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="number"
              placeholder="Estimate days to finish the task"
              min={1}
              onChange={handleChange}
              className={styles.search_members}
              autoFocus
            />
          </div>
          <button className={styles.calendar_form_button_save}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default WorkingHours;
