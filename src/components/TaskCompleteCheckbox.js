import { useState } from "react";
import styles from "../login.module.css";

function TaskCompleteCheckbox({ isComplete, handleCheckbox }) {
  const [isChecked, setIsChecked] = useState(isComplete);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleCheckbox(!isChecked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={styles.complete_task_checkbox}
      />
    </label>
  );
}

export default TaskCompleteCheckbox;
